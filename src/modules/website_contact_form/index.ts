/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable class-methods-use-this */

import { WebsiteContactFormOperations } from "./operations";

export class WebsiteContactFormOperation implements GenericModule {
  conf: IModuleConfiguration = {
    unit: "USAGE",
    id: "website-contact-form",
    name: WebsiteContactFormOperation.name,
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
      "website-contact-form.hello_world": {
        generator: WebsiteContactFormOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "website-contact-form": {
        view: import("./main"),
        permissions: ["Read"],
      },
      "website-contact-form.details": {
        view: import("./details"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
