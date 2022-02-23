import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routers from "./routers";

// Middleware
const app = express();
app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser()); // req.cookies to set cookie

// Connect Database
import "./config/Database";
    
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
});

// Router
app.use("/api", routers.authRouter);
app.use("/api", routers.userRouter);
app.use("/api", routers.courseRouter);
