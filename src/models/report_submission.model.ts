/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";
import { LiveLocationSchema } from "./liveLocation.model";

const MODEL = "ReportSubmission";

const submissionSchema = new mongoose.Schema<ReportSubmittedData>({
  submitted_data: {
    type: [Object],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: LiveLocationSchema,
    required: false,
  },
  status: {
    type: String,
    enum: ["PENDING", "INPROGRESS", "REVIEWING", "COMPLETED"],
    default: "PENDING" as ESubmissionStatus.PENDING,
  },
});

const schema = new mongoose.Schema<ReportSubmission>(
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
    submissions: {
      type: [submissionSchema],
      required: true,
    },
    belongs_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportTemplates",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedToFacilityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientAdminRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    scheduleType: {
      type: String,
      enum: ["ONE_TIME", "DAILY", "WEEKLY", "MONTHLY", "ALWAYS"],
      require: true,
    },
    priority: {
      type: String,
      enum: ["EMERGENCY", "ALERT", "STANDARD", "LOW"],
      require: true,
    },
    reportType: {
      type: String,
      enum: ["STANDARD", "INCIDENT", "INVENTORY", "VAT", "IN_SERVICE"],
      require: true,
    },
    deadline: {
      type: Date,
      required: true,
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
  mongoose.model(MODEL, schema)) as Model<ReportSubmission>;
