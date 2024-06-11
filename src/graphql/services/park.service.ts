/* eslint-disable */
import { Types, startSession } from "mongoose";
import _ from "../../models/park.model";
import locationModel from "../../models/park_location.model";
import moment from "moment";

export class ParkDBService {
  create = async (payload: IParkInput): Promise<string> => {
    const id = payload._id;
    delete payload._id;

    const park = await _.findById(id) as unknown as Promise<IPark>;
    if (!park) throw new Error("Park not found")

    const session = await startSession();
    session.startTransaction();
    try {

      const location_id = new Types.ObjectId();

      // await _.updateOne({ _id: id }, { $push: { locations: location_id } }, { session: session })
      // .catch((e: any) => { throw new Error(e) })

      await _.updateOne(
        { _id: id }, 
        { 
          $push: { locations: location_id },
          $set: { updatedAt: moment().add(5, "hours").toDate() }
        },
        { session }
          ).catch(() => { throw new Error("Unable to request for Location") })

      await locationModel.create([{ ...payload, active: false, _id: location_id, createdAt : moment(moment().add(5, "hours").format('YYYY-MM-DDTHH:mm:ss.SSSZ')).toDate() }], { session: session })
      .catch((e:any) => { throw new Error(e) })

      await session.commitTransaction();

      return "Location Requested Successfully";
    } catch (error) {
      await session.abortTransaction();
      console.error(error)
      throw new Error('Something went wrong');
    } finally {
      session.endSession();
    }
  };



}
