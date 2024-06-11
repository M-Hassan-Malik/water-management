/* eslint-disable */
import { FaqOperations } from "./operations";

export class FaqOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "faq",
    name: FaqOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "faq.hello_world": {
        generator: FaqOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "faq.edit": {
        view: import("./edit"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
