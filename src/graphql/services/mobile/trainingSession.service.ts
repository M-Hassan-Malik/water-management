/* eslint-disable */
import trainingSessionModel from "../../../models/training_session.model";
import linkVATModel from "../../../models/link_VAT.model";
import { Types } from "mongoose";
import service from "../";
import { MobileUpdateTrainingSessionInput, TrainingSessionUpdateInputForMobile } from "@/graphql/generated/graphql";

export class MobileTrainingSessionDBService {

  

  find = async (
    userId: string,
    filter: ITableFilters
  ): Promise<ITaskAssigned[]> => {
    const sort: any = {
      createdAt: -1,
    };

    let isValidUserId = Types.ObjectId.isValid(userId);

    if (!isValidUserId) {
      throw new Error("Invalid user id");
    }

    let user = await service.user.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    let filterData: any = {
      $or: [
        {
          userRef: new Types.ObjectId(userId),
        },
        {
          assignedToFacilityRef: {$in:
            user?.company?.location }
            
        },
      ],
    };

    if (filter && filter.status) {
      filterData["sessions.status"] = filter.status;
    }

    if (filter && filter.sortField && filter.sortOrder) {
      const { sortField, sortOrder }: any = filter;

      sort[sortField] = Number(sortOrder);
    }

    const task = await trainingSessionModel
      .aggregate([
        {
          $match: filterData,
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
      ])
      .catch((_) => {
        throw new Error(_.message);
      });

    if (!task) throw new Error("Assigned Task not found");
    return task;
  };

  findOneAndUpdate = async (
    { trainingSessionId, sessionsId }: MobileUpdateTrainingSessionInput,
    data: TrainingSessionUpdateInputForMobile
  ): Promise<any> => {
    
    await trainingSessionModel.findOne({
      _id: trainingSessionId,
    });

    if (
      data.status &&
      data.status !== "COMPLETED" &&
      data.status !== "PENDING"
    ) {
      throw new Error("Status should be COMPLETED or PENDING");
    }
    if (!data?.status) {
      data.status = "PENDING";
    }

    if (!data?.status) {
      data.status = "PENDING";
    }

    let updatedData:any = await trainingSessionModel
    .findOneAndUpdate(
      {
        _id: new Types.ObjectId(trainingSessionId),
        "sessions._id": sessionsId,
      },
      {
        $set: {
          "sessions.$.session": data.session,
          "sessions.$.status": data.status,
        },
      },
      { new: true } // This option returns the modified document instead of the original one
    )
    .catch((error) => {
      throw new Error(error.message);
    }) as any;
  
  if (!updatedData)
    throw new Error("Unable to modify");
  
  const vat =   await linkVATModel.findOne({trainingAssignedRef:trainingSessionId })
  if(!vat) 
  throw new Error("Unable to find related VAT");
  
  if (data.status === "COMPLETED" && vat) {
      
      const dillResult = await service.VAT_DBService.assignFollowUpDrill(trainingSessionId)
      if(!dillResult.status)  throw new Error("Unable to Assign Followup drill")

      await service.emailAndNotification.sendNotificationToMany({
        assignTo: [updatedData.authority],
        title: `Training Marked Completed`,
        text: `${updatedData.title}`,
        priority: "STANDARD" as any,
        createdByRef: updatedData.userRef,
      });
    }else {
      await service.emailAndNotification.sendNotificationToMany({
        assignTo: [updatedData.authority],
        title: `Training Marked Completed`,
        text: `${updatedData.title}`,
        priority: "STANDARD" as any,
        createdByRef: updatedData.userRef,
      });
    }

    return "Updated successfully";
  };
}
