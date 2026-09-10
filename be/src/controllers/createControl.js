import Activity from "../models/activityModel.js";

export async function CreateNewActivity(req,res){
    try{
        const {name, tags, score} = req.body;
        const activity = new Activity({name, tags, score});

        const newActivity = await activity.save(); 
        res.status(201).json(newActivity)
    } catch(err){
        console.error("error creating new activity", err);
        res.status(500).json({message:"Internal server error"});
    }
}

