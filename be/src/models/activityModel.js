import mongoose from "mongoose";

export const TAGS = ["health", "study", "spirit", "social"];
export const Category = ["hard", "medium", "light"];

const createSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },
    category:{
      type: [String],
      required: true,
    },
    time:{
      type: Number,
      required: true,
    },
    score:{
      get: function() {
        return getScore(this.category, this.time);
      }
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

function getScore(category, time){
  if (category === "hard") {
    return time * 3;
  } else if (category === "medium") {
    return time * 2;
  } else {
    return time;
  }
};

const Activity = mongoose.model("Activity", createSchema);

export default Activity
