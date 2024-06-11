import type { GraphQLClient } from "graphql-request";
import type * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
  Upload: any;
};

export type ActionType = {
  __typename?: "ActionType";
  delete?: Maybe<Scalars["Boolean"]>;
  edit?: Maybe<Scalars["Boolean"]>;
  view?: Maybe<Scalars["Boolean"]>;
};

export type ActivityLog = {
  __typename?: "ActivityLog";
  _id?: Maybe<Scalars["ID"]>;
  activity: Scalars["String"];
  belongsTo?: Maybe<Scalars["ID"]>;
  dateTime: Scalars["Date"];
  interface: Interface;
  role: Scalars["String"];
  user_id: Scalars["ID"];
  user_name: Scalars["String"];
};

export type ActivityLogInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  activity: Scalars["String"];
  belongsTo?: InputMaybe<Scalars["ID"]>;
  dateTime: Scalars["Date"];
  interface: Interface;
  role: Scalars["String"];
  user_id: Scalars["ID"];
  user_name: Scalars["String"];
};

export type AddEmailAndNotificationInput = {
  createdByRef: Scalars["String"];
  text: Scalars["String"];
  title: Scalars["String"];
  type?: InputMaybe<EEmailAndNotificationType>;
};

export type AddPectoraAuthInput = {
  X_Auth_Id: Scalars["ID"];
  X_Auth_Token: Scalars["ID"];
  facilityId: Scalars["ID"];
};

export type AddTrainingSessionInput = {
  createdBy: Scalars["String"];
  facility: Scalars["String"];
  sessions: Array<TrainingSessionInput>;
  title: Scalars["String"];
};

export type AdditionalDetails = {
  __typename?: "AdditionalDetails";
  name?: Maybe<Scalars["String"]>;
};

export type Alert = {
  __typename?: "Alert";
  reports?: Maybe<Array<Maybe<ReportSubmissionForMobile>>>;
  tasks?: Maybe<Array<Maybe<TaskAssignedUnwindSubmission>>>;
  trainings?: Maybe<Array<Maybe<TrainingSessionForMobile>>>;
};

export type AssignEmailAndNotificationInput = {
  assignBy: EAssignBy;
  assignTo: Array<Scalars["ID"]>;
  assigner_id: Scalars["ID"];
  id: Scalars["ID"];
  priority: EPriority;
};

export type AssignInServiceInput = {
  assignBy: EAssignBy;
  assignTo: Array<Scalars["ID"]>;
  assigner_id: Scalars["ID"];
  dueDate?: InputMaybe<Scalars["Date"]>;
  externalUsers?: InputMaybe<Array<UserInput>>;
  facilityId?: InputMaybe<Scalars["ID"]>;
  id: Scalars["ID"];
  priority: EPriority;
  scheduleType: EScheduleType;
};

export type AssignInput = {
  assignBy: EAssignBy;
  assignTo: Array<Scalars["ID"]>;
  assigner_id: Scalars["ID"];
  dueDate?: InputMaybe<Scalars["Date"]>;
  id: Scalars["ID"];
  priority: EPriority;
  scheduleType: EScheduleType;
};

export type AssignTrainingSessionInput = {
  assignBy: EAssignBy;
  assignTo: Array<Scalars["ID"]>;
  assigner_id: Scalars["ID"];
  dueDate?: InputMaybe<Scalars["Date"]>;
  externalUsers?: InputMaybe<Array<UserInput>>;
  facilityId?: InputMaybe<Scalars["ID"]>;
  id: Scalars["ID"];
  priority: EPriority;
  scheduleType: EScheduleType;
};

export type AssignerComponentInput = {
  componentId?: InputMaybe<EAssignerComponentId>;
  eventId?: InputMaybe<Scalars["ID"]>;
};

export type AttachTaskToTrainingInput = {
  VAT_id: Scalars["ID"];
  assignTo: Scalars["ID"];
  createdBy: Scalars["ID"];
  dueDate: Scalars["Date"];
  priority: EPriority;
  trainingId: Scalars["ID"];
};

export type ChangePasswordInput = {
  email: Scalars["String"];
  new_password: Scalars["String"];
  old_password: Scalars["String"];
};

export type ClientDashboardStats = {
  __typename?: "ClientDashboardStats";
  reportCompletedCount?: Maybe<Scalars["Int"]>;
  reportPendingCount?: Maybe<Scalars["Int"]>;
  taskCompletedCount?: Maybe<Scalars["Int"]>;
  taskPendingCount?: Maybe<Scalars["Int"]>;
  trainingSessionCount?: Maybe<Scalars["Int"]>;
  usersCountAccordingFacility?: Maybe<Scalars["Int"]>;
};

export type ClientSecret = {
  __typename?: "ClientSecret";
  clientSecret?: Maybe<Scalars["String"]>;
};

export type Company = {
  __typename?: "Company";
  _id?: Maybe<Scalars["ID"]>;
  employee?: Maybe<Scalars["Boolean"]>;
  employeeType?: Maybe<EmployeeType>;
  location?: Maybe<Array<Maybe<ParkLocation>>>;
  park?: Maybe<Park>;
  subAdmin?: Maybe<Scalars["Boolean"]>;
};

export type CompanyInput = {
  employee?: InputMaybe<Scalars["Boolean"]>;
  employeeType?: InputMaybe<EmployeeType>;
  location?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  park?: InputMaybe<Scalars["ID"]>;
  subAdmin?: InputMaybe<Scalars["Boolean"]>;
};

export type Department = {
  __typename?: "Department";
  _id: Scalars["ID"];
  active: Scalars["Boolean"];
  createdBy: Scalars["ID"];
  name: Scalars["String"];
};

export type DepartmentInput = {
  active: Scalars["Boolean"];
  createdBy: Scalars["ID"];
  name: Scalars["String"];
};

export type DepartmentUpdateInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  active?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export enum DiscountType {
  Fixed = "FIXED",
  Percentage = "PERCENTAGE",
}

export type Dog = {
  __typename?: "Dog";
  name: Scalars["String"];
};

export enum EAssignBy {
  External = "EXTERNAL",
  Facility = "FACILITY",
  Role = "ROLE",
  User = "USER",
}

export enum EAssignerComponentId {
  EmailNotification = "EMAIL_NOTIFICATION",
  InService = "IN_SERVICE",
  Report = "REPORT",
  Task = "TASK",
  Training = "TRAINING",
}

export enum EEmailAndNotificationType {
  Alert = "ALERT",
  Email = "EMAIL",
  Emergency = "EMERGENCY",
  Notification = "NOTIFICATION",
  Null = "NULL",
}

export enum EIconType {
  Icon = "Icon",
  Source = "Source",
}

export enum EIndicator {
  Limited = "LIMITED",
  Limitless = "LIMITLESS",
}

export enum EPermission {
  Read = "Read",
  Write = "Write",
}

export enum EPointOfAttraction {
  Attraction = "ATTRACTION",
  Utility = "UTILITY",
}

export enum EPriority {
  Alert = "ALERT",
  Emergency = "EMERGENCY",
  Low = "LOW",
  Standard = "STANDARD",
}

export enum EReportType {
  Incident = "INCIDENT",
  Inventory = "INVENTORY",
  InService = "IN_SERVICE",
  Standard = "STANDARD",
  Vat = "VAT",
}

export enum EScheduleType {
  Always = "ALWAYS",
  Daily = "DAILY",
  Monthly = "MONTHLY",
  OneTime = "ONE_TIME",
  Weekly = "WEEKLY",
}

export enum ESubmissionStatus {
  Completed = "COMPLETED",
  Failed = "FAILED",
  Inprogress = "INPROGRESS",
  Pending = "PENDING",
  Reviewing = "REVIEWING",
  Unassigned = "UNASSIGNED",
}

export enum ESubscriptionStatus {
  Downgrade = "DOWNGRADE",
  Subscribed = "SUBSCRIBED",
  Upgrade = "UPGRADE",
}

export enum EUnits {
  Kilogram = "Kilogram",
  Pound = "Pound",
}

export type EditEmailAndNotificationInput = {
  _id: Scalars["ID"];
  text: Scalars["String"];
  title: Scalars["String"];
};

export type EmailAndNotification = {
  __typename?: "EmailAndNotification";
  _id?: Maybe<Scalars["String"]>;
  assignedUserRef?: Maybe<User>;
  code?: Maybe<Scalars["Int"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  createdByRef?: Maybe<User>;
  priority?: Maybe<EPriority>;
  read?: Maybe<Scalars["Boolean"]>;
  text?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<EEmailAndNotificationType>;
};

export type EmployeeInput = {
  access: FAQStatus;
  active: Scalars["Boolean"];
  createdBy: Scalars["ID"];
  department: Scalars["String"];
  email: Scalars["String"];
  employeeType: EmployeeType;
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  location?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  modules: Array<IntModule>;
  operations: Array<IntOperation>;
  package?: InputMaybe<Scalars["ID"]>;
  password: Scalars["String"];
  phone?: InputMaybe<InputPhone>;
  photo_url?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
};

export enum EmployeeType {
  Imported = "IMPORTED",
  Lifeguard = "LIFEGUARD",
  Manager = "MANAGER",
  Pectora = "PECTORA",
  Subadmin = "SUBADMIN",
}

export type EvaluateVatInput = {
  report_id: Scalars["ID"];
  submissions: Array<SubmitReportForMobileInput>;
};

export type FaqInput = {
  answer?: InputMaybe<Scalars["String"]>;
  question?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<FAQStatus>;
};

export enum FAQStatus {
  BOTH = "BOTH",
  MOBILE = "MOBILE",
  WEB = "WEB",
}

export type FacilityFilterInput = {
  _id: Scalars["ID"];
  moduleId: EAssignerComponentId;
};

export type File = {
  __typename?: "File";
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type FindDepartmentsByOwnerId = {
  __typename?: "FindDepartmentsByOwnerId";
  _id?: Maybe<Scalars["ID"]>;
  createdOn?: Maybe<Scalars["Date"]>;
  department?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["Boolean"]>;
};

export type FindRelatingUsersResponse = {
  __typename?: "FindRelatingUsersResponse";
  _id?: Maybe<Scalars["ID"]>;
  action?: Maybe<ActionType>;
  createdOn?: Maybe<Scalars["Date"]>;
  email?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  role?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["Boolean"]>;
};

export type ForgetPasswordInput = {
  email: Scalars["String"];
};

export type FormFieldInput = {
  _id: Scalars["String"];
  label: Scalars["String"];
  options?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  placeholder?: InputMaybe<Scalars["String"]>;
  src?: InputMaybe<Scalars["String"]>;
  type: Scalars["String"];
  value?: InputMaybe<Scalars["String"]>;
};

export type FormFields = {
  __typename?: "FormFields";
  _id: Scalars["String"];
  label: Scalars["String"];
  options?: Maybe<Array<Scalars["String"]>>;
  placeholder?: Maybe<Scalars["String"]>;
  src?: Maybe<Scalars["String"]>;
  type: Scalars["String"];
  value?: Maybe<Scalars["String"]>;
};

export type Gps = {
  __typename?: "GPS";
  lat?: Maybe<Scalars["Float"]>;
  lng?: Maybe<Scalars["Float"]>;
};

export type GeoLocation = {
  __typename?: "GeoLocation";
  coordinates?: Maybe<Array<Scalars["Float"]>>;
  type: Scalars["String"];
};

export type GeoLocationInput = {
  coordinates?: InputMaybe<Array<Scalars["Float"]>>;
  type: Scalars["String"];
};

export type GetClientSecretInput = {
  amount: Scalars["Int"];
  customerId: Scalars["String"];
};

export type GetFailedVatResponse = {
  __typename?: "GetFailedVatResponse";
  _id: Scalars["ID"];
  assignedToFacilityRef?: Maybe<Scalars["ID"]>;
  taskAssignedRef: TaskAssigned;
};

export type GetUserTrainingSessionInput = {
  userId: Scalars["ID"];
};

export type Icon = {
  __typename?: "Icon";
  _id?: Maybe<Scalars["ID"]>;
  src: Scalars["String"];
  type: EIconType;
};

export type IncidentReportClientDashboardStats = {
  __typename?: "IncidentReportClientDashboardStats";
  _id?: Maybe<Scalars["Int"]>;
  dailyCounts?: Maybe<Array<Maybe<Scalars["Int"]>>>;
};

export type IncidentReportDashboardFilterInput = {
  endDate?: InputMaybe<Scalars["Date"]>;
  reportType: Scalars["String"];
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type InputAdditionalDetails = {
  name?: InputMaybe<Scalars["String"]>;
};

export type InputGps = {
  lat: Scalars["Float"];
  lng: Scalars["Float"];
};

export type InputIcon = {
  src: Scalars["String"];
  type: EIconType;
};

export type InputOperation = {
  icon: InputIcon;
  path: Scalars["String"];
  permissions: Array<EPermission>;
  title: Scalars["String"];
};

export type InputPark = {
  GPS: InputGps;
  additionalDetails?: InputMaybe<InputAdditionalDetails>;
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  logo: Scalars["String"];
  name: Scalars["String"];
  state: Scalars["String"];
};

export type InputPhone = {
  code: Scalars["String"];
  phoneNo: Scalars["String"];
};

export type InputRegisterClient = {
  email: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  modules?: InputMaybe<Array<InputMaybe<IntModule>>>;
  operations?: InputMaybe<Array<InputMaybe<IntOperation>>>;
  package?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  paymentDetails: PaymentDetailsInput;
  phone: InputPhone;
  photo_url?: InputMaybe<Scalars["String"]>;
};

export type InputSubAdmin = {
  access?: InputMaybe<FAQStatus>;
  company?: InputMaybe<CompanyInput>;
  createdBy?: InputMaybe<Scalars["ID"]>;
  email: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  modules?: InputMaybe<Array<InputMaybe<IntModule>>>;
  operations?: InputMaybe<Array<InputMaybe<IntOperation>>>;
  package?: InputMaybe<Scalars["String"]>;
  password: Scalars["String"];
  paymentDetails: PaymentDetailsInput;
  phone: InputPhone;
  photo_url?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<Scalars["Boolean"]>;
};

export type InputTableFilter = {
  Dates?: InputMaybe<Scalars["String"]>;
  Email?: InputMaybe<Scalars["String"]>;
  EmailAndNotification?: InputMaybe<Scalars["String"]>;
  Intervals?: InputMaybe<Scalars["String"]>;
  Message?: InputMaybe<Scalars["String"]>;
  Name?: InputMaybe<Scalars["String"]>;
  OrganizationName?: InputMaybe<Scalars["String"]>;
  Package?: InputMaybe<Scalars["String"]>;
  ParkName?: InputMaybe<Scalars["String"]>;
  Role?: InputMaybe<Scalars["String"]>;
  Task?: InputMaybe<Scalars["String"]>;
  User?: InputMaybe<Scalars["String"]>;
  active?: InputMaybe<Scalars["String"]>;
  dynamicObjectId?: InputMaybe<Scalars["String"]>;
  end?: InputMaybe<Scalars["Date"]>;
  paid?: InputMaybe<Scalars["String"]>;
  reportType?: InputMaybe<Scalars["String"]>;
  sortField?: InputMaybe<Scalars["String"]>;
  sortOrder?: InputMaybe<Scalars["Int"]>;
  start?: InputMaybe<Scalars["Date"]>;
  status?: InputMaybe<Scalars["String"]>;
};

export type InputUser = {
  _id?: InputMaybe<Scalars["ID"]>;
  access?: FAQStatus;
  active?: InputMaybe<Scalars["Boolean"]>;
  email: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  modules?: InputMaybe<Array<InputMaybe<IntModule>>>;
  operations?: InputMaybe<Array<InputMaybe<IntOperation>>>;
  password: Scalars["String"];
  phone?: InputMaybe<InputPhone>;
  photo_url?: InputMaybe<Scalars["String"]>;
  rec_email?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
  scopes?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type IntModule = {
  name: Scalars["String"];
  views: Array<Scalars["String"]>;
};

export type IntModuleForCreatingPackage = {
  available?: InputMaybe<Scalars["Int"]>;
  indicator?: InputMaybe<EIndicator>;
  name: Scalars["String"];
  views: Array<Scalars["String"]>;
};

export type IntOperation = {
  name: Scalars["String"];
  views: Array<Scalars["String"]>;
};

export enum Interface {
  Mobile = "MOBILE",
  Web = "WEB",
}

export type LiveLocation = {
  __typename?: "LiveLocation";
  lat: Scalars["Float"];
  lng: Scalars["Float"];
};

export type LiveLocationInput = {
  lat: Scalars["Float"];
  lng: Scalars["Float"];
};

export type LocationLists = {
  __typename?: "LocationLists";
  _id: Scalars["ID"];
  action: ActionType;
  city: Scalars["String"];
  country: Scalars["String"];
  createdOn: Scalars["Date"];
  facility: Scalars["String"];
  parkName: Scalars["String"];
  status: Scalars["Boolean"];
};

export type LoginInput = {
  access?: InputMaybe<FAQStatus>;
  deviceToken?: InputMaybe<Scalars["String"]>;
  email: Scalars["String"];
  interface?: InputMaybe<Interface>;
  password: Scalars["String"];
  rememberMe?: InputMaybe<Scalars["Boolean"]>;
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  temporary_password?: Maybe<Scalars["Boolean"]>;
  token: Scalars["String"];
  userType?: Maybe<Scalars["String"]>;
};

export type ManageRolesListingResponse = {
  __typename?: "ManageRolesListingResponse";
  _id?: Maybe<Scalars["ID"]>;
  action?: Maybe<ActionType>;
  activeUsers?: Maybe<Scalars["Int"]>;
  createdOn?: Maybe<Scalars["Date"]>;
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["Boolean"]>;
};

export type MobileUpdateReportSubmitInput = {
  reportSubmitId: Scalars["ID"];
  submissionId: Scalars["ID"];
};

export type MobileUpdateSubTaskInput = {
  submissionId: Scalars["ID"];
  taskId: Scalars["ID"];
};

export type MobileUpdateTrainingSessionInput = {
  sessionId?: InputMaybe<Scalars["ID"]>;
  sessionsId: Scalars["ID"];
  trainingSessionId: Scalars["ID"];
};

export type Modules = {
  __typename?: "Modules";
  available?: Maybe<Scalars["Int"]>;
  indicator?: Maybe<Scalars["Int"]>;
  name: Scalars["String"];
  views: Array<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  acceptLocationRequest: Scalars["String"];
  activateSubAdminAfterSubscription: Scalars["String"];
  addAnotherLocation: Scalars["String"];
  addDepartment: Scalars["String"];
  addEmailAndNotification: GenericResponseType;
  addFaq: GenericResponseType;
  addOperation?: Maybe<Operation>;
  addPackage: Package;
  addPectoraAuth: Scalars["String"];
  addPointOffInterest: GenericResponseType;
  addReportTemplate: GenericResponseType;
  addRole?: Maybe<Role>;
  addSubAdminPayment: SubAdminPayment;
  addTrainingSession: GenericResponseType;
  addUserAdmin?: Maybe<User>;
  approveReportSubmission: GenericResponseType;
  approveSubmission: GenericResponseType;
  assignEmailAndNotification: Scalars["String"];
  assignInService: Scalars["String"];
  assignReportTemplate: Scalars["String"];
  assignTask: GenericResponseType;
  assignTrainingSession: Scalars["String"];
  attachTaskToTraining: Scalars["String"];
  changePassword?: Maybe<Scalars["String"]>;
  createActivityLog: ActivityLog;
  createEmployee: Scalars["String"];
  createStripeCustomer: GenericResponseType;
  createSubAdmin: Scalars["String"];
  createSuperAdmin?: Maybe<User>;
  createTask: GenericResponseType;
  deleteAdminUser: Scalars["String"];
  deleteAssignedTask?: Maybe<Scalars["String"]>;
  deleteDepartment: Scalars["String"];
  deleteEmailAndNotification?: Maybe<Scalars["String"]>;
  deleteEmployee: Scalars["String"];
  deleteFAQ: GenericResponseType;
  deletePointOffInterest: GenericResponseType;
  deleteReportTemplate: GenericResponseType;
  deleteRole: Scalars["String"];
  deleteSubscriptionPackage: Scalars["String"];
  deleteTask?: Maybe<Scalars["String"]>;
  deleteTraining: GenericResponseType;
  editEmailAndNotification: Scalars["String"];
  evaluateVAT: Scalars["String"];
  fileUpload?: Maybe<Scalars["String"]>;
  forgetPassword?: Maybe<Scalars["String"]>;
  login: LoginResponse;
  markAsRead?: Maybe<Scalars["String"]>;
  mobileUpdateAssignedTrainingSessions: Scalars["String"];
  mobileUpdateReportSubmission?: Maybe<Scalars["String"]>;
  mobileUpdateSubTask?: Maybe<Scalars["String"]>;
  modifyPackage: Scalars["String"];
  onboardSubAdmin?: Maybe<Scalars["String"]>;
  pickFacilityReport: GenericResponseType;
  pickFacilityTask: GenericResponseType;
  postTicker: GenericResponseType;
  registerClient: Scalars["String"];
  resetPassword?: Maybe<Scalars["String"]>;
  updateAdminUser: Scalars["String"];
  updateDepartment: Scalars["String"];
  updateEmail?: Maybe<Scalars["String"]>;
  updateEmployee: User;
  updateFAQ: GenericResponseType;
  updateFacilityRequest: GenericResponseType;
  updatePackage: Package;
  updatePointOffInterest: GenericResponseType;
  updateProfile?: Maybe<Scalars["String"]>;
  updateReportTemplate: ReportTemplate;
  updateRole?: Maybe<Scalars["String"]>;
  updateSubAdmin: Scalars["String"];
  updateTask: GenericResponseType;
  updateTemporaryPassword: TemporaryPasswordResponse;
  updateTraining: GenericResponseType;
  updateUserFields: Scalars["String"];
  verifyOtp?: Maybe<Scalars["String"]>;
};

export type MutationAcceptLocationRequestArgs = {
  id: Scalars["ID"];
};

export type MutationActivateSubAdminAfterSubscriptionArgs = {
  user_id: Scalars["ID"];
};

export type MutationAddAnotherLocationArgs = {
  parkLocationDataInput: ParkLocationDataInput;
};

export type MutationAddDepartmentArgs = {
  departmentInput: DepartmentInput;
};

export type MutationAddEmailAndNotificationArgs = {
  emailAndNotificationInput: AddEmailAndNotificationInput;
};

export type MutationAddFaqArgs = {
  faqInput?: InputMaybe<FaqInput>;
};

export type MutationAddOperationArgs = {
  input: InputOperation;
};

export type MutationAddPackageArgs = {
  packageInput: PackageInput;
};

export type MutationAddPectoraAuthArgs = {
  addPectoraAuthInput: AddPectoraAuthInput;
};

export type MutationAddPointOffInterestArgs = {
  pointOfInterestInput: PointOfInterestInput;
};

export type MutationAddReportTemplateArgs = {
  reportTemplateInput: ReportTemplateInput;
};

export type MutationAddRoleArgs = {
  roleInput: RoleInput;
};

export type MutationAddSubAdminPaymentArgs = {
  subAdminInput: SubAdminPaymentInput;
};

export type MutationAddTrainingSessionArgs = {
  addTrainingSessionInput: AddTrainingSessionInput;
};

export type MutationAddUserAdminArgs = {
  signupInput: InputUser;
};

export type MutationApproveReportSubmissionArgs = {
  approverId: Scalars["ID"];
  assignedReportId: Scalars["ID"];
  submissionId: Scalars["ID"];
};

export type MutationApproveSubmissionArgs = {
  approverId: Scalars["ID"];
  submissionId: Scalars["ID"];
  taskId: Scalars["ID"];
};

export type MutationAssignEmailAndNotificationArgs = {
  assignEmailAndNotificationInput: AssignEmailAndNotificationInput;
};

export type MutationAssignInServiceArgs = {
  assignInServiceInput: AssignInServiceInput;
};

export type MutationAssignReportTemplateArgs = {
  assignReportTemplateInput: AssignInput;
};

export type MutationAssignTaskArgs = {
  taskAssignInput: AssignInput;
};

export type MutationAssignTrainingSessionArgs = {
  assignTrainingSessionInput: AssignTrainingSessionInput;
};

export type MutationAttachTaskToTrainingArgs = {
  attachTaskToTrainingInput: AttachTaskToTrainingInput;
};

export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};

export type MutationCreateActivityLogArgs = {
  activityLogInput: ActivityLogInput;
};

export type MutationCreateEmployeeArgs = {
  company?: InputMaybe<CompanyInput>;
  employeeInput: EmployeeInput;
};

export type MutationCreateStripeCustomerArgs = {
  email: Scalars["String"];
};

export type MutationCreateSubAdminArgs = {
  createSubAdminInput: InputSubAdmin;
};

export type MutationCreateSuperAdminArgs = {
  createSuperAdminInput: InputUser;
};

export type MutationCreateTaskArgs = {
  taskInput: TaskInput;
};

export type MutationDeleteAdminUserArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteAssignedTaskArgs = {
  taskId: Scalars["ID"];
};

export type MutationDeleteDepartmentArgs = {
  departmentId: Scalars["ID"];
};

export type MutationDeleteEmailAndNotificationArgs = {
  notifId: Scalars["ID"];
};

export type MutationDeleteEmployeeArgs = {
  employeeId: Scalars["ID"];
};

export type MutationDeleteFaqArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePointOffInterestArgs = {
  _id: Scalars["ID"];
};

export type MutationDeleteReportTemplateArgs = {
  templateId: Scalars["ID"];
};

export type MutationDeleteRoleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteSubscriptionPackageArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTaskArgs = {
  taskId: Scalars["ID"];
};

export type MutationDeleteTrainingArgs = {
  trainingTemplateId: Scalars["ID"];
};

export type MutationEditEmailAndNotificationArgs = {
  emailAndNotificationInput: EditEmailAndNotificationInput;
};

export type MutationEvaluateVatArgs = {
  evaluateVatInput: EvaluateVatInput;
};

export type MutationFileUploadArgs = {
  file?: InputMaybe<Scalars["Upload"]>;
};

export type MutationForgetPasswordArgs = {
  forgetPasswordInput: ForgetPasswordInput;
};

export type MutationLoginArgs = {
  loginInput: LoginInput;
};

export type MutationMarkAsReadArgs = {
  objectId: Scalars["ID"];
};

export type MutationMobileUpdateAssignedTrainingSessionsArgs = {
  data?: InputMaybe<TrainingSessionUpdateInputForMobile>;
  filter?: InputMaybe<MobileUpdateTrainingSessionInput>;
};

export type MutationMobileUpdateReportSubmissionArgs = {
  data?: InputMaybe<SubmitReportForMobileInput>;
  filter?: InputMaybe<MobileUpdateReportSubmitInput>;
};

export type MutationMobileUpdateSubTaskArgs = {
  data?: InputMaybe<SubTaskForMobileInput>;
  filter?: InputMaybe<MobileUpdateSubTaskInput>;
};

export type MutationModifyPackageArgs = {
  userPackageModifyInput: UserPackageModifyInput;
};

export type MutationOnboardSubAdminArgs = {
  subAdminOnboardInput: SubAdminOnboardInput;
};

export type MutationPickFacilityReportArgs = {
  assignedReportId: Scalars["ID"];
  pickerId: Scalars["ID"];
};

export type MutationPickFacilityTaskArgs = {
  pickerId: Scalars["ID"];
  taskId: Scalars["ID"];
};

export type MutationPostTickerArgs = {
  postTickerInput: PostTickerInput;
};

export type MutationRegisterClientArgs = {
  registerClientInput: InputRegisterClient;
};

export type MutationResetPasswordArgs = {
  resetPasswordInput: ResetPasswordInput;
};

export type MutationUpdateAdminUserArgs = {
  updateAdminUserInput: InputUser;
};

export type MutationUpdateDepartmentArgs = {
  departmentUpdateInput: DepartmentUpdateInput;
};

export type MutationUpdateEmailArgs = {
  updateEmailInput: UpdateEmailInput;
};

export type MutationUpdateEmployeeArgs = {
  updateEmployeeInput: UpdateEmployeeInput;
};

export type MutationUpdateFaqArgs = {
  faqInput?: InputMaybe<FaqInput>;
  id: Scalars["ID"];
};

export type MutationUpdateFacilityRequestArgs = {
  updateFacilityRequestInput: UpdateFacilityRequestInput;
};

export type MutationUpdatePackageArgs = {
  updatePackageInput: UpdatePackageInput;
};

export type MutationUpdatePointOffInterestArgs = {
  updatePointOfInterestInput: UpdatePointOfInterestInput;
};

export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};

export type MutationUpdateReportTemplateArgs = {
  updateReportTemplateInput: UpdateReportTemplateInput;
};

export type MutationUpdateRoleArgs = {
  roleUpdateInput: RoleUpdateInput;
};

export type MutationUpdateSubAdminArgs = {
  updateSubAdminInput: UpdateSubAdminInput;
};

export type MutationUpdateTaskArgs = {
  taskInput: TaskUpdateInput;
};

export type MutationUpdateTemporaryPasswordArgs = {
  temporaryPasswordInput: TemporaryPasswordInput;
};

export type MutationUpdateTrainingArgs = {
  updateTrainingInput: UpdateTrainingInput;
};

export type MutationUpdateUserFieldsArgs = {
  updateUserFieldsInput: UpdateUserFieldsInput;
};

export type MutationVerifyOtpArgs = {
  verifyOtpInput: VerifyOtpInput;
};

export type Operation = {
  __typename?: "Operation";
  _id?: Maybe<Scalars["ID"]>;
  icon: Icon;
  path: Scalars["String"];
  permissions: Array<EPermission>;
  title: Scalars["String"];
};

export type Operations = {
  __typename?: "Operations";
  name: Scalars["String"];
  views: Array<Scalars["String"]>;
};

export type Package = {
  __typename?: "Package";
  _id?: Maybe<Scalars["ID"]>;
  active: Scalars["Boolean"];
  annual: Scalars["Boolean"];
  compare_at?: Maybe<Scalars["Float"]>;
  cost: Scalars["Float"];
  description: Scalars["String"];
  discount: Scalars["Float"];
  discount_type: DiscountType;
  duration: Scalars["Int"];
  modules: Array<Maybe<Modules>>;
  number_of_users: Scalars["Int"];
  sizeInGB: Scalars["Float"];
  title: Scalars["String"];
};

export type PackageInput = {
  active: Scalars["Boolean"];
  annual: Scalars["Boolean"];
  compare_at?: InputMaybe<Scalars["Float"]>;
  cost: Scalars["Float"];
  description: Scalars["String"];
  discount: Scalars["Float"];
  discount_type: DiscountType;
  duration: Scalars["Int"];
  modules: Array<InputMaybe<IntModuleForCreatingPackage>>;
  number_of_users: Scalars["Int"];
  sizeInGB: Scalars["Float"];
  title: Scalars["String"];
};

export enum PackageType {
  Custom = "CUSTOM",
  Freemium = "FREEMIUM",
  Premium = "PREMIUM",
}

export type Park = {
  __typename?: "Park";
  _id?: Maybe<Scalars["ID"]>;
  additionalDetails?: Maybe<AdditionalDetails>;
  locations?: Maybe<Array<Maybe<ParkLocation>>>;
  logo?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type ParkDataInput = {
  name: Scalars["String"];
  park_logo?: InputMaybe<Scalars["String"]>;
};

export type ParkLocation = {
  __typename?: "ParkLocation";
  GPS: Gps;
  _id?: Maybe<Scalars["ID"]>;
  active?: Maybe<Scalars["Boolean"]>;
  additionalDetails?: Maybe<AdditionalDetails>;
  address: Scalars["String"];
  city: Scalars["String"];
  country?: Maybe<Scalars["String"]>;
  facility: Scalars["String"];
  state: Scalars["String"];
};

export type ParkLocationDataInput = {
  GPS: InputGps;
  _id?: InputMaybe<Scalars["ID"]>;
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  facility: Scalars["String"];
  state: Scalars["String"];
};

export type PaymentDetail = {
  __typename?: "PaymentDetail";
  amount?: Maybe<Scalars["Float"]>;
  method?: Maybe<Scalars["String"]>;
};

export type PaymentDetailsInput = {
  amount: Scalars["Float"];
  method: Scalars["String"];
};

export enum PaymentStatus {
  Paid = "PAID",
  Unpaid = "UNPAID",
}

export type PectoraAuth = {
  __typename?: "PectoraAuth";
  X_Auth_Id: Scalars["ID"];
  X_Auth_Token: Scalars["ID"];
};

export type Phone = {
  __typename?: "Phone";
  code: Scalars["String"];
  phoneNo: Scalars["String"];
};

export type PointOfInterest = {
  __typename?: "PointOfInterest";
  _id: Scalars["ID"];
  belongsToFacilityRef?: Maybe<ParkLocation>;
  createdByRef?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
  points?: Maybe<Array<Maybe<Scalars["String"]>>>;
  type: EPointOfAttraction;
};

export type PointOfInterestInput = {
  belongsToFacilityRef: Scalars["ID"];
  createdByRef: Scalars["ID"];
  name: Scalars["String"];
  points?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  type: EPointOfAttraction;
};

export type PostTickerInput = {
  expiration: Scalars["Date"];
  message: Scalars["String"];
  postedBy: Scalars["String"];
  redirect?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  dogs: Array<Dog>;
  findActivityLogByClientAdminId: Array<ActivityLog>;
  findActivityLogById: ActivityLog;
  findActivityLogByUserId: Array<ActivityLog>;
  findAllDepartments: Array<Department>;
  findAllEmployees: Array<User>;
  findAllPackages: Array<Package>;
  findAllReportTemplates: Array<ReportTemplate>;
  findAllReports: Array<ReportSubmission>;
  findAllSubAdminPayments: Array<SubAdminPayment>;
  findAllTasks: Array<Task>;
  findAssignedTaskById: TaskAssigned;
  findDepartmentById: Department;
  findDepartmentsByOwnerId: Array<FindDepartmentsByOwnerId>;
  findEmployeeById: User;
  findMyUsers: Array<User>;
  findPackageById: Package;
  findRelatingUsers: Array<FindRelatingUsersResponse>;
  findRole: Array<Role>;
  findRoleById: Role;
  findRolesByUserId: Array<Role>;
  findSubAdminPaymenteById: SubAdminPayment;
  findTaskById: Task;
  findTemplateById: ReportTemplate;
  findUserReportSubmissionById: ReportSubmission;
  getAlertsForMobile?: Maybe<Alert>;
  getAllClientAdmins?: Maybe<Array<Maybe<User>>>;
  getAllParks?: Maybe<Array<Maybe<Park>>>;
  getAllSubscriptions?: Maybe<Array<Maybe<Package>>>;
  getAssignedTasksById: Array<TaskAssigned>;
  getAssignedTrainingById: TrainingSession;
  getClientDashboardStats?: Maybe<ClientDashboardStats>;
  getClientSecret: ClientSecret;
  getClientSecretForSubscriber: ClientSecret;
  getEmailAndNotificationByCreatorId: Array<EmailAndNotification>;
  getEmailAndNotificationById: EmailAndNotification;
  getEmployeeHomeScreenData: Scalars["String"];
  getFAQS: GenericResponseType;
  getFacilities: Array<ParkLocation>;
  getFailedVAT: Array<GetFailedVatResponse>;
  getIncidentReportsForClientDashboardStats?: Maybe<
    Array<Maybe<IncidentReportClientDashboardStats>>
  >;
  getLocationById: ParkLocation;
  getMyTrainings: Array<Training>;
  getPectoraAndAppUsers: Array<Scalars["String"]>;
  getPectoraAuth: PectoraAuth;
  getPointsOfInterest: Array<PointOfInterest>;
  getPost: GenericResponseType;
  getReportSubmissionById?: Maybe<Array<Maybe<ReportSubmissionForMobile>>>;
  getSubAdminList: Array<SubAdminList>;
  getSuperAdminDashboardStats?: Maybe<SuperAdminDashboardStats>;
  getTrainingById: Training;
  getTrainingsById: Array<Maybe<TrainingSessionForMobile>>;
  getUserNotifications: Array<EmailAndNotification>;
  getUserNotificationsForMobile?: Maybe<GenericResponseType>;
  getUserPackageModuleById: UserPackages;
  getUserParks: Array<UserLocationListing>;
  getUserTrainingSession: Array<TrainingSession>;
  manageRolesListing: Array<ManageRolesListingResponse>;
  operations: Array<Operation>;
  requestedLocations: Array<Maybe<LocationLists>>;
  trackAllTasks: Array<TaskAssigned>;
  trackClientAdmins: Array<User>;
  trackMyReports?: Maybe<Array<Maybe<ReportSubmissionForMobile>>>;
  trackMyTask: Array<TaskAssigned>;
  trackParticularClientRecord: Array<UserPackages>;
  userById?: Maybe<User>;
  userLocations: Array<Maybe<LocationLists>>;
  users: Array<User>;
};

export type QueryFindActivityLogByClientAdminIdArgs = {
  belongsTo: Scalars["ID"];
};

export type QueryFindActivityLogByIdArgs = {
  id: Scalars["ID"];
};

export type QueryFindActivityLogByUserIdArgs = {
  user_id: Scalars["ID"];
};

export type QueryFindAllEmployeesArgs = {
  createdById: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
};

export type QueryFindAllReportTemplatesArgs = {
  createdById?: InputMaybe<Scalars["ID"]>;
  filter?: InputMaybe<InputTableFilter>;
  reportType: EReportType;
};

export type QueryFindAllReportsArgs = {
  filter?: InputMaybe<InputTableFilter>;
  userId: Scalars["ID"];
};

export type QueryFindAllTasksArgs = {
  creatorId: Scalars["ID"];
};

export type QueryFindAssignedTaskByIdArgs = {
  assignedTaskId: Scalars["ID"];
};

export type QueryFindDepartmentByIdArgs = {
  departmentId: Scalars["ID"];
};

export type QueryFindDepartmentsByOwnerIdArgs = {
  clientAdminId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
};

export type QueryFindEmployeeByIdArgs = {
  id: Scalars["ID"];
};

export type QueryFindMyUsersArgs = {
  facilityId?: InputMaybe<Scalars["ID"]>;
  ownerId: Scalars["ID"];
};

export type QueryFindPackageByIdArgs = {
  PackageId: Scalars["ID"];
};

export type QueryFindRelatingUsersArgs = {
  filter?: InputMaybe<InputTableFilter>;
  id: Scalars["ID"];
};

export type QueryFindRoleByIdArgs = {
  filter?: InputMaybe<Scalars["ID"]>;
  id: Scalars["ID"];
};

export type QueryFindRolesByUserIdArgs = {
  facilityId?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  id: Scalars["ID"];
};

export type QueryFindSubAdminPaymenteByIdArgs = {
  id: Scalars["ID"];
};

export type QueryFindTaskByIdArgs = {
  id: Scalars["ID"];
};

export type QueryFindTemplateByIdArgs = {
  id: Scalars["ID"];
};

export type QueryFindUserReportSubmissionByIdArgs = {
  reportId: Scalars["ID"];
};

export type QueryGetAlertsForMobileArgs = {
  filter?: InputMaybe<InputTableFilter>;
  userId: Scalars["ID"];
};

export type QueryGetAssignedTasksByIdArgs = {
  filter?: InputMaybe<InputTableFilter>;
  userId: Scalars["ID"];
};

export type QueryGetAssignedTrainingByIdArgs = {
  taskId: Scalars["ID"];
};

export type QueryGetClientDashboardStatsArgs = {
  facilityId: Scalars["ID"];
  userId: Scalars["ID"];
};

export type QueryGetClientSecretArgs = {
  input?: InputMaybe<GetClientSecretInput>;
};

export type QueryGetClientSecretForSubscriberArgs = {
  amount: Scalars["Float"];
};

export type QueryGetEmailAndNotificationByCreatorIdArgs = {
  creatorId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
};

export type QueryGetEmailAndNotificationByIdArgs = {
  objectId: Scalars["ID"];
};

export type QueryGetEmployeeHomeScreenDataArgs = {
  userId: Scalars["ID"];
};

export type QueryGetFaqsArgs = {
  status?: InputMaybe<Scalars["String"]>;
};

export type QueryGetFacilitiesArgs = {
  filter?: InputMaybe<FacilityFilterInput>;
  userId: Scalars["ID"];
};

export type QueryGetFailedVatArgs = {
  facilityId: Scalars["ID"];
};

export type QueryGetIncidentReportsForClientDashboardStatsArgs = {
  filter?: InputMaybe<IncidentReportDashboardFilterInput>;
  userId: Scalars["ID"];
};

export type QueryGetLocationByIdArgs = {
  id: Scalars["ID"];
};

export type QueryGetMyTrainingsArgs = {
  creatorId: Scalars["ID"];
};

export type QueryGetPectoraAndAppUsersArgs = {
  facilityId: Scalars["ID"];
};

export type QueryGetPectoraAuthArgs = {
  facilityId: Scalars["ID"];
};

export type QueryGetPointsOfInterestArgs = {
  facilityId: Scalars["ID"];
};

export type QueryGetReportSubmissionByIdArgs = {
  empId?: InputMaybe<Scalars["ID"]>;
  filter?: InputMaybe<InputTableFilter>;
};

export type QueryGetSubAdminListArgs = {
  filter?: InputMaybe<InputTableFilter>;
  id: Scalars["ID"];
};

export type QueryGetSuperAdminDashboardStatsArgs = {
  clientAdminId: Scalars["ID"];
  packageId: Scalars["ID"];
};

export type QueryGetTrainingByIdArgs = {
  trainingId: Scalars["ID"];
};

export type QueryGetTrainingsByIdArgs = {
  filter?: InputMaybe<InputTableFilter>;
  userId: Scalars["ID"];
};

export type QueryGetUserNotificationsArgs = {
  userId: Scalars["ID"];
};

export type QueryGetUserNotificationsForMobileArgs = {
  unread?: InputMaybe<Scalars["Boolean"]>;
  userId: Scalars["ID"];
};

export type QueryGetUserPackageModuleByIdArgs = {
  subscriptionId: Scalars["ID"];
};

export type QueryGetUserParksArgs = {
  filter?: InputMaybe<InputTableFilter>;
  userId: Scalars["ID"];
};

export type QueryGetUserTrainingSessionArgs = {
  getUserTrainingSessionInput: GetUserTrainingSessionInput;
};

export type QueryManageRolesListingArgs = {
  filter?: InputMaybe<InputTableFilter>;
  userId: Scalars["ID"];
};

export type QueryRequestedLocationsArgs = {
  filter?: InputMaybe<InputTableFilter>;
};

export type QueryTrackAllTasksArgs = {
  creatorId: Scalars["ID"];
  tableFilters?: InputMaybe<InputTableFilter>;
};

export type QueryTrackClientAdminsArgs = {
  filter?: InputMaybe<InputTableFilter>;
};

export type QueryTrackMyReportsArgs = {
  assignedTo: Scalars["ID"];
};

export type QueryTrackMyTaskArgs = {
  creatorId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
};

export type QueryTrackParticularClientRecordArgs = {
  userId: Scalars["ID"];
};

export type QueryUserByIdArgs = {
  id: Scalars["String"];
};

export type QueryUserLocationsArgs = {
  filter?: InputMaybe<InputTableFilter>;
  id: Scalars["ID"];
};

export type ReportSubmission = {
  __typename?: "ReportSubmission";
  _id: Scalars["ID"];
  assignedTo?: Maybe<User>;
  assignedToFacilityRef?: Maybe<ParkLocation>;
  belongs_to: ReportTemplate;
  clientAdminRef?: Maybe<Scalars["ID"]>;
  createdAt: Scalars["Date"];
  created_by: User;
  reportType?: Maybe<EReportType>;
  scheduleType: EScheduleType;
  submissions: Array<ReportSubmittedData>;
  title: Scalars["String"];
};

export type ReportSubmissionForMobile = {
  __typename?: "ReportSubmissionForMobile";
  _id?: Maybe<Scalars["String"]>;
  assignedTo?: Maybe<User>;
  assignedToFacilityRef?: Maybe<ParkLocation>;
  belongs_to: ReportTemplate;
  clientAdminRef?: Maybe<Scalars["ID"]>;
  createdAt: Scalars["Date"];
  created_by: User;
  facility?: Maybe<Scalars["String"]>;
  priority?: Maybe<EPriority>;
  scheduleType?: Maybe<EScheduleType>;
  submissions?: Maybe<ReportSubmittedData>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type ReportSubmittedData = {
  __typename?: "ReportSubmittedData";
  _id?: Maybe<Scalars["String"]>;
  date: Scalars["Date"];
  status?: Maybe<ESubmissionStatus>;
  submitted_data: Scalars["JSON"];
};

export type ReportTemplate = {
  __typename?: "ReportTemplate";
  _id?: Maybe<Scalars["ID"]>;
  clientAdminRef?: Maybe<Scalars["ID"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  created_by: Scalars["ID"];
  facility?: Maybe<ParkLocation>;
  fields: Array<FormFields>;
  name: Scalars["String"];
  status?: Maybe<Scalars["Boolean"]>;
  type: EReportType;
  universalAccess?: Maybe<Scalars["Boolean"]>;
};

export type ReportTemplateInput = {
  created_by: Scalars["ID"];
  facility?: InputMaybe<Scalars["String"]>;
  fields: Array<FormFieldInput>;
  name: Scalars["String"];
  status: Scalars["Boolean"];
  type: Scalars["String"];
};

export type ResetPasswordInput = {
  email: Scalars["String"];
  new_password: Scalars["String"];
  oldPassword?: InputMaybe<Scalars["String"]>;
};

export type Role = {
  __typename?: "Role";
  _id?: Maybe<Scalars["ID"]>;
  active: Scalars["Boolean"];
  facility?: Maybe<Scalars["String"]>;
  modules?: Maybe<Array<Maybe<Modules>>>;
  name: Scalars["String"];
  operations?: Maybe<Array<Maybe<Operations>>>;
  user_id: Scalars["ID"];
};

export type RoleInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  active: Scalars["Boolean"];
  facility?: InputMaybe<Scalars["String"]>;
  modules?: InputMaybe<Array<IntModule>>;
  name: Scalars["String"];
  operations?: InputMaybe<Array<IntOperation>>;
  user_id: Scalars["ID"];
};

export type RoleUpdateInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  active?: InputMaybe<Scalars["Boolean"]>;
  facility?: InputMaybe<Scalars["String"]>;
  modules?: InputMaybe<Array<InputMaybe<IntModule>>>;
  name?: InputMaybe<Scalars["String"]>;
  operations?: InputMaybe<Array<InputMaybe<IntOperation>>>;
};

export type Session = {
  __typename?: "Session";
  _id?: Maybe<Scalars["ID"]>;
  detail?: Maybe<Scalars["String"]>;
  image?: Maybe<SessionFile>;
  video?: Maybe<SessionFile>;
};

export type SessionFile = {
  __typename?: "SessionFile";
  complete: Scalars["Boolean"];
  data: Scalars["String"];
};

export type SessionFileForMobileInput = {
  complete: Scalars["Boolean"];
  data: Scalars["String"];
};

export type SessionFileInput = {
  complete?: InputMaybe<Scalars["Boolean"]>;
  data: Scalars["String"];
};

export type SessionForMobileInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  createdAt?: InputMaybe<Scalars["Date"]>;
  detail?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<SessionFileForMobileInput>;
  updatedAt?: InputMaybe<Scalars["Date"]>;
  video?: InputMaybe<SessionFileForMobileInput>;
};

export type SubAdminCompanyInput = {
  company: Scalars["Boolean"];
  email: Scalars["String"];
};

export type SubAdminList = {
  __typename?: "SubAdminList";
  _id?: Maybe<Scalars["ID"]>;
  account?: Maybe<Scalars["Boolean"]>;
  action?: Maybe<ActionType>;
  name?: Maybe<Scalars["String"]>;
  package?: Maybe<Scalars["String"]>;
  payment?: Maybe<Scalars["Boolean"]>;
};

export type SubAdminOnboardInput = {
  _id: Scalars["ID"];
  parkData: ParkDataInput;
  parkLocationData: ParkLocationDataInput;
  userData: UserDataInput;
};

export type SubAdminPayment = {
  __typename?: "SubAdminPayment";
  _id?: Maybe<Scalars["ID"]>;
  amount: Scalars["Int"];
  current_status: PaymentStatus;
  last_payment_date: Scalars["Date"];
  next_payment_date: Scalars["Date"];
  package_type?: Maybe<PackageType>;
  subscription_date: Scalars["Date"];
  user_id: User;
};

export type SubAdminPaymentInput = {
  amount: Scalars["Int"];
  current_status: PaymentStatus;
  last_payment_date: Scalars["Date"];
  next_payment_date: Scalars["Date"];
  package_type?: InputMaybe<PackageType>;
  subscription_date: Scalars["Date"];
  user_id: Scalars["ID"];
};

export type SubTask = {
  __typename?: "SubTask";
  completed: Scalars["Boolean"];
  detail: Scalars["String"];
};

export type SubTaskForMobileInput = {
  media?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  remarks?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Scalars["String"]>;
  subTasks: Array<SubTaskInput>;
  voice?: InputMaybe<Scalars["String"]>;
};

export type SubTaskInput = {
  completed: Scalars["Boolean"];
  detail: Scalars["String"];
};

export type SubmitReportForMobileInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  date?: InputMaybe<Scalars["Date"]>;
  status?: InputMaybe<Scalars["String"]>;
  submitted_data: Scalars["JSON"];
};

export type SuperAdminDashboardStats = {
  __typename?: "SuperAdminDashboardStats";
  accountsCount?: Maybe<Scalars["Int"]>;
  activeUsersCount?: Maybe<Scalars["Int"]>;
  facilityCount?: Maybe<Scalars["Int"]>;
  newClientsOfCurrentMonth?: Maybe<Scalars["Int"]>;
  usersCountAccordingClientAdmin?: Maybe<Scalars["Int"]>;
  usersCountBySubscription?: Maybe<Scalars["Int"]>;
};

export type Task = {
  __typename?: "Task";
  _id: Scalars["ID"];
  clientAdminRef?: Maybe<User>;
  createdAt?: Maybe<Scalars["Date"]>;
  createdBy?: Maybe<User>;
  detail?: Maybe<Scalars["String"]>;
  facility?: Maybe<Scalars["String"]>;
  media?: Maybe<Array<Maybe<Scalars["String"]>>>;
  subtasks?: Maybe<Array<Maybe<SubTask>>>;
  title?: Maybe<Scalars["String"]>;
};

export type TaskAssigned = {
  __typename?: "TaskAssigned";
  _id?: Maybe<Scalars["ID"]>;
  assignedToFacilityRef?: Maybe<ParkLocation>;
  clientAdminRef?: Maybe<User>;
  createdAt?: Maybe<Scalars["String"]>;
  createdBy_id?: Maybe<User>;
  deadline?: Maybe<Scalars["Date"]>;
  detail?: Maybe<Scalars["String"]>;
  media?: Maybe<Array<Maybe<Scalars["String"]>>>;
  priority?: Maybe<Scalars["String"]>;
  scheduleType?: Maybe<EScheduleType>;
  submissions?: Maybe<Array<Maybe<TaskSubmission>>>;
  taskId?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  userId?: Maybe<User>;
};

export type TaskAssignedUnwindSubmission = {
  __typename?: "TaskAssignedUnwindSubmission";
  _id?: Maybe<Scalars["ID"]>;
  assignedToFacilityRef?: Maybe<ParkLocation>;
  clientAdminRef?: Maybe<User>;
  createdBy_id?: Maybe<User>;
  deadline?: Maybe<Scalars["Date"]>;
  detail?: Maybe<Scalars["String"]>;
  media?: Maybe<Array<Maybe<Scalars["String"]>>>;
  priority?: Maybe<EPriority>;
  scheduleType?: Maybe<EScheduleType>;
  submissions?: Maybe<Array<Maybe<TaskSubmission>>>;
  taskId?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  userId?: Maybe<User>;
};

export type TaskInput = {
  clientAdminRef?: InputMaybe<Scalars["ID"]>;
  createdBy: Scalars["ID"];
  detail: Scalars["String"];
  facility: Scalars["String"];
  media?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  subtasks?: InputMaybe<Array<SubTaskInput>>;
  title: Scalars["String"];
};

export type TaskSubmission = {
  __typename?: "TaskSubmission";
  _id?: Maybe<Scalars["ID"]>;
  date?: Maybe<Scalars["Date"]>;
  media?: Maybe<Array<Maybe<Scalars["String"]>>>;
  remarks?: Maybe<Scalars["String"]>;
  status?: Maybe<ESubmissionStatus>;
  subtasks?: Maybe<Array<Maybe<SubTask>>>;
  voice?: Maybe<Scalars["String"]>;
};

export type TaskUpdateInput = {
  _id: Scalars["ID"];
  detail: Scalars["String"];
  facility?: InputMaybe<Scalars["String"]>;
  media?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  subtasks?: InputMaybe<Array<SubTaskInput>>;
  title: Scalars["String"];
};

export type TemporaryPasswordInput = {
  email: Scalars["String"];
  temporary_password: Scalars["Boolean"];
};

export type TemporaryPasswordResponse = {
  __typename?: "TemporaryPasswordResponse";
  message: Scalars["String"];
  token: Scalars["String"];
};

export type Ticker = {
  __typename?: "Ticker";
  _id: Scalars["ID"];
  expiration?: Maybe<Scalars["Date"]>;
  message?: Maybe<Scalars["String"]>;
  postBelongsTo?: Maybe<User>;
  postedBy?: Maybe<User>;
  redirect?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
};

export type Training = {
  __typename?: "Training";
  _id: Scalars["ID"];
  createdAt?: Maybe<Scalars["Date"]>;
  createdBy?: Maybe<User>;
  facility: ParkLocation;
  sessions: Array<Session>;
  title: Scalars["String"];
};

export type TrainingSession = {
  __typename?: "TrainingSession";
  _id?: Maybe<Scalars["ID"]>;
  assignedToFacilityRef?: Maybe<ParkLocation>;
  authority?: Maybe<User>;
  priority?: Maybe<EPriority>;
  scheduleType?: Maybe<EScheduleType>;
  sessions?: Maybe<Array<SessionSubmissions>>;
  status?: Maybe<ESubmissionStatus>;
  title?: Maybe<Scalars["String"]>;
  trainingRef?: Maybe<Training>;
  userRef?: Maybe<User>;
};

export type TrainingSessionForMobile = {
  __typename?: "TrainingSessionForMobile";
  _id?: Maybe<Scalars["String"]>;
  assignedToFacilityRef?: Maybe<ParkLocation>;
  authority?: Maybe<User>;
  priority?: Maybe<EPriority>;
  scheduleType?: Maybe<EScheduleType>;
  sessions?: Maybe<SessionSubmissions>;
  status?: Maybe<ESubmissionStatus>;
  title?: Maybe<Scalars["String"]>;
  trainingRef?: Maybe<Training>;
  type?: Maybe<Scalars["String"]>;
  userRef?: Maybe<User>;
};

export type TrainingSessionInput = {
  detail?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<SessionFileInput>;
  video?: InputMaybe<SessionFileInput>;
};

export type TrainingSessionUpdateInputForMobile = {
  session?: InputMaybe<Array<SessionForMobileInput>>;
  status?: InputMaybe<Scalars["String"]>;
};

export type UpdateEmailInput = {
  email: Scalars["String"];
  new_email: Scalars["String"];
  password: Scalars["String"];
};

export type UpdateEmployeeInput = {
  _id?: InputMaybe<Scalars["ID"]>;
  access: FAQStatus;
  active?: InputMaybe<Scalars["Boolean"]>;
  email?: InputMaybe<Scalars["String"]>;
  employeeType?: InputMaybe<EmployeeType>;
  first_name?: InputMaybe<Scalars["String"]>;
  last_name?: InputMaybe<Scalars["String"]>;
  location?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  modules?: InputMaybe<Array<IntModule>>;
  operations?: InputMaybe<Array<IntOperation>>;
  password?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<InputPhone>;
  photo_url?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
};

export type UpdateFacilityRequestInput = {
  GPS: InputGps;
  _id: Scalars["ID"];
  address: Scalars["String"];
  city: Scalars["String"];
  country: Scalars["String"];
  facility: Scalars["String"];
  state: Scalars["String"];
};

export type UpdatePackageInput = {
  _id: Scalars["String"];
  active: Scalars["Boolean"];
  compare_at?: InputMaybe<Scalars["Float"]>;
  cost: Scalars["Float"];
  description: Scalars["String"];
  discount: Scalars["Float"];
  discount_type: DiscountType;
  duration: Scalars["Int"];
  modules: Array<InputMaybe<IntModuleForCreatingPackage>>;
  number_of_users: Scalars["Int"];
  sizeInGB: Scalars["Float"];
  title: Scalars["String"];
};

export type UpdatePointOfInterestInput = {
  _id: Scalars["ID"];
  name?: InputMaybe<Scalars["String"]>;
  points?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  type?: InputMaybe<EPointOfAttraction>;
};

export type UpdateProfileInput = {
  _id: Scalars["ID"];
  first_name?: InputMaybe<Scalars["String"]>;
  last_name?: InputMaybe<Scalars["String"]>;
  park?: InputMaybe<Scalars["String"]>;
  photo_url?: InputMaybe<Scalars["String"]>;
};

export type UpdateReportTemplateInput = {
  _id: Scalars["ID"];
  clientAdminRef?: InputMaybe<Scalars["ID"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  facility?: InputMaybe<Scalars["String"]>;
  fields: Array<FormFieldInput>;
  name: Scalars["String"];
  status?: InputMaybe<Scalars["Boolean"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type UpdateSubAdminInput = {
  _id: Scalars["ID"];
  access?: InputMaybe<FAQStatus>;
  email: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  modules?: InputMaybe<Array<InputMaybe<IntModule>>>;
  operations?: InputMaybe<Array<InputMaybe<IntOperation>>>;
  password?: InputMaybe<Scalars["String"]>;
  phone: InputPhone;
  type: Scalars["Boolean"];
};

export type UpdateTrainingInput = {
  _id: Scalars["ID"];
  facility: Scalars["String"];
  sessions: Array<TrainingSessionInput>;
  title: Scalars["String"];
};

export type UpdateUserFieldsInput = {
  _id: Scalars["String"];
  active?: InputMaybe<Scalars["Boolean"]>;
  admin?: InputMaybe<Scalars["Boolean"]>;
  created_by?: InputMaybe<Scalars["ID"]>;
  department?: InputMaybe<Scalars["String"]>;
  deviceToken?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  first_name?: InputMaybe<Scalars["String"]>;
  last_name?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  photo_url?: InputMaybe<Scalars["String"]>;
  rec_email?: InputMaybe<Scalars["String"]>;
  scopes?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  themeId?: InputMaybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  _id: Scalars["String"];
  access: FAQStatus;
  active: Scalars["Boolean"];
  admin: Scalars["Boolean"];
  belongsTo?: Maybe<Scalars["ID"]>;
  company?: Maybe<Company>;
  created_by?: Maybe<Scalars["ID"]>;
  department?: Maybe<Scalars["String"]>;
  deviceToken?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  liveLocation: LiveLocation;
  modules?: Maybe<Array<Maybe<Modules>>>;
  operations?: Maybe<Array<Maybe<Operations>>>;
  package?: Maybe<UserPackages>;
  password: Scalars["String"];
  paymentDetail?: Maybe<PaymentDetail>;
  phone?: Maybe<Phone>;
  photo_url?: Maybe<Scalars["String"]>;
  rec_email: Scalars["String"];
  role?: Maybe<Role>;
  scopes?: Maybe<Array<Maybe<Scalars["String"]>>>;
  stripeCustomerId: Scalars["String"];
  themeId: Scalars["String"];
};

export type UserDataInput = {
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  profile_img?: InputMaybe<Scalars["String"]>;
};

export type UserInput = {
  _id: Scalars["String"];
  access: FAQStatus;
  active: Scalars["Boolean"];
  admin: Scalars["Boolean"];
  belongsTo?: InputMaybe<Scalars["ID"]>;
  company?: InputMaybe<CompanyInput>;
  created_by?: InputMaybe<Scalars["ID"]>;
  deviceToken?: InputMaybe<Scalars["String"]>;
  email: Scalars["String"];
  first_name: Scalars["String"];
  last_name: Scalars["String"];
  liveLocation: LiveLocationInput;
  modules: Array<IntModule>;
  operations: Array<IntOperation>;
  package?: InputMaybe<Scalars["ID"]>;
  password: Scalars["String"];
  phone?: InputMaybe<InputPhone>;
  photo_url?: InputMaybe<Scalars["String"]>;
  rec_email: Scalars["String"];
  role?: InputMaybe<Scalars["ID"]>;
  scopes?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  stripeCustomerId: Scalars["String"];
  temporary_password?: InputMaybe<Scalars["Boolean"]>;
  themeId: Scalars["String"];
};

export type UserLocationListing = {
  __typename?: "UserLocationListing";
  _id: Scalars["ID"];
  createdOn: Scalars["Date"];
  parkName?: Maybe<Scalars["String"]>;
  status: Scalars["Boolean"];
  userName: Scalars["String"];
};

export type UserMobile = {
  __typename?: "UserMobile";
  _id?: Maybe<Scalars["String"]>;
  first_name?: Maybe<Scalars["String"]>;
  last_name?: Maybe<Scalars["String"]>;
  photo_url?: Maybe<Scalars["String"]>;
};

export type UserPackageModifyInput = {
  _id: Scalars["ID"];
  paymentDetails: PaymentDetailsInput;
  status: Scalars["String"];
  user_id: Scalars["ID"];
};

export type UserPackages = {
  __typename?: "UserPackages";
  _id?: Maybe<Scalars["ID"]>;
  active?: Maybe<Scalars["Boolean"]>;
  compare_at?: Maybe<Scalars["Float"]>;
  cost?: Maybe<Scalars["Float"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  description?: Maybe<Scalars["String"]>;
  discount?: Maybe<Scalars["Float"]>;
  discount_type?: Maybe<DiscountType>;
  duration?: Maybe<Scalars["Float"]>;
  modules?: Maybe<Array<Maybe<Modules>>>;
  number_of_users?: Maybe<Scalars["Int"]>;
  packageRef?: Maybe<Package>;
  paid?: Maybe<Scalars["Boolean"]>;
  paymentDetail?: Maybe<PaymentDetail>;
  ref?: Maybe<User>;
  sizeInGB?: Maybe<Scalars["Float"]>;
  status?: Maybe<ESubscriptionStatus>;
  title?: Maybe<Scalars["String"]>;
};

export type VerifyOtpInput = {
  otp: Scalars["Int"];
};

export type GenericResponseType = {
  __typename?: "genericResponseType";
  data?: Maybe<Scalars["JSON"]>;
  message?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["Boolean"]>;
};

export type GetAssignedTask = {
  __typename?: "getAssignedTask";
  _id?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["Date"]>;
  createdBy?: Maybe<UserMobile>;
  detail?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  users?: Maybe<Array<Maybe<UserMobile>>>;
};

export type SessionSubmissions = {
  __typename?: "sessionSubmissions";
  _id?: Maybe<Scalars["String"]>;
  date: Scalars["String"];
  session: Array<Session>;
  status: ESubmissionStatus;
};

export type CreateActivityLogMutationVariables = Exact<{
  activityLogInput: ActivityLogInput;
}>;

export type CreateActivityLogMutation = {
  __typename?: "Mutation";
  createActivityLog: {
    __typename?: "ActivityLog";
    _id?: string | null;
    user_name: string;
    role: string;
    interface: Interface;
    activity: string;
    dateTime: any;
    belongsTo?: string | null;
    user_id: string;
  };
};

export type AddUserAdminMutationVariables = Exact<{
  signupInput: InputUser;
}>;

export type AddUserAdminMutation = {
  __typename?: "Mutation";
  addUserAdmin?: {
    __typename?: "User";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    admin: boolean;
    active: boolean;
  } | null;
};

export type CreateSubAdminMutationVariables = Exact<{
  createSubAdminInput: InputSubAdmin;
}>;

export type CreateSubAdminMutation = {
  __typename?: "Mutation";
  createSubAdmin: string;
};

export type RegisterClientMutationVariables = Exact<{
  registerClientInput: InputRegisterClient;
}>;

export type RegisterClientMutation = {
  __typename?: "Mutation";
  registerClient: string;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResponse";
    temporary_password?: boolean | null;
    token: string;
    userType?: string | null;
  };
};

export type ForgetPasswordMutationVariables = Exact<{
  forgetPasswordInput: ForgetPasswordInput;
}>;

export type ForgetPasswordMutation = {
  __typename?: "Mutation";
  forgetPassword?: string | null;
};

export type ResetPasswordMutationVariables = Exact<{
  resetPasswordInput: ResetPasswordInput;
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  resetPassword?: string | null;
};

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword?: string | null;
};

export type UpdateEmailMutationVariables = Exact<{
  updateEmailInput: UpdateEmailInput;
}>;

export type UpdateEmailMutation = {
  __typename?: "Mutation";
  updateEmail?: string | null;
};

export type VerifyOtpMutationVariables = Exact<{
  verifyOtpInput: VerifyOtpInput;
}>;

export type VerifyOtpMutation = {
  __typename?: "Mutation";
  verifyOtp?: string | null;
};

export type UpdateTemporaryPasswordMutationVariables = Exact<{
  temporaryPasswordInput: TemporaryPasswordInput;
}>;

export type UpdateTemporaryPasswordMutation = {
  __typename?: "Mutation";
  updateTemporaryPassword: {
    __typename?: "TemporaryPasswordResponse";
    message: string;
    token: string;
  };
};

export type ActivateSubAdminAfterSubscriptionMutationVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type ActivateSubAdminAfterSubscriptionMutation = {
  __typename?: "Mutation";
  activateSubAdminAfterSubscription: string;
};

export type AddDepartmentMutationVariables = Exact<{
  departmentInput: DepartmentInput;
}>;

export type AddDepartmentMutation = {
  __typename?: "Mutation";
  addDepartment: string;
};

export type UpdateDepartmentMutationVariables = Exact<{
  departmentUpdateInput: DepartmentUpdateInput;
}>;

export type UpdateDepartmentMutation = {
  __typename?: "Mutation";
  updateDepartment: string;
};

export type DeleteDepartmentMutationVariables = Exact<{
  departmentId: Scalars["ID"];
}>;

export type DeleteDepartmentMutation = {
  __typename?: "Mutation";
  deleteDepartment: string;
};

export type AddEmailAndNotificationMutationVariables = Exact<{
  emailAndNotificationInput: AddEmailAndNotificationInput;
}>;

export type AddEmailAndNotificationMutation = {
  __typename?: "Mutation";
  addEmailAndNotification: {
    __typename?: "genericResponseType";
    data?: any | null;
    message?: string | null;
    status?: boolean | null;
  };
};

export type EditEmailAndNotificationMutationVariables = Exact<{
  emailAndNotificationInput: EditEmailAndNotificationInput;
}>;

export type EditEmailAndNotificationMutation = {
  __typename?: "Mutation";
  editEmailAndNotification: string;
};

export type AssignEmailAndNotificationMutationVariables = Exact<{
  assignEmailAndNotificationInput: AssignEmailAndNotificationInput;
}>;

export type AssignEmailAndNotificationMutation = {
  __typename?: "Mutation";
  assignEmailAndNotification: string;
};

export type MarkAsReadMutationVariables = Exact<{
  objectId: Scalars["ID"];
}>;

export type MarkAsReadMutation = {
  __typename?: "Mutation";
  markAsRead?: string | null;
};

export type DeleteEmailAndNotificationMutationVariables = Exact<{
  notifId: Scalars["ID"];
}>;

export type DeleteEmailAndNotificationMutation = {
  __typename?: "Mutation";
  deleteEmailAndNotification?: string | null;
};

export type CreateEmployeeMutationVariables = Exact<{
  employeeInput: EmployeeInput;
  company?: InputMaybe<CompanyInput>;
}>;

export type CreateEmployeeMutation = {
  __typename?: "Mutation";
  createEmployee: string;
};

export type UpdateEmployeeMutationVariables = Exact<{
  updateEmployeeInput: UpdateEmployeeInput;
}>;

export type UpdateEmployeeMutation = {
  __typename?: "Mutation";
  updateEmployee: {
    __typename?: "User";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    photo_url?: string | null;
    password: string;
    admin: boolean;
    active: boolean;
    department?: string | null;
    created_by?: string | null;
    phone?: { __typename?: "Phone"; phoneNo: string; code: string } | null;
    company?: {
      __typename?: "Company";
      _id?: string | null;
      employee?: boolean | null;
      employeeType?: EmployeeType | null;
      subAdmin?: boolean | null;
      park?: { __typename?: "Park"; _id?: string | null } | null;
      location?: Array<{
        __typename?: "ParkLocation";
        _id?: string | null;
      } | null> | null;
    } | null;
  };
};

export type DeleteEmployeeMutationVariables = Exact<{
  employeeId: Scalars["ID"];
}>;

export type DeleteEmployeeMutation = {
  __typename?: "Mutation";
  deleteEmployee: string;
};

export type AddPackageMutationVariables = Exact<{
  packageInput: PackageInput;
}>;

export type AddPackageMutation = {
  __typename?: "Mutation";
  addPackage: {
    __typename?: "Package";
    _id?: string | null;
    title: string;
    annual: boolean;
    cost: number;
    compare_at?: number | null;
    active: boolean;
    discount: number;
    discount_type: DiscountType;
    modules: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null>;
  };
};

export type UpdatePackageMutationVariables = Exact<{
  updatePackageInput: UpdatePackageInput;
}>;

export type UpdatePackageMutation = {
  __typename?: "Mutation";
  updatePackage: {
    __typename?: "Package";
    _id?: string | null;
    title: string;
    annual: boolean;
    cost: number;
    compare_at?: number | null;
    active: boolean;
    discount: number;
    discount_type: DiscountType;
    modules: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null>;
  };
};

export type DeleteSubscriptionPackageMutationVariables = Exact<{
  deleteSubscriptionPackageId: Scalars["ID"];
}>;

export type DeleteSubscriptionPackageMutation = {
  __typename?: "Mutation";
  deleteSubscriptionPackage: string;
};

export type AddAnotherLocationMutationVariables = Exact<{
  parkLocationDataInput: ParkLocationDataInput;
}>;

export type AddAnotherLocationMutation = {
  __typename?: "Mutation";
  addAnotherLocation: string;
};

export type AcceptLocationRequestMutationVariables = Exact<{
  acceptLocationRequestId: Scalars["ID"];
}>;

export type AcceptLocationRequestMutation = {
  __typename?: "Mutation";
  acceptLocationRequest: string;
};

export type UpdateFacilityRequestMutationVariables = Exact<{
  updateFacilityRequestInput: UpdateFacilityRequestInput;
}>;

export type UpdateFacilityRequestMutation = {
  __typename?: "Mutation";
  updateFacilityRequest: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type AddPectoraAuthMutationVariables = Exact<{
  addPectoraAuthInput: AddPectoraAuthInput;
}>;

export type AddPectoraAuthMutation = {
  __typename?: "Mutation";
  addPectoraAuth: string;
};

export type AddPointOffInterestMutationVariables = Exact<{
  pointOfInterestInput: PointOfInterestInput;
}>;

export type AddPointOffInterestMutation = {
  __typename?: "Mutation";
  addPointOffInterest: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type UpdatePointOffInterestMutationVariables = Exact<{
  updatePointOfInterestInput: UpdatePointOfInterestInput;
}>;

export type UpdatePointOffInterestMutation = {
  __typename?: "Mutation";
  updatePointOffInterest: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type DeletePointOffInterestMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeletePointOffInterestMutation = {
  __typename?: "Mutation";
  deletePointOffInterest: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type AddReportTemplateMutationVariables = Exact<{
  reportTemplateInput: ReportTemplateInput;
}>;

export type AddReportTemplateMutation = {
  __typename?: "Mutation";
  addReportTemplate: {
    __typename?: "genericResponseType";
    data?: any | null;
    message?: string | null;
    status?: boolean | null;
  };
};

export type UpdateReportTemplateMutationVariables = Exact<{
  updateReportTemplateInput: UpdateReportTemplateInput;
}>;

export type UpdateReportTemplateMutation = {
  __typename?: "Mutation";
  updateReportTemplate: {
    __typename?: "ReportTemplate";
    _id?: string | null;
    name: string;
    created_by: string;
    clientAdminRef?: string | null;
    fields: Array<{
      __typename?: "FormFields";
      _id: string;
      type: string;
      label: string;
      placeholder?: string | null;
      options?: Array<string> | null;
    }>;
  };
};

export type AssignReportTemplateMutationVariables = Exact<{
  assignReportTemplateInput: AssignInput;
}>;

export type AssignReportTemplateMutation = {
  __typename?: "Mutation";
  assignReportTemplate: string;
};

export type DeleteReportTemplateMutationVariables = Exact<{
  templateId: Scalars["ID"];
}>;

export type DeleteReportTemplateMutation = {
  __typename?: "Mutation";
  deleteReportTemplate: {
    __typename?: "genericResponseType";
    data?: any | null;
    message?: string | null;
    status?: boolean | null;
  };
};

export type ApproveReportSubmissionMutationVariables = Exact<{
  submissionId: Scalars["ID"];
  assignedReportId: Scalars["ID"];
  approverId: Scalars["ID"];
}>;

export type ApproveReportSubmissionMutation = {
  __typename?: "Mutation";
  approveReportSubmission: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type EvaluateVatMutationVariables = Exact<{
  evaluateVatInput: EvaluateVatInput;
}>;

export type EvaluateVatMutation = {
  __typename?: "Mutation";
  evaluateVAT: string;
};

export type AddRoleMutationVariables = Exact<{
  roleInput: RoleInput;
}>;

export type AddRoleMutation = {
  __typename?: "Mutation";
  addRole?: {
    __typename?: "Role";
    _id?: string | null;
    name: string;
    active: boolean;
    user_id: string;
  } | null;
};

export type UpdateRoleMutationVariables = Exact<{
  roleUpdateInput: RoleUpdateInput;
}>;

export type UpdateRoleMutation = {
  __typename?: "Mutation";
  updateRole?: string | null;
};

export type DeleteRoleMutationVariables = Exact<{
  deleteRoleId: Scalars["ID"];
}>;

export type DeleteRoleMutation = {
  __typename?: "Mutation";
  deleteRole: string;
};

export type CreateStripeCustomerMutationVariables = Exact<{
  email: Scalars["String"];
}>;

export type CreateStripeCustomerMutation = {
  __typename?: "Mutation";
  createStripeCustomer: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type GetClientSecretForSubscriberQueryVariables = Exact<{
  amount: Scalars["Float"];
}>;

export type GetClientSecretForSubscriberQuery = {
  __typename?: "Query";
  getClientSecretForSubscriber: {
    __typename?: "ClientSecret";
    clientSecret?: string | null;
  };
};

export type OnboardSubAdminMutationVariables = Exact<{
  subAdminOnboardInput: SubAdminOnboardInput;
}>;

export type OnboardSubAdminMutation = {
  __typename?: "Mutation";
  onboardSubAdmin?: string | null;
};

export type UpdateSubAdminMutationVariables = Exact<{
  updateSubAdminInput: UpdateSubAdminInput;
}>;

export type UpdateSubAdminMutation = {
  __typename?: "Mutation";
  updateSubAdmin: string;
};

export type AddSubAdminPaymentMutationVariables = Exact<{
  subAdminInput: SubAdminPaymentInput;
}>;

export type AddSubAdminPaymentMutation = {
  __typename?: "Mutation";
  addSubAdminPayment: {
    __typename?: "SubAdminPayment";
    _id?: string | null;
    package_type?: PackageType | null;
    subscription_date: any;
    last_payment_date: any;
    next_payment_date: any;
    current_status: PaymentStatus;
    user_id: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    };
  };
};

export type CreateTaskMutationVariables = Exact<{
  taskInput: TaskInput;
}>;

export type CreateTaskMutation = {
  __typename?: "Mutation";
  createTask: {
    __typename?: "genericResponseType";
    data?: any | null;
    message?: string | null;
    status?: boolean | null;
  };
};

export type UpdateTaskMutationVariables = Exact<{
  taskInput: TaskUpdateInput;
}>;

export type UpdateTaskMutation = {
  __typename?: "Mutation";
  updateTask: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type DeleteTaskMutationVariables = Exact<{
  taskId: Scalars["ID"];
}>;

export type DeleteTaskMutation = {
  __typename?: "Mutation";
  deleteTask?: string | null;
};

export type AssignTaskMutationVariables = Exact<{
  taskAssignInput: AssignInput;
}>;

export type AssignTaskMutation = {
  __typename?: "Mutation";
  assignTask: {
    __typename?: "genericResponseType";
    data?: any | null;
    message?: string | null;
    status?: boolean | null;
  };
};

export type ApproveSubmissionMutationVariables = Exact<{
  submissionId: Scalars["ID"];
  taskId: Scalars["ID"];
  approverId: Scalars["ID"];
}>;

export type ApproveSubmissionMutation = {
  __typename?: "Mutation";
  approveSubmission: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type PostTickerMutationVariables = Exact<{
  postTickerInput: PostTickerInput;
}>;

export type PostTickerMutation = {
  __typename?: "Mutation";
  postTicker: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type AddTrainingSessionMutationVariables = Exact<{
  addTrainingSessionInput: AddTrainingSessionInput;
}>;

export type AddTrainingSessionMutation = {
  __typename?: "Mutation";
  addTrainingSession: {
    __typename?: "genericResponseType";
    data?: any | null;
    message?: string | null;
    status?: boolean | null;
  };
};

export type UpdateTrainingMutationVariables = Exact<{
  updateTrainingInput: UpdateTrainingInput;
}>;

export type UpdateTrainingMutation = {
  __typename?: "Mutation";
  updateTraining: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type DeleteTrainingMutationVariables = Exact<{
  trainingTemplateId: Scalars["ID"];
}>;

export type DeleteTrainingMutation = {
  __typename?: "Mutation";
  deleteTraining: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type AssignTrainingSessionMutationVariables = Exact<{
  assignTrainingSessionInput: AssignTrainingSessionInput;
}>;

export type AssignTrainingSessionMutation = {
  __typename?: "Mutation";
  assignTrainingSession: string;
};

export type AssignInServiceMutationVariables = Exact<{
  assignInServiceInput: AssignInServiceInput;
}>;

export type AssignInServiceMutation = {
  __typename?: "Mutation";
  assignInService: string;
};

export type UpdateAdminUserMutationVariables = Exact<{
  updateAdminUserInput: InputUser;
}>;

export type UpdateAdminUserMutation = {
  __typename?: "Mutation";
  updateAdminUser: string;
};

export type DeleteAdminUserMutationVariables = Exact<{
  deleteAdminUserId: Scalars["ID"];
}>;

export type DeleteAdminUserMutation = {
  __typename?: "Mutation";
  deleteAdminUser: string;
};

export type UpdateProfileMutationVariables = Exact<{
  updateProfileUpdateProfileInput: UpdateProfileInput;
}>;

export type UpdateProfileMutation = {
  __typename?: "Mutation";
  updateProfile?: string | null;
};

export type UpdateUserFieldsMutationVariables = Exact<{
  updateUserFieldsInput: UpdateUserFieldsInput;
}>;

export type UpdateUserFieldsMutation = {
  __typename?: "Mutation";
  updateUserFields: string;
};

export type ModifyPackageMutationVariables = Exact<{
  userPackageModifyInput: UserPackageModifyInput;
}>;

export type ModifyPackageMutation = {
  __typename?: "Mutation";
  modifyPackage: string;
};

export type AttachTaskToTrainingMutationVariables = Exact<{
  attachTaskToTrainingInput: AttachTaskToTrainingInput;
}>;

export type AttachTaskToTrainingMutation = {
  __typename?: "Mutation";
  attachTaskToTraining: string;
};

export type FindActivityLogByClientAdminIdQueryVariables = Exact<{
  belongsTo: Scalars["ID"];
}>;

export type FindActivityLogByClientAdminIdQuery = {
  __typename?: "Query";
  findActivityLogByClientAdminId: Array<{
    __typename?: "ActivityLog";
    _id?: string | null;
    activity: string;
    belongsTo?: string | null;
    dateTime: any;
    interface: Interface;
    role: string;
    user_id: string;
    user_name: string;
  }>;
};

export type FindActivityLogByUserIdQueryVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type FindActivityLogByUserIdQuery = {
  __typename?: "Query";
  findActivityLogByUserId: Array<{
    __typename?: "ActivityLog";
    _id?: string | null;
    user_name: string;
    role: string;
    interface: Interface;
    activity: string;
    dateTime: any;
    belongsTo?: string | null;
    user_id: string;
  }>;
};

export type FindActivityLogByIdQueryVariables = Exact<{
  findActivityLogByIdId: Scalars["ID"];
}>;

export type FindActivityLogByIdQuery = {
  __typename?: "Query";
  findActivityLogById: {
    __typename?: "ActivityLog";
    _id?: string | null;
    user_name: string;
    role: string;
    interface: Interface;
    activity: string;
    dateTime: any;
    belongsTo?: string | null;
    user_id: string;
  };
};

export type GetIncidentReportsForClientDashboardStatsQueryVariables = Exact<{
  userId: Scalars["ID"];
  filter?: InputMaybe<IncidentReportDashboardFilterInput>;
}>;

export type GetIncidentReportsForClientDashboardStatsQuery = {
  __typename?: "Query";
  getIncidentReportsForClientDashboardStats?: Array<{
    __typename?: "IncidentReportClientDashboardStats";
    _id?: number | null;
    dailyCounts?: Array<number | null> | null;
  } | null> | null;
};

export type GetClientDashboardStatsQueryVariables = Exact<{
  userId: Scalars["ID"];
  facilityId: Scalars["ID"];
}>;

export type GetClientDashboardStatsQuery = {
  __typename?: "Query";
  getClientDashboardStats?: {
    __typename?: "ClientDashboardStats";
    usersCountAccordingFacility?: number | null;
    taskPendingCount?: number | null;
    taskCompletedCount?: number | null;
    reportPendingCount?: number | null;
    reportCompletedCount?: number | null;
    trainingSessionCount?: number | null;
  } | null;
};

export type GetSuperAdminDashboardStatsQueryVariables = Exact<{
  clientAdminId: Scalars["ID"];
  packageId: Scalars["ID"];
}>;

export type GetSuperAdminDashboardStatsQuery = {
  __typename?: "Query";
  getSuperAdminDashboardStats?: {
    __typename?: "SuperAdminDashboardStats";
    accountsCount?: number | null;
    newClientsOfCurrentMonth?: number | null;
    facilityCount?: number | null;
    usersCountAccordingClientAdmin?: number | null;
    usersCountBySubscription?: number | null;
    activeUsersCount?: number | null;
  } | null;
};

export type GetAllClientAdminsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllClientAdminsQuery = {
  __typename?: "Query";
  getAllClientAdmins?: Array<{
    __typename?: "User";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null> | null;
};

export type GetAllSubscriptionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllSubscriptionsQuery = {
  __typename?: "Query";
  getAllSubscriptions?: Array<{
    __typename?: "Package";
    _id?: string | null;
    title: string;
    cost: number;
  } | null> | null;
};

export type GetAllParksQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllParksQuery = {
  __typename?: "Query";
  getAllParks?: Array<{
    __typename?: "Park";
    _id?: string | null;
    name?: string | null;
  } | null> | null;
};

export type FindAllDepartmentsQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllDepartmentsQuery = {
  __typename?: "Query";
  findAllDepartments: Array<{
    __typename?: "Department";
    _id: string;
    name: string;
    active: boolean;
    createdBy: string;
  }>;
};

export type FindDepartmentByIdQueryVariables = Exact<{
  departmentId: Scalars["ID"];
}>;

export type FindDepartmentByIdQuery = {
  __typename?: "Query";
  findDepartmentById: {
    __typename?: "Department";
    _id: string;
    name: string;
    active: boolean;
    createdBy: string;
  };
};

export type FindDepartmentsByOwnerIdQueryVariables = Exact<{
  clientAdminId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type FindDepartmentsByOwnerIdQuery = {
  __typename?: "Query";
  findDepartmentsByOwnerId: Array<{
    __typename?: "FindDepartmentsByOwnerId";
    _id?: string | null;
    department?: string | null;
    status?: boolean | null;
    createdOn?: any | null;
  }>;
};

export type GetDogsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDogsQuery = {
  __typename?: "Query";
  dogs: Array<{ __typename?: "Dog"; name: string }>;
};

export type GetEmailAndNotificationByCreatorIdQueryVariables = Exact<{
  creatorId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type GetEmailAndNotificationByCreatorIdQuery = {
  __typename?: "Query";
  getEmailAndNotificationByCreatorId: Array<{
    __typename?: "EmailAndNotification";
    _id?: string | null;
    code?: number | null;
    text?: string | null;
    type?: EEmailAndNotificationType | null;
    subject?: string | null;
    date?: any | null;
  }>;
};

export type GetEmailAndNotificationByIdQueryVariables = Exact<{
  objectId: Scalars["ID"];
}>;

export type GetEmailAndNotificationByIdQuery = {
  __typename?: "Query";
  getEmailAndNotificationById: {
    __typename?: "EmailAndNotification";
    _id?: string | null;
    text?: string | null;
    title?: string | null;
    type?: EEmailAndNotificationType | null;
    code?: number | null;
    date?: any | null;
    createdByRef?: { __typename?: "User"; _id: string } | null;
  };
};

export type GetUserNotificationsQueryVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type GetUserNotificationsQuery = {
  __typename?: "Query";
  getUserNotifications: Array<{
    __typename?: "EmailAndNotification";
    _id?: string | null;
    code?: number | null;
    type?: EEmailAndNotificationType | null;
    title?: string | null;
    text?: string | null;
    priority?: EPriority | null;
    read?: boolean | null;
    createdAt?: any | null;
    assignedUserRef?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
    createdByRef?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
  }>;
};

export type FindAllEmployeesQueryVariables = Exact<{
  createdById: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type FindAllEmployeesQuery = {
  __typename?: "Query";
  findAllEmployees: Array<{
    __typename?: "User";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    rec_email: string;
    photo_url?: string | null;
    scopes?: Array<string | null> | null;
    password: string;
    admin: boolean;
    active: boolean;
    department?: string | null;
    created_by?: string | null;
    phone?: { __typename?: "Phone"; phoneNo: string; code: string } | null;
    company?: {
      __typename?: "Company";
      _id?: string | null;
      employee?: boolean | null;
      employeeType?: EmployeeType | null;
      subAdmin?: boolean | null;
      park?: { __typename?: "Park"; _id?: string | null } | null;
    } | null;
  }>;
};

export type FindEmployeeByIdQueryVariables = Exact<{
  findEmployeeByIdId: Scalars["ID"];
}>;

export type FindEmployeeByIdQuery = {
  __typename?: "Query";
  findEmployeeById: {
    __typename?: "User";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    access: FAQStatus;
    photo_url?: string | null;
    password: string;
    admin: boolean;
    active: boolean;
    department?: string | null;
    created_by?: string | null;
    phone?: { __typename?: "Phone"; phoneNo: string; code: string } | null;
    role?: {
      __typename?: "Role";
      _id?: string | null;
      name: string;
      active: boolean;
      operations?: Array<{
        __typename?: "Operations";
        name: string;
        views: Array<string>;
      } | null> | null;
      modules?: Array<{
        __typename?: "Modules";
        name: string;
        views: Array<string>;
      } | null> | null;
    } | null;
    modules?: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null> | null;
    operations?: Array<{
      __typename?: "Operations";
      name: string;
      views: Array<string>;
    } | null> | null;
    company?: {
      __typename?: "Company";
      employee?: boolean | null;
      employeeType?: EmployeeType | null;
      subAdmin?: boolean | null;
      location?: Array<{
        __typename?: "ParkLocation";
        _id?: string | null;
        facility: string;
      } | null> | null;
      park?: { __typename?: "Park"; _id?: string | null } | null;
    } | null;
    package?: { __typename?: "UserPackages"; _id?: string | null } | null;
  };
};

export type FindAllPackagesQueryVariables = Exact<{ [key: string]: never }>;

export type FindAllPackagesQuery = {
  __typename?: "Query";
  findAllPackages: Array<{
    __typename?: "Package";
    _id?: string | null;
    title: string;
    annual: boolean;
    cost: number;
    sizeInGB: number;
    duration: number;
    description: string;
    compare_at?: number | null;
    active: boolean;
    discount: number;
    number_of_users: number;
    discount_type: DiscountType;
    modules: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null>;
  }>;
};

export type FindPackageByIdQueryVariables = Exact<{
  packageId: Scalars["ID"];
}>;

export type FindPackageByIdQuery = {
  __typename?: "Query";
  findPackageById: {
    __typename?: "Package";
    _id?: string | null;
    title: string;
    annual: boolean;
    cost: number;
    sizeInGB: number;
    duration: number;
    compare_at?: number | null;
    description: string;
    active: boolean;
    discount: number;
    number_of_users: number;
    discount_type: DiscountType;
    modules: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null>;
  };
};

export type UserLocationsQueryVariables = Exact<{
  userLocationsId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type UserLocationsQuery = {
  __typename?: "Query";
  userLocations: Array<{
    __typename?: "LocationLists";
    _id: string;
    city: string;
    facility: string;
    country: string;
    parkName: string;
    status: boolean;
    createdOn: any;
  } | null>;
};

export type RequestedLocationsQueryVariables = Exact<{
  filter?: InputMaybe<InputTableFilter>;
}>;

export type RequestedLocationsQuery = {
  __typename?: "Query";
  requestedLocations: Array<{
    __typename?: "LocationLists";
    _id: string;
    city: string;
    country: string;
    facility: string;
    parkName: string;
    createdOn: any;
    status: boolean;
    action: { __typename?: "ActionType"; view?: boolean | null };
  } | null>;
};

export type GetLocationByIdQueryVariables = Exact<{
  getLocationByIdId: Scalars["ID"];
}>;

export type GetLocationByIdQuery = {
  __typename?: "Query";
  getLocationById: {
    __typename?: "ParkLocation";
    country?: string | null;
    state: string;
    city: string;
    facility: string;
    address: string;
    active?: boolean | null;
    GPS: { __typename?: "GPS"; lat?: number | null; lng?: number | null };
  };
};

export type GetUserParksQueryVariables = Exact<{
  userId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type GetUserParksQuery = {
  __typename?: "Query";
  getUserParks: Array<{
    __typename?: "UserLocationListing";
    _id: string;
    userName: string;
    parkName?: string | null;
    createdOn: any;
    status: boolean;
  }>;
};

export type GetFacilitiesQueryVariables = Exact<{
  userId: Scalars["ID"];
  filter?: InputMaybe<FacilityFilterInput>;
}>;

export type GetFacilitiesQuery = {
  __typename?: "Query";
  getFacilities: Array<{
    __typename?: "ParkLocation";
    _id?: string | null;
    facility: string;
    city: string;
    state: string;
    country?: string | null;
    active?: boolean | null;
  }>;
};

export type GetPectoraAuthQueryVariables = Exact<{
  facilityId: Scalars["ID"];
}>;

export type GetPectoraAuthQuery = {
  __typename?: "Query";
  getPectoraAuth: {
    __typename?: "PectoraAuth";
    X_Auth_Id: string;
    X_Auth_Token: string;
  };
};

export type GetPectoraAndAppUsersQueryVariables = Exact<{
  facilityId: Scalars["ID"];
}>;

export type GetPectoraAndAppUsersQuery = {
  __typename?: "Query";
  getPectoraAndAppUsers: Array<string>;
};

export type GetPointsOfInterestQueryVariables = Exact<{
  facilityId: Scalars["ID"];
}>;

export type GetPointsOfInterestQuery = {
  __typename?: "Query";
  getPointsOfInterest: Array<{
    __typename?: "PointOfInterest";
    _id: string;
    createdByRef?: string | null;
    type: EPointOfAttraction;
    name: string;
    points?: Array<string | null> | null;
    belongsToFacilityRef?: {
      __typename?: "ParkLocation";
      _id?: string | null;
    } | null;
  }>;
};

export type FindAllReportsQueryVariables = Exact<{
  userId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type FindAllReportsQuery = {
  __typename?: "Query";
  findAllReports: Array<{
    __typename?: "ReportSubmission";
    _id: string;
    title: string;
    scheduleType: EScheduleType;
    clientAdminRef?: string | null;
    createdAt: any;
    submissions: Array<{
      __typename?: "ReportSubmittedData";
      _id?: string | null;
      date: any;
      status?: ESubmissionStatus | null;
      submitted_data: any;
    }>;
    belongs_to: { __typename?: "ReportTemplate"; _id?: string | null };
    created_by: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    };
    assignedTo?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
    assignedToFacilityRef?: {
      __typename?: "ParkLocation";
      _id?: string | null;
      facility: string;
    } | null;
  }>;
};

export type FindUserReportSubmissionByIdQueryVariables = Exact<{
  reportId: Scalars["ID"];
}>;

export type FindUserReportSubmissionByIdQuery = {
  __typename?: "Query";
  findUserReportSubmissionById: {
    __typename?: "ReportSubmission";
    _id: string;
    title: string;
    reportType?: EReportType | null;
    scheduleType: EScheduleType;
    clientAdminRef?: string | null;
    createdAt: any;
    submissions: Array<{
      __typename?: "ReportSubmittedData";
      _id?: string | null;
      date: any;
      status?: ESubmissionStatus | null;
      submitted_data: any;
    }>;
    belongs_to: { __typename?: "ReportTemplate"; _id?: string | null };
    created_by: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    };
    assignedTo?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      photo_url?: string | null;
      last_name: string;
    } | null;
    assignedToFacilityRef?: {
      __typename?: "ParkLocation";
      _id?: string | null;
      facility: string;
    } | null;
  };
};

export type FindAllReportTemplatesQueryVariables = Exact<{
  reportType: EReportType;
  filter?: InputMaybe<InputTableFilter>;
  createdById?: InputMaybe<Scalars["ID"]>;
}>;

export type FindAllReportTemplatesQuery = {
  __typename?: "Query";
  findAllReportTemplates: Array<{
    __typename?: "ReportTemplate";
    _id?: string | null;
    name: string;
    type: EReportType;
    status?: boolean | null;
    universalAccess?: boolean | null;
    created_by: string;
    createdAt?: any | null;
    clientAdminRef?: string | null;
    fields: Array<{
      __typename?: "FormFields";
      _id: string;
      type: string;
      label: string;
      placeholder?: string | null;
      options?: Array<string> | null;
      src?: string | null;
      value?: string | null;
    }>;
  }>;
};

export type FindTemplateByIdQueryVariables = Exact<{
  findTemplateByIdId: Scalars["ID"];
}>;

export type FindTemplateByIdQuery = {
  __typename?: "Query";
  findTemplateById: {
    __typename?: "ReportTemplate";
    _id?: string | null;
    name: string;
    status?: boolean | null;
    universalAccess?: boolean | null;
    type: EReportType;
    created_by: string;
    clientAdminRef?: string | null;
    facility?: {
      __typename?: "ParkLocation";
      _id?: string | null;
      facility: string;
    } | null;
    fields: Array<{
      __typename?: "FormFields";
      _id: string;
      type: string;
      label: string;
      src?: string | null;
      placeholder?: string | null;
      options?: Array<string> | null;
      value?: string | null;
    }>;
  };
};

export type FindRoleQueryVariables = Exact<{ [key: string]: never }>;

export type FindRoleQuery = {
  __typename?: "Query";
  findRole: Array<{
    __typename?: "Role";
    _id?: string | null;
    name: string;
    active: boolean;
    user_id: string;
    modules?: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null> | null;
    operations?: Array<{
      __typename?: "Operations";
      name: string;
      views: Array<string>;
    } | null> | null;
  }>;
};

export type FindRolesByUserIdQueryVariables = Exact<{
  findRolesByUserIdId: Scalars["ID"];
  facilityId?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
}>;

export type FindRolesByUserIdQuery = {
  __typename?: "Query";
  findRolesByUserId: Array<{
    __typename?: "Role";
    _id?: string | null;
    name: string;
    active: boolean;
    user_id: string;
    operations?: Array<{
      __typename?: "Operations";
      name: string;
      views: Array<string>;
    } | null> | null;
    modules?: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null> | null;
  }>;
};

export type ManageRolesListingQueryVariables = Exact<{
  userId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type ManageRolesListingQuery = {
  __typename?: "Query";
  manageRolesListing: Array<{
    __typename?: "ManageRolesListingResponse";
    _id?: string | null;
    name?: string | null;
    createdOn?: any | null;
    activeUsers?: number | null;
    status?: boolean | null;
  }>;
};

export type FindRoleByIdQueryVariables = Exact<{
  findRoleByIdId: Scalars["ID"];
  filter?: InputMaybe<Scalars["ID"]>;
}>;

export type FindRoleByIdQuery = {
  __typename?: "Query";
  findRoleById: {
    __typename?: "Role";
    _id?: string | null;
    name: string;
    facility?: string | null;
    active: boolean;
    user_id: string;
    operations?: Array<{
      __typename?: "Operations";
      name: string;
      views: Array<string>;
    } | null> | null;
    modules?: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null> | null;
  };
};

export type FindAllSubAdminPaymentsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type FindAllSubAdminPaymentsQuery = {
  __typename?: "Query";
  findAllSubAdminPayments: Array<{
    __typename?: "SubAdminPayment";
    _id?: string | null;
    package_type?: PackageType | null;
    subscription_date: any;
    last_payment_date: any;
    next_payment_date: any;
    current_status: PaymentStatus;
    amount: number;
    user_id: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    };
  }>;
};

export type FindSubAdminPaymenteByIdQueryVariables = Exact<{
  findSubAdminPaymenteByIdId: Scalars["ID"];
}>;

export type FindSubAdminPaymenteByIdQuery = {
  __typename?: "Query";
  findSubAdminPaymenteById: {
    __typename?: "SubAdminPayment";
    _id?: string | null;
    package_type?: PackageType | null;
    subscription_date: any;
    last_payment_date: any;
    next_payment_date: any;
    current_status: PaymentStatus;
    amount: number;
    user_id: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    };
  };
};

export type GetClientSecretQueryVariables = Exact<{
  input?: InputMaybe<GetClientSecretInput>;
}>;

export type GetClientSecretQuery = {
  __typename?: "Query";
  getClientSecret: {
    __typename?: "ClientSecret";
    clientSecret?: string | null;
  };
};

export type FindAllTasksQueryVariables = Exact<{
  creatorId: Scalars["ID"];
}>;

export type FindAllTasksQuery = {
  __typename?: "Query";
  findAllTasks: Array<{
    __typename?: "Task";
    _id: string;
    title?: string | null;
    detail?: string | null;
    createdAt?: any | null;
    subtasks?: Array<{
      __typename?: "SubTask";
      detail: string;
      completed: boolean;
    } | null> | null;
    createdBy?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
    clientAdminRef?: { __typename?: "User"; _id: string } | null;
  }>;
};

export type FindTaskByIdQueryVariables = Exact<{
  findTaskByIdId: Scalars["ID"];
}>;

export type FindTaskByIdQuery = {
  __typename?: "Query";
  findTaskById: {
    __typename?: "Task";
    _id: string;
    title?: string | null;
    facility?: string | null;
    detail?: string | null;
    media?: Array<string | null> | null;
    createdAt?: any | null;
    subtasks?: Array<{
      __typename?: "SubTask";
      detail: string;
      completed: boolean;
    } | null> | null;
    createdBy?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
    clientAdminRef?: { __typename?: "User"; _id: string } | null;
  };
};

export type TrackAllTasksQueryVariables = Exact<{
  creatorId: Scalars["ID"];
  tableFilters?: InputMaybe<InputTableFilter>;
}>;

export type TrackAllTasksQuery = {
  __typename?: "Query";
  trackAllTasks: Array<{
    __typename?: "TaskAssigned";
    _id?: string | null;
    title?: string | null;
    detail?: string | null;
    media?: Array<string | null> | null;
    taskId?: string | null;
    createdAt?: string | null;
    deadline?: any | null;
    scheduleType?: EScheduleType | null;
    submissions?: Array<{
      __typename?: "TaskSubmission";
      _id?: string | null;
      date?: any | null;
      media?: Array<string | null> | null;
      voice?: string | null;
      status?: ESubmissionStatus | null;
      subtasks?: Array<{
        __typename?: "SubTask";
        detail: string;
        completed: boolean;
      } | null> | null;
    } | null> | null;
    userId?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
    assignedToFacilityRef?: {
      __typename?: "ParkLocation";
      _id?: string | null;
      facility: string;
    } | null;
    createdBy_id?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
  }>;
};

export type FindAssignedTaskByIdQueryVariables = Exact<{
  assignedTaskId: Scalars["ID"];
}>;

export type FindAssignedTaskByIdQuery = {
  __typename?: "Query";
  findAssignedTaskById: {
    __typename?: "TaskAssigned";
    _id?: string | null;
    title?: string | null;
    detail?: string | null;
    media?: Array<string | null> | null;
    scheduleType?: EScheduleType | null;
    taskId?: string | null;
    deadline?: any | null;
    submissions?: Array<{
      __typename?: "TaskSubmission";
      _id?: string | null;
      date?: any | null;
      remarks?: string | null;
      media?: Array<string | null> | null;
      voice?: string | null;
      status?: ESubmissionStatus | null;
      subtasks?: Array<{
        __typename?: "SubTask";
        detail: string;
        completed: boolean;
      } | null> | null;
    } | null> | null;
    userId?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      photo_url?: string | null;
      last_name: string;
    } | null;
    assignedToFacilityRef?: {
      __typename?: "ParkLocation";
      _id?: string | null;
      facility: string;
    } | null;
    createdBy_id?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
  };
};

export type GetPostQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostQuery = {
  __typename?: "Query";
  getPost: {
    __typename?: "genericResponseType";
    status?: boolean | null;
    message?: string | null;
    data?: any | null;
  };
};

export type GetTrainingByIdQueryVariables = Exact<{
  trainingId: Scalars["ID"];
}>;

export type GetTrainingByIdQuery = {
  __typename?: "Query";
  getTrainingById: {
    __typename?: "Training";
    _id: string;
    title: string;
    createdAt?: any | null;
    facility: {
      __typename?: "ParkLocation";
      _id?: string | null;
      facility: string;
    };
    sessions: Array<{
      __typename?: "Session";
      detail?: string | null;
      image?: {
        __typename?: "SessionFile";
        complete: boolean;
        data: string;
      } | null;
      video?: {
        __typename?: "SessionFile";
        complete: boolean;
        data: string;
      } | null;
    }>;
    createdBy?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
  };
};

export type GetMyTrainingsQueryVariables = Exact<{
  creatorId: Scalars["ID"];
}>;

export type GetMyTrainingsQuery = {
  __typename?: "Query";
  getMyTrainings: Array<{
    __typename?: "Training";
    _id: string;
    title: string;
    createdAt?: any | null;
    createdBy?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
    sessions: Array<{
      __typename?: "Session";
      detail?: string | null;
      image?: {
        __typename?: "SessionFile";
        data: string;
        complete: boolean;
      } | null;
      video?: {
        __typename?: "SessionFile";
        data: string;
        complete: boolean;
      } | null;
    }>;
  }>;
};

export type GetUserTrainingSessionQueryVariables = Exact<{
  getUserTrainingSessionInput: GetUserTrainingSessionInput;
}>;

export type GetUserTrainingSessionQuery = {
  __typename?: "Query";
  getUserTrainingSession: Array<{
    __typename?: "TrainingSession";
    _id?: string | null;
    title?: string | null;
    status?: ESubmissionStatus | null;
    scheduleType?: EScheduleType | null;
    sessions?: Array<{
      __typename?: "sessionSubmissions";
      date: string;
      status: ESubmissionStatus;
      session: Array<{
        __typename?: "Session";
        detail?: string | null;
        image?: {
          __typename?: "SessionFile";
          complete: boolean;
          data: string;
        } | null;
        video?: {
          __typename?: "SessionFile";
          data: string;
          complete: boolean;
        } | null;
      }>;
    }> | null;
    userRef?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
    } | null;
  }>;
};

export type GetAssignedTrainingByIdQueryVariables = Exact<{
  taskId: Scalars["ID"];
}>;

export type GetAssignedTrainingByIdQuery = {
  __typename?: "Query";
  getAssignedTrainingById: {
    __typename?: "TrainingSession";
    _id?: string | null;
    title?: string | null;
    scheduleType?: EScheduleType | null;
    priority?: EPriority | null;
    sessions?: Array<{
      __typename?: "sessionSubmissions";
      date: string;
      status: ESubmissionStatus;
      session: Array<{
        __typename?: "Session";
        _id?: string | null;
        detail?: string | null;
        image?: {
          __typename?: "SessionFile";
          complete: boolean;
          data: string;
        } | null;
        video?: {
          __typename?: "SessionFile";
          complete: boolean;
          data: string;
        } | null;
      }>;
    }> | null;
    userRef?: {
      __typename?: "User";
      _id: string;
      first_name: string;
      last_name: string;
      photo_url?: string | null;
    } | null;
    assignedToFacilityRef?: {
      __typename?: "ParkLocation";
      _id?: string | null;
      facility: string;
    } | null;
  };
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    first_name: string;
    last_name: string;
    email: string;
    rec_email: string;
    photo_url?: string | null;
    scopes?: Array<string | null> | null;
    admin: boolean;
    active: boolean;
    phone?: { __typename?: "Phone"; code: string; phoneNo: string } | null;
  }>;
};

export type UserByIdQueryVariables = Exact<{
  userByIdId: Scalars["String"];
}>;

export type UserByIdQuery = {
  __typename?: "Query";
  userById?: {
    __typename?: "User";
    _id: string;
    themeId: string;
    first_name: string;
    last_name: string;
    email: string;
    access: FAQStatus;
    stripeCustomerId: string;
    rec_email: string;
    photo_url?: string | null;
    scopes?: Array<string | null> | null;
    admin: boolean;
    active: boolean;
    created_by?: string | null;
    belongsTo?: string | null;
    department?: string | null;
    operations?: Array<{
      __typename?: "Operations";
      name: string;
      views: Array<string>;
    } | null> | null;
    modules?: Array<{
      __typename?: "Modules";
      name: string;
      views: Array<string>;
    } | null> | null;
    role?: {
      __typename?: "Role";
      _id?: string | null;
      name: string;
      active: boolean;
      user_id: string;
      modules?: Array<{
        __typename?: "Modules";
        name: string;
        views: Array<string>;
      } | null> | null;
      operations?: Array<{
        __typename?: "Operations";
        name: string;
        views: Array<string>;
      } | null> | null;
    } | null;
    company?: {
      __typename?: "Company";
      _id?: string | null;
      employee?: boolean | null;
      employeeType?: EmployeeType | null;
      subAdmin?: boolean | null;
      park?: {
        __typename?: "Park";
        _id?: string | null;
        name?: string | null;
        logo?: string | null;
        locations?: Array<{
          __typename?: "ParkLocation";
          _id?: string | null;
          facility: string;
          address: string;
          city: string;
          state: string;
          country?: string | null;
          active?: boolean | null;
          GPS: { __typename?: "GPS"; lat?: number | null; lng?: number | null };
        } | null> | null;
      } | null;
      location?: Array<{
        __typename?: "ParkLocation";
        _id?: string | null;
        facility: string;
        active?: boolean | null;
        city: string;
        state: string;
        country?: string | null;
        address: string;
        GPS: { __typename?: "GPS"; lat?: number | null; lng?: number | null };
      } | null> | null;
    } | null;
    package?: {
      __typename?: "UserPackages";
      _id?: string | null;
      paid?: boolean | null;
      title?: string | null;
      cost?: number | null;
      sizeInGB?: number | null;
      duration?: number | null;
      description?: string | null;
      number_of_users?: number | null;
      discount_type?: DiscountType | null;
      discount?: number | null;
      status?: ESubscriptionStatus | null;
      active?: boolean | null;
      createdAt?: any | null;
      paymentDetail?: {
        __typename?: "PaymentDetail";
        amount?: number | null;
        method?: string | null;
      } | null;
      modules?: Array<{
        __typename?: "Modules";
        name: string;
        views: Array<string>;
      } | null> | null;
    } | null;
    phone?: { __typename?: "Phone"; phoneNo: string; code: string } | null;
  } | null;
};

export type FindRelatingUsersQueryVariables = Exact<{
  findRelatingUsersId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type FindRelatingUsersQuery = {
  __typename?: "Query";
  findRelatingUsers: Array<{
    __typename?: "FindRelatingUsersResponse";
    _id?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    status?: boolean | null;
    createdOn?: any | null;
    action?: {
      __typename?: "ActionType";
      edit?: boolean | null;
      view?: boolean | null;
      delete?: boolean | null;
    } | null;
  }>;
};

export type GetSubAdminListQueryVariables = Exact<{
  getSubAdminListId: Scalars["ID"];
  filter?: InputMaybe<InputTableFilter>;
}>;

export type GetSubAdminListQuery = {
  __typename?: "Query";
  getSubAdminList: Array<{
    __typename?: "SubAdminList";
    _id?: string | null;
    name?: string | null;
    package?: string | null;
    payment?: boolean | null;
    account?: boolean | null;
    action?: {
      __typename?: "ActionType";
      view?: boolean | null;
      edit?: boolean | null;
      delete?: boolean | null;
    } | null;
  }>;
};

export type FindMyUsersQueryVariables = Exact<{
  ownerId: Scalars["ID"];
  facilityId?: InputMaybe<Scalars["ID"]>;
}>;

export type FindMyUsersQuery = {
  __typename?: "Query";
  findMyUsers: Array<{
    __typename?: "User";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: boolean;
    liveLocation: { __typename?: "LiveLocation"; lat: number; lng: number };
    company?: {
      __typename?: "Company";
      employeeType?: EmployeeType | null;
    } | null;
  }>;
};

export type TrackClientAdminsQueryVariables = Exact<{
  filter?: InputMaybe<InputTableFilter>;
}>;

export type TrackClientAdminsQuery = {
  __typename?: "Query";
  trackClientAdmins: Array<{
    __typename?: "User";
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    package?: {
      __typename?: "UserPackages";
      cost?: number | null;
      title?: string | null;
      createdAt?: any | null;
    } | null;
  }>;
};

export type TrackParticularClientRecordQueryVariables = Exact<{
  userId: Scalars["ID"];
}>;

export type TrackParticularClientRecordQuery = {
  __typename?: "Query";
  trackParticularClientRecord: Array<{
    __typename?: "UserPackages";
    _id?: string | null;
    title?: string | null;
    status?: ESubscriptionStatus | null;
    cost?: number | null;
    createdAt?: any | null;
    active?: boolean | null;
    ref?: {
      __typename?: "User";
      first_name: string;
      last_name: string;
      email: string;
    } | null;
  }>;
};

export type GetUserPackageModuleByIdQueryVariables = Exact<{
  subscriptionId: Scalars["ID"];
}>;

export type GetUserPackageModuleByIdQuery = {
  __typename?: "Query";
  getUserPackageModuleById: {
    __typename?: "UserPackages";
    _id?: string | null;
    title?: string | null;
    active?: boolean | null;
    paid?: boolean | null;
    cost?: number | null;
    duration?: number | null;
    compare_at?: number | null;
    discount?: number | null;
    discount_type?: DiscountType | null;
    description?: string | null;
    number_of_users?: number | null;
    status?: ESubscriptionStatus | null;
    createdAt?: any | null;
    ref?: {
      __typename?: "User";
      first_name: string;
      last_name: string;
      email: string;
    } | null;
    paymentDetail?: {
      __typename?: "PaymentDetail";
      method?: string | null;
      amount?: number | null;
    } | null;
  };
};

export type GetFailedVatQueryVariables = Exact<{
  facilityId: Scalars["ID"];
}>;

export type GetFailedVatQuery = {
  __typename?: "Query";
  getFailedVAT: Array<{
    __typename?: "GetFailedVatResponse";
    _id: string;
    assignedToFacilityRef?: string | null;
    taskAssignedRef: {
      __typename?: "TaskAssigned";
      _id?: string | null;
      title?: string | null;
      detail?: string | null;
      deadline?: any | null;
      media?: Array<string | null> | null;
    };
  }>;
};

export const CreateActivityLogDocument = gql`
  mutation CreateActivityLog($activityLogInput: ActivityLogInput!) {
    createActivityLog(activityLogInput: $activityLogInput) {
      _id
      user_name
      role
      interface
      activity
      dateTime
      belongsTo
      user_id
    }
  }
`;
export const AddUserAdminDocument = gql`
  mutation AddUserAdmin($signupInput: InputUser!) {
    addUserAdmin(signupInput: $signupInput) {
      _id
      first_name
      last_name
      email
      admin
      active
    }
  }
`;
export const CreateSubAdminDocument = gql`
  mutation CreateSubAdmin($createSubAdminInput: InputSubAdmin!) {
    createSubAdmin(createSubAdminInput: $createSubAdminInput)
  }
`;
export const RegisterClientDocument = gql`
  mutation RegisterClient($registerClientInput: InputRegisterClient!) {
    registerClient(registerClientInput: $registerClientInput)
  }
`;
export const LoginDocument = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      temporary_password
      token
      userType
    }
  }
`;
export const ForgetPasswordDocument = gql`
  mutation forgetPassword($forgetPasswordInput: ForgetPasswordInput!) {
    forgetPassword(forgetPasswordInput: $forgetPasswordInput)
  }
`;
export const ResetPasswordDocument = gql`
  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput)
  }
`;
export const ChangePasswordDocument = gql`
  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput)
  }
`;
export const UpdateEmailDocument = gql`
  mutation UpdateEmail($updateEmailInput: UpdateEmailInput!) {
    updateEmail(updateEmailInput: $updateEmailInput)
  }
`;
export const VerifyOtpDocument = gql`
  mutation VerifyOtp($verifyOtpInput: VerifyOTPInput!) {
    verifyOtp(verifyOtpInput: $verifyOtpInput)
  }
`;
export const UpdateTemporaryPasswordDocument = gql`
  mutation UpdateTemporaryPassword(
    $temporaryPasswordInput: TemporaryPasswordInput!
  ) {
    updateTemporaryPassword(temporaryPasswordInput: $temporaryPasswordInput) {
      message
      token
    }
  }
`;
export const ActivateSubAdminAfterSubscriptionDocument = gql`
  mutation ActivateSubAdminAfterSubscription($userId: ID!) {
    activateSubAdminAfterSubscription(user_id: $userId)
  }
`;
export const AddDepartmentDocument = gql`
  mutation AddDepartment($departmentInput: DepartmentInput!) {
    addDepartment(departmentInput: $departmentInput)
  }
`;
export const UpdateDepartmentDocument = gql`
  mutation UpdateDepartment($departmentUpdateInput: DepartmentUpdateInput!) {
    updateDepartment(departmentUpdateInput: $departmentUpdateInput)
  }
`;
export const DeleteDepartmentDocument = gql`
  mutation DeleteDepartment($departmentId: ID!) {
    deleteDepartment(departmentId: $departmentId)
  }
`;
export const AddEmailAndNotificationDocument = gql`
  mutation AddEmailAndNotification(
    $emailAndNotificationInput: AddEmailAndNotificationInput!
  ) {
    addEmailAndNotification(
      emailAndNotificationInput: $emailAndNotificationInput
    ) {
      data
      message
      status
    }
  }
`;
export const EditEmailAndNotificationDocument = gql`
  mutation EditEmailAndNotification(
    $emailAndNotificationInput: EditEmailAndNotificationInput!
  ) {
    editEmailAndNotification(
      emailAndNotificationInput: $emailAndNotificationInput
    )
  }
`;
export const AssignEmailAndNotificationDocument = gql`
  mutation AssignEmailAndNotification(
    $assignEmailAndNotificationInput: AssignEmailAndNotificationInput!
  ) {
    assignEmailAndNotification(
      assignEmailAndNotificationInput: $assignEmailAndNotificationInput
    )
  }
`;
export const MarkAsReadDocument = gql`
  mutation MarkAsRead($objectId: ID!) {
    markAsRead(objectId: $objectId)
  }
`;
export const DeleteEmailAndNotificationDocument = gql`
  mutation DeleteEmailAndNotification($notifId: ID!) {
    deleteEmailAndNotification(notifId: $notifId)
  }
`;
export const CreateEmployeeDocument = gql`
  mutation CreateEmployee(
    $employeeInput: EmployeeInput!
    $company: CompanyInput
  ) {
    createEmployee(employeeInput: $employeeInput, company: $company)
  }
`;
export const UpdateEmployeeDocument = gql`
  mutation UpdateEmployee($updateEmployeeInput: UpdateEmployeeInput!) {
    updateEmployee(updateEmployeeInput: $updateEmployeeInput) {
      _id
      first_name
      last_name
      email
      photo_url
      phone {
        phoneNo
        code
      }
      password
      admin
      active
      department
      created_by
      company {
        _id
        employee
        employeeType
        park {
          _id
        }
        subAdmin
        location {
          _id
        }
      }
    }
  }
`;
export const DeleteEmployeeDocument = gql`
  mutation DeleteEmployee($employeeId: ID!) {
    deleteEmployee(employeeId: $employeeId)
  }
`;
export const AddPackageDocument = gql`
  mutation AddPackage($packageInput: PackageInput!) {
    addPackage(packageInput: $packageInput) {
      _id
      title
      annual
      modules {
        name
        views
      }
      cost
      compare_at
      active
      discount
      discount_type
    }
  }
`;
export const UpdatePackageDocument = gql`
  mutation UpdatePackage($updatePackageInput: UpdatePackageInput!) {
    updatePackage(updatePackageInput: $updatePackageInput) {
      _id
      title
      annual
      modules {
        name
        views
      }
      cost
      compare_at
      active
      discount
      discount_type
    }
  }
`;
export const DeleteSubscriptionPackageDocument = gql`
  mutation DeleteSubscriptionPackage($deleteSubscriptionPackageId: ID!) {
    deleteSubscriptionPackage(id: $deleteSubscriptionPackageId)
  }
`;
export const AddAnotherLocationDocument = gql`
  mutation AddAnotherLocation($parkLocationDataInput: ParkLocationDataInput!) {
    addAnotherLocation(parkLocationDataInput: $parkLocationDataInput)
  }
`;
export const AcceptLocationRequestDocument = gql`
  mutation AcceptLocationRequest($acceptLocationRequestId: ID!) {
    acceptLocationRequest(id: $acceptLocationRequestId)
  }
`;
export const UpdateFacilityRequestDocument = gql`
  mutation UpdateFacilityRequest(
    $updateFacilityRequestInput: UpdateFacilityRequestInput!
  ) {
    updateFacilityRequest(
      updateFacilityRequestInput: $updateFacilityRequestInput
    ) {
      status
      message
      data
    }
  }
`;
export const AddPectoraAuthDocument = gql`
  mutation AddPectoraAuth($addPectoraAuthInput: AddPectoraAuthInput!) {
    addPectoraAuth(addPectoraAuthInput: $addPectoraAuthInput)
  }
`;
export const AddPointOffInterestDocument = gql`
  mutation AddPointOffInterest($pointOfInterestInput: PointOfInterestInput!) {
    addPointOffInterest(pointOfInterestInput: $pointOfInterestInput) {
      status
      message
      data
    }
  }
`;
export const UpdatePointOffInterestDocument = gql`
  mutation UpdatePointOffInterest(
    $updatePointOfInterestInput: UpdatePointOfInterestInput!
  ) {
    updatePointOffInterest(
      updatePointOfInterestInput: $updatePointOfInterestInput
    ) {
      status
      message
      data
    }
  }
`;
export const DeletePointOffInterestDocument = gql`
  mutation DeletePointOffInterest($id: ID!) {
    deletePointOffInterest(_id: $id) {
      status
      message
      data
    }
  }
`;
export const AddReportTemplateDocument = gql`
  mutation AddReportTemplate($reportTemplateInput: ReportTemplateInput!) {
    addReportTemplate(reportTemplateInput: $reportTemplateInput) {
      data
      message
      status
    }
  }
`;
export const UpdateReportTemplateDocument = gql`
  mutation UpdateReportTemplate(
    $updateReportTemplateInput: UpdateReportTemplateInput!
  ) {
    updateReportTemplate(
      updateReportTemplateInput: $updateReportTemplateInput
    ) {
      _id
      name
      fields {
        _id
        type
        label
        placeholder
        options
      }
      created_by
      clientAdminRef
    }
  }
`;
export const AssignReportTemplateDocument = gql`
  mutation AssignReportTemplate($assignReportTemplateInput: AssignInput!) {
    assignReportTemplate(assignReportTemplateInput: $assignReportTemplateInput)
  }
`;
export const DeleteReportTemplateDocument = gql`
  mutation DeleteReportTemplate($templateId: ID!) {
    deleteReportTemplate(templateId: $templateId) {
      data
      message
      status
    }
  }
`;
export const ApproveReportSubmissionDocument = gql`
  mutation ApproveReportSubmission(
    $submissionId: ID!
    $assignedReportId: ID!
    $approverId: ID!
  ) {
    approveReportSubmission(
      submissionId: $submissionId
      assignedReportId: $assignedReportId
      approverId: $approverId
    ) {
      status
      message
      data
    }
  }
`;
export const EvaluateVatDocument = gql`
  mutation EvaluateVAT($evaluateVatInput: EvaluateVatInput!) {
    evaluateVAT(evaluateVatInput: $evaluateVatInput)
  }
`;
export const AddRoleDocument = gql`
  mutation AddRole($roleInput: RoleInput!) {
    addRole(roleInput: $roleInput) {
      _id
      name
      active
      user_id
    }
  }
`;
export const UpdateRoleDocument = gql`
  mutation UpdateRole($roleUpdateInput: RoleUpdateInput!) {
    updateRole(roleUpdateInput: $roleUpdateInput)
  }
`;
export const DeleteRoleDocument = gql`
  mutation DeleteRole($deleteRoleId: ID!) {
    deleteRole(id: $deleteRoleId)
  }
`;
export const CreateStripeCustomerDocument = gql`
  mutation CreateStripeCustomer($email: String!) {
    createStripeCustomer(email: $email) {
      status
      message
      data
    }
  }
`;
export const GetClientSecretForSubscriberDocument = gql`
  query GetClientSecretForSubscriber($amount: Float!) {
    getClientSecretForSubscriber(amount: $amount) {
      clientSecret
    }
  }
`;
export const OnboardSubAdminDocument = gql`
  mutation OnboardSubAdmin($subAdminOnboardInput: SubAdminOnboardInput!) {
    onboardSubAdmin(subAdminOnboardInput: $subAdminOnboardInput)
  }
`;
export const UpdateSubAdminDocument = gql`
  mutation UpdateSubAdmin($updateSubAdminInput: UpdateSubAdminInput!) {
    updateSubAdmin(updateSubAdminInput: $updateSubAdminInput)
  }
`;
export const AddSubAdminPaymentDocument = gql`
  mutation AddSubAdminPayment($subAdminInput: SubAdminPaymentInput!) {
    addSubAdminPayment(subAdminInput: $subAdminInput) {
      _id
      user_id {
        _id
        first_name
        last_name
      }
      package_type
      subscription_date
      last_payment_date
      next_payment_date
      current_status
    }
  }
`;
export const CreateTaskDocument = gql`
  mutation CreateTask($taskInput: TaskInput!) {
    createTask(taskInput: $taskInput) {
      data
      message
      status
    }
  }
`;
export const UpdateTaskDocument = gql`
  mutation UpdateTask($taskInput: TaskUpdateInput!) {
    updateTask(taskInput: $taskInput) {
      status
      message
      data
    }
  }
`;
export const DeleteTaskDocument = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`;
export const AssignTaskDocument = gql`
  mutation AssignTask($taskAssignInput: AssignInput!) {
    assignTask(taskAssignInput: $taskAssignInput) {
      data
      message
      status
    }
  }
`;
export const ApproveSubmissionDocument = gql`
  mutation ApproveSubmission(
    $submissionId: ID!
    $taskId: ID!
    $approverId: ID!
  ) {
    approveSubmission(
      submissionId: $submissionId
      taskId: $taskId
      approverId: $approverId
    ) {
      status
      message
      data
    }
  }
`;
export const PostTickerDocument = gql`
  mutation PostTicker($postTickerInput: PostTickerInput!) {
    postTicker(postTickerInput: $postTickerInput) {
      status
      message
      data
    }
  }
`;
export const AddTrainingSessionDocument = gql`
  mutation AddTrainingSession(
    $addTrainingSessionInput: AddTrainingSessionInput!
  ) {
    addTrainingSession(addTrainingSessionInput: $addTrainingSessionInput) {
      data
      message
      status
    }
  }
`;
export const UpdateTrainingDocument = gql`
  mutation UpdateTraining($updateTrainingInput: UpdateTrainingInput!) {
    updateTraining(updateTrainingInput: $updateTrainingInput) {
      status
      message
      data
    }
  }
`;
export const DeleteTrainingDocument = gql`
  mutation DeleteTraining($trainingTemplateId: ID!) {
    deleteTraining(trainingTemplateId: $trainingTemplateId) {
      status
      message
      data
    }
  }
`;
export const AssignTrainingSessionDocument = gql`
  mutation AssignTrainingSession(
    $assignTrainingSessionInput: AssignTrainingSessionInput!
  ) {
    assignTrainingSession(
      assignTrainingSessionInput: $assignTrainingSessionInput
    )
  }
`;
export const AssignInServiceDocument = gql`
  mutation AssignInService($assignInServiceInput: AssignInServiceInput!) {
    assignInService(assignInServiceInput: $assignInServiceInput)
  }
`;
export const UpdateAdminUserDocument = gql`
  mutation UpdateAdminUser($updateAdminUserInput: InputUser!) {
    updateAdminUser(updateAdminUserInput: $updateAdminUserInput)
  }
`;
export const DeleteAdminUserDocument = gql`
  mutation DeleteAdminUser($deleteAdminUserId: ID!) {
    deleteAdminUser(id: $deleteAdminUserId)
  }
`;
export const UpdateProfileDocument = gql`
  mutation UpdateProfile(
    $updateProfileUpdateProfileInput: UpdateProfileInput!
  ) {
    updateProfile(updateProfileInput: $updateProfileUpdateProfileInput)
  }
`;
export const UpdateUserFieldsDocument = gql`
  mutation UpdateUserFields($updateUserFieldsInput: UpdateUserFieldsInput!) {
    updateUserFields(updateUserFieldsInput: $updateUserFieldsInput)
  }
`;
export const ModifyPackageDocument = gql`
  mutation ModifyPackage($userPackageModifyInput: UserPackageModifyInput!) {
    modifyPackage(userPackageModifyInput: $userPackageModifyInput)
  }
`;
export const AttachTaskToTrainingDocument = gql`
  mutation AttachTaskToTraining(
    $attachTaskToTrainingInput: AttachTaskToTrainingInput!
  ) {
    attachTaskToTraining(attachTaskToTrainingInput: $attachTaskToTrainingInput)
  }
`;
export const FindActivityLogByClientAdminIdDocument = gql`
  query FindActivityLogByClientAdminId($belongsTo: ID!) {
    findActivityLogByClientAdminId(belongsTo: $belongsTo) {
      _id
      activity
      belongsTo
      dateTime
      interface
      role
      user_id
      user_name
    }
  }
`;
export const FindActivityLogByUserIdDocument = gql`
  query FindActivityLogByUserId($userId: ID!) {
    findActivityLogByUserId(user_id: $userId) {
      _id
      user_name
      role
      interface
      activity
      dateTime
      belongsTo
      user_id
    }
  }
`;
export const FindActivityLogByIdDocument = gql`
  query FindActivityLogById($findActivityLogByIdId: ID!) {
    findActivityLogById(id: $findActivityLogByIdId) {
      _id
      user_name
      role
      interface
      activity
      dateTime
      belongsTo
      user_id
    }
  }
`;
export const GetIncidentReportsForClientDashboardStatsDocument = gql`
  query GetIncidentReportsForClientDashboardStats(
    $userId: ID!
    $filter: IncidentReportDashboardFilterInput
  ) {
    getIncidentReportsForClientDashboardStats(
      userId: $userId
      filter: $filter
    ) {
      _id
      dailyCounts
    }
  }
`;
export const GetClientDashboardStatsDocument = gql`
  query GetClientDashboardStats($userId: ID!, $facilityId: ID!) {
    getClientDashboardStats(userId: $userId, facilityId: $facilityId) {
      usersCountAccordingFacility
      taskPendingCount
      taskCompletedCount
      reportPendingCount
      reportCompletedCount
      trainingSessionCount
    }
  }
`;
export const GetSuperAdminDashboardStatsDocument = gql`
  query GetSuperAdminDashboardStats($clientAdminId: ID!, $packageId: ID!) {
    getSuperAdminDashboardStats(
      clientAdminId: $clientAdminId
      packageId: $packageId
    ) {
      accountsCount
      newClientsOfCurrentMonth
      facilityCount
      usersCountAccordingClientAdmin
      usersCountBySubscription
      activeUsersCount
    }
  }
`;
export const GetAllClientAdminsDocument = gql`
  query GetAllClientAdmins {
    getAllClientAdmins {
      _id
      first_name
      last_name
      email
    }
  }
`;
export const GetAllSubscriptionsDocument = gql`
  query GetAllSubscriptions {
    getAllSubscriptions {
      _id
      title
      cost
    }
  }
`;
export const GetAllParksDocument = gql`
  query GetAllParks {
    getAllParks {
      _id
      name
    }
  }
`;
export const FindAllDepartmentsDocument = gql`
  query FindAllDepartments {
    findAllDepartments {
      _id
      name
      active
      createdBy
    }
  }
`;
export const FindDepartmentByIdDocument = gql`
  query FindDepartmentById($departmentId: ID!) {
    findDepartmentById(departmentId: $departmentId) {
      _id
      name
      active
      createdBy
    }
  }
`;
export const FindDepartmentsByOwnerIdDocument = gql`
  query FindDepartmentsByOwnerId(
    $clientAdminId: ID!
    $filter: InputTableFilter
  ) {
    findDepartmentsByOwnerId(clientAdminId: $clientAdminId, filter: $filter) {
      _id
      department
      status
      createdOn
    }
  }
`;
export const GetDogsDocument = gql`
  query getDogs {
    dogs {
      name
    }
  }
`;
export const GetEmailAndNotificationByCreatorIdDocument = gql`
  query GetEmailAndNotificationByCreatorId(
    $creatorId: ID!
    $filter: InputTableFilter
  ) {
    getEmailAndNotificationByCreatorId(creatorId: $creatorId, filter: $filter) {
      _id
      code
      text
      subject: title
      type
      date: createdAt
    }
  }
`;
export const GetEmailAndNotificationByIdDocument = gql`
  query GetEmailAndNotificationById($objectId: ID!) {
    getEmailAndNotificationById(objectId: $objectId) {
      _id
      text
      title
      type
      code
      date: createdAt
      createdByRef {
        _id
      }
    }
  }
`;
export const GetUserNotificationsDocument = gql`
  query GetUserNotifications($userId: ID!) {
    getUserNotifications(userId: $userId) {
      _id
      code
      type
      title
      text
      priority
      read
      createdAt
      assignedUserRef {
        _id
        first_name
        last_name
      }
      createdByRef {
        _id
        first_name
        last_name
      }
    }
  }
`;
export const FindAllEmployeesDocument = gql`
  query FindAllEmployees($createdById: ID!, $filter: InputTableFilter) {
    findAllEmployees(createdById: $createdById, filter: $filter) {
      _id
      first_name
      last_name
      email
      rec_email
      photo_url
      phone {
        phoneNo
        code
      }
      scopes
      password
      admin
      active
      department
      created_by
      company {
        _id
        employee
        employeeType
        park {
          _id
        }
        subAdmin
      }
    }
  }
`;
export const FindEmployeeByIdDocument = gql`
  query FindEmployeeById($findEmployeeByIdId: ID!) {
    findEmployeeById(id: $findEmployeeByIdId) {
      _id
      first_name
      last_name
      email
      access
      photo_url
      phone {
        phoneNo
        code
      }
      password
      admin
      active
      department
      created_by
      role {
        _id
        name
        active
        operations {
          name
          views
        }
        modules {
          name
          views
        }
      }
      modules {
        name
        views
      }
      operations {
        name
        views
      }
      company {
        employee
        employeeType
        location {
          _id
          facility
        }
        subAdmin
        park {
          _id
        }
      }
      package {
        _id
      }
    }
  }
`;
export const FindAllPackagesDocument = gql`
  query FindAllPackages {
    findAllPackages {
      _id
      title
      annual
      modules {
        name
        views
      }
      cost
      sizeInGB
      duration
      description
      compare_at
      active
      discount
      number_of_users
      discount_type
    }
  }
`;
export const FindPackageByIdDocument = gql`
  query FindPackageById($packageId: ID!) {
    findPackageById(PackageId: $packageId) {
      _id
      title
      annual
      modules {
        name
        views
      }
      cost
      sizeInGB
      duration
      compare_at
      description
      active
      discount
      number_of_users
      discount_type
    }
  }
`;
export const UserLocationsDocument = gql`
  query UserLocations($userLocationsId: ID!, $filter: InputTableFilter) {
    userLocations(id: $userLocationsId, filter: $filter) {
      _id
      city
      facility
      country
      parkName
      status
      createdOn
    }
  }
`;
export const RequestedLocationsDocument = gql`
  query RequestedLocations($filter: InputTableFilter) {
    requestedLocations(filter: $filter) {
      _id
      city
      country
      facility
      parkName
      createdOn
      status
      action {
        view
      }
    }
  }
`;
export const GetLocationByIdDocument = gql`
  query GetLocationById($getLocationByIdId: ID!) {
    getLocationById(id: $getLocationByIdId) {
      country
      state
      city
      facility
      address
      GPS {
        lat
        lng
      }
      active
    }
  }
`;
export const GetUserParksDocument = gql`
  query GetUserParks($userId: ID!, $filter: InputTableFilter) {
    getUserParks(userId: $userId, filter: $filter) {
      _id
      userName
      parkName
      createdOn
      status
    }
  }
`;
export const GetFacilitiesDocument = gql`
  query GetFacilities($userId: ID!, $filter: FacilityFilterInput) {
    getFacilities(userId: $userId, filter: $filter) {
      _id
      facility
      city
      state
      country
      active
    }
  }
`;
export const GetPectoraAuthDocument = gql`
  query GetPectoraAuth($facilityId: ID!) {
    getPectoraAuth(facilityId: $facilityId) {
      X_Auth_Id
      X_Auth_Token
    }
  }
`;
export const GetPectoraAndAppUsersDocument = gql`
  query GetPectoraAndAppUsers($facilityId: ID!) {
    getPectoraAndAppUsers(facilityId: $facilityId)
  }
`;
export const GetPointsOfInterestDocument = gql`
  query GetPointsOfInterest($facilityId: ID!) {
    getPointsOfInterest(facilityId: $facilityId) {
      _id
      createdByRef
      belongsToFacilityRef {
        _id
      }
      type
      name
      points
    }
  }
`;
export const FindAllReportsDocument = gql`
  query FindAllReports($userId: ID!, $filter: InputTableFilter) {
    findAllReports(userId: $userId, filter: $filter) {
      _id
      title
      submissions {
        _id
        date
        status
        submitted_data
      }
      belongs_to {
        _id
      }
      scheduleType
      created_by {
        _id
        first_name
        last_name
      }
      assignedTo {
        _id
        first_name
        last_name
      }
      assignedToFacilityRef {
        _id
        facility
      }
      clientAdminRef
      createdAt
    }
  }
`;
export const FindUserReportSubmissionByIdDocument = gql`
  query FindUserReportSubmissionById($reportId: ID!) {
    findUserReportSubmissionById(reportId: $reportId) {
      _id
      title
      reportType
      scheduleType
      submissions {
        _id
        date
        status
        submitted_data
      }
      belongs_to {
        _id
      }
      created_by {
        _id
        first_name
        last_name
      }
      assignedTo {
        _id
        first_name
        photo_url
        last_name
      }
      assignedToFacilityRef {
        _id
        facility
      }
      clientAdminRef
      createdAt
    }
  }
`;
export const FindAllReportTemplatesDocument = gql`
  query FindAllReportTemplates(
    $reportType: EReportType!
    $filter: InputTableFilter
    $createdById: ID
  ) {
    findAllReportTemplates(
      reportType: $reportType
      filter: $filter
      createdById: $createdById
    ) {
      _id
      name
      type
      status
      universalAccess
      fields {
        _id
        type
        label
        placeholder
        options
        src
        value
      }
      created_by
      createdAt
      clientAdminRef
    }
  }
`;
export const FindTemplateByIdDocument = gql`
  query FindTemplateById($findTemplateByIdId: ID!) {
    findTemplateById(id: $findTemplateByIdId) {
      _id
      name
      status
      universalAccess
      facility {
        _id
        facility
      }
      type
      fields {
        _id
        type
        label
        src
        placeholder
        options
        value
      }
      created_by
      clientAdminRef
    }
  }
`;
export const FindRoleDocument = gql`
  query FindRole {
    findRole {
      _id
      name
      active
      user_id
      modules {
        name
        views
      }
      operations {
        name
        views
      }
    }
  }
`;
export const FindRolesByUserIdDocument = gql`
  query FindRolesByUserId($findRolesByUserIdId: ID!, $facilityId: [ID]) {
    findRolesByUserId(id: $findRolesByUserIdId, facilityId: $facilityId) {
      _id
      name
      active
      operations {
        name
        views
      }
      modules {
        name
        views
      }
      user_id
    }
  }
`;
export const ManageRolesListingDocument = gql`
  query ManageRolesListing($userId: ID!, $filter: InputTableFilter) {
    manageRolesListing(userId: $userId, filter: $filter) {
      _id
      name
      createdOn
      activeUsers
      status
    }
  }
`;
export const FindRoleByIdDocument = gql`
  query FindRoleById($findRoleByIdId: ID!, $filter: ID) {
    findRoleById(id: $findRoleByIdId, filter: $filter) {
      _id
      name
      facility
      active
      operations {
        name
        views
      }
      modules {
        name
        views
      }
      user_id
    }
  }
`;
export const FindAllSubAdminPaymentsDocument = gql`
  query FindAllSubAdminPayments {
    findAllSubAdminPayments {
      _id
      user_id {
        _id
        first_name
        last_name
      }
      package_type
      subscription_date
      last_payment_date
      next_payment_date
      current_status
      amount
    }
  }
`;
export const FindSubAdminPaymenteByIdDocument = gql`
  query FindSubAdminPaymenteById($findSubAdminPaymenteByIdId: ID!) {
    findSubAdminPaymenteById(id: $findSubAdminPaymenteByIdId) {
      _id
      user_id {
        _id
        first_name
        last_name
      }
      package_type
      subscription_date
      last_payment_date
      next_payment_date
      current_status
      amount
    }
  }
`;
export const GetClientSecretDocument = gql`
  query GetClientSecret($input: GetClientSecretInput) {
    getClientSecret(input: $input) {
      clientSecret
    }
  }
`;
export const FindAllTasksDocument = gql`
  query FindAllTasks($creatorId: ID!) {
    findAllTasks(creatorId: $creatorId) {
      _id
      title
      detail
      createdAt
      subtasks {
        detail
        completed
      }
      createdBy {
        _id
        first_name
        last_name
      }
      clientAdminRef {
        _id
      }
    }
  }
`;
export const FindTaskByIdDocument = gql`
  query FindTaskById($findTaskByIdId: ID!) {
    findTaskById(id: $findTaskByIdId) {
      _id
      title
      facility
      detail
      media
      createdAt
      subtasks {
        detail
        completed
      }
      createdBy {
        _id
        first_name
        last_name
      }
      clientAdminRef {
        _id
      }
    }
  }
`;
export const TrackAllTasksDocument = gql`
  query TrackAllTasks($creatorId: ID!, $tableFilters: InputTableFilter) {
    trackAllTasks(creatorId: $creatorId, tableFilters: $tableFilters) {
      _id
      title
      detail
      media
      taskId
      createdAt
      deadline
      scheduleType
      submissions {
        _id
        date
        subtasks {
          detail
          completed
        }
        media
        voice
        status
      }
      userId {
        _id
        first_name
        last_name
      }
      assignedToFacilityRef {
        _id
        facility
      }
      createdBy_id {
        _id
        first_name
        last_name
      }
    }
  }
`;
export const FindAssignedTaskByIdDocument = gql`
  query FindAssignedTaskById($assignedTaskId: ID!) {
    findAssignedTaskById(assignedTaskId: $assignedTaskId) {
      _id
      title
      detail
      media
      submissions {
        subtasks {
          detail
          completed
        }
        _id
        date
        remarks
        media
        voice
        status
      }
      userId {
        _id
        first_name
        photo_url
        last_name
      }
      assignedToFacilityRef {
        _id
        facility
      }
      createdBy_id {
        _id
        first_name
        last_name
      }
      scheduleType
      taskId
      deadline
    }
  }
`;
export const GetPostDocument = gql`
  query GetPost {
    getPost {
      status
      message
      data
    }
  }
`;
export const GetTrainingByIdDocument = gql`
  query GetTrainingById($trainingId: ID!) {
    getTrainingById(trainingId: $trainingId) {
      _id
      title
      facility {
        _id
        facility
      }
      sessions {
        detail
        image {
          complete
          data
        }
        video {
          complete
          data
        }
      }
      createdBy {
        _id
        first_name
        last_name
      }
      createdAt
    }
  }
`;
export const GetMyTrainingsDocument = gql`
  query GetMyTrainings($creatorId: ID!) {
    getMyTrainings(creatorId: $creatorId) {
      _id
      title
      createdAt
      createdBy {
        _id
        first_name
        last_name
      }
      sessions {
        detail
        image {
          data
          complete
        }
        video {
          data
          complete
        }
      }
    }
  }
`;
export const GetUserTrainingSessionDocument = gql`
  query GetUserTrainingSession(
    $getUserTrainingSessionInput: GetUserTrainingSessionInput!
  ) {
    getUserTrainingSession(
      getUserTrainingSessionInput: $getUserTrainingSessionInput
    ) {
      _id
      title
      status
      scheduleType
      sessions {
        date
        status
        session {
          image {
            complete
            data
          }
          detail
          video {
            data
            complete
          }
        }
      }
      userRef {
        _id
        first_name
        last_name
      }
    }
  }
`;
export const GetAssignedTrainingByIdDocument = gql`
  query GetAssignedTrainingById($taskId: ID!) {
    getAssignedTrainingById(taskId: $taskId) {
      _id
      title
      sessions {
        date
        status
        session {
          _id
          detail
          image {
            complete
            data
          }
          video {
            complete
            data
          }
        }
      }
      userRef {
        _id
        first_name
        last_name
        photo_url
      }
      scheduleType
      priority
      assignedToFacilityRef {
        _id
        facility
      }
    }
  }
`;
export const UsersDocument = gql`
  query users {
    users {
      first_name
      last_name
      email
      rec_email
      photo_url
      phone {
        code
        phoneNo
      }
      scopes
      admin
      active
    }
  }
`;
export const UserByIdDocument = gql`
  query UserById($userByIdId: String!) {
    userById(id: $userByIdId) {
      _id
      themeId
      first_name
      last_name
      email
      access
      stripeCustomerId
      rec_email
      photo_url
      scopes
      operations {
        name
        views
      }
      modules {
        name
        views
      }
      role {
        _id
        name
        active
        user_id
        modules {
          name
          views
        }
        operations {
          name
          views
        }
      }
      admin
      active
      created_by
      belongsTo
      company {
        _id
        employee
        employeeType
        park {
          _id
          locations {
            _id
            facility
            address
            city
            state
            GPS {
              lat
              lng
            }
            country
            active
          }
          name
          logo
        }
        subAdmin
        location {
          _id
          facility
          active
          city
          state
          country
          address
          GPS {
            lat
            lng
          }
        }
      }
      package {
        _id
        paid
        title
        cost
        sizeInGB
        duration
        description
        number_of_users
        discount_type
        discount
        paymentDetail {
          amount
          method
        }
        status
        active
        createdAt
        modules {
          name
          views
        }
      }
      department
      phone {
        phoneNo
        code
      }
      created_by
    }
  }
`;
export const FindRelatingUsersDocument = gql`
  query FindRelatingUsers(
    $findRelatingUsersId: ID!
    $filter: InputTableFilter
  ) {
    findRelatingUsers(id: $findRelatingUsersId, filter: $filter) {
      _id
      name
      email
      role
      action {
        edit
        view
        delete
      }
      status
      createdOn
    }
  }
`;
export const GetSubAdminListDocument = gql`
  query GetSubAdminList($getSubAdminListId: ID!, $filter: InputTableFilter) {
    getSubAdminList(id: $getSubAdminListId, filter: $filter) {
      _id
      name
      package
      payment
      account
      action {
        view
        edit
        delete
      }
    }
  }
`;
export const FindMyUsersDocument = gql`
  query FindMyUsers($ownerId: ID!, $facilityId: ID) {
    findMyUsers(ownerId: $ownerId, facilityId: $facilityId) {
      _id
      first_name
      liveLocation {
        lat
        lng
      }
      company {
        employeeType
      }
      last_name
      email
      status: active
    }
  }
`;
export const TrackClientAdminsDocument = gql`
  query TrackClientAdmins($filter: InputTableFilter) {
    trackClientAdmins(filter: $filter) {
      _id
      first_name
      last_name
      package {
        cost
        title
        createdAt
      }
      email
    }
  }
`;
export const TrackParticularClientRecordDocument = gql`
  query TrackParticularClientRecord($userId: ID!) {
    trackParticularClientRecord(userId: $userId) {
      _id
      title
      status
      cost
      createdAt
      active
      ref {
        first_name
        last_name
        email
      }
    }
  }
`;
export const GetUserPackageModuleByIdDocument = gql`
  query GetUserPackageModuleById($subscriptionId: ID!) {
    getUserPackageModuleById(subscriptionId: $subscriptionId) {
      _id
      ref {
        first_name
        last_name
        email
      }
      title
      active
      paid
      cost
      duration
      paymentDetail {
        method
        amount
      }
      compare_at
      discount
      discount_type
      description
      number_of_users
      status
      createdAt
    }
  }
`;
export const GetFailedVatDocument = gql`
  query GetFailedVAT($facilityId: ID!) {
    getFailedVAT(facilityId: $facilityId) {
      _id
      taskAssignedRef {
        _id
        title
        detail
        deadline
        media
      }
      assignedToFacilityRef
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    CreateActivityLog(
      variables: CreateActivityLogMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<CreateActivityLogMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateActivityLogMutation>(
            CreateActivityLogDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CreateActivityLog",
        "mutation"
      );
    },
    AddUserAdmin(
      variables: AddUserAdminMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddUserAdminMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddUserAdminMutation>(
            AddUserAdminDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddUserAdmin",
        "mutation"
      );
    },
    CreateSubAdmin(
      variables: CreateSubAdminMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<CreateSubAdminMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateSubAdminMutation>(
            CreateSubAdminDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CreateSubAdmin",
        "mutation"
      );
    },
    RegisterClient(
      variables: RegisterClientMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<RegisterClientMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RegisterClientMutation>(
            RegisterClientDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "RegisterClient",
        "mutation"
      );
    },
    Login(
      variables: LoginMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<LoginMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LoginMutation>(LoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "Login",
        "mutation"
      );
    },
    forgetPassword(
      variables: ForgetPasswordMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ForgetPasswordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ForgetPasswordMutation>(
            ForgetPasswordDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "forgetPassword",
        "mutation"
      );
    },
    ResetPassword(
      variables: ResetPasswordMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ResetPasswordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ResetPasswordMutation>(
            ResetPasswordDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "ResetPassword",
        "mutation"
      );
    },
    ChangePassword(
      variables: ChangePasswordMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ChangePasswordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ChangePasswordMutation>(
            ChangePasswordDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "ChangePassword",
        "mutation"
      );
    },
    UpdateEmail(
      variables: UpdateEmailMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateEmailMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateEmailMutation>(UpdateEmailDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "UpdateEmail",
        "mutation"
      );
    },
    VerifyOtp(
      variables: VerifyOtpMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<VerifyOtpMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<VerifyOtpMutation>(VerifyOtpDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "VerifyOtp",
        "mutation"
      );
    },
    UpdateTemporaryPassword(
      variables: UpdateTemporaryPasswordMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateTemporaryPasswordMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateTemporaryPasswordMutation>(
            UpdateTemporaryPasswordDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateTemporaryPassword",
        "mutation"
      );
    },
    ActivateSubAdminAfterSubscription(
      variables: ActivateSubAdminAfterSubscriptionMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ActivateSubAdminAfterSubscriptionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ActivateSubAdminAfterSubscriptionMutation>(
            ActivateSubAdminAfterSubscriptionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "ActivateSubAdminAfterSubscription",
        "mutation"
      );
    },
    AddDepartment(
      variables: AddDepartmentMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddDepartmentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddDepartmentMutation>(
            AddDepartmentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddDepartment",
        "mutation"
      );
    },
    UpdateDepartment(
      variables: UpdateDepartmentMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateDepartmentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateDepartmentMutation>(
            UpdateDepartmentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateDepartment",
        "mutation"
      );
    },
    DeleteDepartment(
      variables: DeleteDepartmentMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteDepartmentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteDepartmentMutation>(
            DeleteDepartmentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeleteDepartment",
        "mutation"
      );
    },
    AddEmailAndNotification(
      variables: AddEmailAndNotificationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddEmailAndNotificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddEmailAndNotificationMutation>(
            AddEmailAndNotificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddEmailAndNotification",
        "mutation"
      );
    },
    EditEmailAndNotification(
      variables: EditEmailAndNotificationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<EditEmailAndNotificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EditEmailAndNotificationMutation>(
            EditEmailAndNotificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "EditEmailAndNotification",
        "mutation"
      );
    },
    AssignEmailAndNotification(
      variables: AssignEmailAndNotificationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AssignEmailAndNotificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssignEmailAndNotificationMutation>(
            AssignEmailAndNotificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AssignEmailAndNotification",
        "mutation"
      );
    },
    MarkAsRead(
      variables: MarkAsReadMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<MarkAsReadMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<MarkAsReadMutation>(MarkAsReadDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "MarkAsRead",
        "mutation"
      );
    },
    DeleteEmailAndNotification(
      variables: DeleteEmailAndNotificationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteEmailAndNotificationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteEmailAndNotificationMutation>(
            DeleteEmailAndNotificationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeleteEmailAndNotification",
        "mutation"
      );
    },
    CreateEmployee(
      variables: CreateEmployeeMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<CreateEmployeeMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateEmployeeMutation>(
            CreateEmployeeDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CreateEmployee",
        "mutation"
      );
    },
    UpdateEmployee(
      variables: UpdateEmployeeMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateEmployeeMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateEmployeeMutation>(
            UpdateEmployeeDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateEmployee",
        "mutation"
      );
    },
    DeleteEmployee(
      variables: DeleteEmployeeMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteEmployeeMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteEmployeeMutation>(
            DeleteEmployeeDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeleteEmployee",
        "mutation"
      );
    },
    AddPackage(
      variables: AddPackageMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddPackageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddPackageMutation>(AddPackageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "AddPackage",
        "mutation"
      );
    },
    UpdatePackage(
      variables: UpdatePackageMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdatePackageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePackageMutation>(
            UpdatePackageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdatePackage",
        "mutation"
      );
    },
    DeleteSubscriptionPackage(
      variables: DeleteSubscriptionPackageMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteSubscriptionPackageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteSubscriptionPackageMutation>(
            DeleteSubscriptionPackageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeleteSubscriptionPackage",
        "mutation"
      );
    },
    AddAnotherLocation(
      variables: AddAnotherLocationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddAnotherLocationMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddAnotherLocationMutation>(
            AddAnotherLocationDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddAnotherLocation",
        "mutation"
      );
    },
    AcceptLocationRequest(
      variables: AcceptLocationRequestMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AcceptLocationRequestMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AcceptLocationRequestMutation>(
            AcceptLocationRequestDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AcceptLocationRequest",
        "mutation"
      );
    },
    UpdateFacilityRequest(
      variables: UpdateFacilityRequestMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateFacilityRequestMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateFacilityRequestMutation>(
            UpdateFacilityRequestDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateFacilityRequest",
        "mutation"
      );
    },
    AddPectoraAuth(
      variables: AddPectoraAuthMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddPectoraAuthMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddPectoraAuthMutation>(
            AddPectoraAuthDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddPectoraAuth",
        "mutation"
      );
    },
    AddPointOffInterest(
      variables: AddPointOffInterestMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddPointOffInterestMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddPointOffInterestMutation>(
            AddPointOffInterestDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddPointOffInterest",
        "mutation"
      );
    },
    UpdatePointOffInterest(
      variables: UpdatePointOffInterestMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdatePointOffInterestMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePointOffInterestMutation>(
            UpdatePointOffInterestDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdatePointOffInterest",
        "mutation"
      );
    },
    DeletePointOffInterest(
      variables: DeletePointOffInterestMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeletePointOffInterestMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePointOffInterestMutation>(
            DeletePointOffInterestDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeletePointOffInterest",
        "mutation"
      );
    },
    AddReportTemplate(
      variables: AddReportTemplateMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddReportTemplateMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddReportTemplateMutation>(
            AddReportTemplateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddReportTemplate",
        "mutation"
      );
    },
    UpdateReportTemplate(
      variables: UpdateReportTemplateMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateReportTemplateMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateReportTemplateMutation>(
            UpdateReportTemplateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateReportTemplate",
        "mutation"
      );
    },
    AssignReportTemplate(
      variables: AssignReportTemplateMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AssignReportTemplateMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssignReportTemplateMutation>(
            AssignReportTemplateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AssignReportTemplate",
        "mutation"
      );
    },
    DeleteReportTemplate(
      variables: DeleteReportTemplateMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteReportTemplateMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteReportTemplateMutation>(
            DeleteReportTemplateDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeleteReportTemplate",
        "mutation"
      );
    },
    ApproveReportSubmission(
      variables: ApproveReportSubmissionMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ApproveReportSubmissionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ApproveReportSubmissionMutation>(
            ApproveReportSubmissionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "ApproveReportSubmission",
        "mutation"
      );
    },
    EvaluateVAT(
      variables: EvaluateVatMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<EvaluateVatMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<EvaluateVatMutation>(EvaluateVatDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "EvaluateVAT",
        "mutation"
      );
    },
    AddRole(
      variables: AddRoleMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddRoleMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddRoleMutation>(AddRoleDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "AddRole",
        "mutation"
      );
    },
    UpdateRole(
      variables: UpdateRoleMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateRoleMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateRoleMutation>(UpdateRoleDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "UpdateRole",
        "mutation"
      );
    },
    DeleteRole(
      variables: DeleteRoleMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteRoleMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRoleMutation>(DeleteRoleDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "DeleteRole",
        "mutation"
      );
    },
    CreateStripeCustomer(
      variables: CreateStripeCustomerMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<CreateStripeCustomerMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateStripeCustomerMutation>(
            CreateStripeCustomerDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "CreateStripeCustomer",
        "mutation"
      );
    },
    GetClientSecretForSubscriber(
      variables: GetClientSecretForSubscriberQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetClientSecretForSubscriberQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetClientSecretForSubscriberQuery>(
            GetClientSecretForSubscriberDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetClientSecretForSubscriber",
        "query"
      );
    },
    OnboardSubAdmin(
      variables: OnboardSubAdminMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<OnboardSubAdminMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<OnboardSubAdminMutation>(
            OnboardSubAdminDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "OnboardSubAdmin",
        "mutation"
      );
    },
    UpdateSubAdmin(
      variables: UpdateSubAdminMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateSubAdminMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateSubAdminMutation>(
            UpdateSubAdminDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateSubAdmin",
        "mutation"
      );
    },
    AddSubAdminPayment(
      variables: AddSubAdminPaymentMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddSubAdminPaymentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddSubAdminPaymentMutation>(
            AddSubAdminPaymentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddSubAdminPayment",
        "mutation"
      );
    },
    CreateTask(
      variables: CreateTaskMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<CreateTaskMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateTaskMutation>(CreateTaskDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "CreateTask",
        "mutation"
      );
    },
    UpdateTask(
      variables: UpdateTaskMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateTaskMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateTaskMutation>(UpdateTaskDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "UpdateTask",
        "mutation"
      );
    },
    DeleteTask(
      variables: DeleteTaskMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteTaskMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteTaskMutation>(DeleteTaskDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "DeleteTask",
        "mutation"
      );
    },
    AssignTask(
      variables: AssignTaskMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AssignTaskMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssignTaskMutation>(AssignTaskDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "AssignTask",
        "mutation"
      );
    },
    ApproveSubmission(
      variables: ApproveSubmissionMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ApproveSubmissionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ApproveSubmissionMutation>(
            ApproveSubmissionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "ApproveSubmission",
        "mutation"
      );
    },
    PostTicker(
      variables: PostTickerMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<PostTickerMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<PostTickerMutation>(PostTickerDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "PostTicker",
        "mutation"
      );
    },
    AddTrainingSession(
      variables: AddTrainingSessionMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AddTrainingSessionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AddTrainingSessionMutation>(
            AddTrainingSessionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AddTrainingSession",
        "mutation"
      );
    },
    UpdateTraining(
      variables: UpdateTrainingMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateTrainingMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateTrainingMutation>(
            UpdateTrainingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateTraining",
        "mutation"
      );
    },
    DeleteTraining(
      variables: DeleteTrainingMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteTrainingMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteTrainingMutation>(
            DeleteTrainingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeleteTraining",
        "mutation"
      );
    },
    AssignTrainingSession(
      variables: AssignTrainingSessionMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AssignTrainingSessionMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssignTrainingSessionMutation>(
            AssignTrainingSessionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AssignTrainingSession",
        "mutation"
      );
    },
    AssignInService(
      variables: AssignInServiceMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AssignInServiceMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssignInServiceMutation>(
            AssignInServiceDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AssignInService",
        "mutation"
      );
    },
    UpdateAdminUser(
      variables: UpdateAdminUserMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateAdminUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAdminUserMutation>(
            UpdateAdminUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateAdminUser",
        "mutation"
      );
    },
    DeleteAdminUser(
      variables: DeleteAdminUserMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteAdminUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAdminUserMutation>(
            DeleteAdminUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "DeleteAdminUser",
        "mutation"
      );
    },
    UpdateProfile(
      variables: UpdateProfileMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateProfileMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateProfileMutation>(
            UpdateProfileDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateProfile",
        "mutation"
      );
    },
    UpdateUserFields(
      variables: UpdateUserFieldsMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateUserFieldsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateUserFieldsMutation>(
            UpdateUserFieldsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UpdateUserFields",
        "mutation"
      );
    },
    ModifyPackage(
      variables: ModifyPackageMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ModifyPackageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ModifyPackageMutation>(
            ModifyPackageDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "ModifyPackage",
        "mutation"
      );
    },
    AttachTaskToTraining(
      variables: AttachTaskToTrainingMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AttachTaskToTrainingMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AttachTaskToTrainingMutation>(
            AttachTaskToTrainingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "AttachTaskToTraining",
        "mutation"
      );
    },
    FindActivityLogByClientAdminId(
      variables: FindActivityLogByClientAdminIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindActivityLogByClientAdminIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindActivityLogByClientAdminIdQuery>(
            FindActivityLogByClientAdminIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindActivityLogByClientAdminId",
        "query"
      );
    },
    FindActivityLogByUserId(
      variables: FindActivityLogByUserIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindActivityLogByUserIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindActivityLogByUserIdQuery>(
            FindActivityLogByUserIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindActivityLogByUserId",
        "query"
      );
    },
    FindActivityLogById(
      variables: FindActivityLogByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindActivityLogByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindActivityLogByIdQuery>(
            FindActivityLogByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindActivityLogById",
        "query"
      );
    },
    GetIncidentReportsForClientDashboardStats(
      variables: GetIncidentReportsForClientDashboardStatsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetIncidentReportsForClientDashboardStatsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetIncidentReportsForClientDashboardStatsQuery>(
            GetIncidentReportsForClientDashboardStatsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetIncidentReportsForClientDashboardStats",
        "query"
      );
    },
    GetClientDashboardStats(
      variables: GetClientDashboardStatsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetClientDashboardStatsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetClientDashboardStatsQuery>(
            GetClientDashboardStatsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetClientDashboardStats",
        "query"
      );
    },
    GetSuperAdminDashboardStats(
      variables: GetSuperAdminDashboardStatsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetSuperAdminDashboardStatsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetSuperAdminDashboardStatsQuery>(
            GetSuperAdminDashboardStatsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetSuperAdminDashboardStats",
        "query"
      );
    },
    GetAllClientAdmins(
      variables?: GetAllClientAdminsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetAllClientAdminsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllClientAdminsQuery>(
            GetAllClientAdminsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetAllClientAdmins",
        "query"
      );
    },
    GetAllSubscriptions(
      variables?: GetAllSubscriptionsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetAllSubscriptionsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllSubscriptionsQuery>(
            GetAllSubscriptionsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetAllSubscriptions",
        "query"
      );
    },
    GetAllParks(
      variables?: GetAllParksQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetAllParksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAllParksQuery>(GetAllParksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "GetAllParks",
        "query"
      );
    },
    FindAllDepartments(
      variables?: FindAllDepartmentsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAllDepartmentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAllDepartmentsQuery>(
            FindAllDepartmentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindAllDepartments",
        "query"
      );
    },
    FindDepartmentById(
      variables: FindDepartmentByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindDepartmentByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindDepartmentByIdQuery>(
            FindDepartmentByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindDepartmentById",
        "query"
      );
    },
    FindDepartmentsByOwnerId(
      variables: FindDepartmentsByOwnerIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindDepartmentsByOwnerIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindDepartmentsByOwnerIdQuery>(
            FindDepartmentsByOwnerIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindDepartmentsByOwnerId",
        "query"
      );
    },
    getDogs(
      variables?: GetDogsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetDogsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetDogsQuery>(GetDogsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "getDogs",
        "query"
      );
    },
    GetEmailAndNotificationByCreatorId(
      variables: GetEmailAndNotificationByCreatorIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetEmailAndNotificationByCreatorIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetEmailAndNotificationByCreatorIdQuery>(
            GetEmailAndNotificationByCreatorIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetEmailAndNotificationByCreatorId",
        "query"
      );
    },
    GetEmailAndNotificationById(
      variables: GetEmailAndNotificationByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetEmailAndNotificationByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetEmailAndNotificationByIdQuery>(
            GetEmailAndNotificationByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetEmailAndNotificationById",
        "query"
      );
    },
    GetUserNotifications(
      variables: GetUserNotificationsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetUserNotificationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserNotificationsQuery>(
            GetUserNotificationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetUserNotifications",
        "query"
      );
    },
    FindAllEmployees(
      variables: FindAllEmployeesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAllEmployeesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAllEmployeesQuery>(
            FindAllEmployeesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindAllEmployees",
        "query"
      );
    },
    FindEmployeeById(
      variables: FindEmployeeByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindEmployeeByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindEmployeeByIdQuery>(
            FindEmployeeByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindEmployeeById",
        "query"
      );
    },
    FindAllPackages(
      variables?: FindAllPackagesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAllPackagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAllPackagesQuery>(
            FindAllPackagesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindAllPackages",
        "query"
      );
    },
    FindPackageById(
      variables: FindPackageByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindPackageByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindPackageByIdQuery>(
            FindPackageByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindPackageById",
        "query"
      );
    },
    UserLocations(
      variables: UserLocationsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UserLocationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserLocationsQuery>(UserLocationsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "UserLocations",
        "query"
      );
    },
    RequestedLocations(
      variables?: RequestedLocationsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<RequestedLocationsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RequestedLocationsQuery>(
            RequestedLocationsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "RequestedLocations",
        "query"
      );
    },
    GetLocationById(
      variables: GetLocationByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetLocationByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetLocationByIdQuery>(
            GetLocationByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetLocationById",
        "query"
      );
    },
    GetUserParks(
      variables: GetUserParksQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetUserParksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserParksQuery>(GetUserParksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "GetUserParks",
        "query"
      );
    },
    GetFacilities(
      variables: GetFacilitiesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetFacilitiesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetFacilitiesQuery>(GetFacilitiesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "GetFacilities",
        "query"
      );
    },
    GetPectoraAuth(
      variables: GetPectoraAuthQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetPectoraAuthQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPectoraAuthQuery>(
            GetPectoraAuthDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetPectoraAuth",
        "query"
      );
    },
    GetPectoraAndAppUsers(
      variables: GetPectoraAndAppUsersQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetPectoraAndAppUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPectoraAndAppUsersQuery>(
            GetPectoraAndAppUsersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetPectoraAndAppUsers",
        "query"
      );
    },
    GetPointsOfInterest(
      variables: GetPointsOfInterestQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetPointsOfInterestQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPointsOfInterestQuery>(
            GetPointsOfInterestDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetPointsOfInterest",
        "query"
      );
    },
    FindAllReports(
      variables: FindAllReportsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAllReportsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAllReportsQuery>(
            FindAllReportsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindAllReports",
        "query"
      );
    },
    FindUserReportSubmissionById(
      variables: FindUserReportSubmissionByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindUserReportSubmissionByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindUserReportSubmissionByIdQuery>(
            FindUserReportSubmissionByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindUserReportSubmissionById",
        "query"
      );
    },
    FindAllReportTemplates(
      variables: FindAllReportTemplatesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAllReportTemplatesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAllReportTemplatesQuery>(
            FindAllReportTemplatesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindAllReportTemplates",
        "query"
      );
    },
    FindTemplateById(
      variables: FindTemplateByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindTemplateByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindTemplateByIdQuery>(
            FindTemplateByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindTemplateById",
        "query"
      );
    },
    FindRole(
      variables?: FindRoleQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindRoleQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindRoleQuery>(FindRoleDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "FindRole",
        "query"
      );
    },
    FindRolesByUserId(
      variables: FindRolesByUserIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindRolesByUserIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindRolesByUserIdQuery>(
            FindRolesByUserIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindRolesByUserId",
        "query"
      );
    },
    ManageRolesListing(
      variables: ManageRolesListingQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<ManageRolesListingQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ManageRolesListingQuery>(
            ManageRolesListingDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "ManageRolesListing",
        "query"
      );
    },
    FindRoleById(
      variables: FindRoleByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindRoleByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindRoleByIdQuery>(FindRoleByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "FindRoleById",
        "query"
      );
    },
    FindAllSubAdminPayments(
      variables?: FindAllSubAdminPaymentsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAllSubAdminPaymentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAllSubAdminPaymentsQuery>(
            FindAllSubAdminPaymentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindAllSubAdminPayments",
        "query"
      );
    },
    FindSubAdminPaymenteById(
      variables: FindSubAdminPaymenteByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindSubAdminPaymenteByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindSubAdminPaymenteByIdQuery>(
            FindSubAdminPaymenteByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindSubAdminPaymenteById",
        "query"
      );
    },
    GetClientSecret(
      variables?: GetClientSecretQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetClientSecretQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetClientSecretQuery>(
            GetClientSecretDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetClientSecret",
        "query"
      );
    },
    FindAllTasks(
      variables: FindAllTasksQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAllTasksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAllTasksQuery>(FindAllTasksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "FindAllTasks",
        "query"
      );
    },
    FindTaskById(
      variables: FindTaskByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindTaskByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindTaskByIdQuery>(FindTaskByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "FindTaskById",
        "query"
      );
    },
    TrackAllTasks(
      variables: TrackAllTasksQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<TrackAllTasksQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TrackAllTasksQuery>(TrackAllTasksDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "TrackAllTasks",
        "query"
      );
    },
    FindAssignedTaskById(
      variables: FindAssignedTaskByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindAssignedTaskByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindAssignedTaskByIdQuery>(
            FindAssignedTaskByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindAssignedTaskById",
        "query"
      );
    },
    GetPost(
      variables?: GetPostQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetPostQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPostQuery>(GetPostDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "GetPost",
        "query"
      );
    },
    GetTrainingById(
      variables: GetTrainingByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetTrainingByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetTrainingByIdQuery>(
            GetTrainingByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetTrainingById",
        "query"
      );
    },
    GetMyTrainings(
      variables: GetMyTrainingsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetMyTrainingsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetMyTrainingsQuery>(
            GetMyTrainingsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetMyTrainings",
        "query"
      );
    },
    GetUserTrainingSession(
      variables: GetUserTrainingSessionQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetUserTrainingSessionQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserTrainingSessionQuery>(
            GetUserTrainingSessionDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetUserTrainingSession",
        "query"
      );
    },
    GetAssignedTrainingById(
      variables: GetAssignedTrainingByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetAssignedTrainingByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAssignedTrainingByIdQuery>(
            GetAssignedTrainingByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetAssignedTrainingById",
        "query"
      );
    },
    users(
      variables?: UsersQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UsersQuery>(UsersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "users",
        "query"
      );
    },
    UserById(
      variables: UserByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UserByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserByIdQuery>(UserByIdDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "UserById",
        "query"
      );
    },
    FindRelatingUsers(
      variables: FindRelatingUsersQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindRelatingUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindRelatingUsersQuery>(
            FindRelatingUsersDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "FindRelatingUsers",
        "query"
      );
    },
    GetSubAdminList(
      variables: GetSubAdminListQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetSubAdminListQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetSubAdminListQuery>(
            GetSubAdminListDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetSubAdminList",
        "query"
      );
    },
    FindMyUsers(
      variables: FindMyUsersQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindMyUsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindMyUsersQuery>(FindMyUsersDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "FindMyUsers",
        "query"
      );
    },
    TrackClientAdmins(
      variables?: TrackClientAdminsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<TrackClientAdminsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TrackClientAdminsQuery>(
            TrackClientAdminsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "TrackClientAdmins",
        "query"
      );
    },
    TrackParticularClientRecord(
      variables: TrackParticularClientRecordQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<TrackParticularClientRecordQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<TrackParticularClientRecordQuery>(
            TrackParticularClientRecordDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "TrackParticularClientRecord",
        "query"
      );
    },
    GetUserPackageModuleById(
      variables: GetUserPackageModuleByIdQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetUserPackageModuleByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserPackageModuleByIdQuery>(
            GetUserPackageModuleByIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "GetUserPackageModuleById",
        "query"
      );
    },
    GetFailedVAT(
      variables: GetFailedVatQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetFailedVatQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetFailedVatQuery>(GetFailedVatDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "GetFailedVAT",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
