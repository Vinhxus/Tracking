import express from "express";
import { login, signup, getMe } from "../controllers/authController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, getMe); // route để FE check còn đăng nhập không

export default router;
