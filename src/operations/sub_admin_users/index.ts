import { SubAdminUsersOperations } from "./operations";

export class SubAdminUsersOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "client-admins",
    name: SubAdminUsersOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  // eslint-disable-next-line class-methods-use-this
  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "client-admins.hello_world": {
        generator: SubAdminUsersOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  // eslint-disable-next-line class-methods-use-this
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "client-admins": {
        view: import("./main"),
        permissions: ["Read"],
      },
      "client-admins.add": {
        view: import("./add"),
        permissions: ["Read", "Write"],
      },
      "client-admins.edit": {
        view: import("./edit"),
        permissions: ["Read", "Write"],
      },
      "client-admins.view": {
        view: import("./view"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
