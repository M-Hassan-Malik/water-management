/* eslint-disable */
import assignedTaskModel from "../../../models/task_assigned.model";
import { ObjectId, Types } from "mongoose";
import service from "../";
import { ESubmissionStatus } from "@/graphql/generated/graphql";

export class MobileTaskAssignedDBService {
  find = async (userId: string, filter: ITableFilters) => {
    const sort: any = {
      createdAt: -1,
    };

    let isValidUserId = Types.ObjectId.isValid(userId);

    let user = (await service.user.findById(userId)) as unknown as IUser;

    if (!user) {
      throw new Error("User not found");
    }

    if (!isValidUserId) {
      throw new Error("Invalid user id");
    }

    const filterData: any =
      filter.status === ESubmissionStatus.Unassigned
        ? {
          assignedToFacilityRef: {$in: user?.company?.location},
            userId: { $exists: false },
          }
        : {
            $or: [
              {
                userId: new Types.ObjectId(userId),
                assignedToFacilityRef: { $exists: false },
              },
            ],
          };

    // for IN PROGRESS
    if (filter?.status === ESubmissionStatus.Inprogress) {
      filterData["submissions"] = {
        $not: {
          $elemMatch: {
            status: { $ne: ESubmissionStatus.Inprogress },
          },
        },
      };
    }

    // for COMPLETE
    if (filter?.status === ESubmissionStatus.Completed) {
      filterData["submissions"] = {
        $not: {
          $elemMatch: {
            status: { $ne: ESubmissionStatus.Completed },
          },
        },
      };
    }

    // for PENDING
    if (filter?.status === ESubmissionStatus.Pending) {
      filterData["submissions"] = {
        $not: {
          $elemMatch: {
            status: { $ne: ESubmissionStatus.Pending },
          },
        },
      };
    }

    // for FAILED
    if (filter?.status === ESubmissionStatus.Failed) {
      filterData["submissions"] = {
        $not: {
          $elemMatch: {
            status: { $ne: ESubmissionStatus.Failed },
          },
        },
      };
    }

    // for IN-REVIEW
    if (filter?.status === ESubmissionStatus.Reviewing) {
      filterData["submissions"] = {
        $not: {
          $elemMatch: {
            status: { $ne: ESubmissionStatus.Reviewing },
          },
        },
      };
    }

    if (filter?.sortField && filter?.sortOrder) {
      const { sortField, sortOrder }: any = filter;

      sort[sortField] = Number(sortOrder);
    }

    let tasks = await assignedTaskModel
      .aggregate([
        {
          $match: filterData,
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userId",
          },
        },
        {
          $unwind: { path: "$userId", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdBy_id",
            foreignField: "_id",
            as: "createdBy_id",
          },
        },
        {
          $unwind: {
            path: "$createdBy_id",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "parklocations",
            localField: "assignedToFacilityRef",
            foreignField: "_id",
            as: "assignedToFacilityRef",
          },
        },
        {
          $unwind: {
            path: "$assignedToFacilityRef",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: sort,
        },
      ])
      .catch((_) => {
        throw new Error(_.message);
      });

    if (!tasks) throw new Error("Assigned Task not found");
    return tasks;
  };

  findOneAndUpdate = async (
    { taskId, submissionId }: any,
    data: any
  ): Promise<string> => {
    let task: any;

    let invalidTaskId = Types.ObjectId.isValid(taskId);
    let invalidSubmissionId = Types.ObjectId.isValid(submissionId);

    if (!invalidTaskId) {
      throw new Error("Invalid task submit id");
    }

    if (!invalidSubmissionId) {
      throw new Error("Invalid submission id");
    }

    if (data.status) {
      if (data.status == "PENDING" || data.status == "COMPLETED") {
        data.status =
          data.status === "COMPLETED"
            ? (data.status = "REVIEWING")
            : data.status;

        task = await assignedTaskModel
          .findOne({
            _id: new Types.ObjectId(taskId),
            "submissions._id": new Types.ObjectId(submissionId),
          })
          .catch((_) => {
            throw new Error(_.message);
          });

        if (data.subTasks && data.subTasks.length > 0) {
          const allSubtasksCompleted = data.subTasks.every(
            (subtask: any) => subtask.completed
          );
          if (!allSubtasksCompleted) {
            return "Cannot update status, not all subtasks are completed";
          }
        }
        // else {
        //   return "Task or submission not found";
        // }
      }
      // else {
      //   throw new Error("Status must be 'PENDING' or 'COMPLETED");
      // }
    } else {
      data.status = "PENDING";
    }

    let updatedData = await assignedTaskModel
      .updateOne(
        {
          _id: new Types.ObjectId(taskId),
          "submissions._id": new Types.ObjectId(submissionId),
        },
        {
          $set: {
            "submissions.$.subtasks": data.subTasks,
            "submissions.$.status": data?.status,
            "submissions.$.remarks": data.remarks,
            "submissions.$.media": data.media,
            "submissions.$.voice": data.voice,
          },
        },
        {
          new: true,
          upsert: false,
        }
      )
      .catch((_) => {
        throw new Error(_.message);
      });

    if (!updatedData.matchedCount)
      throw new Error("Unable to find matching record");
    if (!updatedData.modifiedCount) throw new Error("Unable to modify");

    if (data.status === "COMPLETED") {
      await service.emailAndNotification.sendNotificationToMany({
        assignTo: [task.createdBy_id],
        title: `Task Marked Completed`,
        text: `${task.title}`,
        priority: "NOTIFICATION" as any,
        createdByRef: task.userId,
      });
    }

    return "Updated successfully";
  };

  trackMyTask = async (
    id: ObjectId,
    filter: ITableFilters
  ): Promise<ITaskAssigned[]> => {
    let userId: any = id;

    let isValidId = Types.ObjectId.isValid(id as unknown as string);

    if (!isValidId) {
      throw new Error("Invalid user id");
    }

    let match: object = { createdBy_id: new Types.ObjectId(userId) };

    let statusFilter: any = {};

    if (
      filter &&
      filter.status &&
      filter.status !== "COMPLETED" &&
      filter.status !== "INPROGRESS"
    ) {
      statusFilter["submissions.status"] = filter.status;
    }

    if (filter && filter.status && filter.status === "INPROGRESS") {
      statusFilter["$and"] = [
        { "submissions.status": { $eq: "PENDING" } },
        { "submissions.status": { $eq: "COMPLETED" } },
      ];
    }

    if (filter && filter.status && filter.status === "COMPLETED") {
      statusFilter["submissions"] = {
        $not: {
          $elemMatch: {
            status: { $ne: "COMPLETED" },
          },
        },
      };
    }

    const sort: any = {
      createdAt: -1,
    };

    if (filter && filter.sortField && filter.sortOrder) {
      const { sortField, sortOrder }: any = filter;

      sort[sortField] = Number(sortOrder);
    }

    const task = await assignedTaskModel.aggregate([
      {
        $match: match,
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      {
        $unwind: { path: "$userId", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy_id",
          foreignField: "_id",
          as: "createdBy_id",
        },
      },
      {
        $unwind: {
          path: "$createdBy_id",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: statusFilter,
      },
      {
        $lookup: {
          from: "parklocations",
          localField: "assignedToFacilityRef",
          foreignField: "_id",
          as: "assignedToFacilityRef",
        },
      },
      {
        $unwind: {
          path: "$assignedToFacilityRef",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: sort,
      },
    ]);

    return task;
  };

  pickFacilityTask = async (
    taskId: ObjectId,
    pickerId: ObjectId
  ): Promise<IGenericType> => {
    const exists = (await assignedTaskModel
      .findOne({ _id: taskId })
      .catch((_) => {
        throw new Error(_.message);
      })) as unknown as ITaskAssigned;
    if (!exists) throw new Error("Unable to find matching Task Reference");
    if (exists?.userId) throw new Error("Already Picked");

    const update = await assignedTaskModel
      .updateOne({ _id: taskId }, { userId: pickerId }, { upsert: false })
      .catch((err) => {
        throw new Error(err.message);
      });
    if (!update.matchedCount)
      throw new Error("Unable to find matching Task Reference");
    if (!update.modifiedCount) throw new Error("Unable to Pick Task");

    return {
      status: true,
      message: "Task has been Picked Successfully",
      data: null,
    };
  };
}
