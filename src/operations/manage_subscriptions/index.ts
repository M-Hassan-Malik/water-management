/* eslint-disable */
import { SubscriptionOperations } from "./operations";

export class SubscriptionOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "subscriptions",
    name: SubscriptionOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "subscriptions.hello_world": {
        generator: SubscriptionOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "subscriptions": {
        view: import("./subscription_packages/main"),
        permissions: ["Read"],
      },
      "subscription.add": {
        view: import("./subscription_packages/create"),
        permissions: ["Read", "Write"],
      },
      "subscription.edit": {
        view: import("./subscription_packages/edit"),
        permissions: ["Read", "Write"],
      },
      "subscription.view": {
        view: import("./subscription_packages/view"),
        permissions: ["Read", "Write"],
      },
      "subscription.modification": {
        view: import("./subscription_packages/modification"),
        permissions: ["Read", "Write"],
      },
      "subscription.my-subscription": {
        view: import("./subscription_packages/my_subscription"),
        permissions: ["Read", "Write"],
      },
    };

    return views;
  }
}
