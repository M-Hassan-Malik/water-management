/* eslint-disable */
import _ from "../../models/park_location.model";
import userModel from "../../models/user.model";
import taskModel from "../../models/task.model";
import trainingModel from "../../models/training.model";
import reportModel from "../../models/report_template.model";
import facilityModel from "../../models/park_location.model";
import { ObjectId, Types } from "mongoose";
import { FacilityFilterInput, EAssignerComponentId, UpdateFacilityRequestInput } from "../generated/graphql";

export class ParkLocationsDBService {

  userLocations = async (userId: ObjectId, filter: ITableFilters): Promise<ILocationLists[]> => {
    let matchObj: any = {};
    // Trying to filter
    if (filter) {
      // Filter: Package & no Name with no dates
      if (filter?.ParkName) {
        matchObj = {
          "park.name": { $regex: filter.ParkName, $options: "i" },
        };
      }
      if (filter?.Name) {
        matchObj = {
          ...matchObj,
          $or: [
            { first_name: { $regex:  filter?.Name, $options: "i" } },
            { last_name: { $regex:  filter?.Name, $options: "i" } },
          ],
        };
      }
      if (filter?.start && !filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $gte: new Date(filter.start) },
        };
      }
      if (!filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $lte: new Date(filter.end) },
        };
      }
      if (filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          $and: [
            { createdAt: { $gte: new Date(filter.start) } },
            { createdAt: { $lte: new Date(filter.end) } }
          ]
        };
      }
    }

    matchObj = {
      ...matchObj,
      _id: new Types.ObjectId(String(userId))
    }

    const location = await userModel.aggregate([
      {
        $match: matchObj
      },
      {
        $lookup: {
          from: 'parks',
          localField: 'company.park',
          foreignField: '_id',
          as: 'park'
        }
      },
      {
        $unwind: { path: '$park', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'parklocations',
          localField: 'park.locations',
          foreignField: '_id',
          as: 'locations'
        }
      },
      {
        $unwind: { path: '$locations', preserveNullAndEmptyArrays: true }
      },
      {
        $project: {
          _id: '$locations._id',
          parkName: '$park.name',
          city: '$locations.city',
          facility: '$locations.facility',
          country: '$locations.country',
          status: '$locations.active',
          createdOn: '$park.createdAt',
          action: {
            $literal: {
              view: true,
            }
          }
        }
      }
    ]) as unknown as ILocationLists[]
    if (!location.length) []

    return location
  };

  requestedLocations = async (filter: ITableFilters): Promise<ILocationLists[]> => {

    let matchObj: any = {};
    // Trying to filter
    if (filter) {
      // Filter: Package & no Name with no dates
      if (filter?.ParkName) {
        matchObj = {
          "park.name": { $regex:  filter.ParkName, $options: "i" },
        };
      }
      if (filter?.Name) {
        matchObj = {
          ...matchObj,
          $or: [
            { first_name: { $regex:  filter?.Name, $options: "i" } },
            { last_name: { $regex:  filter?.Name, $options: "i" } },
          ],
        };
      }
      if (filter?.start && !filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $gte: new Date(filter.start) },
        };
      }
      if (!filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $lte: new Date(filter.end) },
        };
      }
      if (filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          $and: [
            { createdAt: { $gte: new Date(filter.start) } },
            { createdAt: { $lte: new Date(filter.end) } }
          ]
        };
      }
    }

    matchObj = {
      ...matchObj,
      active: false
    }

    const location = await _.aggregate([
      {
        $lookup: {
          from: 'parks',
          localField: '_id',
          foreignField: 'locations',
          as: 'park'
        }
      },
      {
        $unwind: { path: '$park', preserveNullAndEmptyArrays: true }
      },
      {
        $match: matchObj
      },
      {
        $project: {
          _id: '$_id',
          parkName: '$park.name',
          city: '$city',
          facility: '$facility',
          country: '$country',
          status: '$active',
          createdOn: '$createdAt',
          action: {
            $literal: {
              view: true,
            }
          }
        }
      }
    ]) as unknown as ILocationLists[]
    if (!location.length) throw new Error("No Requests to be found!");

    return location
  };

  getLocationById = async (id: ObjectId): Promise<IParkLocation> => {

    const location = await _.findById(id).catch(() => { throw new Error("Unable to load chosen location") })

    if (!location) throw new Error("Chosen location do not seems to be exists!");

    return location;
  };

  acceptLocationRequest = async (id: ObjectId): Promise<string> => {

    const approved = await _.findOne({ _id: id, active: true }).catch(() => { throw new Error("Unable to accept request") })
    if (approved) throw new Error("Location is already approved")

    const updated = await _.updateOne({ _id: id },
      { active: true }
    ).catch(() => { throw new Error("Unable to accept request") })

    if (!updated.matchedCount) throw new Error("Chosen location do not seems to be exists!");
    if (!updated.modifiedCount) throw new Error("Unable to modify Chosen location.");

    return "Successfully Updated!";
  };

  getUserParks = async (id: string, filter: ITableFilters): Promise<IUserLocationListing[]> => {

    let data: IUserLocationListing[] = []
    const user = await userModel.findOne({ _id: id })
      .catch(() => {
        throw new Error("Unable to find user")
      })
    if (!user) throw new Error("Unable to find user")

    let matchObj: any = {};
    // Trying to filter
    if (filter) {
      // Filter: Package & no Name with no dates
      if (filter?.ParkName) {
        matchObj = {
          "park.name": { $regex:  filter.ParkName, $options: "i" },
        };
      }
      if (filter?.Name) {
        matchObj = {
          ...matchObj,
          $or: [
            { first_name: { $regex:  filter?.Name, $options: "i" } },
            { last_name: { $regex:  filter?.Name, $options: "i" } },
          ],
        };
      }
      if (filter?.start && !filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $gte: new Date(filter.start) },
        };
      }
      if (!filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          createdAt: { $lte: new Date(filter.end) },
        };
      }
      if (filter?.start && filter?.end) {
        matchObj = {
          ...matchObj,
          $and: [
            { createdAt: { $gte: new Date(filter.start) } },
            { createdAt: { $lte: new Date(filter.end) } }
          ]
        };
      }
    }

    if (user.admin || !user?.company?._id) {
      matchObj = {
        ...matchObj,
        "company.park": { $exists: true }, "company.employee": false
      }

      data = await userModel.aggregate([
        {
          $lookup: {
            from: "parks",
            localField: "company.park",
            foreignField: '_id',
            as: "park",
          }
        },
        {
          $unwind: { path: '$park', preserveNullAndEmptyArrays: true }
        },
        {
          $match: matchObj
        },
        {
          $project: {
            _id: "$_id",
            userName: { $concat: ["$first_name", " ", "$last_name"] },
            parkName: "$park.name",
            createdOn: "$createdAt",
            status: "$active",
          }
        }
      ]) as unknown as IUserLocationListing[];
    } else {

      matchObj = {
        ...matchObj,
        _id: new Types.ObjectId(id), "company.employee": true
      }

      data = await userModel.aggregate([
        {
          $lookup: {
            from: "parks",
            localField: "company.park",
            foreignField: '_id',
            as: "park",
          }
        },
        {
          $unwind: { path: '$park', preserveNullAndEmptyArrays: true }
        },
        {
          $match: matchObj
        },
        {
          $project: {
            _id: "$_id",
            userName: { $concat: ["$first_name", " ", "$last_name"] },
            parkName: "$park.name",
            createdOn: "$createdAt",
            status: "$active",
          }
        }
      ]) as unknown as IUserLocationListing[];
    }
    if (!data.length) []
    return data
  }

  getFacilities = async (userId: ObjectId, filter?: FacilityFilterInput): Promise<IParkLocation[]> => {

    let desiredFacility: any = undefined;
    switch (filter?.moduleId) {

      case EAssignerComponentId.Task:

        desiredFacility = await taskModel.findOne({ _id: filter._id }, { facility: 1, _id: 0 })
          .catch((_: any) => {
            throw new Error(_.message)
          })
          
        if (desiredFacility) desiredFacility = desiredFacility.facility;
        break;

      case EAssignerComponentId.Training:

        desiredFacility = await trainingModel.findOne({ _id: filter._id }, { facility: 1, _id: 0 })
          .catch((_: any) => {
            throw new Error(_.message)
          })

        if (desiredFacility) desiredFacility = desiredFacility.facility;
        break;

      case EAssignerComponentId.Report:

        desiredFacility = await reportModel.findOne({ _id: filter._id }, { facility: 1, _id: 0 })
          .catch((_: any) => {
            throw new Error(_.message)
          })
        if (desiredFacility) desiredFacility = desiredFacility.facility;
        break;

      default:
        break;
    }

    if (desiredFacility) {
    
      const result = await facilityModel.find({ _id: desiredFacility })
      .catch((_: any) => {
        throw new Error(_.message)
      })

      if (result.length)
        return result

    } else {
      
      const result = await userModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(String(userId))
          }
        },
        {
          $lookup: {
            from: "parks",
            localField: "company.park",
            foreignField: '_id',
            as: "company.park",
          }
        },
        {
          $unwind: { path: '$park', preserveNullAndEmptyArrays: true }
        },
        {
          $lookup: {
            from: "parklocations",
            localField: "company.park.locations",
            foreignField: '_id',
            as: "locations",
          }
        },
        {
          $project: {
            _id: 0,
            locations: 1
          }
        }
      ])
        .catch((_: any) => {
          throw new Error(_.message)
        })

      if (result.length)
        return result[0].locations
    }

    return []
  }

  updateFacilityRequest = async ({ _id, ...updateFacilityRequestInput }: UpdateFacilityRequestInput): Promise<IGenericType> => {

    const update = await _.updateOne({ _id }, updateFacilityRequestInput, { upsert: false })
      .catch(_ => {
        throw new Error(_.message)
      })

    if (!update.matchedCount) throw new Error("Unable to find matching reference")
    if (!update.modifiedCount) throw new Error("Unable to modify Facility")


    return {
      status: true,
      message: "Facility Updated Successfully",
      data: null,
    }

  }




};
