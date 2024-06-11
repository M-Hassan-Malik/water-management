import { ActivityLogDBService } from "./activity_log.service";
import { AuthService } from "./auth.service";
import { DashboardDBService } from "./dashboard";
import { DepartmentDBService } from "./department.service";
import { EmailAndNotificationDBService } from "./emailAndNotification.service";
import { EmployeeDBService } from "./employee.service";
import { MobileAlertDBService } from "./mobile/alert.service";
import { FAQDBService } from "./mobile/faq.service";
// Mobile Services
import { MobileReportSubmissionDBService } from "./mobile/reportAssign.service";
import { MobileTaskAssignedDBService } from "./mobile/taskAssign.service";
import { MobileTrainingSessionDBService } from "./mobile/trainingSession.service";
import { ModuleDBService } from "./module.service";
import { OperationDBService } from "./operations.service";
import { PackageDBService } from "./package.service";
import { ParkDBService } from "./park.service";
import { ParkLocationsDBService } from "./park_location.service";
import { PectoraDBService } from "./pectora.service";
import { PointOfInterestDBService } from "./point_of_attraction.service";
import { ReportTemplateDBService } from "./report_template.services";
import { ReportSubmissionDBService } from "./reportSubmission.service";
import { RoleDBService } from "./role.service";
import { StripeService } from "./stripe.service";
import { SubAdminPaymentDBService } from "./sub_admin_payment.service";
import { TaskDBService } from "./task.service";
import { TaskAssignedDBService } from "./taskAssign.service";
import { TickerDBService } from "./ticker.service";
import { TrainingDBService } from "./training.service";
import { TrainingSessionDBService } from "./training_session.service";
import { UserDBService } from "./user.service";
import { UserPackageDBService } from "./user_package.service";
import { VAT_DBService } from "./vat.service";

const Service = {
  auth: new AuthService(),
  dashboard: new DashboardDBService(),
  role: new RoleDBService(),
  park: new ParkDBService(),
  parkLocations: new ParkLocationsDBService(),
  user: new UserDBService(),
  module: new ModuleDBService(),
  package: new PackageDBService(),
  userPackage: new UserPackageDBService(),
  operation: new OperationDBService(),
  reportTemplate: new ReportTemplateDBService(),
  reportSubmission: new ReportSubmissionDBService(),
  subAdminPayment: new SubAdminPaymentDBService(),
  department: new DepartmentDBService(),
  employee: new EmployeeDBService(),
  activityLog: new ActivityLogDBService(),
  training: new TrainingDBService(),
  trainingSession: new TrainingSessionDBService(),
  tasks: new TaskDBService(),
  taskAssigned: new TaskAssignedDBService(),
  emailAndNotification: new EmailAndNotificationDBService(),
  ticker: new TickerDBService(),
  pointOfInterest: new PointOfInterestDBService(),
  VAT_DBService: new VAT_DBService(),
  pectora: new PectoraDBService(),
  // mobile Apis  ----------------------------------------------------------------
  mobileTaskAssigned: new MobileTaskAssignedDBService(),
  mobileTrainingSession: new MobileTrainingSessionDBService(),
  mobileReportSubmission: new MobileReportSubmissionDBService(),
  mobileAlertService: new MobileAlertDBService(),
  faqService: new FAQDBService(),
  // Third Party  ----------------------------------------------------------------
  stripeService: new StripeService(),
};

export default Service;
