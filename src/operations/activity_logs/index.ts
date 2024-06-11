import { ActivityLogsOperations } from "./operations";

export class ActivityLogsOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "activity-logs",
    name: ActivityLogsOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  // eslint-disable-next-line class-methods-use-this
  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "dashboard.hello_world": {
        generator: ActivityLogsOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  // eslint-disable-next-line class-methods-use-this
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "activity-logs": {
        view: import("./main"),
        permissions: ["Read"],
      },
      "activity-logs.user": {
        view: import("./user"),
        permissions: ["Read"],
      },
      "activity-logs.details": {
        view: import("./details"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
