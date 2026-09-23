import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/createRoute.js'
import {connectDB} from './src/config/db.js'
import authRoute from "./src/routes/authRoute.js";
import activityRoute from "./src/routes/createRoute.js"; // giữ tên file cũ hoặc đổi thành activityRoute.js
import cors from 'cors'

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const PORT = process.env.PORT || 5001;
connectDB();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});