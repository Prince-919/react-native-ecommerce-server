import express from "express";
import userRoute from "./src/user/userRoute.js";

const app = express();

// Routes
app.use("/api/v1/user", userRoute);

export default app;
