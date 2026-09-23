import mongoose from "mongoose";

const DayStatSchema = new mongoose.Schema(
  {
    exp:{ 
        type: Number, 
        default: 0 
    },
  },
  { _id: false }
);

const DailyStatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // dùng string "YYYY-MM-DD" thay vì Date object -> tránh rắc rối timezone/giờ UTC
    date: { type: String, required: true },

    health: { type: DayStatSchema, default: () => ({}) },
    study: { type: DayStatSchema, default: () => ({}) },
    spirit: { type: DayStatSchema, default: () => ({}) },
    social: { type: DayStatSchema, default: () => ({}) },
  },
  { timestamps: true }
);

// mỗi user chỉ có 1 bản ghi / ngày
DailyStatSchema.index({ userId: 1, date: 1 }, { unique: true }); 
// ko khai báo unique riêng ở trên vì 1 ngày có thể có 2 user hoặc 1 user 2 ngày
export default mongoose.model("DailyStat", DailyStatSchema);
