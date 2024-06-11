/* eslint-disable */

import {
  EAssignBy,
  type AddTrainingSessionInput,
  type AssignTrainingSessionInput,
  type UpdateTrainingInput,
  type UserInput
} from "@/graphql/generated/graphql";
import { ObjectId, startSession } from "mongoose";
import _ from "@/models/training.model";
import trainingSessionsModel from "@/models/training_session.model";
import reportTemplateModel from "@/models/report_template.model";
import userModel from "@/models/user.model";
import reportAssignModel from "@/models/report_submission.model";
import moment from "moment-timezone";

import Service from ".";
export class TrainingDBService {
  findOne = async (trainingId: ObjectId): Promise<ITraining> => {
    const training = (await _.findById(trainingId)
      .populate("createdBy")
      .populate("facility")
      .catch((_) => {
        throw new Error(_.message);
      })) as unknown as ITraining;

    if (!training) throw new Error("Unable to find Training");

    return training;
  };

  create = async (payload: AddTrainingSessionInput): Promise<IGenericType> => {

    const user = await userModel.findById(payload.createdBy).catch((_) => {

      throw new Error(_.message);
    });
    if (!user) throw new Error("Unable to find user");

    let finalPayload: any = { ...payload, createdAt: moment(moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate() };

    if (user?.company?.employee) {
      finalPayload = { ...finalPayload, authority: user.belongsTo };
    }

    const trainingSession = await _.create(finalPayload).catch((_: any) => {
      throw new Error(_.message);
    });
    return {
      status: true,
      message: "Training Added Successfully",
      data: trainingSession,
    };
  };

  updateOne = async ({
    _id,
    ...payload
  }: UpdateTrainingInput): Promise<IGenericType> => {
    const update = await _.updateOne({ _id }, payload, { upsert: false }).catch(
      (_) => {
        throw new Error(_.mesage);
      }
    );
    if (!update.matchedCount)
      throw new Error("Unable to find matching training in the records.");
    if (!update.modifiedCount) throw new Error("Unable to modify training.");

    return {
      status: true,
      message: "Training Updated Successfully",
      data: payload,
    };
  };

  deleteOne = async (_id: ObjectId): Promise<IGenericType> => {
    const deleted = await _.deleteOne({ _id })
      .catch(
        (_) => {
          throw new Error(_.mesage);
        }
      );
    if (!deleted.deletedCount)
      throw new Error("Unable to delete matching training in the records.");

    return {
      status: true,
      message: "Training Template Deleted Successfully",
      data: null,
    };
  };

  getMyTrainings = async (clientId: ObjectId): Promise<ITraining[]> => {
    const requestingUser = await userModel.findById(clientId);

    let match: object = {
      $or: [
        { authority: clientId.toString() },
        { createdBy: clientId.toString() }
      ]
    };

    if (requestingUser?.company?.employee && requestingUser?.belongsTo) {
      match = {
        $or: [
          { authority: requestingUser.belongsTo.toString() },
          { createdBy: requestingUser.belongsTo.toString() }
        ]
      };
    }

    const trainings = (await _.find(match)
      .sort({ createdAt: -1 })
      .populate("createdBy")
      .catch((_: any) => {
        throw new Error(_.message);
      })) as unknown as ITraining[];
    return trainings;
  };

  assign = async (payload: IAssignTrainingSessionInput): Promise<string> => {
    var session = await startSession();
    session.startTransaction();
    try {

      var overallUsers: string[] = [];
      // check if External/Pectora users exists in payload
      if (payload?.externalUsers?.length) {


        let existingUserIds = await userModel.find({ email: { $in: payload.externalUsers.map(user => user.email) } }, { _id: 1, email: 1 }),
          newUsers: IUser[] = [];

        overallUsers = existingUserIds.map(user => String(user._id));

        if (existingUserIds.length)
          newUsers = payload.externalUsers
            .filter(payloadUser => {
              return existingUserIds.every((dbUser: any) => dbUser.email !== payloadUser.email)
            });
        else
          newUsers = payload.externalUsers;

        // Insert new users
        if (newUsers.length > 0) {


          const newExternalCreatedUsers = await userModel.insertMany(newUsers, { ordered: true, session: session })
            .catch((_) => {
              throw new Error(_.message);
            });


          overallUsers = overallUsers.concat(newExternalCreatedUsers.map(_ => String(_._id)));


        }

      }

      const training = await _.findById(payload.id).catch(() => {
        throw new Error("Unable to Assign Training.");
      });
      if (!training) throw new Error("Unable to Find Training.");



      const assigningUser = await userModel.findOne(
        { _id: payload?.externalUsers?.length ? payload?.externalUsers[0]?.created_by : payload.assignTo[0] },
        { belongsTo: 1 }
      );

      var trainings: ITrainingSession[] | any = [];

      if (overallUsers.length) {

        trainings = overallUsers.flatMap(
          (userId) => {
            let data = {
              type: "TRAINING",
              title: training.title,
              facility: training.facility,
              sessions: [
                {
                  date: moment(moment(payload.dueDate).add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
                  session: training.sessions,
                  status: "PENDING",
                },
              ],
              scheduleType: payload.scheduleType,
              authority: assigningUser?.belongsTo
                ? assigningUser.belongsTo
                : assigningUser?._id,
              createdBy: assigningUser?._id,
              trainingRef: payload.id,
              status: "PENDING",
              priority: payload.priority,
              createdAt: moment(moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
            } as ITrainingSession;
            payload.assignBy === "FACILITY"
              ? (data.assignedToFacilityRef = payload.assignTo[0])
              : (data.userRef = userId);
            return data;
          }
        );

      }


      if (payload?.assignTo?.length) {


        const temp = payload.assignTo.flatMap(
          (userId) => {
            let data = {
              type: "TRAINING",
              title: training.title,
              facility: training.facility,
              sessions: [
                {
                  date: moment(moment(payload.dueDate).add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
                  session: training.sessions,
                  status: "PENDING",
                },
              ],
              scheduleType: payload.scheduleType,
              authority: assigningUser?.belongsTo
                ? assigningUser.belongsTo
                : assigningUser?._id,
              createdBy: assigningUser?._id,
              trainingRef: payload.id,
              status: "PENDING",
              priority: payload.priority,
              createdAt: moment(moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
            } as ITrainingSession;
            payload.assignBy === "FACILITY"
              ? (data.assignedToFacilityRef = payload.assignTo[0])
              : (data.userRef = userId);
            return data;
          }
        )

        // merge AssignTo in Overall users if Overall exists
        trainings = [...trainings, ...temp];

      }

      const assigned = await trainingSessionsModel
        .insertMany(trainings, { session: session })
        .catch((_) => {
          throw new Error(_.message);
        });

      if (!assigned.length)
        throw new Error("Unable to assign Training Sessions to Users.");


      if (payload.assignBy === EAssignBy.Facility as any) {
        const facilityUsers = await userModel.find(
          { "company.location": payload.assignTo },
          { _id: 1 }
        );

        if (facilityUsers.length) {
          const notificationResult =
            await Service.emailAndNotification.sendNotificationToMany({
              assignTo: facilityUsers.flatMap((_) => _._id),
              title: `Training Assigned`,
              text: `${training.title}`,
              priority: payload.priority,
              createdByRef: payload.assigner_id,
            });
          console.log(notificationResult);
        }
      } else {
        const notificationResult =
          await Service.emailAndNotification.sendNotificationToMany({
            assignTo: assigned.flatMap((_) => _.userRef),
            title: `Training Assigned`,
            text: `${training.title}`,
            priority: payload.priority,
            createdByRef: payload.assigner_id,
          });
        console.log(notificationResult);
      }

      await session.commitTransaction();

      return "Training Assign Successfully";
    } catch (_: any) {
      await session.abortTransaction();
      throw new Error(_.message);
    }
    finally {
      await session.endSession();
    }
  };

  assignInServiceTraining = async (payload: AssignTrainingSessionInput): Promise<string> => {

    var session = await startSession(), overallUserIds: string[] = [], existingUserFields: IUser[], existingUsersByAssignTo: IUser[];
    session.startTransaction();


    try {
      existingUsersByAssignTo = await userModel.find({ _id: { $in: payload.assignTo } },
        { _id: 1, first_name: 1, last_name: 1 });

      // check if External/Pectora users exists in payload
      if (payload?.externalUsers?.length) {

        existingUserFields = await userModel.find({ email: { $in: payload.externalUsers.map(user => user.email) } },
          { _id: 1, email: 1, first_name: 1, last_name: 1 });

        let newUsers: UserInput[] = [];

        overallUserIds = existingUserFields.map(user => String(user._id)); // extract only IDs from existing users

        if (existingUserFields.length)
          newUsers = payload.externalUsers
            .filter(externalUser => {
              return existingUserFields.every((dbUser: any) => dbUser.email !== externalUser.email)
            });
        else
          newUsers = payload.externalUsers;

        // Insert new users
        if (newUsers.length > 0) {


          const newExternalCreatedUsers = await userModel.insertMany(newUsers, { ordered: true, session: session })
            .catch((_) => {
              throw new Error(_.message);
            });


          overallUserIds = overallUserIds.concat(newExternalCreatedUsers.map(_ => String(_._id)));


        }

      }

      const inServiceReportTraining = await reportTemplateModel.findById(payload.id)
        .catch(() => {
          throw new Error("Unable to Assign Training.");
        });
      if (!inServiceReportTraining) throw new Error("Unable to Find Training.");



      const assigningUser = await userModel.findOne(
        { _id: payload?.externalUsers?.length ? payload?.externalUsers[0]?.created_by : payload.assignTo[0] },
        { belongsTo: 1 }
      );

      var inServiceAssign: ReportSubmission[] | any = [];

      if (overallUserIds.length) {
        
        const externalUserExists = payload?.externalUsers?.length ? true : false;
        inServiceAssign = overallUserIds.flatMap(
          (userId) => {
            let fields: any = inServiceReportTraining.fields, usrFound: boolean = false;

            if (externalUserExists) {
              const usr: UserInput[] = payload?.externalUsers?.filter(externalUsr => String(userId) === String(externalUsr._id)) as UserInput[];

              if (usr?.length) {
                usrFound = true;

                fields = inServiceReportTraining.fields.flatMap((field: any) => {
                  //check if field exists with desired label then assign name as value
                  if (field.label.toLowerCase().trim().includes("lead instructor for in-service"))
                    return {
                      _id: field._id,
                      label: field.label,
                      type: field.type,
                      placeholder: field.placeholder,
                      options: field.options,
                      src: field.src,
                      value: `${usr[0]?.first_name} ${usr[0]?.last_name}`
                    }
                  else return field
                })
              }
            }

            if (!usrFound) {

              const usr: IUser[] = existingUsersByAssignTo?.filter(existingUsr => String(userId) === String(existingUsr._id)) as IUser[];
              console.log(usr)
              if (usr?.length) {
                fields = inServiceReportTraining.fields.flatMap((field: any) => {
                  //check if field exists with desired label then assign name as value
                  if (field.label.toLowerCase().trim().includes("lead instructor for in-service"))
                    return {
                      _id: field._id,
                      label: field.label,
                      type: field.type,
                      placeholder: field.placeholder,
                      options: field.options,
                      src: field.src,
                      value: `${usr[0]?.first_name} ${usr[0]?.last_name}`
                    }
                  else return field
                })
              }
            }
            
            let data = {
              type: "IN_SERVICE",
              title: inServiceReportTraining.name,
              facility: inServiceReportTraining.facility ? inServiceReportTraining.facility : null,
              submissions: [
                {
                  date: moment(moment(payload.dueDate).add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
                  submitted_data: fields,
                  status: "PENDING",
                },
              ],
              deadline: moment(moment(payload.dueDate).add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
              scheduleType: payload.scheduleType,
              belongs_to: inServiceReportTraining._id,
              clientAdminRef: assigningUser?.belongsTo
                ? assigningUser.belongsTo
                : assigningUser?._id,
              trainingRef: payload.id,
              status: "PENDING",
              priority: payload.priority,
              reportType: "IN_SERVICE",
              created_by: payload.assigner_id,
              createdAt: moment(moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
            } as unknown as ReportSubmission;
            payload.assignBy === "FACILITY"
              ? (data.assignedToFacilityRef = payload.assignTo[0] as string)
              : (data.assignedTo = userId);
            return data;
          }
        );

      }
      

      if (payload?.assignTo?.length) {

        const temp = payload.assignTo.flatMap(
          (userId) => {

            let fields: any = inServiceReportTraining.fields;

            const usr: IUser[] = existingUsersByAssignTo?.filter(existingUsr => String(userId) === String(existingUsr._id)) as IUser[];

            if (usr?.length) {
              fields = fields.flatMap((field: any) => {
                //check if field exists with desired label then assign name as value
                if (field.label.toLowerCase().trim().includes("lead instructor for in-service"))
                  return {
                    _id: field._id,
                    label: field.label,
                    type: field.type,
                    placeholder: field.placeholder,
                    options: field.options,
                    src: field.src,
                    value: `${usr[0]?.first_name} ${usr[0]?.last_name}`
                  }
                else return field
              })
            }

            let data = {
              type: "IN_SERVICE",
              title: inServiceReportTraining.name,
              facility: inServiceReportTraining.facility ? inServiceReportTraining.facility : null,
              submissions: [
                {
                  date: moment(moment(payload.dueDate).add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
                  submitted_data: fields,
                  status: "PENDING",
                },
              ],
              deadline: moment(moment(payload.dueDate).add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
              scheduleType: payload.scheduleType,
              belongs_to: inServiceReportTraining._id,
              clientAdminRef: assigningUser?.belongsTo
                ? assigningUser.belongsTo
                : assigningUser?._id,
              trainingRef: payload.id,
              status: "PENDING",
              reportType: "IN_SERVICE",
              priority: payload.priority,
              created_by: payload.assigner_id,
              createdAt: moment(moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate(),
            } as unknown as ReportSubmission;

            payload.assignBy === "FACILITY"
              ? (data.assignedToFacilityRef = payload.assignTo[0] as string)
              : (data.assignedTo = userId);
            return data;
          }
        )

        // merge AssignTo in Overall users if Overall exists
        inServiceAssign = [...inServiceAssign, ...temp];
      }

      const assigned = await reportAssignModel
        .insertMany(inServiceAssign, { session: session })
        .catch((_) => {
          throw new Error(_.message);
        });

      if (!assigned.length)
        throw new Error("Unable to assign Training Sessions to Users.");

      if (payload.assignBy === EAssignBy.Facility) {
        const facilityUsers = await userModel.find(
          { "company.location": payload.assignTo },
          { _id: 1 }
        );
        if (facilityUsers.length) {
          const notificationResult =
            await Service.emailAndNotification.sendNotificationToMany({
              assignTo: facilityUsers.flatMap((_) => _._id),
              title: `In-service Training Assigned`,
              text: `${inServiceReportTraining.name}`,
              priority: payload.priority as any,
              createdByRef: payload.assigner_id,
            });
          console.log(notificationResult);
        }
      } else {
        const notificationResult =
          await Service.emailAndNotification.sendNotificationToMany({
            assignTo: assigned.flatMap((_) => _.assignedTo),
            title: `In-service Training Assigned`,
            text: `${inServiceReportTraining.name}`,
            priority: payload.priority as any,
            createdByRef: payload.assigner_id,
          });
        console.log(notificationResult);
      }

      await session.commitTransaction();

      return "In-Service Training Assigned Successfully";
    } catch (_: any) {
      await session.abortTransaction();
      throw new Error(_.message);
    }
    finally {
      await session.endSession();
    }
  };


}