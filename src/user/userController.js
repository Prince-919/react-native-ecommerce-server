import asyncErrorHandler from "../middlewares/asyncError.js";
import ErrorHandler from "../utils/error.js";
import { cookieOptions, getDataUri, sendToken } from "../utils/features.js";
import { User } from "./userModel.js";
import cloudinary from "cloudinary";

// Log In -> http://localhost:8000/api/v1/user/login
export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password"));
  }
  if (!password) {
    return next(new ErrorHandler("Password is required", 400));
  }

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

  let avatar = undefined;

  if (req.file) {
    const file = getDataUri(req.file);
    const myCloud = await cloudinary.v2.uploader.upload(file.content, {
      folder: "REACT_NATIVE_ECOMMERCE",
    });
    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  user = await User.create({
    avatar,
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

// Logout -> http://localhost:8000/api/v1/user/logout
export const logout = asyncErrorHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

// Get My Profile -> http://localhost:8000/api/v1/user/me
export const getMyProfile = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Update Profile -> http://localhost:8000/api/v1/user/updateprofile
export const updateProfile = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const { name, email, address, city, country, pinCode } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
  });
});

// Change Password -> http://localhost:8000/api/v1/user/changepassword
export const changePassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(
      new ErrorHandler("Please enter new password or old password", 400)
    );
  }

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) return next(new ErrorHandler("Incorrect old password", 400));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// Update Picture -> http://localhost:8000/api/v1/user/updatepicture
export const updatePicture = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const file = getDataUri(req.file);

  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  const myCloud = await cloudinary.v2.uploader.upload(file.content, {
    folder: "REACT_NATIVE_ECOMMERCE",
  });
  user.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
  });
});

// Forget Password -> http://localhost:8000/api/v1/user/forgetpassword
export const forgetPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("Incorrect email address", 404));
  }

  const randomNumber = Math.random() * (999999 - 100000) + 100000;
  const otp = Math.floor(randomNumber);
  const otp_expires = 15 * 60 * 1000;

  user.otp = otp;
  user.otp_expire = new Date(Date.now() + otp_expires);

  await user.save();

  // sendEmail()

  res.status(200).json({
    success: true,
    message: `Email sent ot ${user.email}`,
  });
});
// Forget Password -> http://localhost:8000/api/v1/user/forgetpassword
export const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});
