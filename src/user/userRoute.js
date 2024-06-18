import express from "express";
import { getMyProfile } from "./userController.js";

const router = express.Router();

router.route("/me").get(getMyProfile);

export default router;
