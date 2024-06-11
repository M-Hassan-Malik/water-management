/* eslint-disable */

import { ObjectId, Types, startSession, } from "mongoose";
import _ from "../../models/department.model";
import userModel from "@/models/user.model";
import moment from "moment";

export class DepartmentDBService {

  create = async (payload: IDepartmentInput): Promise<string> => {
    await _.create({...payload, createdAt: moment(moment().add(5, "hours").format('YYYY-MM-DDTHH:mm:ss.SSSZ')).toDate()}).catch((_) => { throw new Error(_.message) })
    return "Department Added Successfully"
  };

  update = async (payload: IDepartmentUpdateInput): Promise<string> => {
    const id = payload._id
    delete payload._id

    const updated = await _.updateOne({ _id: id }, payload, { upsert: false }).catch((_) => {
      throw new Error(_.message);
    })
    if (!updated.matchedCount) throw new Error('Unable to find matching Department.')
    if (!updated.modifiedCount) throw new Error('Unable to modify Department.')

    return "Department Updated Successfully"
  };

  find = async (): Promise<IDepartment[]> => {
    const data = await _.find().sort({ "createdAt": -1 }).catch((_) => {
      throw new Error(_.message);
    }) as unknown as IDepartment[]
    if (!data.length) throw new Error('Departments not found')
    return data
  };

  findById = async (id: ObjectId): Promise<IDepartment> => {
    const data = await _.findById(id).catch((_) => {
      throw new Error(_.message);
    }) as unknown as IDepartment;
    if (!data) throw new Error('Department not found')
    return data
  };


  findDepartmentsByOwnerId = async (id: ObjectId, filter: ITableFilters): Promise<IFindDepartmentByClientId[]> => {

    let matchObj: any = {};
    // Trying to filter
    if (filter) {
      // Filter by Name
      if (filter?.Name) {
        matchObj = {
          ...matchObj,
          name: { $regex: filter?.Name, $options: "i" }
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

    const requestingUser = await userModel.findById(id).catch((_) => {
      throw new Error(_.message);
    })
    let searchBy = id.toString();
    if (requestingUser?.company.employee && requestingUser?.belongsTo) {
      searchBy = requestingUser.belongsTo.toString();
    }

    matchObj = {
      ...matchObj,
      createdBy: new Types.ObjectId(searchBy)
    }




    const data = await _.aggregate(
      [
        {
          $lookup: {
            from: 'departments',
            localField: 'department',
            foreignField: '_id',
            as: 'department'
          }
        },
        {
          $unwind: {
            path: '$department', preserveNullAndEmptyArrays: true
          }
        },
        {
          $match: matchObj
        },
        {
          $project: {
            _id: "$_id",
            department: "$name", createdOn: "$createdAt", status: "$active"
          }
        }
      ]

    ).catch((_) => {
      throw new Error(_.message);
    }) as unknown as IFindDepartmentByClientId[];

    if (!data.length) []
    return data
  };

  delete = async (_id: ObjectId): Promise<string> => {

    const session = await startSession();
    session.startTransaction();
    try {
      const data = await _.deleteOne({ _id }, { session: session }).catch((_: any) => { throw new Error(_.message) });
      if (!data.deletedCount) throw new Error('Unable to delete Department')

       await userModel.updateMany({ department: _id }, { $unset: { department: 1 } }, { session: session })
        .catch((_: any) => { throw new Error(_.message) });

      await session.commitTransaction();
      return "Department Successfully Deleted"
    } catch (_: any) {
      await session.abortTransaction();
      throw new Error(_.message);
    } finally {
      session.endSession();
    }
  };
}
