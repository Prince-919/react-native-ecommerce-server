import { config } from "../config/config.js";
import { User } from "../user/userModel.js";
import ErrorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "./asyncError.js";

export const isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  const decoded = jwt.verify(token, config.token);

  req.user = await User.findById(decoded._id);

  next();
});

export const isAdmin = asyncErrorHandler(async (req, res, next) => {
  if (req.user.role !== "admin")
    return next(new ErrorHandler("Only admin allowed", 401));
  next();
});
