/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";
import { sessionSchema } from "./training.model";

const MODEL = "TrainingSession";

export const trainingSessionSchema = new mongoose.Schema<ITrainingSession>(
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
    sessions: [
      {
        date: {
          type: Date,
          required: true,
        },
        session: {
          type: [sessionSchema],
          required: true,
        },
        status: {
          type: String,
          enum: ["PENDING", "INPROGRESS", "REVIEWING", "COMPLETED"],
          default: "PENDING" as ESubmissionStatus.PENDING,
        },
      },
    ],
    trainingRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Training",
      required: true,
    },
    userRef: {
      // to whom it;s assigned
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedToFacilityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
      required:false
    },
    scheduleType: {
      type: String,
      enum: ["ONE_TIME", "DAILY", "WEEKLY", "MONTHLY"],
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authority: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "INPROGRESS", "REVIEWING", "COMPLETED"],
      require: true,
    },
    priority: {
      type: String,
      enum: ["EMERGENCY", "ALERT", "STANDARD", "LOW"],
      require: true
    },
  },
  { timestamps: true } // Disable _id for training sessions, as it will be part of the main document
);

export default (mongoose.models[MODEL] ||
  mongoose.model<ITrainingSession>(
    MODEL,
    trainingSessionSchema
  )) as Model<ITrainingSession>;
