/* eslint-disable */
import { UpdateEmailOperations } from "./operations";

export class UpdateEmailOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "update-email",
    name: UpdateEmailOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "update-email.hello_world": {
        generator: UpdateEmailOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "email.update": {
        view: import("./main"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
