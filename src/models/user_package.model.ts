/* eslint-disable */

import type { Model } from "mongoose";
import { Schema, model, models } from "mongoose";

const paymentDetailSchema = new Schema<IPaymentDetail>({
  method: {
    type: String,
    enum: ["MANUAL", "CARD", "CHEQUE",  "CASH"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const schema = new Schema<IPackage>(
  {
    title: {
      type: String,
      required: true,
    },
    ref: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    packageRef: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "UserPackageModule",
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    paymentDetail: {
      type: paymentDetailSchema,
      required: true,
    },
    compare_at: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      required: true,
    },
    sizeInGB: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },
    discount_type: {
      type: String,
      enum: ["FIXED", "PERCENTAGE"],
    },
    number_of_users: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["SUBSCRIBED", "UPGRADE", "DOWNGRADE"],
    },
  },
  {
    timestamps: true,
  }
);

const MODEL = "UserPackage";
export default (models[MODEL] || model(MODEL, schema)) as Model<IPackage>;
