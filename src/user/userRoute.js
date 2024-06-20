import express from "express";
import {
  changePassword,
  getMyProfile,
  login,
  logout,
  signup,
  updateProfile,
} from "./userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/new", signup);
router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);
router.put("/updateprofile", isAuthenticated, updateProfile);
router.put("/changepassword", isAuthenticated, changePassword);

export default router;
