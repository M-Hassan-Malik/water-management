/* eslint-disable class-methods-use-this */
import { ManageRolesOperations } from "./operations";

export class ManageRolesOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "manage-roles",
    name: ManageRolesOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "manage-roles.hello_world": {
        generator: ManageRolesOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };
    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "manage-roles": {
        view: import("./main"),
        permissions: ["Read", "Write"],
      },
      "manage-roles.add": {
        view: import("./add"),
        permissions: ["Read", "Write"],
      },
      "manage-roles.edit": {
        view: import("./edit"),
        permissions: ["Read", "Write"],
      },
      "manage-roles.view": {
        view: import("./view"),
        permissions: ["Read", "Write"],
      },
    };
    return views;
  }
}
