/* eslint-disable */
import { DashboardOperations } from './operations';

export class DashboardOperation implements GenericOperation {
  conf: IOperationConfiguration = {
    id: 'dashboard',
    name: DashboardOperation.name,
    permissions: ['Read', 'Write'],
    require_approval: false,
  };

  getConfiguration(): IOperationConfiguration {
    return this.conf;
  }

  getMethods(): IModuleOperationsType {
    const method: IModuleOperationsType = {
      'dashboard.hello_world': {
        generator: DashboardOperations.helloWorld,
        permissions: ['Read', 'Write'],
      },
    };

    return method;
  }

  // make sure to use import(path) for adding new view, so it only loads when required.
  getViews(): IModuleViewsType {
    const views: IModuleViewsType = {
      dashboard: {
        view: import('./main'),
        permissions: ['Read'],
      },
    };

    return views;
  }
}
