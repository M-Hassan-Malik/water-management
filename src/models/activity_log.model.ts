/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "ActivityLog";

export const activityLogSchema = new mongoose.Schema<IActivityLog>(
  {
    user_name: {
      type: String,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
    interface: {
      type: String,
      enum: ['WEB', 'MOBILE'],
      required: true
    },
    role: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    belongsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {timestamps: true},
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, activityLogSchema)) as Model<IActivityLog>;
