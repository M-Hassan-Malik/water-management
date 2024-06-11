/* eslint-disable */
import { EmployeeOperation } from "./operations";

export class EmployeesOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "employees",
    name: EmployeesOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "employees.hello_world": {
        generator: EmployeeOperation.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "employees": {
        view: import("./employees/main"),
        permissions: ["Read"],
      },
      "employees.add": {
        view: import("./employees/create"),
        permissions: ["Read", "Write"],
      },
      "employees.edit": {
        view: import("./employees/edit"),
        permissions: ["Read", "Write"],
      },
      "employees.view": {
        view: import("./employees/view"),
        permissions: ["Read", "Write"],
      },
      "departments": {
        view: import("./employees/departments/departments"),
        permissions: ["Read", "Write"],
      },
      "departments.edit": {
        view: import("./employees/departments/edit"),
        permissions: ["Read", "Write"],
      },
      "departments.add": {
        view: import("./employees/departments/add"),
        permissions: ["Read", "Write"],
      },
      "departments.view": {
        view: import("./employees/departments/view"),
        permissions: ["Read", "Write"],
      },
    };

    return views;
  }
}
