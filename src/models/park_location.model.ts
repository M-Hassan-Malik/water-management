import type { Model } from "mongoose";
import mongoose from "mongoose";

export const schema = new mongoose.Schema<IParkLocation>(
  {
    facility: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    GPS: {
      type: { lat: Number, lng: Number },
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    additionalDetails: {
      type: {},
      required: false,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const MODEL = "ParkLocations";
export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<IParkLocation>;
