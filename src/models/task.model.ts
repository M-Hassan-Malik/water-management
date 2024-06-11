/* eslint-disable */


import type { Model } from "mongoose";
import mongoose from "mongoose";
import { subTaskSchema } from "./task_assigned.model";

const MODEL = "Tasks";

let schema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
      required: true,
    },
    subtasks: [
      {
        type: subTaskSchema
      }
    ],
    detail: {
      type: String,
      required: true,
    },
    media: {
      type: [String],
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientAdminRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<ITask>;
