/* eslint-disable */

import _ from "../../models/operation.model";

export class OperationDBService {
  create = async (payload: IOperation):Promise<IOperation> => {
    return await _.create(payload).catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IOperation>;
  };
  find = async () :Promise<IOperation[]>=> {
    return await _.find().catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IOperation[]>;
  };
}
