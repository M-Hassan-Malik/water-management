/* eslint-disable */
import _ from "../../models/user_package.model";
import packageModel from "../../models/package.model";
import userPackageModel from "../../models/user_package.model";
import userPackageModulesModel from "../../models/user_package_modules.model";
import userModel from "../../models/user.model";
import { Types, ObjectId, startSession } from "mongoose";
import { UserPackageModifyInput } from "../generated/graphql";

export class UserPackageDBService {
  trackClientAdmins = async (filter: ITableFilters): Promise<IUser[]> => {

    let matchObj: any = {};

    // Trying to filter
    if (filter) {
      // Filter: Package & no Name with no dates
      if (filter?.Package) {
        matchObj = {
          "package.title": { $regex: filter.Package, $options: "i" },
        };
      }
      if (filter?.Name) {
        matchObj = {
          ...matchObj,
          $or: [
            { first_name: { $regex: filter?.Name, $options: "i" } },
            { last_name: { $regex: filter?.Name, $options: "i" } },
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
    matchObj = {
      ...matchObj, 'company.subAdmin': true
    }

    const data = await userModel.aggregate([
      {
        $lookup: {
          from: 'userpackages', // Replace with the actual collection name
          localField: 'package',
          foreignField: '_id',
          as: 'package'
        }
      },
      {
        $unwind: { path: '$package', preserveNullAndEmptyArrays: true }
      },
      {
        $match: matchObj
      },
      {
        $sort: { 'package.createdAt': -1 }
      },
      {
        $group: {
          _id: '$_id',
          // Keep all other fields
          doc: { $first: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$doc' }
      }
    ]) as unknown as IUser[];
    if (!data.length) []
    return data
  }

  trackParticularClientRecord = async (id: ObjectId): Promise<IPackage[]> => {

    const requestingUser = await userModel.findById(id)
    let searchById = id.toString();
    if (requestingUser?.company.employee && requestingUser?.belongsTo) {
      searchById = requestingUser.belongsTo;
    }

    const data = await userPackageModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'ref',
          foreignField: '_id',
          as: 'ref'
        }
      },
      {
        $unwind: {
          path: '$ref', preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: { 'ref._id': new Types.ObjectId(searchById) }
      }
    ]) as unknown as IPackage[];

    if (!data.length) [];
    return data
  }

  getUserPackageModuleById = async (id: ObjectId): Promise<IPackage> => {
    const data = await userPackageModel.findById(id).populate('ref') as unknown as IPackage;
    if (!data) throw new Error("Unable to fetch Subscription Detail")
    return data
  }

  modify = async (payload: UserPackageModifyInput): Promise<String> => {

    var modifySubscriptionSession = await startSession();
    modifySubscriptionSession.startTransaction();

    try {

      const user = await userModel.findById(payload.user_id)
        .catch((er: any) => {
          throw new Error(er.message);
        }) as any;
      if (!user) throw new Error("unable to find user");

      const packageBelongsTo = user?.company?.subAdmin ? payload.user_id : user.belongsTo;
      if (!packageBelongsTo) throw new Error("Unable to find Package Reference")

      const packageFound = await packageModel.findById(payload._id).catch(e => {
        throw new Error(e.message);
      }) as unknown as IPackage;
      if (!packageFound)
        throw new Error('Package Not Found');
      else if (!packageFound.active)
        throw new Error('The package is inactive');
      const userPackageModules: IUserPackageModule[] = packageFound.modules.map((_: any) => {
        return {
          name: _.name,
          views: _.views,
          indicator: _?.indicator,
          available: _?.available,

        } as IUserPackageModule;
      });

      const userPackageModuleIds = await userPackageModulesModel.insertMany(userPackageModules, { session: modifySubscriptionSession });
      const userPackage_id = new Types.ObjectId();
      await _.create(
        [{
          _id: userPackage_id,
          packageRef: packageFound._id,
          createdBy: payload.user_id,
          ref: packageBelongsTo,
          title: packageFound.title,
          status: payload.status,
          modules: userPackageModuleIds.map(_ => _._id),
          active: false,
          paid: true,
          cost: packageFound.cost,
          sizeInGB: packageFound.sizeInGB,
          discount: packageFound.discount,
          discount_type: packageFound.discount_type,
          duration: packageFound.duration,
          number_of_users: packageFound.number_of_users,
          paymentDetail: payload.paymentDetails,
        }],
        { session: modifySubscriptionSession }
      ).catch((e: any) => {
        throw new Error(e.message);
      });

      await userModel.updateMany({
        $or: [
          { _id: payload.user_id }, // to match client
          { belongsTo: payload.user_id } // to match all relative client's employees
        ]
      }, { package: userPackage_id }, { upsert: false, session: modifySubscriptionSession }).catch((e: any) => {
        throw new Error(e.message);
      });

      await modifySubscriptionSession.commitTransaction();

      return "User Created Successfully"
    } catch (e: any) {
      await modifySubscriptionSession.abortTransaction()
      throw new Error(e.message) as unknown as Promise<string>;

    } finally {
      await modifySubscriptionSession.endSession();
    }
  };
}
