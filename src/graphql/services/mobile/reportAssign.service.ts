/* eslint-disable */
import { ObjectId, Types } from "mongoose";
import ReportSubmission from "../../../models/report_submission.model";
import service from "../";
import { ESubmissionStatus } from "@/graphql/generated/graphql";

export class MobileReportSubmissionDBService {
  find = async (
    empId: string,
    filter: ITableFilters
  ): Promise<ReportSubmission> => {
    try {
      let isEmpIdValid = Types.ObjectId.isValid(empId);

      if (!isEmpIdValid) {
        throw new Error("Invalid employee id");
      }

      let employee = await service.user.findById(empId).catch((_) => {
        throw new Error(_.message);
      });
      if (!employee) throw new Error("Unable to find user");

      let filterData: any =
        filter.status === ESubmissionStatus.Unassigned
          ? {
              // assignedToFacilityRef: new Types.ObjectId(
              //   employee?.company?.location?._id
              // ),
              assignedToFacilityRef: { $in: employee?.company?.location },
            }
          : {
              assignedTo: new Types.ObjectId(empId),
              assignedToFacilityRef: { $exists: false },
            };

      const sort: any = {
        createdAt: -1,
      };

      if (filter?.sortField && filter?.sortOrder) {
        const { sortField, sortOrder }: any = filter;
        sort[sortField] = Number(sortOrder);
      }

      if (filter?.start) filterData["date"] = { $gte: new Date(filter.start) };

      if (filter?.end) filterData["date"] = { $lte: new Date(filter.end) };

      if (filter?.Role) filterData["role"] = filter.Role;

      if (filter?.ParkName) filterData["facility"] = filter.ParkName;

      if (filter.location?.lat && filter.location?.lng) {
        filterData["location.lat"] = filter.location.lat;
        filterData["location.long"] = filter.location.lng;
      }

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

      if (filter?.reportType) filterData["reportType"] = filter.reportType;

      const report = (await ReportSubmission.aggregate([
        { $match: filterData },
        {
          $lookup: {
            from: "users",
            localField: "assignedTo",
            foreignField: "_id",
            as: "assignedTo",
          },
        },
        {
          $unwind: { path: "$assignedTo", preserveNullAndEmptyArrays: true },
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
          $unwind: { path: "$created_by", preserveNullAndEmptyArrays: true },
        },
        {
          $unwind: { path: "$submissions", preserveNullAndEmptyArrays: true },
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
      ]).catch((_: any) => {
        console.log(_.message);
        throw new Error("Something went wrong in reports");
      })) as unknown as Promise<ReportSubmission>;

      if (!report) throw new Error("Reports Not Found");

      return report;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  findOneAndUpdate = async (
    { reportSubmitId, submissionId }: any,
    data: any
  ): Promise<any> => {
    try {
      let invalidReportId = Types.ObjectId.isValid(reportSubmitId);
      let invalidSubmissionId = Types.ObjectId.isValid(submissionId);

      if (!invalidReportId) {
        throw new Error("Invalid report submit id");
      }

      if (!invalidSubmissionId) {
        throw new Error("Invalid submission id");
      }

      var submittedReport = await ReportSubmission.findOne({
        _id: reportSubmitId,
      });
      if (!submittedReport) throw new Error("Unable to find Report.");

      if (
        data.status &&
        data.status !== "COMPLETED" &&
        data.status !== "PENDING" &&
        data.status !== "INPROGRESS"
      ) {
        throw new Error(
          "Status should be either one COMPLETED/PENDING/INPROGRESS"
        );
      }

      data.status =
        data.status === "COMPLETED" ? (data.status = "REVIEWING") : data.status;

      if (!data?.status) {
        data.status = "PENDING";
      }

      let updatedData = await ReportSubmission.updateOne(
        {
          _id: new Types.ObjectId(reportSubmitId),
          "submissions._id": new Types.ObjectId(submissionId),
        },
        {
          $set: {
            "submissions.$.submitted_data": data.submitted_data,
            "submissions.$.status": data.status,
          },
        },
        {
          new: true,
        }
      );

      if (!updatedData.matchedCount)
        throw new Error("Unable to find matching record");
      if (!updatedData.modifiedCount) throw new Error("Unable to modify");

      if (data.status === "COMPLETED") {
        await service.emailAndNotification.sendNotificationToMany({
          assignTo: [String(submittedReport.created_by)],
          title: `Report Marked Completed`,
          text: `Title: ${submittedReport.title}`,
          priority: "STANDARD" as any,
          createdByRef: String(submittedReport.created_by),
        });
      }

      return "Updated successfully";
    } catch (error: any) {
      throw new Error(error.message || "Some thing went wrong");
    }
  };

  trackMyReports = async (id: ObjectId) => {
    try {
      // this code will never run because it is handling by graphql by default
      if (!id) throw new Error("Id is required");

      let ID = Types.ObjectId.isValid(id as unknown as string);
      if (!ID) throw new Error("Invalid employee id");

      let match: object = { assignedTo: id };

      const reportSubmissions = (await ReportSubmission.find(match)
        .populate("assignedTo")
        .populate("createdBy_id")
        .sort({ createdAt: -1 })) as any;
      return reportSubmissions;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  };

  pickFacilityReport = async (
    assignedReportId: ObjectId,
    pickerId: ObjectId
  ): Promise<IGenericType> => {
    const exists = (await ReportSubmission.findOne({
      _id: assignedReportId,
    }).catch((_) => {
      throw new Error(_.message);
    })) as unknown as ReportSubmission;
    if (!exists) throw new Error("Unable to find matching Report Reference");
    if (exists?.assignedTo) throw new Error("Already Picked");

    const update = await ReportSubmission.updateOne(
      { _id: assignedReportId },
      { assignedTo: pickerId },
      { upsert: false }
    ).catch((err) => {
      throw new Error(err.message);
    });
    if (!update.matchedCount)
      throw new Error("Unable to find matching Report Reference");
    if (!update.modifiedCount) throw new Error("Unable to Pick Report");

    return {
      status: true,
      message: "Report has been Picked Successfully",
      data: null,
    };
  };
}
