import express from "express";
import { login, signup } from "./userController.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/new").post(signup);

export default router;
