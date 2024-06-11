/* eslint-disable */
import moment from "moment";
import _ from "../../models/ticker.model";
import userModel from "../../models/user.model";
import { PostTickerInput } from "../generated/graphql";

export class TickerDBService {
  post = async (payload: PostTickerInput): Promise<IGenericType> => {
    const user = await userModel.findOne({ _id: payload.postedBy })
      .catch(_ => {
        throw new Error(_.message)
      })
    if (!user) throw new Error("Unable to find user")
    else if (!user.active) throw new Error("Inactive User")

    const createPayload: PostTickerInput | { postBelongsTo: string } = {
      ...payload, postBelongsTo: ""
    }
    // is super admin
    if (user.admin || user?.company?.subAdmin)
      createPayload.postBelongsTo = user._id
    else if (user.belongsTo) // for (super and client)'s users
      createPayload.postBelongsTo = user.belongsTo

    const post = await _.updateOne({ postBelongsTo: createPayload.postBelongsTo }, createPayload, { upsert: true })
      .catch(_ => {
        throw new Error(_.message)
      })
    if (!post.upsertedCount && !post.modifiedCount) throw new Error("Unable to Post")

    return {
      data: null,
      message: "Announcement Posted",
      status: true
    }
  };

  get = async (): Promise<IGenericType> => {

    const post = await _.findOne({ expiration: { $gte: moment(moment().add(5, "hours").format("YYYY-MM-DDTHH:mm:ss.SSSZ")).toDate() } })
      .catch(_ => {
        throw new Error(_.message)
      })
    if (!post) throw new Error("Unable to find Post")

    return {
      data: post,
      message: "",
      status: true
    }
  };

}
