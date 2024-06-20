import { config } from "../config/config.js";
import DataURIParser from "datauri/parser.js";
import path from "path";

export const getDataUri = (file) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export const cookieOptions = {
  secure: config.env === "development" ? false : true,
  httpOnly: config.env === "development" ? false : true,
  sameSite: config.env === "development" ? false : "none",
};

export const sendToken = (user, res, message, statusCode) => {
  const token = user.generateToken();
  res
    .status(statusCode)
    .cookie("token", token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: message,
    });
};
