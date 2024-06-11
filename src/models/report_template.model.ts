/* eslint-disable */


import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "ReportTemplates";

let fieldSchema = new mongoose.Schema<IFormField>(
  {
    _id: String,
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    src: {
      type: String,
      default: "",
      required: false
    },
    options: [
      {
        type: String,
        required: false
      }
    ],
  }
)

let schema = new mongoose.Schema<ReportTemplate>(
  {
    universalAccess: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: true,
    },
    facility: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ParkLocations",
      default: null,
      required: false,
    },
    status: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      required: true,
      enum: ["STANDARD", "INCIDENT", "INVENTORY","VAT","IN_SERVICE"],
    },
    fields: [
      {
        type: fieldSchema
      }
    ],
    created_by: {
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
  mongoose.model(MODEL, schema)) as Model<ReportTemplate>;
