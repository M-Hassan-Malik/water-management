import type { Model } from "mongoose";
import mongoose from "mongoose";

export const schema = new mongoose.Schema<IPark>(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    locations: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ParkLocations",
        },
      ],
      required: false,
      default: [],
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

const MODEL = "Parks";
export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<IPark>;
