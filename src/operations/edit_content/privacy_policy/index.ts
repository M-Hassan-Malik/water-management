/* eslint-disable */
import { PrivacyPolicyOperations } from "./operations";

export class PrivacyPolicyOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "privacy-policy",
    name: PrivacyPolicyOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "privacy-policy.hello_world": {
        generator: PrivacyPolicyOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "privacy-policy.edit": {
        view: import("./edit"),
        permissions: ["Read"],
      },
      // "payments.subscription": {
      //   view: import("./subscription_packages/main"),
      //   permissions: ["Read"],
      // },
    };

    return views;
  }
}
