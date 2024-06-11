/* eslint-disable */
import { UploaderOperations } from "./operations";

export class UploaderModule implements GenericModule {
  conf: IModuleConfiguration = {
    unit: "USAGE",
    id: "uploader",
    name: UploaderModule.name,
    permissions: ["Write", "Read"],
    require_approval: false,
    isRoute: true,
    widget: false,
  };

  getConfiguration(): IModuleConfiguration {
    return this.conf;
  }

  widget() {
    throw new Error("Method not implemented.");
  }

  upgrade(user: IUser, amount: number) {
    throw new Error("Method not implemented." + user + amount);
  }

  downgrade(user: IUser, amount: number) {
    throw new Error("Method not implemented." + user + amount);
  }

  getCurrentStatus(user: IUser) {
    throw new Error("Method not implemented." + user);
  }

  delete(user: IUser) {
    throw new Error("Method not implemented." + user);
  }

  intall(user: IUser, amount: number) {
    // check if user already have this installed use: getCurrentStatus(user)
    throw new Error("Method not implemented." + user + amount);
  }

  getModuleSubPages(): IModulePath[] {
    return [];
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "uploader.hello_world": {
        generator: UploaderOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      uploader: {
        view: import("./main"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
