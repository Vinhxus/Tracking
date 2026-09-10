import express from "express"
import { CreateNewActivity } from "../controllers/createControl.js"


const router = express.Router()

router.post('/create', CreateNewActivity);

export default router