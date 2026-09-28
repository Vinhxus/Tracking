import mongoose from "mongoose";

export const TAGS = ["health", "study", "spirit", "social"];
export const Category = ["hard", "medium", "light"];

function getScore(category, time) {
  switch (String(category).toLowerCase()) {
    case "hard":
      return time * 3;
    case "medium":
      return time * 2;
    default:
      return time;
  }
}

const createSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: Category,
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
  { timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  }
);

createSchema.virtual("score").get(function () {
  return getScore(this.category, this.time);
});

const Activity = mongoose.model("Activity", createSchema);

export default Activity
