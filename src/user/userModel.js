import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters long"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
  pinCode: {
    type: String,
    required: [true, "Pin code is required"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  otp: Number,
  otp_expire: Date,
});

export const User = mongoose.model("User", userSchema);
