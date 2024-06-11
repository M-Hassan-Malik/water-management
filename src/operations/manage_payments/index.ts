import { TrackSubadminPaymentRecordsOperations } from "./operations";

export class TrackSubadminPaymentRecordsOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "payment",
    name: TrackSubadminPaymentRecordsOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  // eslint-disable-next-line class-methods-use-this
  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "dashboard.hello_world": {
        generator: TrackSubadminPaymentRecordsOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  // eslint-disable-next-line class-methods-use-this
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "payment-records.track": {
        view: import("./main"),
        permissions: ["Read"],
      },
      "track.payments": {
        view: import("./payments"),
        permissions: ["Read"],
      },
      "payment.details": {
        view: import("./details"),
        permissions: ["Read"],
      },
      "payment-logs": {
        view: import("./payment_logs"),
        permissions: ["Read"],
      },
      "payment.subscription": {
        view: import("./payment"),
        permissions: ["Read"],
      },
    };

    return views;
  }
}
