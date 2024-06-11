/* eslint-disable class-methods-use-this */
import { AnnouncementOperations } from "./operations";

export class AnnouncementOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "announcement",
    name: AnnouncementOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "announcement.hello_world": {
        generator: AnnouncementOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };
    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      // "announcement": {
      //   view: import("./main"),
      //   permissions: ["Read", "Write"],
      // },
      "announcement.add": {
        view: import("./add"),
        permissions: ["Read", "Write"],
      },
    };
    return views;
  }
}
