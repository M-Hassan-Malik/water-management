/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "LinkVAT";

let schema = new mongoose.Schema<ILinkVAT>(
  {
    assignedToFacilityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
      default: null,
    },
    trainingAssignedRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainingSession",
      default: null,
    },
    taskAssignedRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskAssigned",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<ILinkVAT>;
