import express from "express";
import cookieParser from "cookie-parser";
import userRoute from "./src/user/userRoute.js";
import globalError from "./src/middlewares/globalError.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);

// Global Error Handler
app.use(globalError);

export default app;
