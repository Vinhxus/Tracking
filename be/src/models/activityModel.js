import mongoose from "mongoose";

export const TAGS = ["health", "study", "spirit", "social"];

const createSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },
    score:{
      type: Number,
      required: true,
    },
    tags:{
      type: [String],
      enum: TAGS,
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Choose at least 1 tag.",
      },
    },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", createSchema);

export default Activity
