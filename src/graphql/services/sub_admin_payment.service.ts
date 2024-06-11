/* eslint-disable */
import _ from "../../models/sub_admin_payments.model";
import { StripeService } from "./stripe.service";

export class SubAdminPaymentDBService {
  stripeService = new StripeService()

  create = async (payload: ISubAdminPaymentInput): Promise<ISubAdminPayment> => {
    return (await _.create(payload)).populate('user_id') as unknown as Promise<ISubAdminPayment>;
  };

  find = async (): Promise<ISubAdminPayment[]> => {
    return await _.find().populate('user_id') as unknown as Promise<ISubAdminPayment[]>;
  };

  findById = async (id: string): Promise<ISubAdminPayment> => {
    return await _.findOne({ _id: id }).populate('user_id') as unknown as Promise<ISubAdminPayment>;
  };

  updatePackageSubscription = async ( amount:number, customerId :string): Promise<{ clientSecret: string | null }> => {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, customerId)
    return {
      clientSecret: paymentIntent.client_secret,
    }
  };
}
