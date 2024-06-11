/* eslint-disable */


import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "ReportEditHistory";

let schema = new mongoose.Schema<ReportEditHistory>(
  {
    submitted_data: [{
      type: Object,
      required: true
    }],
    belongs_to: {
      type: String,
      ref: "ReportSubmission",
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<ReportEditHistory>;
