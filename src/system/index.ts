/* eslint-disable */
// @ts-nocheck
import * as Modules from "../modules";
import * as Operations from "../operations";
import * as jwt from "jsonwebtoken";
import { EModule, EOperation } from "@/pages/api/graphql";

export class System implements GenericSystem {
  modules: ISystemModules;
  operations: ISystemModules;

  views: IModuleViewsType = {};
  methods: IModuleMethods = {};

  static instance: System = new System();

  public static getInstance(user: IUser | undefined): System {
    return this.instance.init(user);
  }

  init(user: IUser): GenericSystem {
    let _modules = [
      new Modules.TaskOperation(),
      new Modules.UploaderModule(),
      new Modules.ReportTemplate(),
      new Modules.WebsiteContactFormOperation(),
      new Modules.Email_and_NotificationsOperation(),
      new Modules.TrainingOperation(),
      new Modules.Tools(),
    ].filter((md) =>
      user.admin
        ? md
        : user?.company.subAdmin || user?.company.employeeType === "SUBADMIN"
        ? user.package.modules.filter((module) => {
            return module.name === md.getConfiguration().id;
          }).length > 0
        : user.modules?.filter((module) => {
            return module.name === md.getConfiguration().id;
          }).length > 0
    );

    let _operations = [
      new Operations.FaqOperation(),
      new Operations.EulaOperation(),
      new Operations.ProfileOperation(),
      new Operations.AboutUsOperation(),
      new Operations.DashboardOperation(),
      new Operations.EmployeesOperation(),
      new Operations.ManageUsersOperation(),
      new Operations.UpdateEmailOperation(),
      new Operations.GeoLocationOperation(),
      new Operations.ManageRolesOperation(),
      new Operations.AnnouncementOperation(),
      new Operations.NotificationOperation(),
      new Operations.SubscriptionOperation(),
      new Operations.ActivityLogsOperation(),
      new Operations.SubAdminUsersOperation(),
      new Operations.PrivacyPolicyOperation(),
      new Operations.ChangePasswordOperation(),
      new Operations.TrackSubadminPaymentRecordsOperation(),
    ].filter((op) => {
      return user.admin
        ? op
        : user.operations?.filter((operation) => {
            return operation.name === op.getConfiguration().id;
          }).length > 0;
    });

    _operations.forEach((_) => {
      const filteredViews = Object.fromEntries(
        Object.entries(_.getViews()).filter(([key, value]) => {
          return (
            user.operations.filter((operation) => {
              return (
                operation.name === _.getConfiguration().id &&
                operation.views.includes(key)
              );
            }).length > 0
          );
        })
      );
      const views = user.admin ? _.getViews() : filteredViews;
      this.operations = {
        ...this.operations,
        [_.getConfiguration().id]: {
          module: _,
          views: views,
          methods: _.getMethods(),
        },
      };

      this.views = { ...this.views, ...views };
      this.methods = { ...this.methods, ..._.getMethods() };
    });

    _modules.forEach((_) => {
      const filteredViews = Object.fromEntries(
        Object.entries(_.getViews()).filter(([key, value]) => {
          const modules = user?.company?.subAdmin || user?.company.employeeType === "SUBADMIN"
            ? user?.package?.modules
            : user.modules;
          return (
            modules.filter((module) => {
              return (
                module.name === _.getConfiguration().id &&
                module.views.includes(key)
              );
            }).length > 0
          );
        })
      );

      const views = user.admin ? _.getViews() : filteredViews;

      this.modules = {
        ...this.modules,
        [_.getConfiguration().id]: {
          module: _,
          views: views,
          methods: _.getMethods(),
        },
      };
      this.views = { ...this.views, ...views };
      this.methods = { ...this.methods, ..._.getMethods() };
    });

    return this;
  }

  // this will invoke method of a module
  invoke<T, P>(value: T): Promise<P> {
    throw new Error("Method not implemented.");
  }

  // this will invoke method of a operation
  call<T, P>(value: T): Promise<P> {
    throw new Error("Method not implemented.");
  }

  async getView(id: EModuleViews | EOperationViews) {
    if (this.views[id]) {
      return this.views[id]?.view;
    } else {
      return import("./not_available");
    }
  }
}
