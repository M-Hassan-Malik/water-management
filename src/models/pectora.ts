/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "PectoraAuths";

let schema = new mongoose.Schema<IPectora>(
  {
    facilityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
      required: true
    },
    parkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parks",
      required: true
    },
    X_Auth_Id: {
      type: String,
      required: true,
      default: "",
    },
    X_Auth_Token: {
      type: String,
      default: "",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<IPectora>;
