/* eslint-disable */
import axios from "axios";
import _ from "../../models/user.model";
import userPackageModel from "../../models/user_package.model";
import type { EmployeeInput, UpdateEmployeeInput } from "../generated/graphql";
import { EmployeeType } from "../generated/graphql";
import { ObjectId, Types } from "mongoose";


export class EmployeeDBService {
  findAllEmployees = async (id: ObjectId, filter: ITableFilters): Promise<[IUser]> => {


    let matchObj: any = {},nameMatch: any = {};
    // Trying to filter
    if (filter) {
      // Filter: Name 
      if (filter?.User) {
        nameMatch = {
          $or: [
            { first_name: { $regex: filter?.User, $options: "i" } },
            { last_name: { $regex: filter?.User, $options: "i" } },
          ],
        };
        
      }
      if (filter?.start && !filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $gte: new Date(filter.start) },
        };
      }
      if (!filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $lte: new Date(filter.end) },
        };
      }
      if (filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          $and: [
            { createdAt: { $gte: new Date(filter.start) } },
            { createdAt: { $lte: new Date(filter.end) } }
          ]
        };
      }
    }

    const requestingUser = await _.findById(id)
      
    if (requestingUser?.company.subAdmin)
      matchObj = {
        ...matchObj,
        $or: [
          {
            $and: [
              { 'company.employee': true }, // to get myself user for Employees
              { 'company.employeeType': { $in: ["SUBADMIN", "MANAGER", "LIFEGUARD"] } },
              // { created_by: new Types.ObjectId(String(id)), }
              {belongsTo: new Types.ObjectId(String(id)), }
            ]
          },
          {
            $and: [
              { 'company.subAdmin': true }, // to get myself user for ClientAdmin
              { _id: new Types.ObjectId(String(id)), }
            ]
          }
        ]

      }
    else if(!requestingUser?.company.subAdmin){
      matchObj = {
        ...matchObj,
        $or: [
          {
            $and: [
              { 'company.employee': true }, // to get myself user for Employees
              { 'company.employeeType': { $in: ["SUBADMIN", "MANAGER", "LIFEGUARD"] } },
             { created_by: new Types.ObjectId(String(requestingUser?._id)),}
            ]
          },
          {
            $and: [
              { 'company.subAdmin': false }, // to get myself user for ClientAdmin
              { _id: new Types.ObjectId(String(id)), }
            ]
          }
        ]

      }
    }
    const employees = await _.aggregate([
      {
        $match: matchObj
      },
      {
        $match: nameMatch
      },
      {
        $sort: {
          first_name: 1 // 1 for ascending
        }
      }
    ]) as unknown as [IUser];
    if (!employees.length) []

    return employees
  };

  createEmployee = async (
    payload: EmployeeInput,
    company: ICompany,
  ): Promise<string> => {
    try {
      const clientUser = await _.findById(payload?.createdBy)
        .catch((_) => {
          throw new Error(_.message);
        })

      if (!clientUser) throw new Error('You relative data is not found the records!');
      if (!clientUser?.company?._id) throw new Error('You are not Authorized to perform this action');


      const belongsTo: string = clientUser?.company.subAdmin ? clientUser._id as string : clientUser.belongsTo as string;
      const belongsToUser = await _.findById(belongsTo).catch((_) => {
        throw new Error(_.message);
      })
      if (!belongsToUser) throw new Error(`Unable to find Admin Reference`);
     
      const [userPackage, userCounts] = await Promise.all([
        userPackageModel.findById(payload?.package),
        _.count({ belongsTo }),
      ]);

      if (Number(userPackage?.number_of_users) <= userCounts) throw new Error('Maximum User limit reached');

      const userAlreadyExists = await _.findOne({ email: payload.email }).catch((_) => {
        throw new Error(_.message);
      })
      if (userAlreadyExists) throw new Error('Email already exists');

      const employeeCompany = {
        subAdmin: false,
        employee: true,
        employeeType: payload.employeeType,
        location: payload.location,
        park: company?.park
      }      

       await _.create(
        //  ...(payload.employeeType === EmployeeType.Subadmin && payload.package ? { package: payload.package } : null), 
        payload.employeeType === EmployeeType.Subadmin && payload.package ?{
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password,
          employee_role: payload.employeeType,
          stripeCustomerId: belongsToUser.stripeCustomerId,
          department: payload.department,
          temporary_password: true,
          company: company ?employeeCompany : {} ,
          active: payload.active,
          operations: payload.operations,
          modules: payload.modules,
          role: payload.role,
          phone: payload.phone,
          package: payload.package ,
          photo_url: payload.photo_url,
          employee: true,
          created_by: payload.createdBy,
          belongsTo: belongsTo,
          access:payload.access,
          liveLocation: {
            lat: 34.0928092,
            lng: -118.3286614
          }
        }:
        {
          first_name: payload.first_name,
          last_name: payload.last_name,
          email: payload.email,
          password: payload.password,
          employee_role: payload.employeeType,
          stripeCustomerId: belongsToUser.stripeCustomerId,
          department: payload.department,
          temporary_password: true,
          company: company ?employeeCompany : {} ,
          active: payload.active,
          operations: payload.operations,
          modules: payload.modules,
          role: payload.role,
          phone: payload.phone,
          photo_url: payload.photo_url,
          employee: true,
          package: payload.employeeType === EmployeeType.Subadmin ? payload.package : null,
          created_by: payload.createdBy,
          belongsTo: belongsTo,
          access:payload.access,
          liveLocation: {
            lat: 34.0928092,
            lng: -118.3286614
          }
        },
      )
        .catch((_) => {
          throw new Error(_.message);
        }) as unknown as string;

      // send email
      // const reqBody: IEmailRequest = {
      //   to: payload.email,
      //   subject: "Client's user Created!",
      //   html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      //         <h1 style="color: #333;">Welcome onboard ${payload.first_name}!</h1>
      //         <p style="color: #555; margin-top: 10px;">Your email and password are relatively: ${String(payload.password)} and ${String(payload.email)}</p>
      //         <p style="color: #555; margin-top: 10px;">You can login to ${String(process.env.FRONT_END_URL)} with this password on first time login, You will be asked to change the Password.</p>
      //         </div>`
      // };

      // send email
      // ${payload.first_name}
      const reqBody: IEmailRequest = {
        to: payload.email,
        subject: "Client's user Created!",
        html: `<div style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif; text-align: center; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

              <h1 style="color: #333;">Welcome to EllisDocs!</h1>
              <p style="color: #555; margin-top: 10px;">Please login to your account at <b><a href=${String(process.env.FRONT_END_URL)}>${String(process.env.FRONT_END_URL)}</a></b> using the following email and password: ${String(payload.email)} and ${String(payload.password)} You will be asked to change your password the first time you login.</p>

              </div>`
      };
      const emailSentResult: IEmailResponse = await axios.post(
        `${process.env.FRONT_END_URL}/api/email/send`,
        reqBody
      )
      if (!emailSentResult.status)
        console.error(emailSentResult.message)

      // send on phone number
      if (payload?.phone?.phoneNo) {
        const reqBody: TwilioMessageRequest = {

          message: `${String(payload.first_name)} - Welcome to EllisDocs! Please login to your account at ${String(process.env.FRONT_END_URL)} using the following email and password: ${String(payload.email.toString())} and ${String(payload.password.toString())} You will be asked to change your password the first time you login`,

          phones: [payload.phone.phoneNo],
        };
        const smsSentResult: TwilioMessageResponse = await axios.post(
          `${process.env.FRONT_END_URL}/api/twilio/send`, reqBody)

        if (!smsSentResult.success)
          console.error(smsSentResult.message);
      }

      return "Employee Created Successfully";
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  findById = async (id: string): Promise<IUser> => {
    const user = await _.findOne({
      _id: id,
    })
      .populate('role').populate('company.location').catch((_) => {
        throw new Error(_.message);
      }) as unknown as Promise<IUser>;

    return user;
  };

  update = async ({ _id, ...payload }: UpdateEmployeeInput): Promise<IUser> => {

    const { employeeType, location, ...rest } = payload;

    return await _.findOneAndUpdate(
      { _id },
      { $set: { ...rest, 'company.employeeType': employeeType, 'company.location': location } }
    ).catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IUser>;
  };

  delete = async (id: ObjectId): Promise<string> => {

    const deleted = await _.deleteOne({
      _id: id,
    }).catch((_) => {
      throw new Error(_.message);
    })
    if (!deleted.deletedCount) throw new Error('Unable to Delete Employee')
    return 'Successfully Deleted';
  };

}