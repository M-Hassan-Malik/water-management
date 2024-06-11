import type { Model } from "mongoose";
import mongoose from "mongoose";

import type { PointOfInterest } from "@/graphql/generated/graphql";

const MODEL = "PointOfInterest";

export const pointOfInterestSchema = new mongoose.Schema<PointOfInterest>(
  {
    createdByRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    belongsToFacilityRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
      required: true,
    },
    type: {
      type: String,
      enum: ["UTILITY", "ATTRACTION"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    points: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

// Index for the location field to enable spatial queries
pointOfInterestSchema.index({ location: "2dsphere" });

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, pointOfInterestSchema)) as Model<PointOfInterest>;
