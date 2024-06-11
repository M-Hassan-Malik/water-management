/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "Ticker";

export const TickerSchema = new mongoose.Schema<ITicker>(
  {
    title: {
      type: String,
      required: true,
      default: ""
    },
    message: {
      type: String,
      required: true,
      default: ""
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postBelongsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
      },
    redirect: {
      type: String,
      required: false,
      default: ""
    },
  },
  { timestamps: true },
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, TickerSchema)) as Model<ITicker>;
