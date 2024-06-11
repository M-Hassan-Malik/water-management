/* eslint-disable */
import mongoose, { ObjectId, Types } from "mongoose";
import _ from "../../models/role.model";
import userModel from "../../models/user.model";
import { RoleInput } from "../generated/graphql";
import moment from "moment";

export class RoleDBService {
  create = async (input: RoleInput): Promise<IRole> => {
    
    // Run this condition when user is admin or admin user
    let match: any = { user_id: input.user_id, name: input.name };

    // Run this condition when user is client or client user
    if (input.facility) 
      match = { facility: input.facility, name: input.name };
    
    const exists = await _.exists(match)
    .catch(_ => {
      throw new Error(_.message)
    });
    
    if (exists) throw new Error("Input Role already exists.")

    const createdAt = moment(moment().add(5, "hours").format('YYYY-MM-DDTHH:mm:ss.SSSZ')).toDate();
    return await _.create({ ...input, createdAt }).catch(_ => { throw new Error(_.message) }

    ) as unknown as Promise<IRole>
  };

  update = async (role: IUpdateRoleInput): Promise<String> => {

    const exists = await _.exists({ _id: role._id })
      .catch(e => { throw new Error(e.message) })
    if (!exists) throw new Error("User does not exists!")

    const id = role._id;
    delete role._id
    if (!role.name) delete role.name;

    const updated = await _.updateOne({ _id: id }, role, { upsert: false })
    if (!updated.matchedCount) throw new Error("Role not found at time of modification.")
    if (!updated.modifiedCount) throw new Error("Unable to modify Role")

    return 'Role successfully updated'

  };

  find = async (): Promise<[IRole]> => {
    return await _.find().sort({ "createdAt": -1 }) as unknown as Promise<[IRole]>
  };

  findById = async (_id: ObjectId, filter: ObjectId): Promise<IRole> => {

    const obj: any = { _id };
    if (filter) obj['facility'] = filter;

    const role = await _.findOne(obj) as unknown as Promise<IRole>
    if (!role) throw new Error("Role not Found!")
    return role
  };

  findRolesByUserId = async (userId: ObjectId, facilityId: ObjectId | undefined): Promise<IRole[]> => {

    let searchById: any = ""
    const user = await userModel.findById(userId)
    if (!user) throw new Error("unable to find user")

    if (user?.admin || user?.company?.subAdmin) searchById = user._id // super/client admins
    else searchById = user?.belongsTo // (super/client) admin's users

    const query: any = { user_id: searchById, active: true };
    if (facilityId) query['facility'] = facilityId;
    const role = await _.find(query).sort({ "createdAt": -1 }) as unknown as Promise<IRole[]>

    return role
  };

  manageRolesListing = async (userId: ObjectId, filter: ITableFilters): Promise<IManageRolesListingResponse[]> => {

    const user = await userModel.findById(userId)
    if (!user) throw new Error("unable to find user")

    let matchObj: any = {};

    if (user?.admin || user?.company?.subAdmin) matchObj['user_id'] = user._id // super/client admins
    else matchObj['user_id'] = user?.belongsTo // (super/client) admin's users

    // Trying to filter
    if (filter) {
      // Filter: Only User Name Exists
      if (filter?.Role) {
        matchObj['name'] = { $regex: filter.Role, $options: "i" }
      }
      if (filter?.start && !filter?.end) {
        matchObj['createdAt'] = { $gte: new Date(filter.start) }
      }
      if (!filter?.start && filter?.end) {
        matchObj['createdAt'] = { $lte: new Date(filter.end) }
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
    };

    const roles = await _.aggregate([
      {
        $match: matchObj
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "role",
          as: "users"
        }
      },
      {
        $project: {
          _id: "$_id",
          name: 1,
          activeUsers: {
            $size: {
              $filter: {
                input: "$users",
                as: "user",
                cond: { $eq: ["$$user.active", true] }
              }
            }
          },
          status: "$active",
          createdOn: '$createdAt',
          action: {
            $literal: {
              edit: true,
              delete: true,
              view: true
            }
          }
        }
      }
    ]) as unknown as IManageRolesListingResponse[]

    if (!roles.length) []
    return roles;
  };

  delete = async (id: string): Promise<string> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const role = await _.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "role",
            as: "users"
          }
        },
        {
          $unwind: "$users"
        },
        {
          $addFields: {
            matchingOperations: {
              $filter: {
                input: "$operations",
                cond: {
                  $in: ["$$this.name", "$users.operations.name"]
                }
              }
            },
            matchingModules: {
              $filter: {
                input: "$modules",
                cond: {
                  $in: ["$$this.name", "$users.modules.name"]
                }
              }
            }
          }
        },
        {
          $project: {
            _id: "$users._id",
            matchingOperations: 1,
            matchingModules: 1
          }
        },
        {
          $match: {
            $or: [
              { matchingOperations: { $exists: true, $not: { $size: 0 } } },
              { matchingModules: { $exists: true, $not: { $size: 0 } } }
            ]
          }
        }
      ]);

      const deleted = await _.deleteOne({ _id: id }, { session: session })
      if (deleted.deletedCount === 0) throw new Error("Unable to delete this role")

      if (role.length) {
        const userIds = role.map(user => user._id);
        const matchingOperations = role.flatMap(r => r.matchingOperations);
        const matchingModules = role.flatMap(r => r.matchingModules);

        await userModel.updateMany(
          { _id: { $in: userIds } },
          {
            $pull: {
              operations: { name: { $in: matchingOperations.map(op => op.name) } },
              modules: { name: { $in: matchingModules.map(op => op.name) } }
            },
            $set: {
              role: null
            }
          },
          { upsert: true, session: session }
        );

      }
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return "Removed matching operations and modules from users with the specified role.";
    } catch (error) {
      // Rollback the transaction in case of any errors
      await session.abortTransaction();
      throw error;
    } finally { session.endSession(); }
  };

}