/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { PoolCalculatorOperations } from "./operations";

export class Tools implements GenericModule {
  conf: IModuleConfiguration = {
    unit: "USAGE",
    id: "tools",
    name: Tools.name,
    permissions: ["Write", "Read"],
    require_approval: false,
    isRoute: true,
    widget: true,
  };

  getConfiguration(): IModuleConfiguration {
    return this.conf;
  }

  widget() {
    throw new Error("Method not implemented.");
  }

  upgrade(_user: IUser, _amount: number) {
    throw new Error("Method not implemented.");
  }

  downgrade(_user: IUser, _amount: number) {
    throw new Error("Method not implemented.");
  }

  getCurrentStatus(_user: IUser) {
    throw new Error("Method not implemented.");
  }

  delete(_user: IUser) {
    throw new Error("Method not implemented.");
  }

  intall(_user: IUser, _amount: number) {
    // check if user already have this installed use: getCurrentStatus(user)
    throw new Error("Method not implemented.");
  }

  getModuleSubPages(): IModulePath[] {
    return [];
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "pool-calculator.hello_world": {
        generator: PoolCalculatorOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "pool-calculator": {
        view: import("./pool_calculator"),
        permissions: ["Read"],
      },
      gallery: {
        view: import("./gallery"),
        permissions: ["Read"],
      },
      documents: {
        view: import("./documents"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
