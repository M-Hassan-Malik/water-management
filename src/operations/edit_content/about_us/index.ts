/* eslint-disable */
import { AboutUsOperations } from "./operations";

export class AboutUsOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "about-us",
    name: AboutUsOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "about-us.hello_world": {
        generator: AboutUsOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "about-us.edit": {
        view: import("./edit"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
