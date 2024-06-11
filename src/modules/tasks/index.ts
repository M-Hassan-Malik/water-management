/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { TaskOperations } from "./operations";

export class TaskOperation implements GenericModule {
  conf: IModuleConfiguration = {
    unit: "USAGE",
    id: "tasks",
    name: TaskOperation.name,
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
      "tasks.hello_world": {
        generator: TaskOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      tasks: {
        view: import("./main"),
        permissions: ["Read"],
      },
      "tasks.add": {
        view: import("./add"),
        permissions: ["Read", "Write"],
      },
      "tasks.edit": {
        view: import("./edit"),
        permissions: ["Read", "Write"],
      },
      "tasks.track": {
        view: import("./track"),
        permissions: ["Read"],
      },
      "tasks.details": {
        view: import("./details"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
