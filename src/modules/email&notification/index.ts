/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { EmailAndNotificationsOperations } from "./operations";

export class EmailAndNotificationsOperation implements GenericModule {
  conf: IModuleConfiguration = {
    unit: "USAGE",
    id: "email-&-notifications",
    name: EmailAndNotificationsOperation.name,
    permissions: ["Write", "Read"],
    require_approval: false,
    isRoute: true,
    widget: true,
  };

  getConfiguration(): IModuleConfiguration {
    return this.conf;
  }

  widget() {
    throw new Error("Method not implemented.");
  }

  upgrade(_user: IUser, _amount: number) {
    throw new Error("Method not implemented.");
  }

  downgrade(_user: IUser, _amount: number) {
    throw new Error("Method not implemented.");
  }

  getCurrentStatus(_user: IUser) {
    throw new Error("Method not implemented.");
  }

  delete(_user: IUser) {
    throw new Error("Method not implemented.");
  }

  intall(_user: IUser, _amount: number) {
    // check if user already have this installed use: getCurrentStatus(user)
    throw new Error("Method not implemented.");
  }

  getModuleSubPages(): IModulePath[] {
    return [];
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "email-&-notifications.hello_world": {
        generator: EmailAndNotificationsOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "email-&-notifications": {
        view: import("./main"),
        permissions: ["Read"],
      },
      // "email-&-notifications.action": {
      //   view: import("./action"),
      //   permissions: ["Write", "Read"],
      // },
      "email-&-notifications.view": {
        view: import("./view"),
        permissions: ["Write", "Read"],
      },
      "email-&-notifications.add": {
        view: import("./add"),
        permissions: ["Write", "Read"],
      },
      "email-&-notifications.edit": {
        view: import("./edit"),
        permissions: ["Write", "Read"],
      },
    };

    return views;
  }
}
