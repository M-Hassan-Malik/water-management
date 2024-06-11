/* eslint-disable */
import mongoose, { ObjectId, Types, startSession } from "mongoose";
import _ from "../../models/user.model";
import parkModel from "@/models/park.model";
// import taskAssignedModel from "@/models/task_assigned.model"
// import reportSubmissionModel from "@/models/report_submission.model"
// import trainingSessionModel from "@/models/training_session.model"
// import { AssignerComponentInput, EAssignerComponentId, UpdateProfileInput ,ReportSubmission,TrainingSession} from "../generated/graphql";
import {
  EmployeeType,
  UpdateProfileInput,
  UpdateSubAdminInput,
} from "../generated/graphql";
import park_locationModel from "@/models/park_location.model";
import user_packageModel from "@/models/user_package.model";
export class UserDBService {
  find = async (): Promise<[IUser]> => {
    return (await _.find()) as unknown as Promise<[IUser]>;
  };

  findById = async (id: string): Promise<IUser> => {
    let user: IUser[] = await _.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $unwind:
          /**
           * path: Path to the array field.
           * includeArrayIndex: Optional name for index.
           * preserveNullAndEmptyArrays: Optional
           *   toggle to unwind null and empty values.
           */
          {
            path: "$company.location",
            // includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $lookup:
          /**
           * from: The target collection.
           * localField: The local join field.
           * foreignField: The target join field.
           * as: The name for the results.
           * pipeline: Optional pipeline to run on the foreign collection.
           * let: Optional variables to use in the pipeline field stages.
           */
          {
            from: "parklocations",
            localField: "company.location",
            foreignField: "_id",
            as: "parkLocationsData",
          },
      },
      {
        $unwind:
          /**
           * path: Path to the array field.
           * includeArrayIndex: Optional name for index.
           * preserveNullAndEmptyArrays: Optional
           *   toggle to unwind null and empty values.
           */
          {
            path: "$parkLocationsData",
            // includeArrayIndex: 'string',
            preserveNullAndEmptyArrays: true,
          },
      },
      {
        $group:
          /**
           * _id: The id of the group.
           * fieldN: The first field name.
           */
          {
            _id: "$_id",
            parkLocationsData: {
              $push: "$parkLocationsData",
            },
            first_name: {
              $first: "$first_name",
            },
            last_name: {
              $first: "$last_name",
            },
            email: {
              $first: "$email",
            },
            rec_email: {
              $first: "$rec_email",
            },
            photo_url: {
              $first: "$photo_url",
            },
            phone: {
              $first: "$phone",
            },
            scopes: {
              $first: "$scopes",
            },
            operations: {
              $first: "$operations",
            },
            modules: {
              $first: "$modules",
            },
            company: {
              $first: "$company",
            },
            package: {
              $first: "$package",
            },
            liveLocation: {
              $first: "$liveLocation",
            },
            role: {
              $first: "$role",
            },
            department: {
              $first: "$department",
            },
            password: {
              $first: "$password",
            },
            deviceToken: {
              $first: "$deviceToken",
            },
            created_by: {
              $first: "$created_by",
            },
            belongsTo: {
              $first: "$belongsTo",
            },
            admin: {
              $first: "$admin",
            },
            active: {
              $first: "$active",
            },
            temporary_password: {
              $first: "$temporary_password",
            },
            themeId: {
              $first: "$themeId",
            },
            stripeCustomerId: {
              $first: "$stripeCustomerId",
            },
            access: {
              $first: "$access",
            },
          },
      },
      {
        $lookup: {
          from: "roles",
          localField: "role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $lookup: {
          from: "parks",
          localField: "company.park",
          foreignField: "_id",
          as: "company.park",
        },
      },
      {
        $lookup: {
          from: "parklocations",
          localField: "company.location",
          foreignField: "_id",
          as: "company.location",
        },
      },
      {
        $lookup: {
          from: "userpackages",
          localField: "package",
          foreignField: "_id",
          as: "userpackages",
        },
      },
      {
        $unwind: {
          path: "$userpackages",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$company.park",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$company.location",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "userpackagemodules",
          localField: "userpackages.modules",
          foreignField: "_id",
          as: "userpackages.modules",
        },
      },
      {
        $lookup: {
          from: "parklocations",
          localField: "company.park.locations",
          foreignField: "_id",
          as: "company.park.locations",
        },
      },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          email: 1,
          rec_email: 1,
          phone: 1,
          photo_url: 1,
          scopes: 1,
          password: 1,
          admin: 1,
          role: 1,
          active: 1,
          themeId: 1,
          stripeCustomerId: 1,
          temporary_password: 1,
          operations: 1,
          modules: 1,
          createdAt: 1,
          updatedAt: 1,
          created_by: 1,
          belongsTo: 1,
          access: 1,
          __v: 1,
          company: {
            subAdmin: 1,
            _id: "$company._id",
            park: "$company.park",
            location: "$parkLocationsData",
            employee: "$company.employee",
            employeeType: "$company.employeeType",
          },
          "package._id": "$package",
          "package.paid": "$userpackages.paid",
          "package.title": "$userpackages.title",
          "package.cost": "$userpackages.cost",
          "package.sizeInGB": "$userpackages.sizeInGB",
          "package.duration": "$userpackages.duration",
          "package.description": "$userpackages.description",
          "package.number_of_users": "$userpackages.number_of_users",
          "package.discount_type": "$userpackages.discount_type",
          "package.discount": "$userpackages.discount",
          "package.active": "$userpackages.active",
          "package.status": "$userpackages.status",
          "package.paymentDetail": "$userpackages.paymentDetail",
          "package.ref": "$userpackages.ref",
          "package.createdAt": "$userpackages.createdAt",
          "package.modules": {
            $map: {
              input: "$userpackages.modules",
              as: "module",
              in: {
                name: "$$module.name",
                views: "$$module.views",
              },
            },
          },
        },
      },
    ]).catch((e) => {
      throw new Error(e.message);
    });

    if (!user[0]) throw new Error("Unable to find user");

    // // If client's user then replace it's modules with package's modules
    // if (user[0]?.company.employee && user[0]?.package?.modules.length)
    //   user[0].package.modules = user[0]?.modules as any

    // Use role's modules and operations for only Super-Admin's users
    if (
      !user[0]?.company?.employee &&
      !user[0].company?.subAdmin &&
      user[0]?.role
    ) {
      user[0]["modules"] = user[0].role?.modules;
      user[0]["operations"] = user[0].role?.operations;
    }

    return user[0];
  };

  findMyUsersAndMyself = async (
    id: ObjectId,
    facilityId: ObjectId | undefined
  ): Promise<IUser[]> => {
    const loggedUser = (await _.findById(id).catch((_: any) => {
      throw new Error(_.message);
    })) as unknown as IUser;
    if (!loggedUser) throw new Error("Something went wrong");
    const unwantedIds: string[] = [];

    let users: IUser[] = [];

    //To get All Super Admin's users
    if (loggedUser.admin || !loggedUser?.company?._id) {
      // unwantedIds.push(String(loggedUser._id))

      users = await _.find({
        $or: [
          { _id: { $nin: unwantedIds } },
          { admin: false },
          { "company.subAdmin": true },
        ],
      });
      return users as unknown as IUser[];
    }
    //To get All Client-Admin's users/employees
    else if (!loggedUser.admin || !loggedUser?.company) {
      // unwantedIds.push(String(loggedUser._id))

      const filterObject = facilityId
        ? {
            _id: { $nin: unwantedIds },
            admin: false,
            "company.subAdmin": false,
            "company.employeeType": {
              $nin: [EmployeeType.Pectora, EmployeeType.Imported],
            },
            "company.location": facilityId,
            "company.park": loggedUser.company.park,
          }
        : {
            _id: { $nin: unwantedIds },
            admin: false,
            "company.subAdmin": false,
            "company.employeeType": {
              $nin: [EmployeeType.Pectora, EmployeeType.Imported],
            },
            "company.park": loggedUser.company.park,
          };

      users = await _.find(filterObject).populate("company.location");

      return users as unknown as IUser[];
    }

    if (!users.length) throw new Error("Users Not Found");
    return users;
  };

  manageUserListing = async (
    id: ObjectId,
    filter?: ITableFilters
  ): Promise<[IFindRelatingUsersResponse]> => {
    const loggedUser = (await _.findById(id)) as unknown as IUser;

    //For Super Admin
    if (loggedUser.admin || !loggedUser?.company) {
      let matchObj: any = {};

      // Trying to filter
      if (filter) {
        // Filter: Only User Name Exists
        if (filter?.User) {
          matchObj = {
            ...matchObj,
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
              { createdAt: { $lte: new Date(filter.end) } },
            ],
          };
        }
      }

      matchObj = {
        ...matchObj,
        _id: { $ne: loggedUser._id },
        admin: false,
        "company.subAdmin": { $exists: false },
        package: { $exists: false },
      };
      const users = await _.aggregate([
        {
          $match: matchObj,
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: {
            path: "$role",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            name: { $concat: ["$first_name", " ", "$last_name"] },
            role: "$role.name",
            status: "$active",
            email: "$email",
            createdOn: "$createdAt",
            action: {
              $literal: {
                edit: true,
                delete: true,
                view: true,
              },
            },
          },
        },
      ]);
      return users as unknown as Promise<[IFindRelatingUsersResponse]>;
    }
    //For Client Admin
    else if (loggedUser?.company) {
      // if company exists, means get all users of clientAdmin Users

      let matchObj: any = {
        _id: { $ne: loggedUser._id },
        package: { $exists: true },
        "company.subAdmin": false,
        // from relative company if company.subadmin is false
        //else for subadmin, bring from all parks of subadmin
      };

      // Trying to filter
      if (filter) {
        // Filter: Only User Name Exists
        if (filter?.User) {
          matchObj = {
            ...matchObj,
            $or: [
              { first_name: { $regex: filter?.User, $options: "i" } },
              { last_name: { $regex: filter?.User, $options: "i" } },
            ],
          };
        }
        // Filter: Dates
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
              { createdAt: { $lte: new Date(filter.end) } },
            ],
          };
        }
      }

      matchObj = {
        ...matchObj,
        _id: { $ne: loggedUser._id },
        package: { $exists: true },
        "company.subAdmin": false,
        // from relative company if company.subadmin is false
        //else for subadmin, bring from all parks of subadmin
      };

      const users = await _.aggregate([
        {
          $match: matchObj,
        },
        {
          $lookup: {
            from: "roles",
            localField: "role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: {
            path: "$role",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            name: { $concat: ["$first_name", " ", "$last_name"] },
            role: "$role.name",
            status: "$active",
            createdOn: "$createdAt",
            action: {
              $literal: {
                edit: true,
                delete: true,
                view: true,
              },
            },
          },
        },
      ]);
      return users as unknown as Promise<[IFindRelatingUsersResponse]>;
    }
    throw new Error("Users not found");
  };

  onboardSubAdmin = async ({
    _id,
    userData,
    parkData,
    parkLocationData,
  }: ISubAdminOnBoardingInput) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const locationId = new Types.ObjectId(),
        parkId = new Types.ObjectId();

      await park_locationModel
        .create([{ ...parkLocationData, _id: locationId, active: true }], {
          session: session,
        })
        .catch(() => {
          throw new Error("Unable to create Park's Locations");
        });

      await parkModel
        .create(
          [
            {
              locations: [locationId],
              _id: parkId,
              name: parkData.name,
              logo: parkData.park_logo,
            },
          ],
          { session: session }
        )
        .catch(() => {
          throw new Error("Unable to create Park");
        });

      const updated = await _.updateOne(
        { _id },
        {
          $set: {
            first_name: userData.first_name,
            photo_url: userData.profile_img,
            last_name: userData.last_name,
            "company.park": parkId,
            "company.location": locationId,
          },
        },
        { session: session }
      );
      if (!updated.matchedCount || !updated.modifiedCount)
        throw new Error("Unable to update user fields");

      await session.commitTransaction();
      return "Client admin updated successfully";
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
      throw new Error("Something went wrong");
    } finally {
      session.endSession();
    }
  };

  getSubAdminList = async (
    _id: ObjectId,
    filter: ITableFilters
  ): Promise<ISubAdminList[]> => {
    let matchObj: any = {};

    // Trying to filter
    if (filter) {
      // Filter: Package & no Name with no dates
      if (filter?.Package) {
        matchObj = {
          ...matchObj,
          "package.title": { $regex: filter.Package, $options: "i" },
        };
      }
      // Filter: Package & no Name with Start Date
      if (filter?.Name) {
        matchObj = {
          ...matchObj,
          $or: [
            { first_name: { $regex: filter?.Name, $options: "i" } },
            { last_name: { $regex: filter?.Name, $options: "i" } },
          ],
        };
      }
      // Filter: Package & no Name with Start Date & End Date
      if (filter?.start && !filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $gte: new Date(filter.start) },
        };
      }
      // Filter: Package & no Name with Start Date & End Date
      if (!filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $lte: new Date(filter.end) },
        };
      }
      // Filter: Package & no Name with Start Date & End Date
      if (filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          $and: [
            { createdAt: { $gte: new Date(filter.start) } },
            { createdAt: { $lte: new Date(filter.end) } },
          ],
        };
      }
      // Filter by: Paid or UnPaid
      if (filter?.paid) {
        if (filter.paid.toLowerCase() === "paid") {
          matchObj = {
            ...matchObj,
            "package.paid": true,
          };
        } else {
          matchObj = {
            ...matchObj,
            "package.paid": false,
          };
        }
      }
    }

    matchObj = {
      ...matchObj,
      "company.subAdmin": true,
    };

    const users = (await _.aggregate([
      // Lookup to populate the "package" field
      {
        $lookup: {
          from: "userpackages",
          localField: "package",
          foreignField: "_id",
          as: "package",
        },
      },
      {
        $unwind: { path: "$package", preserveNullAndEmptyArrays: true },
      },
      // Match documents with "company.subAdmin" field present
      {
        $match: matchObj,
      },
      // Project the "title" field from the "package" collection
      {
        $project: {
          _id: 1,
          account: "$active",
          name: { $concat: ["$first_name", " ", "$last_name"] },
          package: "$package.title",
          payment: "$package.paid",
          action: {
            $literal: {
              edit: true,
              delete: true,
              view: true,
            },
          },
        },
      },
    ])) as unknown as ISubAdminList[];

    if (!users.length) [];
    return users;
  };

  updateAdminUser = async (user: IUpdateAdminUserInput): Promise<String> => {
    const exists = await _.exists({ _id: user._id }).catch((e) => {
      throw new Error(e.message);
    });
    if (!exists) throw new Error("User does not exists!");
    const id = user._id;
    delete user._id;

    // if fields are empty do not update in DB
    if (!user.password) delete user.password;
    if (!user.first_name) delete user.first_name;
    if (!user.last_name) delete user.last_name;
    if (!user.email) delete user.email;
    if (!user.role) user.role = null;

    const updated = await _.updateOne({ _id: id }, user, { upsert: false });
    if (!updated.matchedCount)
      throw new Error("User not found at time of modification.");
    if (!updated.modifiedCount) throw new Error("Unable to modify User");

    return "User successfully updated";
  };

  updateSubAdmin = async (payload: UpdateSubAdminInput): Promise<string> => {
    var suAdminSession = await startSession();
    suAdminSession.startTransaction();
    try {
      const userId = payload._id;
      const userExists = (await _.findOne({ _id: userId })) as IUser;

      if (!userExists) throw new Error("Unable to find the user in Records");
      const packageData = await user_packageModel.updateOne(
        { _id: userExists.package },
        { paid: payload.type },
        { upsert: false, session: suAdminSession }
      );

      if (!packageData.matchedCount || !packageData.modifiedCount)
        throw new Error("Unable to modify package type");
      if (!payload.password) delete payload.password;
      const user = await _.updateOne(
        { _id: userId },
        { ...payload, active: payload.type },
        { session: suAdminSession }
      ).catch((e) => {
        throw new Error(e.message);
      });
      if (!user.matchedCount || !user.modifiedCount)
        throw new Error("Unable to modify User");

      await suAdminSession.commitTransaction();

      return "User Created Successfully";
    } catch (e: any) {
      await suAdminSession.abortTransaction();
      throw new Error(e.message) as unknown as Promise<string>;
    } finally {
      await suAdminSession.endSession();
    }
  };

  updateProfile = async (
    _id: string,
    body: UpdateProfileInput
  ): Promise<String> => {
    const user = await _.findById(_id).catch((e) => {
      throw new Error(e.message);
    });

    if (!user) throw new Error("User does not exists!");

    if (!user.admin && body?.park) {
      const updated = await parkModel
        .updateOne(
          { _id: user.company.park },
          { $set: { name: body.park } },
          { upsert: false }
        )
        .catch((e) => {
          throw new Error(e.message);
        });
      if (!updated.matchedCount)
        throw new Error("Park not found at time of modification.");
      if (!updated.modifiedCount) throw new Error("Unable to modify Park Name");
    }

    const updated = await _.updateOne(
      { _id },
      { $set: { ...body } },
      { upsert: false }
    );
    if (!updated.matchedCount)
      throw new Error("User not found at time of modification.");
    if (!updated.modifiedCount) throw new Error("Unable to modify User");

    return "User successfully updated";
  };

  delete = async (id: string): Promise<string> => {
    try {
      const user = await _.findById(id);
      let deletedUser;
      if (user?.company?.subAdmin === true) {
        deletedUser = await _.softDeleteById(id);
        if (!deletedUser) {
          throw new Error("Unable to delete user");
        }
      } else {
        deletedUser = await _.deleteOne({ _id: id });
        if (!deletedUser.deletedCount) throw new Error("Unable to delete user");
      }
      return "User Successfully deleted";
    } catch (error) {
      const err = error as Error;
      throw new Error(err.message);
    }
  };

  updateUserFields = async (
    payload: IUpdateUserFieldsInput
  ): Promise<String> => {
    const exists = await _.exists({ _id: payload._id }).catch((e) => {
      throw new Error(e.message);
    });
    if (!exists) throw new Error("User does not exists!");

    // if fields are empty do not update in DB
    if (!payload.deviceToken) delete payload.deviceToken;
    if (!payload.first_name) delete payload.first_name;

    let userId = "";
    if (payload?._id) {
      userId = payload._id;
      delete payload._id;

      const updated = await _.updateOne({ _id: userId }, payload, {
        upsert: false,
      });
      if (!updated.matchedCount)
        throw new Error("User not found at time of modification.");
      if (!updated.modifiedCount) throw new Error("Unable to modify User");
    }

    return "User successfully updated";
  };
}
