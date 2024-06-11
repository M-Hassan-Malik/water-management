/* eslint-disable */
import _ from "../../models/point_of_interest.model";
import { ObjectId } from "mongoose";
import { PointOfInterest,PointOfInterestInput,UpdatePointOfInterestInput } from "../generated/graphql";

export class PointOfInterestDBService {

  add = async (payload: PointOfInterestInput): Promise<IGenericType> => {
    await _.create(payload)
      .catch((_) => {
        throw new Error(_.message);
      }) as unknown as PointOfInterest;

    return {
      status: true,
      data: null,
      message: 'Point of interest Added Successfully'
    };
  };

  update = async ({_id,...payload}: UpdatePointOfInterestInput): Promise<IGenericType> => {

    if(!Object.keys(payload)?.length) throw new Error('There is nothing to update.');


    const updated = await _.updateOne({_id}, payload, {upsert:false})

    if(!updated.matchedCount) throw new Error('Unable to find relevant facility')

  if(!updated.modifiedCount) throw new Error('Unable to update')


    return {
      status: true,
      message: 'Point of interest Updated',
      data: null,
    };
  };

  delete = async (_id: ObjectId): Promise<IGenericType> => {

    const deleted = await _.deleteOne({_id})
    if(!deleted.deletedCount) throw new Error('Failed to delete')

    return {
      status: true,
      message: 'Point of interest Successfully Remove',
      data: null,
    };
  };

  find = async (facilityId: ObjectId): Promise<[PointOfInterest]> => {
    const data  = await _.find({ belongsToFacilityRef: facilityId })
    .populate('belongsToFacilityRef')
      .catch((_) => {
        throw new Error(_.message);
      }) as unknown as [PointOfInterest];
      if(!data.length) 
      throw new Error('Unable to find Point of Interest');

    return data
  };

}
