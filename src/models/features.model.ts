/* eslint-disable */
import {Schema} from "mongoose";

export const featureSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    views: [
      {
        type: String,
        required: true
      }
    ],
    indicator: {
      type: String,
      enum: ["LIMITED", "LIMITLESS"],
    },
    available: {
      type: Number,
      default: 0,
    },
  }
)