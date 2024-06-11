/* eslint-disable */
import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { UserInputError } from "apollo-server-errors";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "graphql-tools";
import { ObjectId } from "mongoose";
import type {
  AddTrainingSessionInput, LoginInput,
  UpdateTrainingInput,
  EmployeeInput,
  TaskUpdateInput,
  UpdateEmployeeInput,
  EditEmailAndNotificationInput,
  UpdateProfileInput,
  AssignEmailAndNotificationInput,
  EReportType,
  InputSubAdmin,
  InputRegisterClient,
  UpdateFacilityRequestInput,
  UserPackageModifyInput,
  ResetPasswordInput, UpdateSubAdminInput,
  PostTickerInput,
  GetClientSecretInput,
  PointOfInterest,
  PointOfInterestInput,
  UpdatePointOfInterestInput,
  EvaluateVatInput,
  GetFailedVatResponse,
  AttachTaskToTrainingInput,
  AddPectoraAuthInput,
  PectoraAuth,
  MobileUpdateTrainingSessionInput,
  TrainingSessionUpdateInputForMobile,
  TaskInput,
  AssignInServiceInput,
  FacilityFilterInput
} from "@/graphql/generated/graphql";
import { permissions } from "@/graphql/permissions/permissions";
import Service from "@/graphql/services";
import { typeDefs } from "@/graphql/typedef/typedef";
import operationModel from "@/models/operation.model";
import packageModel from "@/models/package.model";
import { MongoHelper } from "@/utils/helpers/mongodb";
import express from "express";

//@ts-ignore
// import graphqlUploadExpress from "node_modules/graphql-upload/graphqlUploadExpress";

import { graphqlUploadExpress } from "graphql-upload";
// import { getAuthValue } from "@/utils/helpers/functions";

const app = express();

const resolvers = {
  Query: {
    dogs: () => [{ name: "Bo" }, { name: "Lessie" }],

    // Dashboard
    getEmployeeHomeScreenData: async (
      _: any,
      { userId }: { userId: ObjectId }
    ): Promise<string> => {
      return (await Service.dashboard.getEmployeeHomeScreenData(
        userId
      )) as unknown as Promise<string>;
    },

    // Department
    findAllDepartments: async (): Promise<IDepartment[]> => {
      return (await Service.department.find()) as unknown as Promise<
        IDepartment[]
      >;
    },

    findDepartmentsByOwnerId: async (
      _: any,
      {
        clientAdminId,
        filter,
      }: { clientAdminId: ObjectId; filter: ITableFilters }
    ): Promise<IFindDepartmentByClientId[]> => {
      if (!clientAdminId) throw new Error("Client Id Not Found");
      return (await Service.department.findDepartmentsByOwnerId(
        clientAdminId,
        filter
      )) as unknown as Promise<IFindDepartmentByClientId[]>;
    },
    findDepartmentById: async (
      _: any,
      { departmentId }: { departmentId: ObjectId }
    ): Promise<IDepartment> => {
      if (!departmentId) throw new Error("Department ID Not Found");
      return (await Service.department.findById(
        departmentId
      )) as unknown as Promise<IDepartment>;
    },

    // Role
    findRole: async (): Promise<[IRole]> => {
      return (await Service.role.find()) as unknown as Promise<[IRole]>;
    },

    findRoleById: async (_: any, { id, filter }: { id: ObjectId, filter: ObjectId }): Promise<IRole> => {
      return (await Service.role.findById(id, filter)) as unknown as Promise<IRole>;
    },

    manageRolesListing: async (
      _: any,
      { userId, filter }: { userId: ObjectId; filter: ITableFilters }
    ) => {
      return Service.role.manageRolesListing(userId, filter);
    },

    findRolesByUserId: async (
      _: any,
      { id, facilityId }: { id: ObjectId, facilityId?: ObjectId }
    ): Promise<IRole[]> => {
      return (await Service.role.findRolesByUserId(id, facilityId)) as unknown as Promise<
        IRole[]
      >;
    },

    // User
    users: async () => {
      return Service.user.find();
    },
    findRelatingUsers: async (
      _: any,
      { id, filter }: { id: ObjectId; filter: ITableFilters }
    ) => {
      return Service.user.manageUserListing(id, filter);
    },
    findMyUsers: async (
      _: any,
      {
        ownerId,
        facilityId
      }: { ownerId: ObjectId; facilityId: ObjectId; }
    ): Promise<IUser[]> => {
      return Service.user.findMyUsersAndMyself(ownerId, facilityId);
    },
    getSubAdminList: async (
      _: any,
      { id, filter }: { id: ObjectId; filter: ITableFilters }
    ) => {
      return Service.user.getSubAdminList(id, filter);
    },
    userById: async (_: any, { id }: { id: string }) => {
      return Service.user.findById(id);
    },

    // Park Locations
    userLocations: async (
      _: any,
      { id, filter }: { id: ObjectId; filter: ITableFilters }
    ) => {
      return Service.parkLocations.userLocations(id, filter);
    },
    requestedLocations: async (
      _: any,
      { filter }: { filter: ITableFilters }
    ) => {
      return Service.parkLocations.requestedLocations(filter);
    },
    getLocationById: async (_: any, { id }: { id: ObjectId }) => {
      return Service.parkLocations.getLocationById(id);
    },
    getUserParks: async (
      _: any,
      { userId, filter }: { userId: string; filter: ITableFilters }
    ) => {
      return Service.parkLocations.getUserParks(userId, filter);
    },
    getFacilities: async (
      _: any,
      { userId, filter }: { userId: ObjectId, filter?: FacilityFilterInput }
    ): Promise<IParkLocation[]> => {
      return await Service.parkLocations.getFacilities(userId, filter);
    },

    // Operation
    operations: async (): Promise<IOperation[]> => {
      return (await operationModel.find()) as unknown as Promise<IOperation[]>;
    },
    // User Package
    trackClientAdmins: async (
      _: any,
      { filter }: { filter: ITableFilters }
    ): Promise<IUser[]> => {
      return Service.userPackage.trackClientAdmins(filter);
    },
    trackParticularClientRecord: async (
      _: any,
      { userId }: { userId: ObjectId }
    ): Promise<IPackage[]> => {
      return Service.userPackage.trackParticularClientRecord(userId);
    },

    getUserPackageModuleById: async (
      _: any,
      { subscriptionId }: { subscriptionId: ObjectId }
    ): Promise<IPackage> => {
      return Service.userPackage.getUserPackageModuleById(subscriptionId);
    },

    // Package
    findAllPackages: async (): Promise<IPackage[]> => {
      return (await Service.package.find()) as unknown as Promise<IPackage[]>;
    },
    findPackageById: async (
      _: any,
      { PackageId }: { PackageId: string }
    ): Promise<IPackage> => {
      return (await packageModel.findById(
        PackageId
      )) as unknown as Promise<IPackage>;
    },

    // Report Templates
    findAllReportTemplates: async (
      _: any,
      {
        filter,
        reportType,
        createdById,
      }: {
        filter: ITableFilters;
        reportType: EReportType;
        createdById: ObjectId;
      }
    ): Promise<ReportTemplate[]> => {
      return (await Service.reportTemplate.find(
        createdById,
        reportType,
        filter
      )) as unknown as Promise<ReportTemplate[]>;
    },

    findTemplateById: async (
      _: any,
      { id }: { id: string }
    ): Promise<ReportTemplate> => {
      return (await Service.reportTemplate.findById(
        id
      )) as unknown as Promise<ReportTemplate>;
    },

    // Report Submissions
    findAllReports: async (
      _: any,
      { filter, userId }: { filter: ITableFilters; userId: ObjectId }
    ): Promise<ReportTemplate[]> => {
      return (await Service.reportSubmission.track(
        userId,
        filter
      )) as unknown as Promise<ReportTemplate[]>;
    },

    // Client Admin Payment
    findAllSubAdminPayments: async (): Promise<ISubAdminPayment[]> => {
      return (await Service.subAdminPayment.find()) as unknown as Promise<
        ISubAdminPayment[]
      >;
    },

    findSubAdminPaymenteById: async (
      _: any,
      { id }: { id: string }
    ): Promise<ISubAdminPayment> => {
      return (await Service.subAdminPayment.findById(
        id
      )) as unknown as Promise<ISubAdminPayment>;
    },

    findAllEmployees: async (
      _: any,
      { createdById, filter }: { createdById: ObjectId; filter: ITableFilters }
    ): Promise<IUser[]> => {
      return (await Service.employee.findAllEmployees(
        createdById,
        filter
      )) as unknown as Promise<IUser[]>;
    },
    findEmployeeById: async (
      _: any,
      { id }: { id: string }
    ): Promise<IUser> => {
      return (await Service.employee.findById(id)) as unknown as Promise<IUser>;
    },

    findActivityLogByClientAdminId: async (
      _: any,
      { belongsTo }: { belongsTo: string }
    ): Promise<IActivityLog[]> => {
      return Service.activityLog.findByClientAdmin({ belongsTo });
    },

    findActivityLogByUserId: async (
      _: any,
      { user_id }: { user_id: string }
    ): Promise<IActivityLog[]> => {
      return Service.activityLog.findByUserId({ user_id });
    },

    findActivityLogById: async (
      _: any,
      { id }: { id: string }
    ): Promise<IActivityLog> => {
      return (await Service.activityLog.findById(
        id
      )) as unknown as Promise<IActivityLog>;
    },

    findUserReportSubmissionById: async (
      _: any,
      { reportId }: { reportId: string }
    ): Promise<ReportSubmission> => {
      return Service.reportSubmission.findById(reportId);
    },

    getClientSecret: async (
      _: any,
      { input }: { input: GetClientSecretInput }
    ): Promise<{
      clientSecret: string | null;
    }> => {
      return Service.subAdminPayment.updatePackageSubscription(
        input.amount,
        input.customerId,
      );
    },

    getClientSecretForSubscriber: async (
      _: any,
      { amount }: { amount: number }
    ): Promise<{
      clientSecret: string | null;
    }> => {
      return Service.stripeService.createPaymentIntentForSubscriber(amount)
    },

    // Tasks
    findAllTasks: async (
      _: any,
      { creatorId }: { creatorId: ObjectId }
    ): Promise<ITask[]> => {
      return Service.tasks.find(creatorId);
    },

    findTaskById: async (_: any, { id }: { id: string }): Promise<ITask> => {
      return Service.tasks.findById(id);
    },

    // Assigned Tasks
    findAssignedTaskById: async (
      _: any,
      { assignedTaskId }: { assignedTaskId: ObjectId }
    ): Promise<ITaskAssigned> => {
      return await Service.taskAssigned.findById(assignedTaskId);
    },

    trackAllTasks: async (
      _: any,
      { creatorId, tableFilters }: { creatorId: ObjectId; tableFilters: ITableFilters }
    ): Promise<ITaskAssigned[]> => {
      return await Service.taskAssigned.track(creatorId, tableFilters);
    },

    // Training
    getTrainingById: async (
      _: any,
      { trainingId }: { trainingId: ObjectId }
    ): Promise<ITraining> => {
      return await Service.training.findOne(trainingId);
    },

    getMyTrainings: async (
      _: any,
      { creatorId }: { creatorId: ObjectId }
    ): Promise<ITraining[]> => {
      return Service.training.getMyTrainings(creatorId);
    },

    // Training Session
    getUserTrainingSession: async (
      _: any,
      {
        getUserTrainingSessionInput,
      }: { getUserTrainingSessionInput: IGetUserTrainingSessionInput }
    ): Promise<ITrainingSession[]> => {
      return await Service.trainingSession.getUserTrainingSession(
        getUserTrainingSessionInput
      );
    },

    getAssignedTrainingById: async (
      _: any,
      { taskId }: { taskId: ObjectId }
    ): Promise<ITrainingSession> => {
      return await Service.trainingSession.findById(taskId);
    },

    //Email And Notification
    getEmailAndNotificationById: async (
      _: any,
      { objectId }: { objectId: ObjectId }
    ): Promise<IEmailAndNotification> => {
      return await Service.emailAndNotification.getById(objectId);
    },

    getUserNotifications: async (
      _: any,
      { userId }: { userId: ObjectId }
    ): Promise<IEmailAndNotification[]> => {
      return await Service.emailAndNotification.getUserNotifications(userId);
    },

    getUserNotificationsForMobile: async (
      _: any,
      { userId, unread }: { userId: ObjectId; unread: boolean }
    ): Promise<IEmailAndNotification[]> => {
      return await Service.emailAndNotification.getUserNotificationsForMobile(
        userId,
        unread
      );
    },

    getEmailAndNotificationByCreatorId: async (
      _: any,
      { creatorId, filter }: { creatorId: ObjectId; filter: ITableFilters }
    ): Promise<IEmailAndNotification[]> => {
      return await Service.emailAndNotification.getByCreatorId(
        creatorId,
        filter
      );
    },

    // Client dashboard

    getClientDashboardStats: async (
      _: any,
      { userId, facilityId }: { userId: ObjectId, facilityId: ObjectId }
    ) => {
      return Service.dashboard.getClientDashboardApi(userId, facilityId);
    },

    getIncidentReportsForClientDashboardStats: async (
      _: any,
      {
        userId,
        filter,
      }: {
        userId: ObjectId;
        filter: { reportType: string; startDate: Date; endDate: Date };
      }
    ) => {
      return Service.dashboard.getIncidentReportsForClientDashboard(
        userId,
        filter
      );
    },

    // Super Admin Dashboard

    getSuperAdminDashboardStats: async (
      _: any,
      {
        clientAdminId,
        packageId,
      }: { clientAdminId: ObjectId; packageId: ObjectId }
    ) => {
      return Service.dashboard.getSuperAdminDashboardApi(
        clientAdminId,
        packageId
      );
    },

    getAllClientAdmins: async (_: any, { }) => {
      return Service.dashboard.getAllClientAdmins();
    },

    getAllParks: async (_: any, { }) => {
      return Service.dashboard.getAllParks();
    },

    getAllSubscriptions: async (_: any, { }) => {
      return Service.dashboard.getAllSubscriptions();
    },

    // Mobile Queries //
    getAssignedTasksById: async (
      _: any,
      { userId, filter }: { userId: string; filter: ITableFilters }
    ) => {
      return Service.mobileTaskAssigned.find(userId, filter);
    },
    
    trackMyTask: async (
      _: any,
      { creatorId, filter }: { creatorId: ObjectId; filter: ITableFilters }
    ): Promise<ITaskAssigned[]> => {
      
      return await Service.mobileTaskAssigned.trackMyTask(creatorId, filter);
    },

    getTrainingsById: async (
      _: any,
      { userId, filter }: { userId: string; filter: ITableFilters }
    ) => {
      return Service.mobileTrainingSession.find(userId, filter);
    },

    getReportSubmissionById: async (
      _: any,
      { empId, filter }: { empId: string; filter: ITableFilters }
    ) => {
      return Service.mobileReportSubmission.find(empId, filter);
    },

    getAlertsForMobile: async (
      _: any,
      { userId, filter }: { userId: string; filter: ITableFilters }
    ) => {
      return Service.mobileAlertService.find(userId, filter);
    },
    
    trackMyReports: async (
      _: any,
      { assignedTo }: { assignedTo: ObjectId }
    ): Promise<ITaskAssigned[]> => {
      console.log({ assignedTo });

      if (!assignedTo) {
        throw new UserInputError("Id is required");
        // throw new Error("Invalid argument value");
      }
      return await Service.mobileReportSubmission.trackMyReports(assignedTo);
    },

    getFAQS: async (
      _: any,
      { status }: { status: string }
    ): Promise<ITaskAssigned[]> => {
      return await Service.faqService.find(status);
    },
    // Ticker
    getPost: async (): Promise<IGenericType> => {
      return await Service.ticker.get();
    },

    // Points Of Interest
    getPointsOfInterest: async (
      _: any,
      { facilityId }: { facilityId: ObjectId }
    ): Promise<[PointOfInterest]> => {
      return await Service.pointOfInterest.find(facilityId)
    },

    // VAT
    getFailedVAT: async (
      _: any,
      { facilityId }: { facilityId: ObjectId }
    ): Promise<GetFailedVatResponse[]> => {
      return await Service.VAT_DBService.getFailedVAT(facilityId)
    },


    // Pectora
    getPectoraAuth: async (
      _: any,
      { facilityId }: { facilityId: ObjectId }
    ): Promise<PectoraAuth> => {
      return await Service.pectora.getPectoraAuth(facilityId);
    },

    getPectoraAndAppUsers: async (
      _: any,
      { facilityId }: { facilityId: ObjectId }
    ): Promise<string[]> => {
      return await Service.pectora.getPectoraAndAppUsers(facilityId);
    },


  },
  Mutation: {
    // User Package
    modifyPackage: async (
      _: any,
      {
        userPackageModifyInput,
      }: { userPackageModifyInput: UserPackageModifyInput },
      _context: any
    ): Promise<String> => {
      return Service.userPackage.modify(userPackageModifyInput);
    },

    // Package
    addPackage: async (
      _: any,
      { packageInput }: { packageInput: PackageInput },
      _context: any
    ): Promise<IPackage> => {
      return Service.package.create(packageInput);
    },

    updatePackage: async (
      _: any,
      { updatePackageInput }: { updatePackageInput: UpdatePackageInput },
      _context: any
    ) => {
      return (await Service.package.update(
        updatePackageInput
      )) as unknown as Promise<IPackage>;
    },

    deleteSubscriptionPackage: async (_: any, { id }: { id: string }) => {
      return Service.package.delete(id);
    },

    // Park Locations
    acceptLocationRequest: async (_: any, { id }: { id: ObjectId }) => {
      return Service.parkLocations.acceptLocationRequest(id);
    },

    updateFacilityRequest: async (
      _: any,
      {
        updateFacilityRequestInput,
      }: { updateFacilityRequestInput: UpdateFacilityRequestInput },
      _context: any
    ): Promise<IGenericType> => {
      return await Service.parkLocations.updateFacilityRequest(
        updateFacilityRequestInput
      );
    },

    // Park
    addAnotherLocation: async (
      _: any,
      { parkLocationDataInput }: { parkLocationDataInput: IParkInput },
      _context: any
    ) => {
      return Service.park.create(parkLocationDataInput);
    },

    // Department
    addDepartment: async (
      _: any,
      { departmentInput }: { departmentInput: IDepartmentInput },
      _context: any
    ): Promise<string> => {
      return (await Service.department.create(
        departmentInput
      )) as unknown as Promise<string>;
    },

    updateDepartment: async (
      _: any,
      {
        departmentUpdateInput,
      }: { departmentUpdateInput: IDepartmentUpdateInput },
      _context: any
    ): Promise<string> => {
      return (await Service.department.update(
        departmentUpdateInput
      )) as unknown as Promise<string>;
    },

    deleteDepartment: async (
      _: any,
      { departmentId }: { departmentId: ObjectId },
      _context: any
    ): Promise<string> => {
      return Service.department.delete(departmentId);
    },

    // Role
    addRole: async (
      _: any,
      { roleInput }: { roleInput: IRoleInput },
      _context: any
    ): Promise<IRole> => {
      return (await Service.role.create(
        roleInput
      )) as unknown as Promise<IRole>;
    },
    updateRole: async (
      _: any,
      { roleUpdateInput }: { roleUpdateInput: IUpdateRoleInput },
      _context: any
    ): Promise<String> => {
      return (await Service.role.update(
        roleUpdateInput
      )) as unknown as Promise<String>;
    },
    deleteRole: async (_: any, { id }: { id: string }) => {
      return Service.role.delete(id);
    },
    // User
    updateAdminUser: async (
      _: any,
      { updateAdminUserInput }: { updateAdminUserInput: IUpdateAdminUserInput },
      _context: any
    ) => {
      return Service.user.updateAdminUser(updateAdminUserInput);
    },
    deleteAdminUser: async (_: any, { id }: { id: string }) => {
      return Service.user.delete(id);
    },
    // Auth
    addUserAdmin: async (
      _: any,
      { signupInput }: { signupInput: IUserInput },
      _context: any
    ) => {
      return Service.auth.createUserOfSuperAdmin(signupInput);
    },
    login: async (
      _: any,
      { loginInput }: { loginInput: LoginInput },
      _context: any
    ) => {
      return Service.auth.login(loginInput);
    },
    createSuperAdmin: async (
      _: any,
      { createSuperAdminInput }: { createSuperAdminInput: IUserInput },
      _context: any
    ) => {
      return Service.auth.createSuperAdmin(createSuperAdminInput);
    },
    createSubAdmin: async (
      _: any,
      { createSubAdminInput }: { createSubAdminInput: InputSubAdmin },
      _context: any
    ): Promise<String> => {
      return Service.auth.createClientAdmin(createSubAdminInput);
    },
    registerClient: async (
      _: any,
      { registerClientInput }: { registerClientInput: InputRegisterClient },
      _context: any
    ): Promise<String> => {
      return Service.auth.registerClient(registerClientInput);
    },
    activateSubAdminAfterSubscription: async (
      _: any,
      { user_id }: { user_id: ObjectId },
      _context: any
    ): Promise<String> => {
      return Service.auth.activateSubAdminAfterSubscription(user_id)
    },
    forgetPassword: async (
      _: any,
      { forgetPasswordInput }: { forgetPasswordInput: IForgetPasswordInput },
      _context: any
    ) => {
      return Service.auth.forgetPassword(forgetPasswordInput);
    },
    verifyOtp: async (
      _: any,
      { verifyOtpInput }: { verifyOtpInput: IVerifyOtpInput },
      _context: any
    ) => {
      return Service.auth.verifyOtp(verifyOtpInput);
    },
    resetPassword: async (
      _: any,
      { resetPasswordInput }: { resetPasswordInput: ResetPasswordInput },
      _context: any
    ) => {
      return Service.auth.resetPassword(resetPasswordInput);
    },
    changePassword: async (
      _: any,
      { changePasswordInput }: { changePasswordInput: IChangePasswordBody },
      _context: any
    ) => {
      return Service.auth.changePassword(changePasswordInput);
    },
    updateEmail: async (
      _: any,
      { updateEmailInput }: { updateEmailInput: IUpdateEmailBody },
      _context: any
    ) => {
      return Service.auth.updateEmail(updateEmailInput);
    },
    updateTemporaryPassword: async (
      _: any,
      {
        temporaryPasswordInput,
      }: { temporaryPasswordInput: ITemporaryPasswordInput },
      _context: any
    ) => {
      return Service.auth.updateTemporaryPassword(temporaryPasswordInput);
    },

    updateUserFields: async (
      _: any,
      {
        updateUserFieldsInput,
      }: { updateUserFieldsInput: IUpdateUserFieldsInput },
      _context: any
    ) => {
      return Service.user.updateUserFields(updateUserFieldsInput);
    },

    // Report Template
    addReportTemplate: async (
      _: any,
      { reportTemplateInput }: { reportTemplateInput: ReportTemplateInput },
      _context: any
    ) => {
      return Service.reportTemplate.create(reportTemplateInput);
    },

    updateReportTemplate: async (
      _: any,
      {
        updateReportTemplateInput,
      }: { updateReportTemplateInput: UpdateReportTemplateInput },
      _context: any
    ) => {
      return Service.reportTemplate.update(updateReportTemplateInput);
    },

    deleteReportTemplate: async (
      _: any,
      {
        templateId,
      }: { templateId: ObjectId },
      _context: any
    ): Promise<IGenericType> => {
      return Service.reportTemplate.delete(templateId);
    },

    assignReportTemplate: async (
      _: any,
      {
        assignReportTemplateInput,
      }: { assignReportTemplateInput: IAssignInput },
      _context: any
    ): Promise<string> => {
      return await Service.reportTemplate.assign(assignReportTemplateInput);
    },

    assignInService: async (
      _: any,
      {
        assignInServiceInput,
      }: { assignInServiceInput: AssignInServiceInput },
      _context: any
    ): Promise<string> => {
      return await Service.training.assignInServiceTraining(assignInServiceInput);
    },

    // VAT
    evaluateVAT: async (
      _: any,
      {
        evaluateVatInput,
      }: { evaluateVatInput: EvaluateVatInput },
      _context: any
    ): Promise<string> => {
      return await Service.VAT_DBService.evaluateVAT(evaluateVatInput);
    },

    // Pectora
    addPectoraAuth: async (
      _: any,
      {
        addPectoraAuthInput,
      }: { addPectoraAuthInput: AddPectoraAuthInput },
      _context: any
    ): Promise<string> => {
      return await Service.pectora.addPectoraAuth(addPectoraAuthInput);
    },

    attachTaskToTraining: async (
      _: any,
      {
        attachTaskToTrainingInput,
      }: { attachTaskToTrainingInput: AttachTaskToTrainingInput },
      _context: any
    ): Promise<string> => {
      return await Service.VAT_DBService.attachTaskToTraining(attachTaskToTrainingInput);
    },


    approveReportSubmission: async (
      _: any,
      {
        submissionId,
        assignedReportId,
        approverId,
      }: {
        submissionId: ObjectId;
        assignedReportId: ObjectId;
        approverId: ObjectId;
      },
      _context: any
    ): Promise<IGenericType> => {
      return await Service.reportSubmission.approveSubmission(
        submissionId,
        assignedReportId,
        approverId
      );
    },

    mobileUpdateReportSubmission: async (
      _: any,
      { filter, data }: { filter: any; data: any },
      _context: any
    ): Promise<string> => {
      return await Service.mobileReportSubmission.findOneAndUpdate(
        filter,
        data
      );
    },

    pickFacilityReport: async (
      _: any,
      {
        assignedReportId,
        pickerId,
      }: { assignedReportId: ObjectId; pickerId: ObjectId },
      _context: any
    ): Promise<IGenericType> => {
      return await Service.mobileReportSubmission.pickFacilityReport(
        assignedReportId,
        pickerId
      );
    },

    // Client Admin Payment
    addSubAdminPayment: async (
      _: any,
      { subAdminInput }: { subAdminInput: ISubAdminPaymentInput },
      _context: any
    ) => {
      return Service.subAdminPayment.create(subAdminInput);
    },
    updateSubAdmin: async (
      _: any,
      { updateSubAdminInput }: { updateSubAdminInput: UpdateSubAdminInput },
      _context: any
    ): Promise<String> => {
      return Service.user.updateSubAdmin(updateSubAdminInput);
    },
    onboardSubAdmin: async (
      _: any,
      {
        subAdminOnboardInput,
      }: { subAdminOnboardInput: ISubAdminOnBoardingInput },
      _context: any
    ) => {
      return Service.user.onboardSubAdmin(subAdminOnboardInput);
    },

    updateProfile: async (
      _: any,
      { updateProfileInput }: { updateProfileInput: UpdateProfileInput },
      _context: any
    ) => {
      return Service.user.updateProfile(
        updateProfileInput._id,
        updateProfileInput
      );
    },

    createEmployee: async (
      _: any,
      {
        employeeInput,
        company,
      }: { employeeInput: EmployeeInput; company: ICompany },
      _context: any
    ): Promise<string> => {
      return Service.employee.createEmployee(employeeInput, company);
    },

    updateEmployee: async (
      _: any,
      { updateEmployeeInput }: { updateEmployeeInput: UpdateEmployeeInput },
      _context: any
    ) => {
      return Service.employee.update(updateEmployeeInput);
    },

    deleteEmployee: async (
      _: any,
      { employeeId }: { employeeId: ObjectId },
      _context: any
    ) => {
      return Service.employee.delete(employeeId);
    },
    createActivityLog: async (
      _: any,
      { activityLogInput }: { activityLogInput: IActivityLog },
      _context: any
    ): Promise<IActivityLog> => {
      return Service.activityLog.create(activityLogInput);
    },
    // createReportSubmission: async (
    //   _: any,
    //   {
    //     reportSubmissionInput,
    //   }: { reportSubmissionInput: CreateReportSubmissionInput },
    //   _context: any
    // ): Promise<ReportSubmission> => {
    //   return Service.reportSubmission.create(reportSubmissionInput);
    // },

    // Training Session

    addTrainingSession: async (
      _: any,
      {
        addTrainingSessionInput,
      }: { addTrainingSessionInput: AddTrainingSessionInput },
      _context: any
    ): Promise<IGenericType> => {
      return Service.training.create(addTrainingSessionInput);
    },

    updateTraining: async (
      _: any,
      { updateTrainingInput }: { updateTrainingInput: UpdateTrainingInput },
      _context: any
    ): Promise<IGenericType> => {
      return Service.training.updateOne(updateTrainingInput);
    },

    deleteTraining: async (
      _: any,
      { trainingTemplateId }: { trainingTemplateId: ObjectId },
      _context: any
    ): Promise<IGenericType> => {
      return Service.training.deleteOne(trainingTemplateId);
    },

    assignTrainingSession: async (
      _: any,
      {
        assignTrainingSessionInput,
      }: { assignTrainingSessionInput: IAssignTrainingSessionInput },
      _context: any
    ): Promise<string> => {
      return Service.training.assign(assignTrainingSessionInput);
    },

    mobileUpdateAssignedTrainingSessions: async (
      _: any,
      { filter, data }: { filter: MobileUpdateTrainingSessionInput; data: TrainingSessionUpdateInputForMobile },
      _context: any
    ): Promise<string> => {
      return Service.mobileTrainingSession.findOneAndUpdate(filter, data);
    },

    createTask: async (
      _: any,
      { taskInput }: { taskInput: TaskInput },
      _context: any
    ): Promise<IGenericType> => {
      return Service.tasks.create(taskInput);
    },

    updateTask: async (
      _: any,
      { taskInput }: { taskInput: TaskUpdateInput },
      _context: any
    ): Promise<IGenericType> => {
      return Service.tasks.updateOne(taskInput);
    },

    deleteTask: async (
      _: any,
      { taskId }: { taskId: ObjectId },
      _context: any
    ): Promise<string> => {
      return Service.tasks.deleteOne(taskId);
    },

    deleteAssignedTask: async (
      _: any,
      { taskId }: { taskId: ObjectId },
      _context: any
    ): Promise<string> => {
      return Service.taskAssigned.deleteOne(taskId);
    },

    assignTask: async (
      _: any,
      { taskAssignInput }: { taskAssignInput: IAssignInput },
      _context: any
    ): Promise<string> => {
      return await Service.taskAssigned.assign(taskAssignInput);
    },

    approveSubmission: async (
      _: any,
      {
        submissionId,
        taskId,
        approverId,
      }: { submissionId: ObjectId; taskId: ObjectId; approverId: ObjectId },
      _context: any
    ): Promise<IGenericType> => {
      return await Service.taskAssigned.approveSubmission(
        submissionId,
        taskId,
        approverId
      );
    },

    mobileUpdateSubTask: async (
      _: any,
      { filter, data }: { filter: any; data: any },
      _context: any
    ): Promise<string> => {
      return await Service.mobileTaskAssigned.findOneAndUpdate(filter, data);
    },

    pickFacilityTask: async (
      _: any,
      { taskId, pickerId }: { taskId: ObjectId; pickerId: ObjectId },
      _context: any
    ): Promise<IGenericType> => {
      return await Service.mobileTaskAssigned.pickFacilityTask(
        taskId,
        pickerId
      );
    },

    // Email And Notification
    addEmailAndNotification: async (
      _: any,
      {
        emailAndNotificationInput,
      }: { emailAndNotificationInput: IAddEmailAndNotificationInput },
      _context: any
    ): Promise<IGenericType> => {
      return await Service.emailAndNotification.add(emailAndNotificationInput);
    },

    editEmailAndNotification: async (
      _: any,
      {
        emailAndNotificationInput,
      }: { emailAndNotificationInput: EditEmailAndNotificationInput },
      _context: any
    ): Promise<string> => {
      return await Service.emailAndNotification.edit(emailAndNotificationInput);
    },

    assignEmailAndNotification: async (
      _: any,
      {
        assignEmailAndNotificationInput,
      }: { assignEmailAndNotificationInput: AssignEmailAndNotificationInput },
      _context: any
    ): Promise<string> => {
      return await Service.emailAndNotification.assign(
        assignEmailAndNotificationInput
      );
    },

    markAsRead: async (
      _: any,
      { objectId }: { objectId: ObjectId },
      _context: any
    ): Promise<string> => {
      return await Service.emailAndNotification.markAsRead(objectId);
    },

    deleteEmailAndNotification: async (
      _: any,
      { notifId }: { notifId: ObjectId },
      _context: any
    ) => {
      return await Service.emailAndNotification.deleteNotification(notifId);
    },

    // Points Of Interest
    addPointOffInterest: async (
      _: any,
      { pointOfInterestInput }: { pointOfInterestInput: PointOfInterestInput },
      _context: any
    ) => {
      return await Service.pointOfInterest.add(pointOfInterestInput)
    },

    updatePointOffInterest: async (
      _: any,
      { updatePointOfInterestInput }: { updatePointOfInterestInput: UpdatePointOfInterestInput },
      _context: any
    ) => {
      return await Service.pointOfInterest.update(updatePointOfInterestInput)
    },

    deletePointOffInterest: async (
      _: any,
      { _id }: { _id: ObjectId },
      _context: any
    ) => {
      return await Service.pointOfInterest.delete(_id)
    },

    // Ticker
    postTicker: async (
      _: any,
      { postTickerInput }: { postTickerInput: PostTickerInput },
      _context: any
    ): Promise<IGenericType> => {
      return await Service.ticker.post(postTickerInput);
    },

    addFaq: async (_: any, data: any, _context: any): Promise<IGenericType> => {
      return await Service.faqService.add(data);
    },

    updateFAQ: async (
      _: any,
      { id, faqInput }: { id: ObjectId; faqInput: any }
    ): Promise<IGenericType> => {
      return await Service.faqService.findOneAndUpdate(id, faqInput);
    },
    deleteFAQ: async (
      _: any,
      { id }: { id: ObjectId }
    ): Promise<IGenericType> => {
      return await Service.faqService.deleteFaq(id);
    },

    // others
    fileUpload: async (_: any, { file }: any, _context: any) => {
      console.log(file);
      return "abc";
    },

    // Stripe
    createStripeCustomer: async (
      _: any,
      { email }: { email: string }
    ): Promise<IGenericType> => {
      return await Service.stripeService.createStripeCustomer(email);
    },

  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
// Apply the `permissions` middleware to the schema
const schemaWithMiddleware = applyMiddleware(schema, permissions);

const server = new ApolloServer({
  schema: schemaWithMiddleware,
  // introspection: true,
  csrfPrevention: false,
  formatError: (error: any) => {
    return {
      message: error.message,
      location: error.locations.line,
      code: error.extensions.code,
      customData: error.extensions.customField,
    };
  },
});
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

const mongo = new MongoHelper();
mongo.initiateMongoConnection();

export default startServerAndCreateNextHandler(server, {
  context: async (req) => ({ req }),
});