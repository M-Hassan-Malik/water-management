/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { TrainingOperations } from "./operations";

export class TrainingOperation implements GenericModule {
  conf: IModuleConfiguration = {
    unit: "USAGE",
    id: "trainings",
    name: TrainingOperation.name,
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
        generator: TrainingOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      trainings: {
        view: import("./main"),
        permissions: ["Read"],
      },
      "trainings.add": {
        view: import("./create"),
        permissions: ["Read", "Write"],
      },
      "trainings.edit": {
        view: import("./edit"),
        permissions: ["Read", "Write"],
      },
      "trainings.assign": {
        view: import("./assign"),
        permissions: ["Read", "Write"],
      },
      "trainings.external": {
        view: import("./external"),
        permissions: ["Read", "Write"],
      },
      "trainings.in-service": {
        view: import("./in_service"),
        permissions: ["Read", "Write"],
      },
      "trainings.track": {
        view: import("./track"),
        permissions: ["Read", "Write"],
      },
    };

    return views;
  }
}
