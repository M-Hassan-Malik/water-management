/* eslint-disable */
import { ProfileOperations } from "./operations";

export class ProfileOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "profile",
    name: ProfileOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "profile.hello_world": {
        generator: ProfileOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      profile: {
        view: import("./profile/main"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
