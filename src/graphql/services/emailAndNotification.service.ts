/* eslint-disable */
import _ from "@/models/emailAndNotification";
import assignNotificationEmailModel from "@/models/emailAndNotificationAssigned";
import userModel from "@/models/user.model";
import { getUniqueNumber } from "@/utils/helpers/functions";
import axios from "axios";
import { ObjectId, Types } from "mongoose";
import {
  AssignEmailAndNotificationInput,
  EditEmailAndNotificationInput,
} from "../generated/graphql";
import moment from "moment";

export class EmailAndNotificationDBService {
  add = async (
    payload: IAddEmailAndNotificationInput
  ): Promise<IGenericType> => {
    let code: number, exists;
    do {
      code = getUniqueNumber();
      exists = await _.exists({ code: code });
    } while (exists?._id);

    const _id = new Types.ObjectId();
    await _.create({
      ...payload,
      _id: _id,
      code: code,
      createdAt: moment(
        moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")
      ).toDate(),
    }).catch((_) => {
      throw new Error(_.message);
    });

    return {
      message: `Successfully Added`,
      data: _id,
      status: true,
    };
  };

  edit = async ({
    _id,
    ...payload
  }: EditEmailAndNotificationInput): Promise<string> => {
    const update = await _.updateOne({ _id }, payload, { upsert: false }).catch(
      (_) => {
        throw new Error(_.message);
      }
    );
    if (!update.matchedCount) throw new Error(`Matching document not found`);
    if (!update.modifiedCount) throw new Error(`Unable to document update`);
    return `Successfully Updated`;
  };

  getById = async (objectId: ObjectId): Promise<IEmailAndNotification> => {
    const data = await _.findById(objectId).catch((e) => {
      throw new Error(e.message);
    });
    if (!data) throw new Error(`Unable to find Email/Notification`);
    return data;
  };

  getByCreatorId = async (
    creatorId: ObjectId,
    filter: ITableFilters
  ): Promise<IEmailAndNotification[]> => {
    const requestingUser = await userModel.findById(creatorId).catch((_) => {
      throw new Error(_.message);
    });
    let searchById: string = creatorId.toString();

    if (requestingUser?.company?.employee && requestingUser?.belongsTo) {
      searchById = requestingUser.belongsTo.toString();
    } else if (
      !requestingUser?.company &&
      !requestingUser?.admin &&
      requestingUser?.belongsTo
    ) {
      searchById = requestingUser.belongsTo.toString();
    }

    let matchObj: any = {};
    // Trying to filter
    if (filter) {
      // Filter by Name
      if (filter?.EmailAndNotification) {
        matchObj = {
          ...matchObj,
          type: filter.EmailAndNotification.toUpperCase(),
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
      createdByRef: new Types.ObjectId(searchById),
    };

    return await _.aggregate([{ $match: matchObj }]).catch((e) => {
      throw new Error(e.message);
    });
  };

  assign = async (
    payload: AssignEmailAndNotificationInput
  ): Promise<string> => {
    const exists: IUser | any = await _.findOne({ _id: payload.id })
      .populate("createdByRef")
      .catch((_) => {
        throw new Error(_.message);
      });
    if (!exists?._id) throw new Error(`Unable to find Email/Notification`);

    const assignObj = payload.assignTo.flatMap((userId) => ({
      code: exists.code,
      title: exists.title,
      text: exists.text,
      type: exists.type,
      createdByRef: payload.assigner_id,
      // createdByRef: exists.createdByRef._id,
      priority: payload.priority,
      assignedUserRef: userId,
      read: false,
    }));

    const assigned = await assignNotificationEmailModel
      .insertMany(assignObj)
      .catch((_) => {
        throw new Error(_.message);
      });
    if (!assigned.length) throw new Error(`Unable to assign ${exists.code}`);

    const users = await userModel
      .find({ _id: { $in: assigned.flatMap((_) => _.assignedUserRef) } })
      .catch((_) => {
        throw new Error(_.message);
      });

    const payloadFCM = users
      .flatMap((_) => {
        if (_.deviceToken) {
          return _.deviceToken;
        } else {
          return null;
        }
      })
      .filter((_) => _) as string[];

    const param: IPayloadFCM = {
      to: payloadFCM,
      notification: {
        title: exists.title,
        body: exists.text,
      },
      link: `${process.env.FRONT_END_URL}/dashboard`,
    };

    if (payloadFCM.length) {
      try {
        const { data }: IResponseAPI = await axios.post(
          `${process.env.FRONT_END_URL}/api/firebase/send-same-fcm-to-assigned`,
          param
        );
        console.log(`send-same-fcm-to-assigned: Response`, data);
      } catch (_: any) {
        throw new Error(_.message);
      }
    }

    return `Successfully Assigned`;
  };

  sendNotificationToMany = async (
    payload: ISendNotificationToManyInput
  ): Promise<string> => {
    const assignObj = payload.assignTo.flatMap((_) => ({
      title: payload.title,
      text: payload.text,
      type: "NOTIFICATION",
      priority: payload.priority,
      createdByRef: payload.createdByRef,
      assignedUserRef: _,
    }));

    const assigned = await assignNotificationEmailModel
      .insertMany(assignObj)
      .catch((_) => {
        throw new Error(_.message);
      });

    if (!assigned.length) throw new Error(`Unable to save notification in DB`);
    const users = await userModel
      .find(
        { _id: { $in: assigned.flatMap((_) => _.assignedUserRef) } },
        { deviceToken: 1 }
      )
      .catch((_) => {
        throw new Error(_.message);
      });

    const payloadFCM = users
      .flatMap((_) => {
        if (_.deviceToken) {
          return _.deviceToken;
        } else {
          return null;
        }
      })
      .filter((_) => _) as string[];

    const param: IPayloadFCM = {
      to: payloadFCM,
      notification: {
        title: payload.title,
        body: payload.text,
      },
    };

    if (payloadFCM.length) {
      const { data }: IResponseAPI = await axios.post(
        `${process.env.FRONT_END_URL}/api/firebase/send-same-fcm-to-assigned`,
        param
      );
      console.log(JSON.stringify(data, null, 2));
    }

    return `Successfully Assigned`;
  };

  getUserNotifications = async (
    userId: ObjectId
  ): Promise<IEmailAndNotification[]> => {
    const data = await assignNotificationEmailModel
      .find({ assignedUserRef: userId })
      .populate("assignedUserRef")
      .populate("createdByRef")
      .sort({ createdAt: -1 })
      .catch((e) => {
        throw new Error(e.message);
      });
    return data;
  };

  getUserNotificationsForMobile = async (
    userId: ObjectId,
    unread: boolean
  ): Promise<any> => {
    let filter: any = {
      assignedUserRef: new Types.ObjectId(userId as unknown as string),
    };

    if (unread) {
      filter["read"] = false;
    }

    console.log({ filter });

    const pipeline = [
      {
        $match: filter,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          data: { $push: "$$ROOT" },
        },
      },
      {
        $addFields: {
          title: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              { $toString: "$_id.month" },
              "-",
              { $toString: "$_id.day" },
            ],
          },
        },
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1, "_id.day": -1 },
      },
    ];

    const data = await assignNotificationEmailModel
      // @ts-ignore
      .aggregate(pipeline)
      .catch((e) => {
        throw new Error(e.message);
      });

    console.log({ data });

    return {
      data: data,
      message: "Notification successfully fetched",
      status: true,
    };
  };

  markAsRead = async (objectId: ObjectId): Promise<string> => {
    const read = await assignNotificationEmailModel
      .updateOne({ _id: objectId }, { read: true }, { upsert: false })
      .catch((_) => {
        throw new Error(_.message);
      });
    if (!read.modifiedCount)
      console.log("Error in marking notification as read");
    return "marked as read";
  };

  deleteNotification = async (notifId: ObjectId) => {
    const notif = await _.findOne({
      // _id: new Types.ObjectId(notifId as unknown as string),
      _id: notifId,
    });

    console.log({ notif });

    if (!notif) {
      throw new Error("Notification not found");
    }

    const deleted = await _.deleteOne({
      _id: notifId,
    });
    if (!deleted.deletedCount) {
      throw new Error("Notification is not deleted");
    }
    return "notification or email is deleted";
  };
}
