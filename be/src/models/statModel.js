// models/UserStats.js
import mongoose from "mongoose";
import DailyStat from "./dailyModel.js";

// Hàm lấy ngưỡng EXP cho cấp hiện tại
const getThreshold = (level) => {
  const baseExp = 1000;
  return baseExp * ((level * (level + 1)) / 2);
};

// 1. Schema con tái sử dụng cho từng thuộc tính
const StatSchema = new mongoose.Schema(
  {
    exp:{
      type: Number,
      required: true,
      default: 0,
    },
    level:{
      type: Number,
      default: 1,
      min: 1,
    },
    threshold:{
      type: Number,
      default: function () {  
        return getThreshold(this.level);
      },
    }
  }, {_id: false}
);

// 2. Schema chính chứa cả 4 chỉ số
const UserStatsSchema = new mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    health: {type: StatSchema, default: () => ({})},
    study: {type: StatSchema, default: () => ({})},
    spirit: {type: StatSchema, default: () => ({})},
    social: {type: StatSchema, default: () => ({})},
  },
  { timestamps: true }
);

// static method: lấy (hoặc tạo mới nếu chưa có) stats của user mặc định
// dùng cho app single-user, chưa có tính năng đăng nhập
// thay cho getDefault() cứng userId
UserStatsSchema.statics.getOrCreate = async function (userId) {
  let stats = await this.findOne({ userId });
  if (!stats) {
    stats = await this.create({ userId });
  }
  return stats;
};

// method gain Exp
UserStatsSchema.methods.gainExp = async function (statType, amount, dateStr) {
  // 1 check valid
  const validStats = ["health", "spirit", "study", "social"];
  if (!validStats.includes(statType)) {
    throw new Error("Stat is not valid!");
  }

  // 2 code logic 
  const stat = this[statType];
  stat.exp += amount;

  // 3 check if level up
  while (stat.exp >= stat.threshold){
    stat.level += 1;
    stat.threshold = getThreshold(stat.level);
  }

  // các lệnh trên chỉ tác động dô Ram
  await this.save(); // lưu dô db

  // ghi thêm vào bản ghi ngày hôm nay
  const date = dateStr || new Date().toISOString().slice(0, 10); // "2026-09-18"
  await DailyStat.findOneAndUpdate(
    { userId: this.userId, date }, // composite ID, chưa có thì tạo mới
    { $inc: { [`${statType}.exp`]: amount } },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return {
    statType,
    level: stat.level,
    exp: stat.exp,
    threshold: stat.threshold,
  };
};

export default mongoose.model("UserStats", UserStatsSchema);