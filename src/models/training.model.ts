/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "Training";


export const sessionSchema = new mongoose.Schema<ISessions>(
  {
    detail: {
      type: String,
      required: false,
    },
    image: {
      type: {
        data: {
          type: String,
          required: false,
        },
        complete: {
          type: Boolean,
          default: false
        },
      },
      required: false,
      _id: false
    },
    video: {
      type: {
        data: {
          type: String,
          required: false,
        },
        complete: {
          type: Boolean,
          default: false
        },
      },
      required: false,
      _id: false
    },
  },
  { timestamps: true, _id: true }
);


const trainingSchema = new mongoose.Schema<ITraining>(
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
    sessions: {
      type: [sessionSchema],
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model<ITraining>(MODEL, trainingSchema)) as Model<ITraining>;
