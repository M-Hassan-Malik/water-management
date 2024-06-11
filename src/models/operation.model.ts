/* eslint-disable */
import type { Model } from "mongoose";
import mongoose from "mongoose";

const MODEL = "Operation";
// const iconSchema = new mongoose.Schema<IIcon>({
//   type: {
//     type: String,
//     enum: ["ICON", "SOURCE"],
//   },
//   src: {
//     type: String,
//   },
// });

// enum EOperationsSchemaIds {
//   "task"
//   , "uploader"
//   , "report"
//   , "client-admins"
//   , "manage-users"
//   , "report-templates"
//   , "payment-records"
//   , "password.change"
//   , "email.update"
//   , "privacy-policy"
//   , "privacy-policy.edit"
//   , "eula"
//   , "eula.edit"
//   , "about-us"
//   , "about-us.edit"
//   , "faq"
//   , "faq.edit"
// }

export const operationsSchema = new mongoose.Schema<IOperation>(
  {
    // ref: {
    //   type: String,
    //   enum: EOperationsSchemaIds,
    // },
    // permissions: [
    //   {
    //     type: String,
    //     required: true,
    //     enum: ["READ", "WRITE"],
    //   },
    // ],
    // title: {
    //   type: String,
    //   required: true,
    // },
    // icon: {
    //   type: iconSchema,
    // },
    // sort: {
    //   type: Number,
    //   default: 0,
    // },
    name: {
      type: String,
      required: true,
    },
    views: [{
      type: String
    }]
  },
  {
    timestamps: true,

  },
);

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, operationsSchema)) as Model<IOperation>;
