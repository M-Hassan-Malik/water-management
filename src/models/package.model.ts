import type { Model } from "mongoose";
import mongoose from "mongoose";

import { featureSchema } from "./features.model";

const MODEL = "Package";

const schema = new mongoose.Schema<IPackage>(
  {
    title: {
      type: String,
      required: true,
    },
    annual: {
      type: Boolean,
      required: true,
    },
    modules: [
      {
        type: featureSchema,
        default: [],
      },
    ],
    sizeInGB: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
    },
    compare_at: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
    discount: {
      type: Number,
    },
    discount_type: {
      type: String,
      enum: ["FIXED", "PERCENTAGE"],
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["SUBSCRIBED", "UPGRADE", "DOWNGRADE"],
      required: true,
    },
    number_of_users: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<IPackage>;
