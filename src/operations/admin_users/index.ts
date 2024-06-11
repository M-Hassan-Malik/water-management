/* eslint-disable class-methods-use-this */

import { ManageUsersOperations } from "./operations";

export class ManageUsersOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "manage-admin",
    name: ManageUsersOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "manage-admin.hello_world": {
        generator: ManageUsersOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "admin-manage-users": {
        view: import("./manage_users/main"),
        permissions: ["Read", "Write"],
      },
      "manage-users.add": {
        view: import("./manage_users/add"),
        permissions: ["Read", "Write"],
      },
      "manage-users.edit": {
        view: import("./manage_users/edit"),
        permissions: ["Read", "Write"],
      },
      "manage-users.view": {
        view: import("./manage_users/view"),
        permissions: ["Read", "Write"],
      },
    };

    return views;
  }
}
