/* eslint-disable */
import { Types } from "mongoose";
import _ from "../../models/activity_log.model";
import userModel from "../../models/user.model";

export class ActivityLogDBService {
  create = async (payload: IActivityLog): Promise<IActivityLog> => {
    return (await _.create(payload).catch((_) => {
      throw new Error(_.message);
    })) as unknown as Promise<IActivityLog>;
  };

  findByClientAdmin = async ({
    belongsTo,
  }: {
    belongsTo: string;
  }): Promise<IActivityLog[]> => {
    const requestingUser = await userModel.findById(belongsTo).catch((_) => {
      throw new Error(_.message);
    });
    let searchById = belongsTo;
    if (requestingUser?.company.employee && requestingUser?.belongsTo) {
      searchById = requestingUser.belongsTo;
    }

    const items = await _.aggregate([
      { $match: { belongsTo: new Types.ObjectId(searchById) } },
      {
        $group: {
          _id: "$user_id",
          uniqueLogs: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          activityLogs: {
            $arrayElemAt: [{ $slice: ["$uniqueLogs", -1] }, 0],
          },
        },
      },
    ]).catch((_) => {
      throw new Error(_.message);
    });

    return items.map((item) => item.activityLogs);
  };

  findByUserId = async ({
    user_id,
  }: {
    user_id: string;
  }): Promise<IActivityLog[]> => {
    return (await _.find({ user_id }).catch((_) => {
      throw new Error(_.message);
    })) as unknown as Promise<IActivityLog[]>;
  };

  findById = async (id: string): Promise<IActivityLog> => {
    return (await _.findOne({ _id: id }).catch((_) => {
      throw new Error(_.message);
    })) as unknown as Promise<IActivityLog>;
  };
}
