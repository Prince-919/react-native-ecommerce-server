import asyncErrorHandler from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/error.js";
import { sendToken } from "../utils/features.js";
import { User } from "./userModel.js";

// Log In -> http://localhost:8000/api/v1/user/login
export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Invalid email or password"));
  }
  sendToken(user, res, `Welcome back, ${user.name}`, 200);
});

// Sign Up -> http://localhost:8000/api/v1/user/new
export const signup = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already exists", 400));
  }

  user = await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });
  sendToken(user, res, "Registered successfully", 201);
});
