/* eslint-disable */
import { ReportTemplates } from "./operations";

export class ReportTemplate implements GenericModule {
  conf: IModuleConfiguration = {
    unit: "USAGE",
    id: "report-templates",
    name: ReportTemplate.name,
    permissions: ["Write", "Read"],
    require_approval: false,
    isRoute: true,
    widget: false,
  };

  getConfiguration(): IModuleConfiguration {
    return this.conf;
  }

  widget() {
    throw new Error("Method not implemented.");
  }

  upgrade(user: IUser, amount: number) {
    throw new Error("Method not implemented." + user + amount);
  }

  downgrade(user: IUser, amount: number) {
    throw new Error("Method not implemented." + user + amount);
  }

  getCurrentStatus(user: IUser) {
    throw new Error("Method not implemented." + user);
  }

  delete(user: IUser) {
    throw new Error("Method not implemented." + user);
  }

  intall(user: IUser, amount: number) {
    // check if user already have this installed use: getCurrentStatus(user)
    throw new Error("Method not implemented." + user + amount);
  }

  getModuleSubPages(): IModulePath[] {
    return [];
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "report-templates.hello_world": {
        generator: ReportTemplates.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "report-templates": {
        view: import("./main"),
        permissions: ["Read"],
      },
      "report-templates.add": {
        view: import("./create"),
        permissions: ["Read"],
      },
      "report-templates.view": {
        view: import("./view"),
        permissions: ["Read"],
      },
      "report-templates.edit": {
        view: import("./edit"),
        permissions: ["Read"],
      },
      "report-templates.assign": {
        view: import("./assign"),
        permissions: ["Read"],
      },
      "report-templates.track": {
        view: import("./track"),
        permissions: ["Read"],
      },
      "report-templates.submission": {
        view: import("./submission"),
        permissions: ["Read"],
      },
      "incident-reports": {
        view: import("./incident_reports"),
        permissions: ["Read"],
      },
      "vat-reports": {
        view: import("./vat_reports"),
        permissions: ["Read"],
      },
      "inventory-management": {
        view: import("./inventory_management"),
        permissions: ["Read"],
      },
    };
    return views;
  }
}
