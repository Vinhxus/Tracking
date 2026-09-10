import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/createRoute.js'
import {connectDB} from './src/config/db.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
});