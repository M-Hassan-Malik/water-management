/* eslint-disable */
import _ from "../../models/package.model";

export class PackageDBService {
  create = async (payload: PackageInput): Promise<IPackage> => {
    
    return await _.create({...payload, status: "SUBSCRIBED"}).catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IPackage>;
  };

  find = async (): Promise<IPackage[]> => {
    return await _.find().sort({  cost: -1 }).catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IPackage[]>;
  };

  findById = async (id: string): Promise<IPackage> => {
    return await _.findOne({ _id: id }).catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IPackage>;
  };

  update = async ({ _id, ...payload }: UpdatePackageInput): Promise<IPackage> => {
    return await _.findOneAndUpdate({ _id }, { $set: { ...payload } }).catch((_) => {
      throw new Error(_.message);
    }) as unknown as Promise<IPackage>
  };

  delete = async (id: string ):  Promise<string> => {
    const exists = _.findById({_id: id}).catch((_) => {
      throw new Error(_.message);
    })
    if(!exists)  throw new Error("Unable to find Package or Invalid Reference");
    const deleted = await _.deleteOne({_id: id}).catch((_) => {
      throw new Error(_.message);
    })
    if(!deleted.deletedCount) throw new Error("Unable to delete the Package");

    return "Package Successfully Deleted."
  };
}
