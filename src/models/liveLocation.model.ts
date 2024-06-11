import { Schema } from "mongoose";

/* eslint-disable */
export const LiveLocationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
    default: 0.00
  },
  lng: {
    type: Number,
    required: true,
    default: 0.00
  },
});