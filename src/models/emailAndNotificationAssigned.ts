/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "EmailAndNotificationAssigned";

const EmailAndNotificationAssigned = new mongoose.Schema<IEmailAndNotification>(
  {
    code: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      enum: ["EMAIL", "NOTIFICATION"],
      required: true
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
      required: true,
      default: false
    },
    createdByRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedUserRef: { // assigned to user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    priority: {
      type: String,
      enum: ["EMERGENCY", "ALERT", "STANDARD", "LOW"],
      require: true
    },
  },
  {
    timestamps: true,
  }
);

export default (mongoose.models[MODEL] ||
  mongoose.model<IEmailAndNotification>(MODEL, EmailAndNotificationAssigned)) as Model<IEmailAndNotification>;
