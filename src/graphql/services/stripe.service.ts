/* eslint-disable */
import Stripe from "stripe";
import userModel from "../../models/user.model";

export class StripeService {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
  });

  createPaymentIntentForSubscriber = async (
    amount: number
  ): Promise<{ clientSecret: string | null }> => {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  };

  createPaymentIntent = async (
    amount: number,
    customerId: string
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> => {
    return await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      customer: customerId,
    });
  };

  createCustomer = async (email: string): Promise<IGenericType> => {
    try {
      // Check if a customer with the given email already exists
      const existingCustomers = await this.stripe.customers.list({
        email: email,
        limit: 1, // Limit the result to one customer
      });

      if (existingCustomers?.data?.length) {
        // Customer already exists

        return {
          message: "Customer with this email already exists",
          status: true,
          data: existingCustomers.data[0], // You can return existing customer data if needed
        };
      }

      const created = await this.stripe.customers.create({
        email: email,
      });

      return {
        message: "created successfully",
        status: true,
        data: created,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  createStripeCustomer = async (email: string): Promise<IGenericType> => {
    try {
      const user = (await userModel
        .findOne({ email })
        .populate("belongsTo")
        .catch((_) => {
          throw new Error("Unable to assign Stripe Customer ID");
        })) as any;
      if (!user) throw new Error("Unable to find user's company");

      const stripeId: string = user?.company?.subAdmin
        ? user.stripeCustomerId
        : user?.belongsTo?.stripeCustomerId || "";
      if (!stripeId)
        throw new Error(
          "Failed to find Admin's Stripe Customer ID, Please contact administrator"
        );

      if (user?.company?.subAdmin) {
        const updated = await userModel
          .updateOne({ email }, { $set: { stripeCustomerId: stripeId } })
          .catch((_) => {
            throw new Error("Unable to assign Stripe Customer ID");
          });

        if (!updated.matchedCount || !updated.modifiedCount)
          throw new Error("Unable to find or modify user data");

        return {
          status: true,
          message: "Success",
          data: "Success",
        };
      } else {
        const result: IGenericType = await this.createCustomer(email);
        if (result.status)
          await userModel
            .updateOne(
              { email },
              { $set: { stripeCustomerId: result.data.id } }
            )
            .catch((_) => {
              throw new Error("Unable to assign Stripe Customer ID");
            });

        return result;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}
