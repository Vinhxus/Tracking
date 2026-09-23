import express from "express"
import { CreateNewActivity, GetAllActivity, deleteActivity } from "../controllers/ActivityController.js"
import { addExpToStat, getUserStats, getDailyStats } from "../controllers/StatController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router()

router.post('/create', verifyToken, CreateNewActivity);
router.get('/getAct', verifyToken, GetAllActivity);
router.delete('/:_id', verifyToken, deleteActivity);
router.post("/gainExp", verifyToken, addExpToStat);
router.get('/', verifyToken, getUserStats);
router.get("/daily/", verifyToken, getDailyStats);
router.get("/daily/:date", verifyToken, getDailyStats);

export default router