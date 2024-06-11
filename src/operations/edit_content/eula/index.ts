/* eslint-disable */
import { EulaOperations } from "./operations";

export class EulaOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "eula",
    name: EulaOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "eula.hello_world": {
        generator: EulaOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "eula.edit": {
        view: import("./edit"),
        permissions: ["Read"],
      },
  
    };

    return views;
  }
}
