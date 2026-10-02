import UserStats from "../models/statModel.js";
import DailyStat from "../models/dailyModel.js";
import { toDateStr } from "../utils/dateUtils.js";

export const addExpToStat = async (req, res) => {
  try {
    const stats = await UserStats.getOrCreate(req.userId);
    const {statType, exp} = req.body;
    
    // 1. Validate loại chỉ số
    const validStats = ["health", "spirit", "study", "social"];
    if (!statType || !validStats.includes(statType)){
      return res.status(400).json({
        success: false,
        message: "statType must be one of these: health, spirit, study, social",
      })
    }
    // 2. Validate EXP
    const amount = Number(exp);
    if (isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "number error"
      });
    }
   
    // 4. Cộng EXP và tính cấp
    const updatedResult = await stats.gainExp(statType, amount);
    return res.status(200).json({
      success: true,
      message: `Added ${amount} EXP for ${statType}!`,
      data: updatedResult,
    });
   
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const stats = await UserStats.getOrCreate(req.userId);
    return res.status(200).json({ success: true, data: stats }); 
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function getDailyStats(req, res) {
  try {
    const date = req.params.date || new Date().toISOString().slice(0, 10);
    const daily = await DailyStat.findOne({ userId: req.userId, date });

    const defaultStats = {
      health: { exp: 0 },
      study: { exp: 0 },
      spirit: { exp: 0 },
      social: { exp: 0 },
    };

    res.status(200).json({
      success: true,
      data: daily ?? { userId: req.userId, date, ...defaultStats }
    });
  } catch (error) {
    console.error("error in getDailyStats", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}