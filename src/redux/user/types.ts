export enum EEmailAndNotification {
  NOTIFICATION = "NOTIFICATION",
  EMAIL = "EMAIL",
  NULL = "NULL",
}

export enum DiscountType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

export enum EmployeeType {
  SUBADMIN = "SUBADMIN",
  MANAGER = "MANAGER",
  LIFEGUARD = "LIFEGUARD",
  PECTORA = "PECTORA",
  IMPORTED = "IMPORTED",
}

export enum ESubscriptionStatus {
  SUBSCRIBED = "SUBSCRIBED",
  UPGRADE = "UPGRADE",
  DOWNGRADE = "DOWNGRADE",
}

export interface IStateUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  stripeCustomerId?: string;
  rec_email?: string;
  photo_url?: string;
  phone?: IPhone;
  scopes?: string[];
  operations?: IFeatureType[];
  package?: IPackage;
  company?: ICompany;
  modules?: IFeatureType[];
  role?: IRole;
  admin?: boolean;
  deviceToken?: string;
  active?: boolean;
  created_by?: string;
  belongsTo?: string;
  themeId?: string;
}

export interface IStorage {
  sizeInBytes: number;
  sizeInKB: number;
  sizeInMB: number;
  sizeInGB: number;
}

export interface IStateEmailAndNotification {
  _id?: string;
  code?: number;
  type?: EEmailAndNotification;
  title?: string;
  priority?: string;
  text?: string;
  read?: boolean;
  createdByRef?: IUser | string;
  assignedUserRef?: IUser | string;
}
