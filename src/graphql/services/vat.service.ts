/* eslint-disable */
import { Types, startSession, ObjectId } from "mongoose";
import reportSubmissionModel from "../../models/report_submission.model";
import _ from "../../models/link_VAT.model";
import userModel from "../../models/user.model";
import trainingModel from "../../models/training.model";
import trainingSessionsModel from "@/models/training_session.model";
import taskAssignModel from "../../models/task_assigned.model";
import { ESubmissionStatus,EAssignBy, EScheduleType, EvaluateVatInput, EPriority, GetFailedVatResponse, AttachTaskToTrainingInput } from "../generated/graphql";
import services from ".";
import moment from "moment";

export class VAT_DBService {

  evaluateVAT = async (payload: EvaluateVatInput): Promise<string> => {


    let response: string = ""

    const session = await startSession();
    try {
      session.startTransaction();


      let submissions = payload.submissions;

      const VATreport = await reportSubmissionModel.findById(payload.report_id);
      if (!VATreport) throw new Error("VAT Report do not exists");
      else if (VATreport?.submissions[0]?.status as any === ESubmissionStatus.Failed) throw new Error("VAT Report already reviewed as FAILED");

      const submitted_data = payload.submissions[0]?.submitted_data,
        result = submitted_data.filter((_: any) => _.options.includes("11 Seconds or more - REMEDIATION"))[0]

      if (result?.options[1] === result?.value) {
        // VAT Failed

        submissions = [{
          _id: payload.submissions[0]?._id,
          submitted_data: payload.submissions[0]?.submitted_data,
          date: payload.submissions[0]?.date,
          status: ESubmissionStatus.Failed,
        }]


        const assignedToUser = await userModel.findById(VATreport.assignedTo),
          assignedToFacilityRef: string = String(assignedToUser?.company?.location),
          taskId = new Types.ObjectId()

        const remediationTask: any = {
          _id: taskId,
          type: "TASK",
          title: "Remediation Required",
          detail: `Initial VAT Failed which was assigned to ${assignedToUser?.first_name + " " + assignedToUser?.last_name}.`,
          media: [],
          createdBy_id: VATreport.created_by,
          facility: VATreport.facility,
          clientAdminRef: VATreport.clientAdminRef,
          taskId: new Types.ObjectId(),
          deadline: VATreport.deadline,
          priority: EPriority.Alert,
          scheduleType: "ONE_TIME",
          assignedToFacilityRef,
          submissions: [
            {
              date: new Date(),
              status: ESubmissionStatus.Pending,
              _id: new Types.ObjectId(),
            }
          ],
        }

        await taskAssignModel.create([remediationTask], { session: session })
          .catch((_) => {
            throw new Error(_.message);
          });

        const linkVATobj: ILinkVAT = {
          assignedToFacilityRef: assignedToFacilityRef,
          taskAssignedRef: taskId.toString(),
          trainingAssignedRef: null,
        };
        await _.create([linkVATobj], { session: session })
          .catch((_) => {
            throw new Error(_.message);
          });

        response = `Initial Vat Failed`

      } else {
        // VAT Passed


        submissions = [{
          _id: payload.submissions[0]?._id,
          submitted_data: payload.submissions[0]?.submitted_data,
          date: payload.submissions[0]?.date,
          status: ESubmissionStatus.Completed,
        }]

        response = `Initial Vat Passed`

      }

      const updateReport = await reportSubmissionModel.updateOne(
        { _id: payload.report_id },
        { $set: { submissions: submissions } },
        { upsert: false, session: session }
      ).catch((_) => {
        throw new Error(_.message);
      });

      if (!updateReport.matchedCount) throw new Error("Unable to find matching VAT Report");
      if (!updateReport.modifiedCount) throw new Error("Unable to update matching VAT Report");

      await session.commitTransaction();

    } catch (error: any) {
      await session.abortTransaction();
      throw new Error(error.message);
    } finally {
      await session.endSession();
    }
    return response;
  };

  getFailedVAT = async (facilityId: ObjectId): Promise<GetFailedVatResponse[]> => {

    const data: GetFailedVatResponse[] =
      await _.find({ assignedToFacilityRef: facilityId, trainingAssignedRef: null })
        .populate('taskAssignedRef')
        .populate('trainingAssignedRef');

    if (!data.length) throw new Error("Failed VATs not found")

    return data
  };

  attachTaskToTraining = async ({ trainingId, VAT_id, assignTo, dueDate, priority }: AttachTaskToTrainingInput): Promise<string> => {

    const session = await startSession();
    try {
      session.startTransaction();

      const training = await trainingModel.findById(trainingId)
        .catch(() => {
          throw new Error("Unable to find Training Template.");
        }) as unknown as ITraining;
      if (!training) throw new Error("Unable to Find Training.");

      const trainingSessionId = new Types.ObjectId();

      const vat: ILinkVAT | null = await _.findByIdAndUpdate({ _id: VAT_id },
        { trainingAssignedRef: trainingSessionId },
        { new: true, session: session })
      if (!vat) throw new Error("Unable to VAT in records.");

      const trainingSessionObj: ITrainingSession = {
        _id: String(trainingSessionId),
        type: "TRAINING",
        title: training.title,
        facility: training.facility as string,
        sessions: [
          {
            date: dueDate,
            session: training.sessions,
            status: ESubmissionStatus.Pending as any,
          },
        ],
        scheduleType: EScheduleType.OneTime,
        authority: training.createdBy as string,
        createdBy: training.createdBy as string,
        priority: priority as any,
        userRef: assignTo as string,
        status: ESubmissionStatus.Pending as any,
        trainingRef: String(new Types.ObjectId()),
      }



      await trainingSessionsModel.create([trainingSessionObj], { session: session })
        .catch((_) => {
          throw new Error(_.message);
        });
      await session.commitTransaction();
      return "Training Task Attached to the Training"
    }
    catch (_: any) {
      await session.abortTransaction();
      throw new Error(_.message);
    } finally {
      await session.endSession();
    }

  };

  assignFollowUpDrill = async (trainingSessionId: string): Promise<IGenericType> => {

    try {        
        const trainingSession = await trainingSessionsModel.findOne({ _id: trainingSessionId })
        .catch((_: any) => {
          throw new Error("something went wrong when fetching vat ref")
        }) as unknown as ITrainingSession;
      
      const obj: IAssignInput = {
        id: "6597d007bf603d28ca90c6b0", // followup drill _id
        assigner_id: String(trainingSession.createdBy),
        assignTo: [String(trainingSession.userRef)],
        scheduleType: EScheduleType.OneTime,
        priority: EPriority.Alert as any,
        assignBy: EAssignBy.User as any,
        dueDate: moment().add(7, "days").toDate(),
      }
      
      const followUpDillAssigned = await services.reportTemplate.assign(obj);
      if (followUpDillAssigned !== "Assigned") throw new Error("Unable to Assign Followup drill")
      

      return {
        status: true,
        data: null,
        message: "success",
      }
    } catch (err: any) {
      throw new Error(err.message);
    }


  };

}
