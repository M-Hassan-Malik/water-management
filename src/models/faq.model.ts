/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "FAQ";

const FAQ = new mongoose.Schema<FAQ>(
  {
    question: {
      type: String,
      required: false,
    },
    answer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["MOBILE", "WEB", "BOTH"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model<FAQ>(MODEL, FAQ)) as Model<FAQ>;
