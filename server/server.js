import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDB from './config/monogodb.js';

configDotenv();

const app = express();
const port = process.env.PORT || 5000;

ConnectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.get('/', (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
