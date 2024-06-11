/* eslint-disable */
import { Types, ObjectId, startSession } from "mongoose";
import _ from "../../models/report_template.model";
import reportSubmissionModel from "../../models/report_submission.model";
import userPackageModulesModel from "../../models/user_package_modules.model";
import userModel from "../../models/user.model";
import Service from ".";
import moment from "moment";
import {
  EReportType,
  EScheduleType,
  EmployeeType,
  EIndicator,
} from "../generated/graphql";

export class ReportTemplateDBService {
  create = async ({
    created_by,
    ...payload
  }: ReportTemplateInput): Promise<IGenericType> => {
    const session = await startSession();
    session.startTransaction();

    try {
      const user = (await userModel.findById(created_by).populate({
        path: "package",
        populate: {
          path: "modules",
        },
      })) as unknown as IUser;

      if (!user.package) throw new Error("Unable to find Package");

      const subscription: IPackage = user.package as IPackage,
        reportModule: IUserPackageModule = subscription.modules.filter(
          (module) => module.name === "report-templates"
        )[0] as IUserPackageModule;

      if (reportModule.indicator === EIndicator.Limited) {
        if (reportModule.used > reportModule.available)
          throw new Error(
            "Maximum Report Limit Reached w.r.t Subscription Package. Cannot add more templates"
          );
        else {
          reportModule.used++;
          reportModule.available--;
          const update = await userPackageModulesModel.updateOne(
            { _id: reportModule._id },
            { available: reportModule.available, used: reportModule.used },
            { session: session }
          );
          if (!update.matchedCount || !update.modifiedCount)
            throw new Error(
              "Unable to modify the report limit, Please contact support"
            );
        }
      }

      let additionalDetails: { created_by?: string; clientAdminRef?: string } =
        {
          created_by: created_by,
        };
      if (user?.company.employee && user?.belongsTo)
        additionalDetails.clientAdminRef = user.belongsTo;

      const _id = new Types.ObjectId();
      (await _.create(
        [
          {
            ...payload,
            ...additionalDetails,
            _id,
            createdAt: moment(
              moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")
            ).toDate(),
          },
        ],
        { session: session }
      ).catch((e) => {
        throw new Error(e.message);
      })) as unknown as ReportTemplate;

      await session.commitTransaction();

      return {
        status: true,
        message: "Report Template is created",
        data: String(_id),
      };
    } catch (e: any) {
      await session.abortTransaction();
      throw new Error(e.message);
    } finally {
      await session.endSession();
    }
  };

  find = async (
    queryUserId: ObjectId,
    reportType: EReportType,
    filter: ITableFilters
  ): Promise<ReportTemplate[]> => {
    try {
      const requestingUser = await userModel
        .findById(queryUserId)
        .populate("package");

      let matchObj: any = {};

      if (requestingUser?.company?.employee && requestingUser?.belongsTo) {
        // If employee type is not sub-admin, then get all reports from that facility
        if (
          requestingUser?.company?.employeeType ===
          (EmployeeType.Subadmin as any)
        )
          matchObj["facility"] = new Types.ObjectId(
            String(requestingUser.company.location)
          );
        else
          matchObj = {
            $or: [
              { clientAdminRef: new Types.ObjectId(requestingUser.belongsTo) },
              { created_by: new Types.ObjectId(requestingUser.belongsTo) },
            ],
          };
      } else {
        matchObj = {
          $or: [
            { created_by: new Types.ObjectId(queryUserId.toString()) },
            { clientAdminRef: new Types.ObjectId(queryUserId.toString()) },
          ],
        };
      }

      // Trying to filter
      if (filter) {
        // Filter: Name
        if (filter?.Name) {
          matchObj = {
            ...matchObj,
            name: { $regex: filter.Name, $options: "i" },
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

      // If User is subscribed to FREEMIUM Packages, then get only universalAccess=false documents
      if (reportType)
        matchObj = { ...matchObj, type: reportType, universalAccess: false };

      const userReports = (await _.aggregate([
        { $match: matchObj },
        {
          $sort: {
            createdAt: -1, // Use -1 for descending order, 1 for ascending
          },
        },
      ]).catch((e) => {
        throw new Error(e);
      })) as unknown as ReportTemplate[];

      // If User is subscribed to Packages except FREEMIUM, then get all universalAccess=true/false documents// If User is subscribed to FREEMIUM Packages, then get only universalAccess=false documents
      let universalReports = [] as unknown as ReportTemplate[];
      if (requestingUser?.package?.title.toLowerCase() !== "freemium")
        universalReports = (await _.find({
          universalAccess: true,
          type: reportType,
        }).catch((e) => {
          throw new Error(e);
        })) as unknown as ReportTemplate[];

      return [...userReports, ...universalReports];
    } catch (e: any) {
      console.log(e.message);
      throw new Error("Something went wrong");
    }
  };

  findById = async (id: string): Promise<ReportTemplate> => {
    return (await _.findOne({ _id: id })
      .populate("facility")
      .catch((_) => {
        throw new Error(_.message);
      })) as unknown as Promise<ReportTemplate>;
  };

  update = async ({
    _id,
    ...payload
  }: UpdateReportTemplateInput): Promise<ReportTemplate> => {
    const update = (await _.findOneAndUpdate(
      { _id },
      { $set: { ...payload } },
      { new: true, upsert: true }
    )) as unknown as ReportTemplate;

    return update;
  };

  delete = async (_id: ObjectId): Promise<IGenericType> => {
    const found = await _.findById({ _id });

    if (!found) throw new Error(`Unable to find report template`);
    else if (found && found.universalAccess)
      throw new Error(
        `You do not have permission to delete Default Report Template`
      );

    const deleted = await _.deleteOne({ _id }).catch(() => {
      throw new Error(`Unable to delete report template`);
    });

    if (!deleted.deletedCount) throw new Error(`Unable to delete the template`);

    return {
      status: true,
      data: null,
      message: "Successfully delete",
    };
  };

  assign = async ({ id, ...payload }: IAssignInput): Promise<string> => {
    if (payload.assignTo.length) {
      try {
        const reportTemplate = (await _.findById(
          id
        )) as unknown as ReportTemplate;
        if (!reportTemplate) throw new Error("Selected Report not found in DB");

        const creator = await userModel.findById(payload.assigner_id);
        let additionalDetails: {
          created_by: string;
          clientAdminRef: string | null;
        } = {
          created_by: payload.assigner_id,
          clientAdminRef: payload.assigner_id,
        };
        if (creator?.company.employee && creator?.belongsTo)
          additionalDetails.clientAdminRef = creator.belongsTo;

        var submissionsArr: any = [],
          alwaysDate = moment(
            moment("2119-12-31").format("YYYY-MM-DD")
          ).toDate();
        if (payload.scheduleType === EScheduleType.Always) {
          submissionsArr = [
            {
              date: alwaysDate,
              submitted_data: reportTemplate.fields,
              status: "PENDING",
            },
          ];
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
            let submissionDate =
              payload.scheduleType === "ONE_TIME"
                ? moment(payload.dueDate)
                : date.clone().add(i, addDays);

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
              submitted_data: reportTemplate.fields,
              status: "PENDING",
            });
            i++;
          } while (i <= Math.abs(daysDifference));
        }
        // =================================================================

        let obj: any;
        if (payload.assignBy === ("ROLE" as EAssignBy.ROLE)) {
          const roleUsers: IUser[] = (await userModel
            .find({ role: { $in: payload.assignTo }, active: true }, { _id: 1 })
            .catch((_) => {
              throw new Error(_.message);
            })) as unknown as IUser[];

          if (!roleUsers?.length)
            throw new Error(`Selected Role have no active users`);

          obj = roleUsers?.flatMap(
            (user) =>
              ({
                type: "REPORT",
                belongs_to: reportTemplate?._id || "",
                title: reportTemplate.name,
                reportType: reportTemplate.type,
                facility: reportTemplate.facility
                  ? reportTemplate.facility
                  : null,
                submissions: submissionsArr,
                assignedTo: user._id,
                scheduleType: payload.scheduleType,
                priority: payload.priority,
                deadline:
                  payload.scheduleType === EScheduleType.Always
                    ? alwaysDate
                    : payload.dueDate,
                ...additionalDetails,
              } as ReportSubmission)
          );
        } else {
          obj = payload.assignTo.flatMap((_) => {
            let data = {
              type: "REPORT",
              belongs_to: reportTemplate?._id || "",
              title: reportTemplate.name,
              facility: reportTemplate.facility
                ? reportTemplate.facility
                : null,
              reportType: reportTemplate.type,
              submissions: submissionsArr,
              scheduleType: payload.scheduleType,
              priority: payload.priority,
              deadline:
                payload.scheduleType === EScheduleType.Always
                  ? alwaysDate
                  : payload.dueDate,
              ...additionalDetails,
            } as ReportSubmission;
            payload.assignBy === "FACILITY"
              ? (data.assignedToFacilityRef = payload.assignTo[0])
              : (data.assignedTo = _);
            return data;
          });
        }

        const assigned = await reportSubmissionModel
          .insertMany(obj)
          .catch((e) => {
            throw new Error(e.message);
          });
        if (!assigned.length) throw new Error(`Unable to assign Report`);

        if (payload.assignBy === ("FACILITY" as EAssignBy.FACILITY)) {
          const facilityUsers = await userModel.find(
            { "company.location": payload.assignTo },
            { _id: 1 }
          );
          if (facilityUsers.length) {
            const notificationResult =
              await Service.emailAndNotification.sendNotificationToMany({
                assignTo: facilityUsers.flatMap((_) => _._id),
                title: `Report Assigned`,
                text: `${reportTemplate.name}`,
                priority: payload.priority,
                createdByRef: payload.assigner_id,
              });
            console.log(notificationResult);
          }
        } else {
          const notificationResult =
            await Service.emailAndNotification.sendNotificationToMany({
              assignTo: assigned.flatMap((_) => _.assignedTo as string),
              title: `Report Assigned`,
              text: `${reportTemplate.name}`,
              priority: payload.priority,
              createdByRef: payload.assigner_id,
            });
          console.log(notificationResult);
        }

        return "Assigned";
      } catch (error: any) {
        throw new Error(error.message);
      }
    }
    throw new Error("No payload found");
  };
}
