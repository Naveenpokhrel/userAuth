import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

import ConnectDB from './config/monogodb.js';
import authRouter from './routes/authRoutes.js'


configDotenv();

const app = express();
const port = process.env.PORT || 5000;

ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));


// API ENDPoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter )


app.listen(port, () => console.log(`Server started on PORT: ${port}`));
