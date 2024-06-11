/* eslint-disable */
import { ObjectId, Types } from "mongoose";
import _ from "../../models/report_submission.model";
import userModel from "../../models/user.model";
import { ESubmissionStatus } from "../generated/graphql";

export class ReportSubmissionDBService {
  findById = async (id: string): Promise<ReportSubmission> => {
    try {
      const report = await _.findOne({ _id: id })
        .populate('assignedTo')
        .populate('belongs_to')
        .populate('assignedToFacilityRef')
        .populate('created_by') as unknown as Promise<ReportSubmission>;

      if (!report) throw new Error("Report Not Found")

      return report
    } catch (e: any) {
      console.log(e.message)
      throw new Error('Something went wrong')
    }
  };

  track = async (createdById: ObjectId, tableFilter: ITableFilters): Promise<ReportTemplate[]> => {
    try {

      const requestingUser = await userModel.findById(createdById)
      let searchById: string = createdById.toString();
      if (requestingUser?.company?.employee && requestingUser?.belongsTo) {
        searchById = requestingUser.belongsTo;
      }

      let matchObj: any = {};
      // Trying to filter
      if (tableFilter) {
        // Filter: Name
        if (tableFilter?.Name) {
          matchObj = {
            ...matchObj,
            name: { $regex: tableFilter?.Name, $options: "i" }
          };
        }
        if (tableFilter?.start && !tableFilter?.end) {
          matchObj = {
            ...matchObj,
            createdAt: { $gte: new Date(tableFilter.start) },
          };
        }
        if (!tableFilter?.start && tableFilter?.end) {
          matchObj = {
            ...matchObj,
            createdAt: { $lte: new Date(tableFilter.end) },
          };
        }
        if (tableFilter?.start && tableFilter?.end) {
          matchObj = {
            ...matchObj,
            $and: [
              { createdAt: { $gte: new Date(tableFilter.start) } },
              { createdAt: { $lte: new Date(tableFilter.end) } }
            ]
          };
        }
        if (tableFilter?.reportType) {
          matchObj = {
            ...matchObj,
            reportType: tableFilter.reportType
          };
        }
        const status = tableFilter?.status?.toLowerCase().replace(" ", "");
        if (status === "completed") {
          matchObj = { ...matchObj, "submissions.status": ESubmissionStatus.Completed };
        }
        else if (status === "pending") {
          matchObj = { ...matchObj, "submissions.status": ESubmissionStatus.Pending };
        }
        else if (status === "inprocess") {
          matchObj = { ...matchObj, "submissions.status": ESubmissionStatus.Inprogress };
        }
      }

      matchObj = {
        ...matchObj,
        $or: [
          { created_by: new Types.ObjectId(searchById) },
          { clientAdminRef: new Types.ObjectId(searchById) }
        ]
      }

      return await _.aggregate([{ $match: matchObj },
      {
        $sort: {
          createdAt: -1 // Use -1 for descending order, 1 for ascending
        }
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'assignedTo',
          as: 'assignedTo'
        }
      },
      {
        $lookup: {
          from: 'parklocations',
          foreignField: '_id',
          localField: 'assignedToFacilityRef',
          as: 'assignedToFacilityRef'
        }
      },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'created_by',
          as: 'created_by'
        }
      },
      {
        $unwind: { path: '$assignedTo', preserveNullAndEmptyArrays: true }
      },
      {
        $unwind: { path: '$assignedToFacilityRef', preserveNullAndEmptyArrays: true }
      },
      {
        $unwind: { path: '$created_by', preserveNullAndEmptyArrays: true }
      }

      ])
        .catch(e => {
          throw new Error(e)
        }) as unknown as ReportTemplate[]

    } catch (e: any) {
      console.log(e.message)
      throw new Error('Something went wrong')
    }
  };

  approveSubmission = async (
    submissionId: ObjectId,
    assignedReportId: ObjectId,
    approverId: ObjectId
  ): Promise<IGenericType> => {

    const auth = await _.exists({
      _id: assignedReportId,
      $or: [{ createdBy_id: approverId }, { clientAdminRef: approverId }],
    });
    if (!auth) throw new Error("Access Denied");

    const update = await _.updateOne(
      { _id: assignedReportId, "submissions._id": submissionId },
      { $set: { "submissions.$.status": ESubmissionStatus.Completed } },
      { upsert: false }
    ).catch((_) => {
      throw new Error(_.message);
    });

    if (!update.matchedCount) throw new Error("Unable to find matching Report");
    if (!update.modifiedCount)
      throw new Error("Unable to update matching Report");

    return {
      status: true,
      message: "Successfully Approved",
      data: null,
    } as IGenericType;
  };

}
