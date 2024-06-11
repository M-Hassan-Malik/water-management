/* eslint-disable */
interface IPageConfigurations {
  slug?: string;
  title?: string;
  actionText?: string;
  fields?: IField[];
}
interface IPageQuery {
  type: string | undefined;
  id: string;
  userId: string;
}

interface IStorage {
  sizeInBytes: number;
  sizeInKB: number;
  sizeInMB: number;
  sizeInGB: number;
}

type PageType = "view" | "create" | "edit" | "assign";

interface IEmailRequest {
  html: string;
  subject: string;
  to: string;
}

interface IEmailResponse {
  status: boolean;
  message: string;
}

interface TwilioMessageRequest {
  phones: string[];
  message: string;
}

interface TwilioMessageResponse {
  success: boolean;
  data?: twilio.messages.MessageInstance[];
  message?: string;
}

interface IPayloadFCM {
  to: string[];
  notification: {
    body: string;
    title: string;
  };
  link?: string;
  data?: object;
}

interface IPageProps {
  pageType: PageType;
  id?: string;
}

type IField = {
  title: string;
  formName?: string;
  slug: string;
  placeHolder: string;
  key: string;
  secure: boolean | undefined;
  supportSecure?: boolean;
  toggleSecure?: () => void;
  type?: "email" | "password" | "text" | "otp";
};

type IPage =
  | "LOGIN"
  | "FORGET_PASSWORD"
  | "OTP"
  | "NEW_PASSWORD"
  | "ADD_SUB_ADMIN";
type IConfiguration = { [page in Page]: IPageConfigurations };

type IPhone = {
  _id?: string;
  phoneNo: string;
  code: string;
};

// type IOperation = {
//   _id: string;
//   path: string;
//   permissions: string[];
//   ref?: string;
//   sort: number;
//   title: string;
//   icon?: Icon;
//   isRoute: boolean;
// };

interface IParkLocation {
  _id?: string;
  facility: string;
  address: string;
  city: string;
  country: string;
  state: string;
  GPS: { lat: number; lng: number };
  active: boolean;
  additionalDetails: {};
}

interface IUserLocationListing {
  _id: string;
  userName: string;
  parkName: string;
  createdOn: Date;
  status: boolean;
}

interface IPark {
  _id?: string;
  name: string;
  logo: string;
  locations: IParkLocation[];
  additionalDetails: {};
}
interface ICompany {
  _id?: string;
  subAdmin: boolean;
  location: IParkLocation[];
  park: IPark;
  employee: boolean;
  employeeType: EmployeeType;
}

interface IOperation {
  name: string;
  views: string[];
}

interface IModule {
  name: string;
  views: string[];
}

type IIcon = {
  _id: string;
  type: "ICON" | "SOURCE";
  src: string;
};

type IModuleConfiguration = {
  id: EModules;
  name: string;
  unit: IModuleUnit;
  require_approval: boolean;
  isRoute: boolean;
  permissions: string[];
  widget?: boolean;
};

// type IModule = {
//   _id: string;
//   name: string;
//   module: EModules;
//   ref?: string;
//   package?: string;
//   unit: IModuleUnit;
//   indicator: string;
//   used?: number;
//   available: number;
//   path: string;
//   created_at: string;
//   updated_at: string;
//   sort: number;
//   active: boolean;
//   require_approval?: boolean;
//   isRoute: boolean;
//   icon?: IIcon;
//   permissions: EPermissions[];
// };

type IDiscountType = "PERCENTAGE" | "FIXED";

interface IUserPackageModule {
  _id?: string;
  name: EModules;
  views: EModuleViews[];
  indicator: string;
  used: number;
  available: number;
  active: boolean;
  status: ESubscriptionStatus;
  number_of_users: number;
}

interface ILiveLocation {
  lat: number;
  lng: number;
}

interface IPaymentDetail {
  method: string;
  amount: number;
}

interface IPackage {
  _id?: string;
  annual: boolean;
  ref: IUser | string;
  createdBy?: IUser | string;
  packageRef: IPackage | string;
  title: string;
  sizeInGB: number;
  modules: IFeatureTypeForSubscriptionPackage[];
  cost: number;
  compare_at?: number;
  active: boolean;
  paid: boolean;
  discount: number;
  duration: number;
  discount_type: DiscountType;
  description: string;
  status: ESubscriptionStatus;
  number_of_users: number;
  createdAt?: Date;
  paymentDetail?: IPaymentDetail;
}

enum EPriority {
  EMERGENCY = "EMERGENCY",
  ALERT = "ALERT",
  STANDARD = "STANDARD",
  LOW = "LOW",
}

enum EIndicator {
  LIMITLESS = "LIMITLESS",
  LIMITED = "LIMITED",
}

enum ESchedule {
  ONE_TIME = "ONE_TIME",
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  ALWAYS = "ALWAYS",
}

enum ESubmissionStatus {
  PENDING = "PENDING",
  INPROGRESS = "INPROGRESS",
  INPROGRESS = "INPROGRESS",
  COMPLETE = "COMPLETED",
  FAILED = "FAILED",
}

enum EAssignBy {
  FACILITY = "FACILITY",
  USER = "USER",
  ROLE = "ROLE",
}

enum ESubscriptionStatus {
  SUBSCRIBED = "SUBSCRIBED",
  UPGRADE = "UPGRADE",
  DOWNGRADE = "DOWNGRADE",
}

enum EEmailAndNotification {
  NOTIFICATION = "NOTIFICATION",
  EMAIL = "EMAIL",
  EMERGENCY = "EMERGENCY",
  ALERT = "ALERT",
  NULL = "NULL",
}

enum EPackageType {
  CUSTOM = "CUSTOM",
  PREMIUM = "PREMIUM",
  FREEMIUM = "FREEMIUM",
}

enum EPaymentStatus {
  PAID = "PAID",
  UNPAID = "UNPAID",
}

enum EmployeeType {
  SUBADMIN = "SUBADMIN",
  MANAGER = "MANAGER",
  LIFEGUARD = "LIFEGUARD",
  PECTORA = "PECTORA",
  IMPORTED = "IMPORTED",
}

enum FAQStatus {
  MOBILE = "MOBILE",
  WEB = "WEB",
  BOTH = "BOTH",
}

interface ISessionsSubmissions {
  date: Date;
  session: [ISessions];
  status: ESubmissionStatus;
}

interface ITrainingSession {
  _id?: string;
  title: string;
  facility: string | IParkLocation;
  sessions: ISessionsSubmissions[];
  scheduleType: string;
  trainingRef: ITraining | string;
  userRef?: IUser | string;
  assignedToFacilityRef?: IParkLocation | string;
  authority: IUser | string;
  createdBy: IUser | string;
  status: ESubmissionStatus;
  priority: EPriority;
  type?: string;
}

interface ISessions {
  detail: string;
  image?: {
    data: any;
    complete: boolean;
  };
  video?: {
    data: any;
    complete: boolean;
  };
}

interface ITraining {
  _id: string;
  title: string;
  facility: IParkLocation | string | null;
  sessions: [ISessions];
  createdBy: IUser | string;
  authority: IUser | string;
  createdAt: Date;
}
interface IActivityLog {
  _id?: string;
  user_name: string;
  role: string;
  interface: "WEB" | "MOBILE";
  activity: string;
  dateTime: Date;
  belongsTo?: string | IUser;
  user_id: string | IUser;
}
interface ITicker {
  _id: string;
  title: string;
  message: string;
  expiration: Date;
  postedBy: string | IUser;
  postBelongsTo: string | IUser;
  redirect?: string;
}

interface ISubAdminPayment {
  _id?: string;
  user_id?: string;
  package_type: PackageType;
  subscription_date: String;
  last_payment_date: String;
  next_payment_date: String;
  current_status: PaymentStatus;
  amount: number;
}

interface ISubAdminPaymentInput {
  user_id?: string;
  package_type: PackageType;
  subscription_date: String;
  last_payment_date: String;
  next_payment_date: String;
  current_status: PaymentStatus;
  amount: number;
}

interface ISubAdminOnBoardingInput {
  _id: string;
  userData: {
    first_name: string;
    last_name: string;
    profile_img: string;
  };
  parkData: {
    name: string;
    park_logo: string;
  };
  parkLocationData: {
    country: string;
    city: string;
    state: string;
    address: string;
    GPS: string;
  };
}

interface IDepartment {
  _id?: string;
  name: string;
  active: boolean;
  createdBy: string | any;
}

interface IRole {
  _id?: string;
  name: string;
  facility?: IParkLocation | string | null;
  active: boolean;
  modules: ModuleViewPermissions[];
  operations: OperationViewPermissions[];
  user_id?: string;
}

interface IFormField {
  _id: string;
  type: string;
  label: string;
  placeholder?: string | null;
  options?: string[] | null | undefined;
  value?: string;
  src?: string;
}

interface FormFieldInput {
  _id: string;
  type: string;
  value?: string;
  label: string;
  placeholder?: string;
  options: [string];
  src?: string;
}

interface ReportTemplateInput {
  name: string;
  type: string;
  facility?: string;
  fields: [FormFieldInput!]!;
  status: boolean;
  created_by: string;
}

interface UpdateReportTemplateInput {
  _id: string;
  name: string;
  facility?: string;
  status: boolean;
  fields: [FormFieldInput];
  created_by?: string;
  clientAdminRef?: string;
  type?: string;
}

type ReportTemplate = {
  _id?: string;
  name: string;
  facility: IParkLocation;
  type: string;
  status: boolean;
  created_by: IUser | string;
  createdAt: Date;
  clientAdminRef: IUser | string;
  universalAccess: boolean;
  fields: IFormField[];
};

interface Submission {
  submission_date: string;
  ref: string;
}

type UserReport = {
  _id?: string;
  user_id: IUser;
  report_id: ReportTemplate;
  submissions: Submission[];
};

interface CreateReportSubmissionInput {
  belongs_to: string;
  submitted_data: object;
}

type ReportSubmittedData = {
  _id?: string;
  submitted_data: object[];
  date: Date;
  status: ESubmissionStatus;
  location: ILiveLocation;
  active?: boolean;
};

type ReportSubmission = {
  _id?: string;
  title: string;
  facility: string | IParkLocation;
  belongs_to: UserReport | string;
  scheduleType: string;
  submissions: ReportSubmittedData[];
  assignedTo: IUser | string;
  assignedToFacilityRef: IParkLocation | string;
  created_by: IUser | string;
  clientAdminRef: IUser | string;
  createdAt?: string;
  priority: EPriority;
  reportType: string;
  deadline: Date;
  type?: string;
};

type ReportEditHistory = {
  _id?: string;
  belongs_to: string;
  submitted_data: object[];
};

interface IPectora {
  parkId: string | IPark;
  facilityId: string | IParkLocation;
  X_Auth_Id: string;
  X_Auth_Token: string;
}

interface ILinkVAT {
  assignedToFacilityRef: string | IParkLocation | null;
  taskAssignedRef: string | ITaskAssigned | null;
  trainingAssignedRef: string | ITrainingSession | null;
}

interface IFeatureTypeForSubscriptionPackage {
  name: string;
  views: string[];
  indicator: EIndicator;
  available: number;
}

interface IFeatureType {
  name: string;
  views: string[];
}

interface IAssignTaskInput {
  id: string;
  assignTo: [string];
  scheduleType: string;
}

interface ITask {
  _id?: string;
  title: string;
  facility: IParkLocation | string;
  detail: string;
  media: string[];
  subtasks: ISubTask[];
  createdBy: string | IUser;
  clientAdminRef: string | IUser;
}
interface ISubTask {
  detail: string;
  completed: boolean;
}

interface ITaskSubmission {
  subtasks: ISubTask[];
  media: string[];
  voice: string;
  remarks: string;
  date: Date;
  status: ESubmissionStatus;
  location: ILiveLocation;
}

interface ITaskAssigned {
  _id?: string;
  title: string;
  facility: string | IParkLocation;
  detail: string;
  media: string[];
  submissions: ITaskSubmission[];
  scheduleType: string;
  userId: string | IUser;
  assignedToFacilityRef: string | IParkLocation;
  createdBy_id: string | IUser;
  clientAdminRef: string | IUser;
  taskId: string | ITask;
  deadline: Date;
  createdAt: Date;
  priority: EPriority;
  type?: string;
}

interface ICreateTaskInput {
  title: string;
  detail: string;
  subtasks?: ISubTask[];
  createdBy: string;
  clientAdminRef: string;
}

interface IUser {
  _id?: string;
  first_name: string;
  last_name: string;
  email: string;
  rec_email?: string;
  photo_url?: string;
  phone: IPhone;
  scopes: string[];
  operations: OperationViewPermissions[];
  package?: IPackage;
  modules: ModuleViewPermissions[];
  role: IRole;
  department?: string;
  company: ICompany;
  password: string;
  admin: boolean;
  active: boolean;
  temporary_password: boolean;
  created_by: string | null;
  belongsTo: string | null;
  deviceToken: string;
  themeId: string;
  stripeCustomerId: string;
  liveLocation: ILiveLocation;
  access?: FAQStatus;
  isDeleted?: boolean;
}

// Pool Calculator
type TChlorineOptions =
  | "Chlorine Gas"
  | "Calcium HypoChlorite 67%"
  | "Calcium HypoChlorite 75%"
  | "Sodium HypoChlorite 12% (bleach)"
  | "Lithium HypoChlorite 35%"
  | "Trichlor 90%"
  | "Dichlor 56%"
  | "Dichlor 62%"
  | "Sodium Thiosulfate (Neutralizer)"
  | "Sodium Sulfite (100%)";
type TpHOptions =
  | "Sodium Carbonate (Soda Ash)"
  | "Sodium Hydroxide (50%) (Caustic Soda)"
  | "Muriatic Acid (Hydrochloric Acid)"
  | "Sodium Bisulfate (Dry Acid)"
  | "Carbon Dioxide";
type TAlkalinityOptions =
  | "Sodium Carbonate (Soda Ash)"
  | "Sodium Bicarbonate (Baking Soda)"
  | "Sodium Sesquicarbonate"
  | "Muriatic Acid (Hydrochloric Acid)"
  | "Sodium Bisulfate (Dry Acid)";
type TCaHardnessOptions = "Calcium Chloride (100%)" | "Calcium Chloride (77%)";
type TStabilizerOptions = "Cyanuric Acid (Conditioner)" | "Dichlor 56%";

interface IChlorineOption {
  title: string;
  options: TChlorineOptions[];
}
interface IpHOption {
  title: string;
  options: TpHOptions[];
}
interface IAlkalinityOption {
  title: string;
  options: TAlkalinityOptions[];
}
interface ICaHardnessOption {
  title: string;
  options: TCaHardnessOptions[];
}
interface IStabilizerOption {
  title: string;
  options: TStabilizerOptions[];
}
//

interface IModuleMethods {
  [key: EModuleMethods]: <T>(arg: Type) => Promise<T>;
}

type IModulePath = {
  path: string;
  title: string;
  icon: IIcon;
};
interface OptionsFields {
  name: string;
  option: string;
  id: number;
}

interface RequiredFieldsType {
  _id: string;
  type: string;
  label: string;
  value?: string;
  src?: string;
  placeholder?: string | null;
  options?: string[] | null;
}
class Singleton {
  static instance: typeof this;

  public static async getInstance(): typeof this;
}

abstract interface GenericSystem extends Singleton {
  modules: ISystemModules;
  operations: ISystemModules;
  views: IModuleViewsType;
  methods: IModuleMethods;

  init(): GenericSystem;
  invoke<T, P>(value: T): Promise<P>;
  call<T, P>(value: T): Promise<P>;
  getView(id: EModuleViews | EOperationViews): ReactNode;
}

abstract interface GenericModule {
  static getConfiguration(): IModuleConfiguration;

  public intall(user: IUser, amount: number);
  public delete(user: IUser);
  public upgrade(user: IUser, amount: number);
  public downgrade(user: IUser, amount: number);
  public getCurrentStatus(user: IUser);
  public getMethods(): IModuleOperationsType;
  public getModuleSubPages(): IModulePath[];
  public widget(): any;
  public getViews(): IModuleViewsType;
}

type ModuleViewPermissions = {
  name: EModules;
  views: Array<EModuleViews>;
  available?: number;
  indicator?: EIndicator;
};

type OperationViewPermissions = {
  name: EOperations;
  views: Array<EOperationViews>;
};

// add here before adding any module and method
type EModules =
  | "email-&-notifications"
  | "report-templates"
  | "tasks"
  | "uploader"
  | "website-contact-form"
  | "trainings"
  | "tools";

type EModuleViews =
  | "email-&-notifications"
  | "email-&-notifications.view"
  | "email-&-notifications.add"
  | "email-&-notifications.edit"
  | "report-templates"
  | "report-templates.add"
  | "report-templates.view"
  | "report-templates.edit"
  | "report-templates.assign"
  | "report-templates.track"
  | "report-templates.submission"
  | "incident-reports"
  | "vat-reports"
  | "inventory-management"
  | "tasks"
  | "tasks.add"
  | "tasks.edit"
  | "tasks.track"
  | "tasks.details"
  | "uploader"
  | "website-contact-form"
  | "website-contact-form.details"
  | "trainings"
  | "trainings.add"
  | "trainings.edit"
  | "trainings.assign"
  | "trainings.external"
  | "trainings.in-service"
  | "trainings.track"
  | "pool-calculator"
  | "gallery"
  | "documents";

type EOperations =
  | "manage-admin"
  | "manage-roles"
  | "password-change"
  | "dashboard"
  | "about-us"
  | "eula"
  | "faq"
  | "privacy-policy"
  | "payments"
  | "payment-logs"
  | "payment"
  | "client-admins"
  | "payment"
  | "update-email"
  | "profile"
  | "notifications"
  | "subscriptions"
  | "geo-locations"
  | "activity-logs"
  | "employees"
  | "announcement"
  | "inventory-management";

// views to register
type EOperationViews =
  | "manage-roles"
  | "manage-roles.add"
  | "manage-roles.edit"
  | "manage-roles.view"
  | "admin-manage-users"
  | "manage-users.add"
  | "manage-users.edit"
  | "manage-users.view"
  | "password-change"
  | "dashboard"
  | "about-us.edit"
  | "eula.edit"
  | "faq.edit"
  | "privacy-policy.edit"
  | "subscription.modification"
  | "subscription.my-subscription"
  | "subscription.add"
  | "subscription.edit"
  | "subscription.view"
  | "payment.subscription"
  | "client-admins"
  | "client-admins.add"
  | "client-admins.edit"
  | "client-admins.view"
  | "payment"
  | "payment-records.track"
  | "track.payments"
  | "payment.details"
  | "payment-logs"
  | "track.details"
  | "email.update"
  | "announcement.add"
  | "profile"
  | "notifications"
  | "geo-locations"
  | "geo-locations.add"
  | "geo-locations.edit"
  | "geo-locations.view"
  | "geo-locations.user-locations-listing"
  | "geo-locations.requests"
  | "geo-locations.users-live-location"
  | "point-of-interests-in-facilities"
  | "point-of-interests.add"
  | "subscriptions"
  | "employees"
  | "employees.add"
  | "employees.edit"
  | "employees.view"
  | "inventory-management"
  | "inventory-management.action"
  | "departments"
  | "departments.add"
  | "departments.view"
  | "departments.edit"
  | "departments.action"
  | "activity-logs"
  | "activity-logs.user"
  | "activity-logs.details";

// views to register

// methods to register
type EModuleMethods =
  | "tasks.hello_world"
  | "uploader.hello_world"
  | "website-contact-form.hello_world"
  | "email-&-notifications.hello_world"
  | "report-templates.hello_world"
  | "pool-calculator.hello_world";

type EOperationMethods =
  | "manage-admin.hello_world"
  | "manage-roles.hello_world"
  | "password.change.hello_world"
  | "dashboard.hello_world"
  | "about-us.hello_world"
  | "eula.hello_world"
  | "faq.hello_world"
  | "privacy-policy.hello_world"
  | "payments.hello_world"
  | "report-template.hello_world"
  | "payment.hello_world"
  | "client-admins.hello_world"
  | "update-email.hello_world"
  | "announcement.hello_world"
  | "notifications.hello_world"
  | "geo-locations.hello_world"
  | "profile.hello_world"
  | "subscriptions.hello_world"
  | "employees.hello_world"
  | "inventory-management.hello_world";

// methods to register

// add here before adding any module and method

type EPermissions = "Read" | "Write";

type IModuleView = {
  view: unknown;
  permissions: EPermissions[];
};

type IModuleViewsType = {
  [key in EModuleViews | EOperationViews]?: IModuleView;
};

type IModuleOperationsType = {
  [key in EOperationMethods | EModuleMethods]?: {
    generator: <T>(arg: Type) => Promise<T>;
    permissions: EPermissions[];
  };
};

// interface ModuleMethods{
//   [key:]:(params:T)=>Promise<T>;
// }

// Graphql Inputs And ENUMs
enum DiscountType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}
interface IPhoneInput {
  code: string;
  phoneNo: string;
}
interface IFindRelatingUsersResponse {
  name: string;
  role: string;
  action: {
    edit: boolean;
    view: boolean;
    delete: boolean;
  };
  active: string;
  createdOn: Date;
}
interface IManageRolesListingResponse {
  name: string;
  active: number;
  status: boolean;
  createdOn: Date;
  action: {
    edit: boolean;
    view: boolean;
    delete: boolean;
  };
}
interface IPageQuery {
  action: string | undefined;
  id: string;
}

interface ILoginInput {
  email: string;
  password: string;
  interface: any;
}

interface ILoginResponse {
  token: response;
  temporary_password: boolean;
  userType?: string;
}
interface IForgetPasswordInput {
  email: string;
}
interface IVerifyOtpInput {
  otp: number;
}

interface ITemporaryPasswordInput {
  email: string;
  temporary_password: boolean;
}

interface ISubAdminComapnyInput {
  email: string;
  company: ICompany;
}
interface IUserInput {
  _id?: any;
  first_name: string;
  last_name: string;
  email: string;
  rec_email?: string;
  photo_url?: string;
  phone?: IPhoneInput;
  active?: boolean;
  scopes?: string[];
  operations?: OperationViewPermissions[];
  modules?: ModuleViewPermissions[];
  package?: IPackage | string;
  admin?: boolean;
  role?: string;
  password: string;
  access?: FAQStatus;
}
interface IUpdateAdminUserInput {
  _id?: any;
  first_name?: string;
  last_name?: string;
  email?: string;
  rec_email?: string;
  photo_url?: string;
  phone?: IPhoneInput;
  active?: boolean;
  scopes?: string[];
  operations?: OperationViewPermissions[];
  modules?: ModuleViewPermissions[];
  package?: IPackage;
  admin?: boolean;
  role?: string | null;
  password?: string;
}
interface ISubAdminList {
  _id?: string;
  name: string;
  package: String;
  payment: Boolean;
  account: Boolean;
  action: {
    edit: boolean;
    view: boolean;
    delete: boolean;
  };
}

interface IEmployeeInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  employee_role: EmployeeType;
  department: string;

  photo_url?: string;
  phone?: IPhoneInput;
  access?: FAQStatus;
}

interface IUpdateSubAdminInput {
  _id?: any;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  type?: boolean;
  rec_email?: string;
  photo_url?: string;
  phone?: IPhoneInput;
  operations?: EOperations[];
  modules?: EModules[];
  package?: IPackage;
  access?: FAQStatus;
}

interface IChangePasswordBody {
  email: string;
  new_password: string;
  old_password: string;
}

interface IUpdateEmailBody {
  email: string;
  password: string;
  new_email: string;
}

interface PackageInput {
  title: string;
  modules: IFeatureTypeForSubscriptionPackage[];
  cost: number;
  compare_at: number;
  active: boolean;
  discount: number;
  discount_type: DiscountType;
  duration: number;
  description: string;
  number_of_users: number;
}

interface IAssignInput {
  id: string;
  assigner_id: string;
  assignTo: [string];
  scheduleType: string;
  dueDate: Date;
  priority: EPriority;
  assignBy: EAssignBy;
}

interface IAssignTrainingSessionInput {
  id: string;
  assigner_id: string;
  scheduleType: string;
  dueDate: Date;
  priority: EPriority;
  assignBy: EAssignBy;
  assignTo: string[];
  externalUsers: IUser[];
  facilityId: string;
}

interface IEmailAndNotification {
  _id: string;
  code: number;
  type: EEmailAndNotification;
  title: string;
  text: string;
  read: boolean;
  createdByRef: IUser | string;
  assignedUserRef?: IUser | string;
  priority: EPriority;
}

interface Notification {
  id: number;
  text: string;
  read: boolean;
}

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  status: FAQStatus;
}

interface FormPartsProps {
  values: CompleteProfileInputs;
  errors: FormikErrors<CompleteProfileInputs>;
  touched: FormikTouched<CompleteProfileInputs>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur?: (e: any) => void;

  setFieldValue?: any;
}
interface CompleteProfileInputs {
  user_id: string;
  step1: {
    profile_img: string;
    first_name: string;
    last_name: string;
  };
  step2: {
    park_logo: string;
    park_name: string;
  };
  step3: {
    country: string;
    city: string;
    state: string;
    address: string;
    facility: string;
    GPS: { lat: number; lng: number };
  };
}
interface AddGpsLocation {
  country: string;
  city: string;
  state: string;
  facility: string;
  address: string;
  GPS: { lat: number; lng: number };
}
interface UpdatePackageInput {
  _id?: string;
  title: string;
  modules: IFeatureTypeForSubscriptionPackage[];
  cost: number;
  compare_at: number;
  active: boolean;
  discount: number;
  discount_type: DiscountType;
}
interface IDepartmentInput {
  _id?: string;
  name: string;
  active: boolean;
  createdBy: string;
}

interface IDepartmentUpdateInput {
  _id?: string;
  name?: string;
  active?: boolean;
}

interface IFindDepartmentByClientId {
  _id: string;
  department: string;
  status: boolean;
  createdAt: boolean;
}

interface IRoleInput {
  _id?: string;
  name: string;
  active: boolean;
  operations: OperationViewPermissions[];
  modules: ModuleViewPermissions[];
  user_id: string;
}

interface IUpdateRoleInput {
  _id?: string;
  name?: string;
  active?: boolean;
  operations?: OperationViewPermissions[];
  modules?: ModuleViewPermissions[];
}

interface IParkInput {
  _id?: string;
  country: string;
  city: string;
  state: string;
  address: string;
  GPS: { lat: number; lng: number };
}

interface ILocationLists {
  _id: string;
  city: string;
  facility: string;
  country: string;
  parkName: string;
  createdOn: Date;
  status: boolean;
}

interface IGetUserTrainingSessionInput {
  userId: string;
}

//Email And Notification
interface IAddEmailAndNotificationInput {
  type: EEmailAndNotification;
  title: string;
  text: string;
  createdByRef: IUser | string;
}

// AddAnnouncement
interface IAddAnnouncementInput {
  title: string;
  description: string;
  expiryDate: Date | null;
}

interface IAssignEmailAndNotificationInput {
  id: string;
  assignTo: string[];
}

interface ITableFilters {
  dynamicObjectId?: string;
  Name?: string;
  Email?: string;
  Package?: string;
  active?: string;
  paid?: string;
  Role?: string;
  ParkName?: string;
  Intervals?: string;
  Task?: string;
  User?: string;
  Message?: string;
  OrganizationName?: string;
  EmailAndNotification?: string;
  Dates?: string;
  start?: Date;
  end?: Date;
  sortField?: String;
  sortOrder?: Int;
  status?: String;
  location?: ILiveLocation;
  reportType?: String;
}
interface IAssignedTaskFilters {
  status?: string;
  sort?: string;
}

interface IUpdateUserFieldsInput {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  rec_email?: string;
  photo_url?: string;
  phone?: IPhone;
  scopes?: string[];
  operations?: OperationViewPermissions[];
  package?: IPackage;
  modules?: ModuleViewPermissions[];
  role?: IRole;
  department?: string;

  company?: ICompany;
  password?: string;
  admin?: boolean;
  active?: boolean;
  themeId?: string;
  temporary_password?: boolean;
  created_by?: string;
  deviceToken?: string;
  liveLocation?: {
    lat: number;
    lng: number;
  };
}

// Notification & Email
interface ISendNotificationToManyInput {
  assignTo: string[];
  title: string;
  text: string;
  createdByRef: string;
  priority: EPriority;
}

// END GQL SERVICES

interface IResponseAPI {
  message: string;
  status: string;
  data: any;
}

type ISystemModules = {
  [key in EModules & EOperations & EOperationViews & EOperationMethods]: [
    module: GenericModule,
    views: IModuleViewsType,
    methods: IModuleMethods
  ];
};

type IOperationConfiguration = {
  id: EOperations;
  name: string;
  permissions: [EPermissions, EPermissions];
  require_approval?: boolean;
};
interface IAlertSuccessData {
  status: boolean;
  title: string;
  description: string;
}

interface IGenericType {
  status: Boolean;
  message: string;
  data: any;
}

abstract interface GenericOperation {
  static getConfiguration(): IOperationConfiguration;
  public getMethods(): IModuleOperationsType;
  public getViews(): IModuleViewsType;
}
