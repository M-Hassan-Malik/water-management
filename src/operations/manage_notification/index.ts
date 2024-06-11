/* eslint-disable */
import { NotificationOperations } from "./operations";

export class NotificationOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "notifications",
    name: NotificationOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "notifications.hello_world": {
        generator: NotificationOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      notifications: {
        view: import("./notification/main"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
