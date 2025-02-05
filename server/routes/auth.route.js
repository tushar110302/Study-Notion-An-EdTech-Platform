import { Router } from "express";
import { changePassword, login, sendOTP, singup } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route("/otp").get(sendOTP);
router.route("/signup").post(singup);
router.route("/login").post(login);
router.route("/change-password").get(verifyJWT, changePassword);



export default router;