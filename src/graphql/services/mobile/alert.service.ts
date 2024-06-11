/* eslint-disable */
import TrainingSession from "../../../models/training_session.model";
import ReportSubmission from "../../../models/report_submission.model";
import AssignedTask from "../../../models/task_assigned.model";
import { Types } from "mongoose";
import service from "../";

export class MobileAlertDBService {
  find = async (userId: string, filter: ITableFilters): Promise<any> => {
    let isValidUserId = Types.ObjectId.isValid(userId);

    if (!isValidUserId) {
      throw new Error("Invalid user id");
    }

    const sort: any = {
      createdAt: -1,
    };

    if (filter && filter.sortField && filter.sortOrder) {
      const { sortField, sortOrder }: any = filter;

      sort[sortField] = Number(sortOrder);
    }

    let user = await service.user.findById(userId);
    let filtersData = {
      $or: [
        {
          priority: "ALERT",
        },
        {
          priority: "EMERGENCY",
        },
      ],
    };
    let statusFilter: any = {};
    let trainingStatusFilter: any = {};

    if (filter && filter.status) {
      statusFilter["submissions.status"] = filter.status;
    }

    if (filter && filter.status) {
      trainingStatusFilter["status"] = filter.status;
    }

    if (filter && filter.status) {
      statusFilter["submissions.status"] = filter.status;
    }

    if (filter && filter.status) {
      statusFilter["submissions.status"] = filter.status;
    }

    let assingedTaskAggreagte = AssignedTask.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  userId: new Types.ObjectId(userId),
                },
                {
                  assignedToFacilityRef: {$in:
                    user?.company?.location }
                  } 
              ],
            },
            {
              ...filtersData,
            },
          ],
        },
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

    let submitedReportAggregate = ReportSubmission.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  assignedTo: new Types.ObjectId(userId),
                },
                {
                  assignedToFacilityRef: {$in:
                    user?.company?.location }
                  }
              ],
            },
            {
              ...filtersData,
            },
          ],
        },
      },

      {
        $lookup: {
          from: "reporttemplates",
          localField: "belongs_to",
          foreignField: "_id",
          as: "belongs_to",
        },
      },
      {
        $unwind: "$belongs_to",
      },

      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedTo",
        },
      },
      {
        $unwind: "$assignedTo",
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $unwind: "$created_by",
      },

      {
        $unwind: { path: "$submissions", preserveNullAndEmptyArrays: true },
      },
      {
        $match: {
          ...statusFilter,
          ...trainingStatusFilter,
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
    ]);

    let trainingSessionAggregate = TrainingSession.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  userRef: new Types.ObjectId(userId),
                },
                {
                  assignedToFacilityRef: {$in:
                    user?.company?.location }
                },
              ],
            },
            {
              ...filtersData,
            },
          ],
        },
      },
      {
        $addFields: {type: "TRAINING"}
      },
      {
        $lookup: {
          from: "users",
          localField: "userRef",
          foreignField: "_id",
          as: "userRef",
        },
      },
      {
        $unwind: { path: "$userRef", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "users",
          localField: "authority",
          foreignField: "_id",
          as: "authority",
        },
      },
      {
        $unwind: { path: "$authority", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "trainings",
          localField: "trainingRef",
          foreignField: "_id",
          as: "trainingRef",
        },
      },
      {
        $unwind: { path: "$trainingRef", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: { path: "$sessions", preserveNullAndEmptyArrays: true },
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

    let [tasks, reports, trainings] = await Promise.all([
      assingedTaskAggreagte,
      submitedReportAggregate,
      trainingSessionAggregate,
    ]);

    return {
      tasks,
      reports,
      trainings,
    };
  };
}
