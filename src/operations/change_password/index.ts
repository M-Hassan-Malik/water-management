/* eslint-disable */
import { ChangePasswordOperations } from "./operations";

export class ChangePasswordOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "password-change",
    name: ChangePasswordOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "password.change.hello_world": {
        generator: ChangePasswordOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "password-change": {
        view: import("./main"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
