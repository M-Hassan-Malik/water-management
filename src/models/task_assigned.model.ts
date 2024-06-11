/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";
import { LiveLocationSchema } from "./liveLocation.model";

const MODEL = "TaskAssigned";
export const subTaskSchema = new mongoose.Schema<ISubTask>(
  {
    detail: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const submissionSchema = new mongoose.Schema<ITaskSubmission>({
  subtasks: [
    {
      type: subTaskSchema,
    },
  ],
  location: {
    type: LiveLocationSchema,
    required: false,
  },
  media: {
    type: [String],
    required: false,
  },
  remarks: {
    type: String,
    required: false,
  },
  voice: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "INPROGRESS", "REVIEWING", "COMPLETED"],
    default: "PENDING" as ESubmissionStatus.PENDING,
  },
});

const schema = new mongoose.Schema<ITaskAssigned>(
  {
    title: {
      type: String,
      required: true,
    },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
      default: null,
      required: false,
    },
    detail: {
      type: String,
      required: true,
    },
    media: {
      type: [String],
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
    },
    createdBy_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientAdminRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedToFacilityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
    },
    deadline: {
      type: Date,
      required: true,
    },
    scheduleType: {
      type: String,
      enum: ["ONE_TIME", "DAILY", "WEEKLY", "MONTHLY","ALWAYS"],
      default: "ONE_TIME",
      require: true,
    },
    submissions: {
      type: [submissionSchema],
      required: true,
    },
    priority: {
      type: String,
      enum: ["EMERGENCY", "ALERT", "STANDARD", "LOW"],
      require: true,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<ITask>;
