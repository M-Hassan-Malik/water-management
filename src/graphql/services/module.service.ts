/* eslint-disable */
import _ from "../../models/user_package_modules.model";

export class ModuleDBService {
  create = (payload: IModule): Promise<any> => {
    return _.create(payload).catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IModule>;
  };
  find = async (): Promise<any> => {
    return _.find().catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IModule[]>;
  };
}
