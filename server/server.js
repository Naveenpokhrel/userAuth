import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

import ConnectDB from "./config/monogodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

ConnectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));


// API ENDPoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter )
app.use('/api/user', userRouter )


app.listen(port, () => console.log(`Server started on PORT: ${port}`));
