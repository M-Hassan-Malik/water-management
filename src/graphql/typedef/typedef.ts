export const typeDefs = `
  #ENUMS---

  enum EUnits {
    Kilogram
    Pound
    }

  enum EPermission {
    Read
    Write
  }
  enum EIconType {
    Icon
    Source
  }

  enum EIndicator {
    LIMITLESS
    LIMITED
  }

  enum DiscountType {
    FIXED
    PERCENTAGE
  }
  enum ESubscriptionStatus {
    SUBSCRIBED
    UPGRADE
    DOWNGRADE
  }
  enum PackageType {
    CUSTOM
    FREEMIUM
    PREMIUM
  }
  
  enum PaymentStatus {
    PAID
    UNPAID
  }

  enum EmployeeType {
    SUBADMIN
    MANAGER
    LIFEGUARD
    PECTORA
    IMPORTED
  }

  enum EEmailAndNotificationType {
    NOTIFICATION
    EMAIL
    ALERT
    EMERGENCY
    NULL
  }

  enum Interface {
    WEB
    MOBILE
  }

  enum EScheduleType {
    ONE_TIME
    DAILY
    WEEKLY
    MONTHLY
    ALWAYS
  }

  enum ESubmissionStatus {
    PENDING
    UNASSIGNED
    COMPLETED
    FAILED
    INPROGRESS
    REVIEWING
  }

  enum EAssignBy {
    FACILITY
    USER
    ROLE
    EXTERNAL
  }

  enum EPriority {
    EMERGENCY
    ALERT
    STANDARD
    LOW
  }

  enum EReportType {
    INCIDENT
    INVENTORY
    STANDARD
    IN_SERVICE
    VAT
  }

  enum EAssignerComponentId {
    TASK
    REPORT
    TRAINING
    EMAIL_NOTIFICATION
    IN_SERVICE
  }

  enum EPointOfAttraction {
    UTILITY
    ATTRACTION
  }

  #Global Types---
  scalar Date
  scalar JSON
  scalar Upload

  type GeoLocation {
      type: String!
      coordinates: [Float!]
  }

  type File {
    id: Int
    name: String
    url: String
  }


 type genericResponseType {
    status: Boolean
    message: String
    data: JSON
  }



  type ActionType {
    edit: Boolean
    view: Boolean
    delete: Boolean
  }

  #Global Inputs----

 input GeoLocationInput {
    type: String!
    coordinates: [Float!]
}

  input AssignerComponentInput {
    componentId: EAssignerComponentId
    eventId: ID
  }

  input InputTableFilter { 
  Name: String
  Email: String
  Package: String
  active: String
  paid: String
  Role: String
  ParkName: String
  Intervals: String
  Task: String
  User: String 
  Message: String
  OrganizationName: String
  EmailAndNotification: String
  Dates: String
  start: Date
  end: Date
  status: String
  sortField: String
  sortOrder: Int
  reportType: String
  dynamicObjectId: String
 }

  input FacilityFilterInput { 
    _id: ID!
    moduleId: EAssignerComponentId!
  }

  input InputPhone {
    code: String!
    phoneNo: String!
  }

  input InputIcon {
    type: EIconType!
    src: String!
  }

  input IntModuleForCreatingPackage {
    name: String!
    views: [String!]!
    available: Int
    indicator: EIndicator
  }

  input IntModule {
    name: String!
    views: [String!]!
  }
  
  input IntOperation {
    name: String!
    views: [String!]!
  }

  
  #Auth---
  input InputUser {
    _id: ID
    first_name: String!
    last_name: String!
    email: String!
    rec_email: String
    photo_url: String
    phone: InputPhone
    active: Boolean
    scopes: [String]
    role: ID
    operations: [IntOperation]
    modules: [IntModule]
    password: String!
    access:FAQSTATUS!
  }

  input PaymentDetailsInput {
    method: String!
    amount: Float!
  }
  
  input InputSubAdmin {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    package: String
    photo_url: String
    phone: InputPhone!
    company: CompanyInput
    modules: [IntModule]
    type: Boolean
    operations: [IntOperation]
    paymentDetails: PaymentDetailsInput!
    createdBy: ID
    access:FAQSTATUS
  }

  input InputRegisterClient {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    package: String
    photo_url: String
    phone: InputPhone!
    modules: [IntModule]
    operations: [IntOperation]
    paymentDetails: PaymentDetailsInput!
  }
  
  input UpdateSubAdminInput {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String
    modules: [IntModule]
    operations: [IntOperation]
    phone: InputPhone!
    type: Boolean!
    access: FAQSTATUS
  }

  input CompanyInput {
    park: ID
    location: [ID]
    subAdmin: Boolean
    employee: Boolean
    employeeType: EmployeeType
  }

  input SubAdminOnboardInput {
    _id: ID!
    userData: UserDataInput!
    parkData: ParkDataInput!
    parkLocationData: ParkLocationDataInput!
  }
  
  input UserDataInput {
    first_name: String!
    last_name: String!
    profile_img: String
  }
  
  input ParkDataInput {
    name: String!
    park_logo: String
  }
  
  input ParkLocationDataInput {
    _id: ID
    country: String!
    facility: String!
    city: String!
    state: String!
    address: String!
    GPS: InputGPS!
  }
  
  input UpdateFacilityRequestInput {
    _id: ID!
    country: String!
    facility: String!
    city: String!
    state: String!
    address: String!
    GPS: InputGPS!
  }
  
  input InputGPS {
    lat: Float!
    lng: Float!
  }

  input InputPark {
    name: String!
    logo: String!
    address: String!
    city: String!
    state: String!
    GPS: InputGPS!
    country: String!
    additionalDetails: InputAdditionalDetails
  }

  input InputAdditionalDetails {
    name: String
  }

  type Company {
    _id: ID
    park: Park
    location: [ParkLocation]
    subAdmin: Boolean
    employeeType: EmployeeType
    employee: Boolean
  }

  #Park---

  type Park {
    _id: ID
    name: String
    logo: String
    locations: [ParkLocation]
    additionalDetails: AdditionalDetails
  }


  type UserLocationListing {
    _id: ID!
    parkName: String
    status: Boolean!
    userName: String!
    createdOn: Date!
  }

  type ParkLocation {
    _id: ID
    facility: String!
    address: String!
    city: String!
    state: String!
    GPS: GPS!
    country: String
    additionalDetails: AdditionalDetails
    active: Boolean
  }
  
  type GPS {
    lat: Float
    lng: Float
  }

  type AdditionalDetails {
    name: String
  }

  type LocationLists {
    _id: ID!
    city: String!
    facility: String!
    country: String!
    parkName: String!
    createdOn: Date!
    status: Boolean!
    action: ActionType!
  }


  input LoginInput {
    email: String!
    password: String!
    deviceToken: String
    interface: Interface
    rememberMe: Boolean
    access:FAQSTATUS
  }
  

  input ForgetPasswordInput {
    email: String!
  }

  input VerifyOTPInput {
    otp: Int!
  }

  input ResetPasswordInput {
    email: String!
    new_password: String!
    oldPassword: String
  }

  input ChangePasswordInput {
    email: String!
    new_password: String!
    old_password: String!
  }

  input UpdateEmailInput {
    email: String!
    new_email: String!
    password: String!
  }

  input TemporaryPasswordInput {
    email: String!
    temporary_password: Boolean!
  }

  input SubAdminCompanyInput {
    email: String!
    company: Boolean!
  }

  type Phone {
    phoneNo: String!
    code: String!
  }

  type Modules {
    name: String!
    views: [String!]!
    indicator: Int
    available: Int
  }

  type Operations {
    name: String!
    views: [String!]!
  }

  type LiveLocation {
    lat: Float!
    lng: Float!
  }

  input LiveLocationInput {
    lat: Float!
    lng: Float!
  }


  type User {
    _id: String!
    first_name: String!
    last_name: String!
    email: String!
    stripeCustomerId: String!
    rec_email: String!
    photo_url: String
    phone: Phone
    scopes: [String]
    package: UserPackages
    operations: [Operations]
    modules: [Modules]
    company: Company
    paymentDetail: PaymentDetail
    password: String!
    admin: Boolean!
    active: Boolean!
    role: Role
    department: String
    created_by: ID
    belongsTo: ID
    deviceToken: String
    themeId: String!
    liveLocation: LiveLocation!
    access:FAQSTATUS!
  }

  input UserInput {
    _id: String!
    first_name: String!
    last_name: String!
    email: String!
    stripeCustomerId: String!
    rec_email: String!
    photo_url: String
    phone: InputPhone
    scopes: [String]
    package: ID
    operations: [IntOperation!]!
    modules: [IntModule!]!
    company: CompanyInput
    password: String!
    admin: Boolean!
    active: Boolean!
    role: ID
    created_by: ID
    belongsTo: ID
    deviceToken: String
    themeId: String!
    temporary_password: Boolean
    liveLocation: LiveLocationInput!
    access:FAQSTATUS!
  }

  type FindRelatingUsersResponse {
    _id: ID
    name: String,
    email: String,
    role: String,
    createdOn: Date,
    status: Boolean,
    action: ActionType
  }  

  type SubAdminList {
    _id: ID
    name: String
    package: String
    payment: Boolean
    account: Boolean
    action: ActionType
  }

  
  input UpdateUserFieldsInput {
    _id: String!
    first_name: String
    last_name: String
    email: String
    rec_email: String
    photo_url: String
    scopes: [String]
    password: String
    admin: Boolean
    active: Boolean
    department: String
    themeId: String
    created_by: ID
    deviceToken: String
  }

  #Ticker----
  type Ticker { 
    _id: ID!
    title: String
    message: String
    postedBy: User
    expiration: Date
    postBelongsTo: User
    redirect: String
  }

  input PostTickerInput { 
    title: String!
    message: String!
    postedBy: String!
    expiration: Date!
    redirect: String
  }


  #Department----
  type Department { 
    _id: ID!
    name: String!
    active: Boolean!
    createdBy: ID!
  }

  type FindDepartmentsByOwnerId { 
    _id: ID
    department: String
    status: Boolean
    createdOn: Date
  }

  input DepartmentInput {
    createdBy: ID!
    name: String!
    active: Boolean!
  }

  input DepartmentUpdateInput {
    _id: ID
    name: String
    active: Boolean
  }

  #Dogs----
  type Dog {
    name: String!
  }

  #Operation---
  type Icon {
    _id: ID
    type: EIconType!
    src: String!
    }
    type Operation {
    _id: ID
    path: String!
    title: String!
    permissions: [EPermission!]!
    icon: Icon!
    }
    
    input InputOperation {
    path: String!
    title: String!
    permissions: [EPermission!]!
    icon: InputIcon!
    }
  
#User_Packages---
type PaymentDetail {
  method: String
  amount: Float
}

type UserPackages {
  _id: ID
  ref: User
  packageRef: Package
  title: String
  active: Boolean
  paid: Boolean
  modules: [Modules]
  cost: Float
  sizeInGB: Float
  duration: Float
  compare_at: Float
  discount: Float
  discount_type: DiscountType
  description: String
  number_of_users: Int
  status: ESubscriptionStatus
  createdAt: Date
  paymentDetail: PaymentDetail
}

#User Package---
input PackageInput {
  title: String!
  annual: Boolean!
  modules: [IntModuleForCreatingPackage]!
  duration: Int!
  cost: Float!
  sizeInGB: Float!
  compare_at: Float
  active: Boolean!
  discount: Float!
  discount_type: DiscountType!
  description: String!
  number_of_users: Int!
}

#Package---
input UserPackageModifyInput {
  _id: ID!
  user_id: ID!
  status: String!
  paymentDetails: PaymentDetailsInput!
  }

input UpdatePackageInput {
  _id: String!
  title: String!
  modules: [IntModuleForCreatingPackage]!
  duration: Int!
  cost: Float!
  sizeInGB: Float!
  compare_at: Float
  active: Boolean!
  discount: Float!
  discount_type: DiscountType!
  description: String!
  number_of_users: Int!
  }

type Package {
  _id: ID
  title: String!
  annual: Boolean!
  modules: [Modules]!
  cost: Float!
  sizeInGB: Float!
  duration: Int!
  compare_at: Float
  active: Boolean!
  discount: Float!
  discount_type: DiscountType!
  description: String!
  number_of_users: Int!
}

#Roles---
input RoleInput {
  _id: ID
  name: String!
  facility: String
  active: Boolean!
  operations: [IntOperation!]
  modules: [IntModule!]
  user_id: ID!
}
input RoleUpdateInput {
  _id: ID
  name: String
  facility: String
  active: Boolean
  operations: [IntOperation]
  modules: [IntModule]
}

type Role {
  _id: ID
  name: String!
  facility: String
  active: Boolean!
  user_id: ID!
  operations: [Operations]
  modules: [Modules]
}
type ManageRolesListingResponse {
  _id: ID
  name: String,
  createdOn: Date,
  activeUsers: Int
  status: Boolean,
  action: ActionType
}

  #ReportTemplate---

  input FormFieldInput {
    _id: String!
    type: String!
    label: String!
    placeholder: String
    options: [String] 
    value: String
    src: String
  }

  input ReportTemplateInput {
    name: String!
    type: String!
    facility: String
    status: Boolean!
    fields: [FormFieldInput!]!
    created_by: ID!
  }

  input UpdateReportTemplateInput {
    _id: ID!
    name: String!
    facility: String
    fields: [FormFieldInput!]!
    status: Boolean
    
    # Optional field for updating Universal Report Templates
    clientAdminRef: ID
    created_by: ID
    type: String
  }

  type FormFields {
    _id: String!
    type: String!
    label: String!
    placeholder: String
    value: String
    src: String
    options: [String!] 
  }

  type ReportTemplate {
    _id: ID
    name: String!
    facility: ParkLocation
    status: Boolean
    universalAccess: Boolean
    type: EReportType!
    fields: [FormFields!]!
    created_by: ID!
    createdAt: Date
    clientAdminRef: ID
  }

  type ReportSubmittedData {
    _id: String
    submitted_data: JSON!
    date: Date!
    status: ESubmissionStatus
  }

  type ReportSubmission {
    _id: ID!
    title: String!
    reportType: EReportType
    submissions: [ReportSubmittedData!]!
    belongs_to: ReportTemplate!
    scheduleType: EScheduleType!
    created_by: User!
    clientAdminRef: ID
    createdAt: Date!
    assignedTo: User
    assignedToFacilityRef: ParkLocation
  }

  # 
  type LoginResponse {
    token: String!
    temporary_password: Boolean
    userType: String
  }

  type TemporaryPasswordResponse {
      message: String!
      token: String!
  }

  #Training Session---

  
  
  type SessionFile {
    data: String!
    complete: Boolean!
  }

  type Session {
    _id: ID
    detail: String
    image: SessionFile
    video: SessionFile
  }

  type sessionSubmissions {
    _id:String
    date: String!
    session: [Session!]!
    status: ESubmissionStatus!
  }

  type Training {
    _id: ID!
    title: String!
    facility: ParkLocation!
    sessions: [Session!]!
    createdBy: User
    createdAt: Date
  }

  type TrainingSession {
    _id: ID
    title: String
    sessions: [sessionSubmissions!]
    trainingRef: Training
    userRef: User
    authority: User
    scheduleType: EScheduleType
    priority: EPriority
    status: ESubmissionStatus
    assignedToFacilityRef: ParkLocation
  }

  input AssignTrainingSessionInput {
    id: ID!
    assigner_id: ID!
    assignTo: [ID!]!
    assignBy: EAssignBy!
    scheduleType: EScheduleType!
    priority: EPriority!
    dueDate: Date
    facilityId: ID
    externalUsers: [UserInput!]
  }

  input AssignInServiceInput {
    id: ID!
    assigner_id: ID!
    assignTo: [ID!]!
    assignBy: EAssignBy!
    scheduleType: EScheduleType!
    priority: EPriority!
    dueDate: Date
    facilityId: ID
    externalUsers: [UserInput!]
  }

  
  input SessionFileInput {
  data: String!
  complete: Boolean
  } 

  input TrainingSessionInput {
    detail: String
    image: SessionFileInput
    video: SessionFileInput
  }

  input GetUserTrainingSessionInput {
  userId: ID!
  }

  input AddTrainingSessionInput {
    title: String!
    facility: String!
    createdBy: String!
    sessions: [TrainingSessionInput!]!
  }

  input UpdateTrainingInput {
    _id: ID!
    title: String!
    facility: String!
    sessions: [TrainingSessionInput!]!
  }

  
  input AssignInput {
    id: ID!
    assigner_id: ID!
    assignTo: [ID!]!
    assignBy: EAssignBy!
    scheduleType: EScheduleType!
    dueDate: Date
    priority: EPriority!
  }
  
#VAT---
input EvaluateVatInput {
  report_id: ID!
  submissions: [SubmitReportForMobileInput!]!
}

input AttachTaskToTrainingInput {
  trainingId: ID!
  VAT_id: ID!
  assignTo: ID!
  createdBy: ID!
  dueDate: Date!
  priority: EPriority!
}

type GetFailedVatResponse {
  _id: ID!
  taskAssignedRef: TaskAssigned!
  assignedToFacilityRef: ID
}

#SubAdminPaymentInfo---
  
  input SubAdminPaymentInput {
    user_id: ID!
    package_type: PackageType
    subscription_date: Date!
    last_payment_date: Date!
    next_payment_date: Date!
    current_status: PaymentStatus!
    amount: Int!
  }

  type SubAdminPayment {
    _id: ID
    user_id: User!
    package_type: PackageType
    subscription_date: Date!
    last_payment_date: Date!
    next_payment_date: Date!
    current_status: PaymentStatus!
    amount: Int!
  }

  input UpdateProfileInput {
    _id: ID!
    first_name: String
    last_name: String
    photo_url: String
    park: String
  }

  input EmployeeInput {
    last_name: String!
    first_name: String!
    package: ID
    createdBy: ID!
    email: String!
    password: String!
    location:  [ID]
    photo_url: String
    department: String!
    phone: InputPhone
    active: Boolean!
    employeeType: EmployeeType!
    operations: [IntOperation!]!
    modules: [IntModule!]!
    role: ID
    access:FAQSTATUS!
  }

  input UpdateEmployeeInput {
    _id: ID
    first_name: String
    last_name: String
    email: String
    password: String
    photo_url: String
    active: Boolean
    employeeType: EmployeeType
    operations: [IntOperation!]
    modules: [IntModule!]
    location: [ID]
    phone: InputPhone
    role: ID
    access:FAQSTATUS!
  }

  input ActivityLogInput {
    _id: ID
    user_name: String!
    role: String!
    interface: Interface!
    activity: String!
    dateTime: Date!
    belongsTo: ID
    user_id: ID!
  }

  type ActivityLog {
    _id: ID
    user_name: String!
    role: String!
    interface: Interface!
    activity: String!
    dateTime: Date!
    user_id: ID!
    belongsTo: ID
  }

  # Task
  input SubTaskInput {
    detail: String!
    completed: Boolean!
  }

  input TaskInput {
    title: String!
    detail: String!
    facility: String!
    media: [String]
    subtasks: [SubTaskInput!]
    createdBy: ID!
    clientAdminRef: ID
  }

  input TaskUpdateInput {
    _id: ID!
    title: String!
    facility: String
    detail: String!
    media: [String]
    subtasks: [SubTaskInput!]
  }

  type SubTask {
    detail: String!
    completed: Boolean!
  }

  type Task {
    _id: ID!
    title: String
    facility: String
    detail: String
    createdAt: Date
    media: [String]
    subtasks: [SubTask]
    createdBy: User
    clientAdminRef: User
  }

  type  TaskSubmission {
    _id: ID
    subtasks: [SubTask]
    media: [String]
    remarks: String
    voice: String
    date: Date
    status: ESubmissionStatus
  }

  type TaskAssigned {
    _id: ID
    title: String
    detail: String
    media: [String]
    submissions: [TaskSubmission]
    userId: User
    assignedToFacilityRef: ParkLocation
    createdBy_id: User
    clientAdminRef: User
    taskId: String
    deadline: Date
    priority:String
    createdAt:String
    scheduleType:EScheduleType
    type: String
  }

  type TaskAssignedUnwindSubmission {
    _id: ID
    title: String
    detail: String
    media: [String]
    submissions: [TaskSubmission]
    userId: User
    createdBy_id: User
    clientAdminRef: User
    taskId: String
    priority: EPriority
    deadline: Date
    assignedToFacilityRef: ParkLocation
    type: String
    scheduleType:EScheduleType
  }

  input GetClientSecretInput {
    amount: Int!
    customerId: String!
  }

  type ClientSecret {
    clientSecret: String
  }

#Email and Notification---
  type EmailAndNotification {
    _id: String
    code: Int
    type: EEmailAndNotificationType
    title: String
    text: String
    priority: EPriority
    read: Boolean
    createdByRef: User
    assignedUserRef: User
    createdAt: Date
  }

#When User is just saving these, as templates in DB
  input AddEmailAndNotificationInput {
    type: EEmailAndNotificationType
    title: String!
    text: String!
    createdByRef: String!
  }

  input EditEmailAndNotificationInput {
    _id: ID!
    title: String!
    text: String!
  }
  
  input AssignEmailAndNotificationInput {
    id: ID!
    assigner_id: ID!
    assignTo: [ID!]!
    priority: EPriority!
    assignBy: EAssignBy!
  }
  


  # Client Dashboard ===================
  
  
  type ClientDashboardStats {
    
    taskCompletedCount: Int
    taskPendingCount: Int
    
    trainingSessionCount: Int
    
    reportPendingCount: Int
    reportCompletedCount: Int

    usersCountAccordingFacility: Int
    
  }

  type IncidentReportClientDashboardStats {
    _id:Int
    dailyCounts: [Int]
  }
  
  
  input IncidentReportDashboardFilterInput {
    startDate: Date
    endDate: Date
    reportType: String!
  }
  
  
  # Super Admin Dashboard ===================


type SuperAdminDashboardStats {
  accountsCount:Int
  newClientsOfCurrentMonth:Int
  facilityCount:Int
  activeUsersCount:Int
  usersCountAccordingClientAdmin:Int
  usersCountBySubscription:Int

}

#FAQ Input

enum FAQSTATUS {
  MOBILE
  WEB
  BOTH
}

input FAQInput {
    question: String
    answer: String
    status: FAQSTATUS
}

  #Mobile Apis---

  type UserMobile {
    _id: String
    first_name: String
    last_name: String
    photo_url: String
  }

  type getAssignedTask {
    _id: String
    title: String
    detail: String
    createdAt: Date
    #status: String
    #user: [UserMobile]
    users:[UserMobile]
    createdBy: UserMobile
  }

  type ReportSubmissionForMobile {
    _id: String
    title: String
    facility: String
    submissions: ReportSubmittedData
    belongs_to: ReportTemplate!
    scheduleType: EScheduleType
    created_by: User!
    clientAdminRef: ID
    priority: EPriority
    createdAt: Date!
    assignedTo: User
    assignedToFacilityRef: ParkLocation
    type: String
  }

  input MobileUpdateReportSubmitInput {
    reportSubmitId: ID!
    submissionId: ID!
  }

  input SubmitReportForMobileInput {
    submitted_data: JSON!
    status: String
    date: Date
    _id: ID
  }

  input MobileUpdateSubTaskInput {
    taskId: ID!
    submissionId: ID!
  }
    
  input SubTaskForMobileInput {
    subTasks: [SubTaskInput!]!
    status: String
    remarks: String
    media: [String]
    voice: String
  }

  type TrainingSessionForMobile {
    _id:String
    title: String
    sessions: sessionSubmissions
    trainingRef: Training
    authority: User
    scheduleType: EScheduleType
    priority: EPriority
    status: ESubmissionStatus
    userRef: User
    assignedToFacilityRef: ParkLocation
    type:String
  }

  input MobileUpdateTrainingSessionInput {
    trainingSessionId: ID!
    sessionsId: ID!
    sessionId: ID
  }
    
  input TrainingSessionUpdateInputForMobile {
    session: [SessionForMobileInput!]
    status: String
  }


  input SessionFileForMobileInput {
    data: String!
    complete: Boolean!
  }

  input SessionForMobileInput {
    detail: String
    image: SessionFileForMobileInput
    video: SessionFileForMobileInput
    createdAt: Date
    updatedAt: Date
    _id:ID
  }

  type Alert {
    tasks:[TaskAssignedUnwindSubmission]
    reports: [ReportSubmissionForMobile],
    trainings: [TrainingSessionForMobile],
  }

  # Pectora
  type PectoraAuth {
    X_Auth_Id: ID!
    X_Auth_Token: ID!
  }

  input AddPectoraAuthInput {
    facilityId: ID! 
    X_Auth_Id: ID!
    X_Auth_Token: ID!
  }

  # Point of Interests
  
  type PointOfInterest {
    _id: ID!
    createdByRef: ID
    belongsToFacilityRef: ParkLocation
    type: EPointOfAttraction!
    name: String!
    points: [String]
  }

  input PointOfInterestInput {
    createdByRef: ID!
    belongsToFacilityRef: ID!
    type: EPointOfAttraction!
    name: String!
    points: [String]
  }

  input UpdatePointOfInterestInput {
    _id: ID!
    type: EPointOfAttraction
    name: String
    points: [String]
  }

#--------Query--------------

type Query {
    dogs: [Dog!]!

    getPost: genericResponseType!
    
    getEmployeeHomeScreenData(userId: ID!): String!

    operations: [Operation!]!
    users: [User!]!
    userById(id: String!): User
    findRelatingUsers(id: ID!, filter: InputTableFilter): [FindRelatingUsersResponse!]!
    findMyUsers(ownerId: ID!, facilityId: ID): [User!]!
    getSubAdminList(id: ID!, filter: InputTableFilter): [SubAdminList!]!
    
    findAllEmployees(createdById: ID!, filter: InputTableFilter): [User!]!
    findEmployeeById(id: ID!): User!
    
    findRole: [Role!]!
    findRoleById(id: ID!, filter: ID): Role!
    findRolesByUserId(id: ID!, facilityId: [ID]): [Role!]!
    manageRolesListing(userId: ID!, filter: InputTableFilter): [ManageRolesListingResponse!]!
    
    findAllPackages: [Package!]!
    findPackageById(PackageId: ID!): Package!

    trackClientAdmins(filter: InputTableFilter): [User!]!
    trackParticularClientRecord(userId: ID!): [UserPackages!]!
    getUserPackageModuleById(subscriptionId: ID!): UserPackages!

    requestedLocations(filter: InputTableFilter): [LocationLists]!
    userLocations(id: ID!, filter: InputTableFilter): [LocationLists]!
    getLocationById(id: ID!): ParkLocation!
    getUserParks(userId: ID!, filter: InputTableFilter): [UserLocationListing!]!
    getFacilities(userId: ID!, filter: FacilityFilterInput): [ParkLocation!]!

    findAllReportTemplates(createdById: ID , reportType: EReportType! ,filter: InputTableFilter): [ReportTemplate!]!
    findTemplateById(id: ID!): ReportTemplate!
    
    findUserReportSubmissionById(reportId: ID!): ReportSubmission!
    findAllReports(userId: ID!, filter: InputTableFilter): [ReportSubmission!]!
    
    findAllDepartments: [Department!]!
    findDepartmentsByOwnerId(clientAdminId: ID!, filter: InputTableFilter): [FindDepartmentsByOwnerId!]!
    findDepartmentById(departmentId: ID!): Department!

    findAllSubAdminPayments: [SubAdminPayment!]!
    findSubAdminPaymenteById(id: ID!): SubAdminPayment!

    findActivityLogByClientAdminId(belongsTo: ID!): [ActivityLog!]!
    findActivityLogByUserId(user_id: ID!): [ActivityLog!]!
    findActivityLogById(id: ID!): ActivityLog!
    
    getTrainingById(trainingId: ID!): Training!
    getMyTrainings(creatorId: ID!): [Training!]!
    getUserTrainingSession(getUserTrainingSessionInput: GetUserTrainingSessionInput!): [TrainingSession!]!
    getAssignedTrainingById(taskId: ID!): TrainingSession!

    findAllTasks(creatorId: ID!): [Task!]!
    trackAllTasks(creatorId: ID!, tableFilters: InputTableFilter): [TaskAssigned!]!
    findTaskById(id: ID!): Task!
    
    findAssignedTaskById(assignedTaskId: ID!): TaskAssigned!
    
    getClientSecret(input:GetClientSecretInput): ClientSecret!
    getClientSecretForSubscriber(amount: Float!): ClientSecret!
    
    getEmailAndNotificationByCreatorId(creatorId: ID!, filter: InputTableFilter): [EmailAndNotification!]!
    getEmailAndNotificationById(objectId: ID!): EmailAndNotification!
    getUserNotifications(userId: ID!): [EmailAndNotification!]!
    getUserNotificationsForMobile(userId: ID!, unread:Boolean): genericResponseType

    getClientDashboardStats(userId: ID!, facilityId: ID!): ClientDashboardStats
    getIncidentReportsForClientDashboardStats(userId:ID!, filter:IncidentReportDashboardFilterInput): [IncidentReportClientDashboardStats]
    
    
    getSuperAdminDashboardStats(clientAdminId:ID!, packageId: ID!): SuperAdminDashboardStats
    getAllClientAdmins: [User]
    getAllSubscriptions: [Package]
    getAllParks: [Park]
    

    # Point Of Interest
    getPointsOfInterest(facilityId: ID!): [PointOfInterest!]!

    getFailedVAT(facilityId: ID!): [GetFailedVatResponse!]!


    #Mobile Queries --------------------------------------------------------------------------------
    getAssignedTasksById(userId: ID!, filter:InputTableFilter): [TaskAssigned!]!
    getTrainingsById(userId: ID!, filter:InputTableFilter): [TrainingSessionForMobile]!
    getReportSubmissionById(empId: ID, filter: InputTableFilter) : [ReportSubmissionForMobile]
    getAlertsForMobile(userId: ID!, filter: InputTableFilter) : Alert
    trackMyTask(creatorId:ID!, filter:InputTableFilter):[TaskAssigned!]!
    trackMyReports(assignedTo:ID!):[ReportSubmissionForMobile]
    getFAQS(status: String): genericResponseType!

    # Pectora
    getPectoraAuth(facilityId: ID!): PectoraAuth!
    getPectoraAndAppUsers(facilityId: ID!): [String!]!


  }
#----------Mutation------------
  type Mutation {
    addUserAdmin(signupInput: InputUser!): User
    updateAdminUser(updateAdminUserInput: InputUser!): String!
    createSuperAdmin(createSuperAdminInput: InputUser!): User
    createSubAdmin(createSubAdminInput: InputSubAdmin!): String!
    registerClient(registerClientInput: InputRegisterClient!): String!
    activateSubAdminAfterSubscription(user_id: ID!): String!
    updateSubAdmin(updateSubAdminInput: UpdateSubAdminInput!): String!
    deleteAdminUser(id: ID!): String!
    updateUserFields(updateUserFieldsInput: UpdateUserFieldsInput!): String!
    
    login(loginInput: LoginInput!): LoginResponse!
    forgetPassword(forgetPasswordInput: ForgetPasswordInput!): String
    verifyOtp(verifyOtpInput: VerifyOTPInput!): String
    resetPassword(resetPasswordInput: ResetPasswordInput!): String
    changePassword(changePasswordInput: ChangePasswordInput!): String
    updateTemporaryPassword(temporaryPasswordInput: TemporaryPasswordInput!): TemporaryPasswordResponse!
    onboardSubAdmin(subAdminOnboardInput: SubAdminOnboardInput!): String
    updateProfile(updateProfileInput: UpdateProfileInput!): String
    updateEmail(updateEmailInput: UpdateEmailInput!): String

    addOperation(input: InputOperation!): Operation
    
    createEmployee(employeeInput: EmployeeInput!, company: CompanyInput): String!
    updateEmployee(updateEmployeeInput: UpdateEmployeeInput!): User!
    deleteEmployee(employeeId: ID!): String!
    
    addPackage(packageInput: PackageInput!): Package!
    updatePackage(updatePackageInput: UpdatePackageInput!): Package!
    deleteSubscriptionPackage(id: ID!): String!
    
    addDepartment(departmentInput: DepartmentInput!): String!
    updateDepartment(departmentUpdateInput: DepartmentUpdateInput!): String!
    deleteDepartment(departmentId: ID!): String!

    addRole(roleInput: RoleInput!): Role
    updateRole(roleUpdateInput: RoleUpdateInput!): String
    deleteRole(id: ID!): String!

    addReportTemplate(reportTemplateInput: ReportTemplateInput!): genericResponseType!
    updateReportTemplate(updateReportTemplateInput: UpdateReportTemplateInput!): ReportTemplate!
    deleteReportTemplate(templateId: ID!): genericResponseType!
    pickFacilityReport(assignedReportId: ID!,pickerId: ID!): genericResponseType!
    assignReportTemplate(assignReportTemplateInput: AssignInput!): String!
    evaluateVAT(evaluateVatInput: EvaluateVatInput!): String!
    attachTaskToTraining(attachTaskToTrainingInput: AttachTaskToTrainingInput!): String!
    mobileUpdateReportSubmission( filter: MobileUpdateReportSubmitInput, data: SubmitReportForMobileInput): String
     
    acceptLocationRequest(id: ID!): String!
    
    # Pectora
    addPectoraAuth(addPectoraAuthInput: AddPectoraAuthInput!): String!
     
    addAnotherLocation(parkLocationDataInput: ParkLocationDataInput!): String!
    updateFacilityRequest(updateFacilityRequestInput: UpdateFacilityRequestInput!): genericResponseType!

    addSubAdminPayment(subAdminInput: SubAdminPaymentInput!): SubAdminPayment!

    createActivityLog(activityLogInput: ActivityLogInput!): ActivityLog!

    addTrainingSession(addTrainingSessionInput: AddTrainingSessionInput!): genericResponseType!
    updateTraining(updateTrainingInput: UpdateTrainingInput!): genericResponseType!
    deleteTraining(trainingTemplateId: ID!): genericResponseType!
    assignTrainingSession(assignTrainingSessionInput: AssignTrainingSessionInput!): String!
    assignInService(assignInServiceInput: AssignInServiceInput!): String!
    mobileUpdateAssignedTrainingSessions(filter:MobileUpdateTrainingSessionInput, data:TrainingSessionUpdateInputForMobile ): String!
    
    createTask(taskInput: TaskInput!): genericResponseType!
    updateTask(taskInput: TaskUpdateInput!): genericResponseType!
    deleteTask(taskId: ID!): String
    deleteAssignedTask(taskId: ID!): String
    assignTask(taskAssignInput: AssignInput!): genericResponseType!
    approveSubmission(submissionId: ID!,taskId: ID!, approverId: ID!): genericResponseType!
    pickFacilityTask(taskId: ID!,pickerId: ID!): genericResponseType!
    
    addEmailAndNotification(emailAndNotificationInput: AddEmailAndNotificationInput!): genericResponseType!
    editEmailAndNotification(emailAndNotificationInput: EditEmailAndNotificationInput!): String!
    assignEmailAndNotification(assignEmailAndNotificationInput: AssignEmailAndNotificationInput!): String!
    markAsRead(objectId: ID!): String
    fileUpload(file:Upload):String
    deleteEmailAndNotification(notifId:ID!): String
    approveReportSubmission(submissionId: ID!,assignedReportId: ID!, approverId: ID!): genericResponseType!

    modifyPackage(userPackageModifyInput: UserPackageModifyInput!): String!

    postTicker(postTickerInput: PostTickerInput!): genericResponseType!
    addFaq(faqInput: FAQInput): genericResponseType!
    updateFAQ(id: ID!, faqInput: FAQInput): genericResponseType!
    deleteFAQ(id: ID!): genericResponseType!

    # Point Of Interest
    addPointOffInterest(pointOfInterestInput: PointOfInterestInput!): genericResponseType!
    updatePointOffInterest(updatePointOfInterestInput: UpdatePointOfInterestInput!): genericResponseType!
    deletePointOffInterest(_id: ID!): genericResponseType!
    
    # Mobile Mutations
    mobileUpdateSubTask(filter: MobileUpdateSubTaskInput, data: SubTaskForMobileInput): String
    # mobileUpdateSubTask(filter:mobileUpdateSubTask,  data:subTaskForMobile):TaskAssignedUnwindSubmission
    
    # Stripe
    createStripeCustomer(email: String!): genericResponseType!
    
  }
`;
