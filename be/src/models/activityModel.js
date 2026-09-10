import mongoose from "mongoose";

const TAGS = ["Health", "Study", "Spirit", "Social"];

const createSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      enum: TAGS,
      required: true,
      validate: {
        validator: (arr) => Array.isArray(arr) && arr.length > 0,
        message: "Choose at least 1 tag.",
      },
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", createSchema);

export default Activity;