/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "EmailAndNotification";

const EmailAndNotification = new mongoose.Schema<IEmailAndNotification>(
  {
    code: {
      type: Number,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      enum: ["EMAIL", "NOTIFICATION"],
      required: true,
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    read: {
      type: Boolean,
      required: false
    },
    createdByRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model<IEmailAndNotification>(MODEL, EmailAndNotification)) as Model<IEmailAndNotification>;
