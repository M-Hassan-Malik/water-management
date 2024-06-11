import type { Model } from "mongoose";
import mongoose from "mongoose";

const schema = new mongoose.Schema<ISubAdminPayment>(
  {
    current_status: {
      type: String,
      enum: ["PAID", "UNPAID"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    last_payment_date: {
      type: Date,
    },
    next_payment_date: {
      type: Date,
      required: true,
    },
    package_type: {
      type: String,
      enum: ["CUSTOM", "FREEMIUM", "PREMIUM"],
    },
    subscription_date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MODEL = "SubAdminPayments";
export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, schema)) as Model<ISubAdminPayment>;
