import Activity from "../models/activityModel.js";
import UserStats from "../models/statModel.js";
import { toDateStr } from "../utils/dateUtils.js";


export async function CreateNewActivity(req,res){
    try{
        console.log("RAW BODY:", req.body);
        const {title, score, tags, date} = req.body;
          // Normalize tags into an array of lowercase strings
        let tagsArray = tags;
        if (!tagsArray) {
            tagsArray = [];
        } else if (!Array.isArray(tagsArray)) {
            tagsArray = [];
        }

        if (tagsArray.length === 0) {
            return res.status(400).json({ success: false, message: "tags is required and must be a non-empty array" });
        }

         // nếu client không truyền date -> mặc định hôm nay (giờ VN)
        const dateStr = date || toDateStr(new Date());

        const lowercaseTags = tagsArray.map(tag => tag.toLowerCase());
        const activity = await Activity.create({title, score, tags: lowercaseTags, date:dateStr});
        const userStats = await UserStats.getOrCreate(req.userId); // assuming req.user.id contains the user's ID

        // 3. Lặp qua các tags của activity và cộng exp tương ứng
        // Dùng vòng lặp for...of để đảm bảo hàm gainExp chạy tuần tự 
        // vì bên trong gainExp có gọi await this.save()
        for (const tag of lowercaseTags) {
            await userStats.gainExp(tag, score, dateStr);
        }

        res.status(201).json({ 
            success: true, 
            message: "Create activity and update exp successfully", 
            data: activity, userStats, 
        });

    } catch(err){
        console.error("error creating new activity", err);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function deleteActivity(req,res){
    try{
        const {_id} = req.params;
        const activity = await Activity.findByIdAndDelete(_id);
        if (!activity){
            return res.status(404).json({success: false, message:"fail to find and delete"});
        }
        const userStats = await UserStats.getOrCreate(req.userId); // assuming req.userId contains the user's ID
        // dùng lại field date đã lưu sẵn trong activity, không cần tính lại từ createdAt
        const dateStr = activity.date;
        for (const tag of activity.tags){
            await userStats.gainExp(tag, -activity.score, dateStr); // truyền ngày vào GainExp
        }
        
        res.status(200).json({success: true, message:"delete successful"});
    } catch (error){
        console.error("error deleting activity",error);
        res.status(500).json({success: false, message:"Internal server error"})
    }
}

export async function GetAllActivity(req,res){
    try{
        const { date } = req.query; // ?date=2026-09-18
        // nếu không truyền date -> lấy toàn bộ
        // nếu có truyền -> lọc đúng ngày đó
        const filter = date ? { date } : {};
        const activities = await Activity.find(filter).sort({ createdAt: -1 });
        res.status(200).json({success:true,data: activities});
    } catch(error){
        console.error("error getting all activities", error);
        res.status(500).json({success:false, error:error.message})
    }
}

