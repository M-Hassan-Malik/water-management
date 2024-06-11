/* eslint-disable */
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import * as jwt from "jsonwebtoken";
import _ from "../../models/user.model";
import packageModel from "../../models/package.model";
import userPackageModel from "../../models/user_package.model";
import userPackageModulesModel from "../../models/user_package_modules.model";
import otpModel from "../../models/otp.model";
import { ObjectId, Types, startSession } from "mongoose";
import { getUniqueNumber } from "@/utils/helpers/functions";
import {
  InputSubAdmin,
  InputRegisterClient,
  ResetPasswordInput,
  LoginInput,
} from "../generated/graphql";
import { StripeService } from "./stripe.service";
import axios from "axios";

// moment.tz.setDefault('Asia/Karachi');

export class AuthService {
  stripeService = new StripeService();

  createSuperAdmin = async (payload: any): Promise<IUser> => {
    const stripeResponse: IGenericType =
      await this.stripeService.createCustomer(payload.email);
    if (!stripeResponse.status)
      throw new Error("Unable to create Stripe Customer Id");

    const user = (await _.create({
      ...payload,
      stripeCustomerId: stripeResponse.data.id,
    }).catch((_) => {
      throw new Error(_.message);
    })) as unknown as IUser;
    return user;
  };

  createUserOfSuperAdmin = async (payload: IUserInput): Promise<any> => {
    const superAdmin = await _.findOne({ admin: true }).catch((_) => {
      throw new Error(_.message);
    });
    if (!superAdmin) throw new Error("Unable to find Super Admin");

    const exists = await _.findOne({ email: payload.email });
    if (exists?.email) throw new Error("Email Already Exists.");

    const stripeResponse: IGenericType =
      await this.stripeService.createCustomer(payload.email);
    if (!stripeResponse.status)
      throw new Error("Unable to create Stripe Customer Id");

    // // send email
    // const reqBody: IEmailRequest = {
    //   to: payload.email,
    //   subject: "Super-Admin's user Created!",
    //   html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    //   <h1 style="color: #333;">Welcome onboard ${payload.first_name}!</h1>
    //   <p style="color: #555; margin-top: 10px;">Your email and password are relatively: ${String(payload.password)} and ${String(payload.email)}</p>
    //   <p style="color: #555; margin-top: 10px;">You can login to <a href=${String(process.env.FRONT_END_URL)}>Ellis Docs Portal Now!</a> with above credentials on first time login, You will be asked to change the Password.</p>
    // </div>`
    // };

    // send email
    const reqBody: IEmailRequest = {
      to: payload.email,
      subject: "Super-Admin's user Created!",

      html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1 style="color: #333;">Welcome to EllisDocs!</h1>
      <p style="color: #555; margin-top: 10px;">Please login to your account at <b><a href=${String(
        process.env.FRONT_END_URL
      )}>${String(
        process.env.FRONT_END_URL
      )}</a></b> using the following email and password: ${String(
        payload.email
      )} and ${String(
        payload.password
      )} You will be asked to change your password the first time you login.</p>
      </div>`,
    };

    const emailSentResult: IEmailResponse = await axios.post(
      `${process.env.FRONT_END_URL}/api/email/send`,
      reqBody
    );
    if (!emailSentResult.status) console.error(emailSentResult.message);

    // send on phone number
    if (payload?.phone?.phoneNo) {
      const reqBody: TwilioMessageRequest = {
        message: `${String(
          payload.first_name
        )} - Welcome to EllisDocs! Please login to your account at ${String(
          process.env.FRONT_END_URL
        )} using the following email and password: ${String(
          payload.email.toString()
        )} and ${String(
          payload.password.toString()
        )} You will be asked to change your password the first time you login`,

        phones: [payload.phone.phoneNo],
      };
      const smsSentResult: TwilioMessageResponse = await axios.post(
        `${process.env.FRONT_END_URL}/api/twilio/send`,
        reqBody
      );

      if (!smsSentResult.success) console.error(smsSentResult.message);
    }

    if (!payload.role) delete payload.role;
    const created = (await _.create({
      ...payload,
      created_by: superAdmin._id,
      belongsTo: superAdmin._id,
      stripeCustomerId: stripeResponse.data.id,
    }).catch((_) => {
      throw new Error(_.message);
    })) as unknown as Promise<IUser>;

    return created;
  };

  createClientAdmin = async (payload: InputSubAdmin): Promise<string> => {
    try {
      if (payload.package) {
        var suAdminSession = await startSession();
        suAdminSession.startTransaction();
        try {
          const packageFound = (await packageModel
            .findById(payload.package)
            .catch((e) => {
              throw new Error(e.message);
            })) as unknown as IPackage;
          if (!packageFound) throw new Error("Package Not Found");
          else if (!packageFound.active)
            throw new Error("The package is inactive");

          const userPackageModules: IUserPackageModule[] =
            packageFound.modules.map((_: any) => {
              return {
                name: _.name,
                views: _.views,
              } as IUserPackageModule;
            });
          const userPackageModuleIds = await userPackageModulesModel
            .insertMany(userPackageModules, { session: suAdminSession })
            .catch((e) => {
              throw new Error(e.message);
            });

          const userPackage_id = new Types.ObjectId(),
            user_id = new Types.ObjectId();
          await userPackageModel
            .create(
              [
                {
                  _id: userPackage_id,
                  title: packageFound.title,
                  modules: userPackageModuleIds.map((_) => _._id),
                  active: packageFound.active,
                  paid: payload.type,
                  cost: packageFound.cost,
                  sizeInGB: packageFound.sizeInGB,
                  ref: user_id,
                  packageRef: payload.package,
                  discount: packageFound.discount,
                  discount_type: packageFound.discount_type,
                  duration: packageFound.duration,
                  number_of_users: packageFound.number_of_users,
                  description: packageFound.description,
                  status: "SUBSCRIBED",
                  paymentDetail: payload.paymentDetails,
                  createdBy: payload.createdBy,
                },
              ],
              { session: suAdminSession }
            )
            .catch((e) => {
              throw new Error(e.message);
            });

          const stripeResponse: IGenericType =
            await this.stripeService.createCustomer(payload.email);
          if (!stripeResponse.status)
            throw new Error("Unable to create Stripe Customer Id");

          await _.create(
            [
              {
                _id: user_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                password: payload.password,
                stripeCustomerId: stripeResponse.data.id,
                operations: payload.operations,
                package: userPackage_id,
                phone: payload.phone,
                temporary_password: true,
                company: { subAdmin: true },
                active: payload.type,
                access: payload.access,
              },
            ],
            { session: suAdminSession }
          ).catch((e) => {
            throw new Error(e.message);
          });

          // send email
          // const reqBody: IEmailRequest = {
          //   to: payload.email,
          //   subject: "New User Created!",
          //   html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          //   <h1 style="color: #333;">Welcome onboard ${payload.first_name}!</h1>
          //   <p style="color: #555; margin-top: 10px;">Your email and password are relatively: ${String(payload.password)} and ${String(payload.email)}</p>
          //   <p style="color: #555; margin-top: 10px;">You can login to <a href=${String(process.env.FRONT_END_URL)}>Ellis Docs Portal Now!</a> with above credentials on first time login, You will be asked to change the Password.</p>
          // </div>`
          // };

          // send email
          const reqBody: IEmailRequest = {
            to: payload.email,
            subject: "New User Created!",
            html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

            <h1 style="color: #333;">Welcome to EllisDocs!</h1>
            <p style="color: #555; margin-top: 10px;">Please login to your account at <b><a href=${String(
              process.env.FRONT_END_URL
            )}>${String(
              process.env.FRONT_END_URL
            )}</a></b> using the following email and password: ${String(
              payload.email
            )} and ${String(
              payload.password
            )} You will be asked to change your password the first time you login.</p>
            </div>`,
          };

          const result: IEmailResponse = await axios.post(
            `${process.env.FRONT_END_URL}/api/email/send`,
            reqBody
          );
          if (!result.status) console.error(result.message);

          await suAdminSession.commitTransaction();

          return "User Created Successfully";
        } catch (e: any) {
          await suAdminSession.abortTransaction();
          throw new Error(e.message);
        } finally {
          await suAdminSession.endSession();
        }
      }
      throw new Error("Invalid Payload");
    } catch (_: any) {
      throw new Error(_.message);
    }
  };

  registerClient = async (payload: InputRegisterClient): Promise<string> => {
    try {
      if (payload.package) {
        const userFound = await _.findOne({ email: payload.email }).populate(
          "package"
        );
        // return userId if already exists but is not activated
        if (
          userFound &&
          userFound.temporary_password &&
          !userFound?.active &&
          !userFound?.package?.active &&
          !userFound?.package?.paid
        ) {
          if (String(userFound.package?.packageRef) === String(payload.package))
            throw new Error(
              "This email is already in use, but with different subscription\n Please contact Support/Administration Team"
            );
          else return userFound._id;
        }

        var clientSession = await startSession();
        clientSession.startTransaction();
        try {
          const packageFound = (await packageModel
            .findById(payload.package)
            .catch((e) => {
              throw new Error(e.message);
            })) as unknown as IPackage;
          if (!packageFound) throw new Error("Package Not Found");
          else if (!packageFound.active)
            throw new Error("The package is inactive");

          const userPackageModules: IUserPackageModule[] =
            packageFound.modules.map((_: any) => {
              return {
                name: _.name,
                views: _.views,
              } as IUserPackageModule;
            });
          const userPackageModuleIds = await userPackageModulesModel
            .insertMany(userPackageModules, { session: clientSession })
            .catch((e) => {
              throw new Error(e.message);
            });

          const userPackage_id = new Types.ObjectId(),
            user_id = new Types.ObjectId();
          await userPackageModel
            .create(
              [
                {
                  _id: userPackage_id,
                  title: packageFound.title,
                  modules: userPackageModuleIds.map((_) => _._id),
                  active: false,
                  paid: false,
                  cost: packageFound.cost,
                  sizeInGB: packageFound.sizeInGB,
                  ref: user_id,
                  packageRef: payload.package,
                  discount: packageFound.discount,
                  discount_type: packageFound.discount_type,
                  duration: packageFound.duration,
                  number_of_users: packageFound.number_of_users,
                  description: packageFound.description,
                  status: "SUBSCRIBED",
                  paymentDetail: payload.paymentDetails,
                  createdBy: user_id,
                },
              ],
              { session: clientSession }
            )
            .catch((e) => {
              throw new Error(e.message);
            });

          const stripeResponse: IGenericType =
            await this.stripeService.createCustomer(payload.email);
          if (!stripeResponse.status)
            throw new Error("Unable to create Stripe Customer Id");

          await _.create(
            [
              {
                _id: user_id,
                first_name: payload.first_name,
                last_name: payload.last_name,
                email: payload.email,
                password: payload.password,
                stripeCustomerId: stripeResponse.data.id,
                operations: payload.operations,
                package: userPackage_id,
                phone: payload.phone,
                temporary_password: true,
                company: { subAdmin: true },
                active: false,
              },
            ],
            { session: clientSession }
          ).catch((e) => {
            throw new Error(e.message);
          });

          // send email

          //       const reqBody: IEmailRequest = {
          //         to: payload.email,
          //         subject: "Client user Created!",
          //         html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          //   <h1 style="color: #333;">Welcome onboard ${payload.first_name}!</h1>
          //   <p style="color: #555; margin-top: 10px;">Your email and password are relatively: ${String(payload.password)} and ${String(payload.email)}</p>
          //   <p style="color: #555; margin-top: 10px;">You can login to <a href=${String(process.env.FRONT_END_URL)}>Ellis Docs Portal Now!</a> with above credentials on first time login, You will be asked to change the Password.</p>
          // </div>`
          //       };

          // send email
          const reqBody: IEmailRequest = {
            to: payload.email,
            subject: "Client user Created!",
            html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #333;">Welcome to EllisDocs!</h1>
        <p style="color: #555; margin-top: 10px;">Please login to your account at <b><a href=${String(
              process.env.FRONT_END_URL
            )}>${String(
              process.env.FRONT_END_URL
            )}</a></b> using the following email and password: ${String(
              payload.email
            )} and ${String(
              payload.password
            )} You will be asked to change your password the first time you login.</p>
        </div>`,
          };

          const emailSentResult: IEmailResponse = await axios.post(
            `${process.env.FRONT_END_URL}/api/email/send`,
            reqBody
          );
          if (!emailSentResult.status) console.error(emailSentResult.message);

          // send on phone number
          if (payload?.phone?.phoneNo) {
            const reqBody: TwilioMessageRequest = {
              message: `${String(
                payload.first_name
              )} - Welcome to EllisDocs! Please login to your account at ${String(
                process.env.FRONT_END_URL
              )} using the following email and password: ${String(
                payload.email.toString()
              )} and ${String(
                payload.password.toString()
              )} You will be asked to change your password the first time you login\n`,

              phones: [payload.phone.phoneNo],
            };
            const smsSentResult: TwilioMessageResponse = await axios.post(
              `${process.env.FRONT_END_URL}/api/twilio/send`,
              reqBody
            );

            if (!smsSentResult.success) console.error(smsSentResult.message);
          }

          await clientSession.commitTransaction();

          return user_id.toString();
        } catch (e: any) {
          await clientSession.abortTransaction();
          throw new Error(e.message);
        } finally {
          await clientSession.endSession();
        }
      }
      throw new Error("Invalid Payload");
    } catch (_: any) {
      throw new Error(_.message);
    }
  };

  activateSubAdminAfterSubscription = async (
    user_Id: ObjectId
  ): Promise<string> => {
    const session = await startSession();
    session.startTransaction();
    try {
      const user = await _.findById(user_Id);
      if (!user?._id) throw new Error("Unable to find user");

      const userUpdate = await _.updateOne(
        { _id: user_Id },
        { active: true },
        { session: session }
      );
      if (!userUpdate.matchedCount || !userUpdate.modifiedCount)
        throw new Error("Unable to active user");

      const packageUpdate = await userPackageModel.updateOne(
        { _id: user.package },
        { paid: true, active: true },
        { session: session }
      );
      if (!packageUpdate.matchedCount || !packageUpdate.modifiedCount)
        throw new Error("Unable to active package");

      await session.commitTransaction();

      const token = jwt.sign(
        { id: user_Id.toString() },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "24h",
        }
      );
      if (!token) throw new Error("Unable to generate auth token");
      return token;
    } catch (e: any) {
      await session.abortTransaction();
      throw new Error(e.message);
    } finally {
      await session.endSession();
    }
  };

  login = async (payload: LoginInput): Promise<ILoginResponse> => {
    try {
      const user = await _.findOneAndUpdate(
        { email: { $regex: new RegExp(payload.email, "i") } },
        {
          deviceToken: payload.deviceToken,
        },
        { new: true, upsert: false }
      ).catch((err) => {
        throw new Error(err.message);
      });

      if (!user) {
        throw new Error("User not found");
      }

      const valid = await bcrypt.compare(payload.password, user.password);
      if (!valid) {
        throw new Error("Invalid Credentials");
      }

      if (!user.active) {
        throw new Error("Inactive User");
      }
      if (user.access === "BOTH" || user.access === payload.interface) {
        return {
          token: jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "48h",
            }
          ),
          temporary_password: user.temporary_password,
          userType: user?.company?.employeeType,
        };
      } else {
        throw new Error("Unauthorized user");
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  };

  forgetPassword = async (payload: { email: string }): Promise<String> => {
    let successOTP = { phone: false, email: false }; // if failed counter is 2 then send error, or if any one service run do not send error message
    try {
      const { email } = payload;
      const user = (await _.findOne({ email: email }).catch((_) => {
        throw new Error(_.message);
      })) as unknown as IUser;
      if (!user) throw new Error("No user Found");

      const OTP = getUniqueNumber();

      // send email
      const reqBody: IEmailRequest = {
        to: payload.email,
        subject: "OTP - Verification",
        html: `<div style="background-color: #1a1a1a; color: #fff; font-family: 'Roboto', sans-serif; font-size: 16px; padding: 20px;">
                <h2 style="font-size: 24px; margin-bottom: 20px;">Your OTP code is:</h2>
                <p style="font-size: 32px; font-weight: bold; margin-bottom: 40px;">${OTP}</p>
                <p style="margin-bottom: 0;">Please use this code to complete your verification process.</p>
                <p style="margin-bottom: 0;">Note: This code is valid for one-time use only and will expire in 10 minutes.</p>
                </div>`,
      };

      const result: IEmailResponse = await axios.post(
        `${process.env.FRONT_END_URL}/api/email/send`,
        reqBody
      );

      if (result.status) {
        successOTP.email = true;
      } else {
        console.error(result.message);
      }

      // send on phone number
      if (user?.phone?.phoneNo) {
        const reqBody: TwilioMessageRequest = {
          message: `Your OTP code is: ${OTP},\nPlease use this code to complete your verification process.\nNote: This code is valid for one-time use only and will expire in 10 minutes.`,
          phones: [user.phone.phoneNo],
        };
        const result: TwilioMessageResponse = await axios.post(
          `${process.env.FRONT_END_URL}/api/twilio/send`,
          reqBody
        );

        if (result.success) {
          successOTP.phone = true;
        } else {
          console.error(result.message);
        }
      }

      if (!successOTP.email && !successOTP.phone)
        throw new Error("Unable to send OTP");

      const saveOtp = new otpModel({
        otp: OTP,
        validity: moment().add(10, "minutes").toDate(),
      });

      saveOtp.save();

      return `A verification OTP-code is sent to your ${successOTP.email && successOTP.phone
        ? `Email and Phone`
        : successOTP.email
          ? "Email"
          : "Phone"
        } check / verify it please.`;
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  verifyOtp = async (payload: { otp: number }): Promise<String> => {
    const { otp } = payload;
    const otpFind = await otpModel
      .findOne({ otp, validity: { $gte: moment().toDate() } })
      .catch((e) => {
        throw new Error(e.message);
      });
    if (!otpFind) {
      throw new Error("Invalid OTP");
    }

    const updated = await otpModel.updateOne({ validity: moment().toDate() });
    if (!updated.matchedCount && !updated.modifiedCount) {
      throw new Error("Unable to update OTP");
    }
    return "OTP verified successfully";
  };

  resetPassword = async (payload: ResetPasswordInput): Promise<String> => {
    try {
      if (payload?.oldPassword)
        await this.login({
          email: payload.email,
          password: payload.oldPassword,
        });

      const { email, new_password } = payload;
      const updated = await _.updateOne(
        {
          email: email,
        },
        { password: new_password },
        { new: true }
      ).catch((_) => {
        throw new Error(_.message);
      });

      if (!updated.matchedCount && !updated.modifiedCount) {
        throw new Error("Unable to update password");
      }

      return "Password Updated Successfully";
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  changePassword = async (payload: IChangePasswordBody): Promise<String> => {
    try {
      const { email, new_password, old_password } = payload;
      const user = await _.findOne({ email }).catch((_) => {
        throw new Error(_.message);
      });
      if (user) {
        const valid = await bcrypt.compare(old_password, user.password);
        if (valid) {
          const updated = await _.updateOne(
            {
              email: email,
            },
            { password: new_password },
            { new: true }
          ).catch((_) => {
            throw new Error(_.message);
          });

          if (!updated.matchedCount && !updated.modifiedCount) {
            throw new Error("Unable to update password");
          }

          return "Password Updated Successfully";
        }
        throw new Error("Invalid Credentials");
      }
      throw new Error("No User Found");
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  updateEmail = async (payload: IUpdateEmailBody): Promise<String> => {
    try {
      const { email, new_email, password } = payload;
      const user = await _.findOne({ email }).catch((_) => {
        throw new Error(_.message);
      });
      if (user) {
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
          const updated = await _.updateOne(
            {
              _id: user._id,
            },
            { email: new_email },
            { new: true }
          ).catch((_) => {
            throw new Error(_.message);
          });

          if (!updated.matchedCount && !updated.modifiedCount) {
            throw new Error("Unable to update email");
          }

          return "Email Updated Successfully";
        }
        throw new Error("Invalid Credentials");
      }
      throw new Error("No User Found");
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  updateTemporaryPassword = async ({
    email,
    temporary_password,
  }: {
    email: string;
    temporary_password: boolean;
  }): Promise<{ message: String; token: String }> => {
    const user = await _.findOne({ email }).catch((_) => {
      throw new Error(_.message);
    });
    if (!user) throw new Error("Unable to find user");

    if (!user.active) throw new Error("Inactive User");

    const updated = await _.updateOne(
      { email },
      { $set: { temporary_password } },
      { new: true }
    ).catch((_) => {
      throw new Error(_.message);
    });

    if (!updated.matchedCount)
      throw new Error("Unable to find user with matching email");
    if (!updated.modifiedCount) throw new Error("Unable to update password");

    return {
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
        expiresIn: "24h",
      }),
      message: "Temporary Password Updated Successfully",
    };
  };

  updateSubAdminCompanyDetails = async ({
    email,
    company,
  }: {
    email: string;
    company: ICompany;
  }): Promise<String> => {
    const updated = await _.updateOne(
      { email },
      { $set: { company } },
      { new: true }
    ).catch((_) => {
      throw new Error(_.message);
    });
    if (!updated.matchedCount) throw new Error("Unable to find matching user");
    if (!updated.modifiedCount)
      throw new Error("Unable to update Company Details");

    return "Client Admin Company Details Updated Successfully";
  };
}
