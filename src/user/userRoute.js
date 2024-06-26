import express from "express";
import {
  changePassword,
  forgetPassword,
  getMyProfile,
  login,
  logout,
  resetPassword,
  signup,
  updatePicture,
  updateProfile,
} from "./userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/new", singleUpload, signup);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);
router.put("/updateprofile", isAuthenticated, updateProfile);
router.put("/changepassword", isAuthenticated, changePassword);
router.put("/updatepicture", isAuthenticated, singleUpload, updatePicture);

// Forget Password
router.route("/forgetpassword").post(forgetPassword).put(resetPassword);

export default router;
