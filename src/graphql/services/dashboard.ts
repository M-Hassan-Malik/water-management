/* eslint-disable */
import { ObjectId, Types } from "mongoose";
import taskAssignedModel from "@/models/task_assigned.model";
import trainingSessionsModel from "@/models/training_session.model";
import reportSubmissionModel from "@/models/report_submission.model";
import userModel from "../../models/user.model";
import parkLocationModel from "@/models/park_location.model";
import userPackageModel from "@/models/user_package.model";
import packageModel from "@/models/package.model";
import parkModel from "@/models/park.model";

export class DashboardDBService {
  // For WEB

  getClientDashboardApi = async (userId: ObjectId, facilityId: ObjectId) => {

    const requestingUser = await userModel.findById(userId).catch((_) => {
      throw new Error(_.message);
    })
    let searchById: string = userId as unknown as string;
    if (requestingUser?.company.employee && requestingUser?.belongsTo) {
      searchById = requestingUser.belongsTo;
    }

    const [taskAssignedCounts, reportSubmissionCounts, trainingSessionCount, usersCountAccordingFacility] = await Promise.all([

      taskAssignedModel.aggregate([
        {
            $match: {
                clientAdminRef: new Types.ObjectId(searchById),
                "submissions.status": { $in: ["PENDING", "COMPLETED"] }
            }
        },
        {
            $unwind: "$submissions"
        },
        {
            $match: {
                "submissions.status": { $in: ["PENDING", "COMPLETED"] }
            }
        },
        {
            $group: {
                _id: "$_id", // Group by the document ID
                status: { $first: "$submissions.status" }, // Get the first status encountered (which will be the last due to sorting)
                count: { $sum: 1 }
            }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: "$count" }
            }
        }
    ]),

      reportSubmissionModel.aggregate([
        {
          $match: {
            clientAdminRef: new Types.ObjectId(searchById),
            "submissions.status": { $in: ["PENDING", "COMPLETED"] }
          }
        },
        {
          $unwind: "$submissions"
        },
        {
          $match: {
            "submissions.status": { $in: ["PENDING", "COMPLETED"] }
          }
        },
        {
          $group: {
            _id: "$submissions.status",
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            _id: -1 // 1 for ascending order, -1 for descending order
          }
        }
      ]),

      trainingSessionsModel.count({
        authority: searchById,
        status: "COMPLETED",
      }),
      userModel.count({
        "company.location": { $in: [facilityId] },
      }),
    ])

    return {
      taskPendingCount: taskAssignedCounts[0]?.count || 0,
      taskCompletedCount: taskAssignedCounts[1]?.count || 0,

      reportPendingCount: reportSubmissionCounts[0]?.count || 0,
      reportCompletedCount: reportSubmissionCounts[1]?.count || 0,

      trainingSessionCount,
      usersCountAccordingFacility,
    };
  };

  getIncidentReportsForClientDashboard = async (userId: any, filter: any) => {
    const requestingUser = await userModel.findById(userId).catch((_) => {
      throw new Error(_.message);
    })
    let searchById: string = userId;
    if (requestingUser?.company.employee && requestingUser?.belongsTo) {
      searchById = requestingUser.belongsTo;
    }

    // here remove 28 days from current date to get the last 4 weeks data
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 21); // 4 weeks ago there is something with 28 days

    let filterData: any = {
      clientAdminRef: new Types.ObjectId(searchById),
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    };

    if (filter && filter.startDate && filter.endDate) {
      filterData["createdAt"] = {
        $gte: new Date(filter.startDate),
        $lte: new Date(filter.endDate),
      };
    }
    let incidentReports = await reportSubmissionModel.aggregate([
      {
        $match: filterData,
      },
      {
        $group: {
          _id: {
            week: { $week: "$createdAt" }, // Group by week number
            day: { $dayOfWeek: "$createdAt" }, // Group by day of the week
          },
          count: { $sum: 1 }, // Count documents for each day within each week
        },
      },
      {
        $group: {
          _id: "$_id.week", // Group by week number
          dailyCounts: {
            $push: {
              day: "$_id.day",
              count: "$count",
            }, // Push daily counts into an array
          },
        },
      },
    ]).catch((_) => {
      throw new Error(_.message);
    })

    //   This logic show 0 if no record exists at that day
    const weeklyData = incidentReports.map((week) => {
      const dailyCountsMap = new Map(
        week.dailyCounts.map((entry: any) => [entry.day, entry.count])
      );
      const weekData = Array.from({ length: 7 }, (_, dayOfWeek) => {
        const count = dailyCountsMap.get(dayOfWeek + 1); // MongoDB dayOfWeek starts from 1
        return count !== undefined ? count : 0;
      });
      return { _id: week._id, dailyCounts: weekData };
    });

    return weeklyData;
  };

  getAllClientAdmins = async () => {
    let clientAdmins = await userModel.find({
      "company.subAdmin": true,
    }).catch((_) => {
      throw new Error(_.message);
    })

    return clientAdmins;
  };

  getAllParks = async () => {
    const allParks = await parkModel.find().catch((_) => {
      throw new Error(_.message);
    })

    return allParks;
  };

  getAllSubscriptions = async () => {
    const allPackages = await packageModel.find().catch((_) => {
      throw new Error(_.message);
    })

    return allPackages;
  };

  // Super Admin APIs

  getSuperAdminDashboardApi = async (
    clientAdminId: ObjectId,
    packageId: ObjectId
  ) => {
    // const requestingUser = await userModel.findById(userId);
    // let searchById: string = userId as unknown as string;
    // if (requestingUser?.company.employee && requestingUser?.belongsTo) {
    //   searchById = requestingUser.belongsTo;
    // }

    const currentDate = new Date();

    // Calculate the start date of the current month
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Calculate the end date of the current month
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    let accountsCount = await userModel.countDocuments({
      "company.subAdmin": true,
    });

    let usersCountAccordingClientAdmin = await userModel.countDocuments({
      "company.park": clientAdminId,
    });

    let activeUsersCount = await userModel.countDocuments({
      active: true,
    });

    let newClientsOfCurrentMonth = await userModel.countDocuments({
      "company.subAdmin": true,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    let facilityCount = await parkLocationModel.count();

    let usersCountBySubscription = await userPackageModel.count({
      packageRef: packageId,
    });

    return {
      accountsCount,
      newClientsOfCurrentMonth,
      facilityCount,
      activeUsersCount,
      usersCountAccordingClientAdmin,
      usersCountBySubscription,
    };
  };

  // =================

  // For MOB
  getEmployeeHomeScreenData = async (userId: ObjectId): Promise<any> => {
    const tasksQuery: any = [
      {
        $match: { userId: new Types.ObjectId(String(userId)) },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: null,
          tasks: { $push: "$$ROOT" },
          totalCount: { $sum: 1 },
        },
      },
      {
        $addFields: {
          totalCount: {
            $cond: {
              if: { $isArray: "$tasks" },
              then: "$totalCount",
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          tasks: { $slice: ["$tasks", 3] },
          totalCount: 1,
        },
      },
    ];
    const tasksCount: any = [
      {
        $match: { userId: new Types.ObjectId(String(userId)) },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
          completed: {
            $sum: { $cond: [{ $eq: ["$_id", "COMPLETED"] }, "$count", 0] },
          },
          pending: {
            $sum: { $cond: [{ $eq: ["$_id", "PENDING"] }, "$count", 0] },
          },
        },
      },
    ];

    const trainingSessionsQuery: any = [
      {
        $match: { userRef: new Types.ObjectId(String(userId)) },
      },
      {
        $sort: { createdAt: -1 },
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
        $group: {
          _id: null,
          training: { $push: "$$ROOT" },
          totalCount: { $sum: 1 },
        },
      },
      {
        $addFields: {
          totalCount: {
            $cond: {
              if: { $isArray: "$training" },
              then: "$totalCount",
              else: 0,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          training: { $slice: ["$training", 3] },
          totalCount: 1,
        },
      },
    ];
    const trainingSessionsCount: any = [
      {
        $match: { userRef: new Types.ObjectId(String(userId)) },
      },
      {
        $sort: { createdAt: -1 },
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
        $group: {
          _id: "$complete",
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
          completed: {
            $sum: { $cond: [{ $eq: ["$_id", true] }, "$count", 0] },
          },
          pending: { $sum: { $cond: [{ $eq: ["$_id", false] }, "$count", 0] } },
        },
      },
    ];

    const tasks = { data: {}, stats: {} },
      reports = { data: {}, stats: {} },
      training = { data: {}, stats: {} };

    try {
      const [
        tasksData,
        tasksStats,
        trainingSessionsData,
        trainingSessionsStats,
      ] = await Promise.all([
        // Tasks
        taskAssignedModel.aggregate(tasksQuery),
        taskAssignedModel.aggregate(tasksCount),
        // Training
        trainingSessionsModel.aggregate(trainingSessionsQuery),
        trainingSessionsModel.aggregate(trainingSessionsCount),
      ]);

      // Tasks
      if (tasksData.length) {
        tasks.data = tasksData[0];
      }
      if (tasksStats.length) {
        tasks.stats = tasksStats[0];
      }
      // Training
      if (trainingSessionsData.length) {
        training.data = trainingSessionsData[0];
      }
      if (trainingSessionsStats.length) {
        training.stats = trainingSessionsStats[0];
      }
    } catch (error: any) {
      throw new Error(error.message);
    }

    return { tasks, reports, training };
  };
}
