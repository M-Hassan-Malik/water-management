/* eslint-disable */


import type { Model } from "mongoose";
import mongoose from "mongoose";
import { featureSchema } from "./features.model";
import { doContainsSpecialCharacters } from "@/utils/helpers/functions";

const MODEL = "Roles";
let schema = new mongoose.Schema<IRole>(
  {
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
    active: {
      type: Boolean,
      required: true
    },
    operations: [
      {
        type: featureSchema,
        default: [],
      },
    ],
    modules: [
      {
        type: featureSchema,
        default: [],
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

schema.pre("save",async function (next) {
  if (!this.isModified("name")) return next();
  // check if, contains special char
  if (doContainsSpecialCharacters(this.name)) return next(new Error("Name should not contains special characters"));
  // assign new name
  this.name = this.name.toUpperCase().trim()

  // check if, name exists
  const model = mongoose.model(MODEL);
  const exists = await model.exists({ name: this.name, user_id: this.user_id })
  if (exists) next(new Error("Role already exists"))

  return next();

});

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<IRole>;
