/* eslint-disable */
import { ObjectId, startSession } from "mongoose";
import _ from "../../models/task_assigned.model";
import taskModel from "../../models/task.model";
import userModel from "../../models/user.model";
import moment from "moment";
import Service from ".";
import { EScheduleType, ESubmissionStatus } from "../generated/graphql";

export class TaskAssignedDBService {
  assign = async (payload: IAssignInput): Promise<string> => {
    try {
      const assignedToUser = await userModel.findOne({
        _id: payload.assigner_id,
      });

      const task = (await taskModel.findById(payload.id).catch(() => {
        throw new Error("Unable to Assign Task.");
      })) as unknown as ITask;
      if (!task) throw new Error("Unable to Find Task.");

      var submissionsArr: any = [],
        alwaysDate = moment(moment("2119-12-31").format("YYYY-MM-DD")).toDate();

      if (payload.scheduleType === EScheduleType.Always) {
        submissionsArr.push({
          date: alwaysDate,
          subtasks: task.subtasks,
          status: "PENDING",
        });
      } else {
        const currentDate = moment();
        let date = moment();
        let dateToGetTime = new Date(payload.dueDate);

        const specificDate = moment(payload.dueDate, "YYYY-MM-DDTHH:mm");

        let daysDifference: any;

        if (payload.scheduleType === "ONE_TIME") {
          daysDifference = 0;
        }

        if (payload.scheduleType === "DAILY") {
          const currentDayDate = currentDate.startOf("day");
          const specificDayDate = specificDate.startOf("day");

          daysDifference = currentDayDate.diff(specificDayDate, "days");
        }

        if (payload.scheduleType === "WEEKLY") {
          // the day is picking the start time of the current date
          const currentWeekDate = currentDate.startOf("day");
          const specificWeekDate = specificDate.startOf("day");

          daysDifference = currentWeekDate.diff(specificWeekDate, "weeks");
        }

        if (payload.scheduleType === "MONTHLY") {
          // the day is picking the start time of the current date
          const currentMonthDate = currentDate.startOf("day");
          const specificMonthDate = specificDate.startOf("day");

          daysDifference = currentMonthDate.diff(specificMonthDate, "months");
        }

        let addDays: any;

        if (payload.scheduleType === "DAILY") {
          addDays = "days";
        } else if (payload.scheduleType === "WEEKLY") {
          addDays = "weeks";
        } else {
          addDays = "months";
        }

        let i = 0;
        do {
          const submissionDate = date.clone().add(i, addDays);
          const newSubmissionDate = new Date(
            submissionDate
              .toDate()
              .setHours(
                dateToGetTime.getHours(),
                dateToGetTime.getMinutes(),
                dateToGetTime.getSeconds()
              )
          );

          submissionsArr.push({
            date: newSubmissionDate,
            subtasks: task.subtasks,
            status: "PENDING",
          });
          i++;
        } while (i <= Math.abs(daysDifference));
      }

      var tasks: ITaskAssigned[];
      // Assigning by role

      if (payload.assignBy === ("ROLE" as EAssignBy.ROLE)) {
        const roleUsers: IUser[] = (await userModel
          .find({ role: { $in: payload.assignTo }, active: true }, { _id: 1 })
          .catch((_) => {
            throw new Error(_.message);
          })) as unknown as IUser[];

        if (!roleUsers?.length)
          throw new Error(`Selected Roles have no active users`);

        tasks = roleUsers?.flatMap(
          (user) =>
            ({
              type: "TASK",
              title: task.title,
              facility: task.facility,
              detail: task.detail,
              media: task.media,
              submissions: submissionsArr,
              createdBy_id: assignedToUser?._id,
              userId: user._id,
              clientAdminRef: assignedToUser?.belongsTo
                ? assignedToUser.belongsTo
                : assignedToUser?._id,
              taskId: payload.id,
              deadline:
                payload.scheduleType === EScheduleType.Always
                  ? alwaysDate
                  : payload.dueDate,
              priority: payload.priority,
              scheduleType: payload.scheduleType,
            } as ITaskAssigned)
        );
      } else {
        tasks = payload.assignTo.flatMap((userId) => {
          let data = {
            type: "TASK",
            title: task.title,
            detail: task.detail,
            facility: task.facility,
            media: task.media,
            submissions: submissionsArr,
            createdBy_id: assignedToUser?._id,
            clientAdminRef: assignedToUser?.belongsTo
              ? assignedToUser.belongsTo
              : assignedToUser?._id,
            taskId: payload.id,
            deadline:
              payload.scheduleType === EScheduleType.Always
                ? alwaysDate
                : payload.dueDate,
            priority: payload.priority,
            scheduleType: payload.scheduleType,
          } as ITaskAssigned;

          payload.assignBy === ("FACILITY" as EAssignBy.FACILITY)
            ? (data.assignedToFacilityRef = payload.assignTo[0])
            : (data.userId = userId);

          return data;
        });
      }

      const assigned = await _.insertMany(tasks).catch((_) => {
        throw new Error(_.message);
      });
      if (!assigned.length) throw new Error("Unable to assign Task.");

      if (payload.assignBy === ("FACILITY" as EAssignBy.FACILITY)) {
        const facilityUsers = await userModel.find(
          { "company.location": payload.assignTo },
          { _id: 1 }
        );
        if (facilityUsers.length) {
          await Service.emailAndNotification.sendNotificationToMany({
            assignTo: facilityUsers.flatMap((_) => _._id),
            title: `Task Assigned`,
            text: `${task.title}`,
            priority: payload.priority,
            createdByRef: payload.assigner_id,
          });
        }
      } else {
        await Service.emailAndNotification.sendNotificationToMany({
          assignTo: assigned.flatMap((_) => _.userId) as string[],
          title: `Task Assigned`,
          text: `${task.title}`,
          priority: payload.priority,
          createdByRef: payload.assigner_id,
        });
      }

      return "Task Assigned";
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  track = async (
    id: ObjectId,
    tableFilters: ITableFilters
  ): Promise<ITaskAssigned[]> => {
    const requestingUser = await userModel.findOne({
      _id: id,
      // find here status === status
    });

    let match: object = { createdBy_id: id.toString() };
    if (requestingUser?.company.employee && requestingUser?.belongsTo) {
      match = {
        clientAdminRef: requestingUser.belongsTo,
        facility: requestingUser.company.location,
      };
    }
    const filter = tableFilters?.status?.toLowerCase().replace(" ", "");
    if (filter === "completed") {
      match = { ...match, "submissions.status": ESubmissionStatus.Completed };
    } else if (filter === "pending") {
      match = { ...match, "submissions.status": ESubmissionStatus.Pending };
    } else if (filter === "inprocess") {
      match = { ...match, "submissions.status": ESubmissionStatus.Inprogress };
    }

    const tasks = (await _.find(match)
      .sort({ createdAt: -1 })
      .populate("userId")
      .populate("assignedToFacilityRef")
      .populate("createdBy_id")
      .sort({ createdAt: -1 })) as unknown as ITaskAssigned[];
    return tasks;
  };

  findById = async (id: ObjectId): Promise<ITaskAssigned> => {
    const task = (await _.findOne({ _id: id })
      .populate("userId")
      .populate("assignedToFacilityRef")
      .populate("createdBy_id")) as unknown as ITaskAssigned;

    if (!task) throw new Error("Assigned Task not found");
    return task;
  };

  approveSubmission = async (
    submissionId: ObjectId,
    taskId: ObjectId,
    approverId: ObjectId
  ): Promise<IGenericType> => {
    const auth = await _.exists({
      _id: taskId,
      $or: [{ createdBy_id: approverId }, { clientAdminRef: approverId }],
    });
    if (!auth) throw new Error("Access Denied");

    const update = await _.updateOne(
      { _id: taskId, "submissions._id": submissionId },
      { $set: { "submissions.$.status": ESubmissionStatus.Completed } },
      { upsert: false }
    ).catch((_) => {
      throw new Error(_.message);
    });

    if (!update.matchedCount) throw new Error("Unable to find matching Task");
    if (!update.modifiedCount)
      throw new Error("Unable to update matching Task");

    return {
      status: true,
      message: "Successfully Approved",
      data: null,
    } as IGenericType;
  };

  deleteOne = async (taskId: ObjectId): Promise<string> => {
    const session = await startSession();
    try {
      session.startTransaction();

      const task = await taskModel.deleteOne(
        { _id: taskId },
        { session: session }
      );

      if (!task.deletedCount) throw new Error("Unable to Delete Task");

      const assigned = await _.deleteOne(
        { taskId: taskId },
        { session: session }
      );

      if (!assigned.deletedCount)
        throw new Error("Unable to Delete Assigned Tasks");

      await session.commitTransaction();

      return "Task Deleted Successfully";
    } catch (_: any) {
      await session.abortTransaction();
      throw new Error(_.message);
    } finally {
      await session.endSession();
    }
  };
}
