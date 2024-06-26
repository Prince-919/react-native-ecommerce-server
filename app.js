import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./src/user/userRoute.js";
import productRoute from "./src/product/productRoute.js";
import orderRoute from "./src/order/orderRoute.js";
import globalError from "./src/middlewares/globalError.js";
import { config } from "./src/config/config.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [config.frontendUrl],
  })
);

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

// Global Error Handler
app.use(globalError);

export default app;
