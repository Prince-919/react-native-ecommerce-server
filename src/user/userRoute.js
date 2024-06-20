import express from "express";
import {
  changePassword,
  getMyProfile,
  login,
  logout,
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
router.put("/updatepicture", isAuthenticated, updatePicture);

export default router;
