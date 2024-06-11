/* eslint-disable class-methods-use-this */
import { GeoLocationOperations } from "./operations";

export class GeoLocationOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: "geo-locations",
    name: GeoLocationOperation.name,
    permissions: ["Read", "Write"],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      "geo-locations.hello_world": {
        generator: GeoLocationOperations.helloWorld,
        permissions: ["Read", "Write"],
      },
    };
    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      "geo-locations": {
        view: import("./main"),
        permissions: ["Read", "Write"],
      },
      "geo-locations.add": {
        view: import("./add"),
        permissions: ["Read", "Write"],
      },
      "geo-locations.edit": {
        view: import("./edit"),
        permissions: ["Read", "Write"],
      },
      "geo-locations.view": {
        view: import("./view"),
        permissions: ["Read", "Write"],
      },
      "geo-locations.requests": {
        view: import("./requests"),
        permissions: ["Read", "Write"],
      },
      "geo-locations.user-locations-listing": {
        view: import("./my_location"),
        permissions: ["Read", "Write"],
      },
      "geo-locations.users-live-location": {
        view: import("./users_live_location"),
        permissions: ["Read", "Write"],
      },
    };
    return views;
  }
}
