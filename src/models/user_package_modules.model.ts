/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "UserPackageModule";
const schema = new mongoose.Schema<IUserPackageModule>({
  name: {
    type: String,
    required: true
  },
  views: [
    {
      type: String
    }
  ],
  indicator: {
    type: String,
    enum: ["LIMITED", "LIMITLESS", ""],
  },
  available: {
    type: Number,
    default: 0,
  },
  used: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true
});

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<IUserPackageModule>;
