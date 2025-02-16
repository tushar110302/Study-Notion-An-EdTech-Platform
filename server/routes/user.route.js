import { Router } from "express";
import { changePassword, login, resetPassword, resetPasswordToken, sendOTP, singup } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.js";

const router = Router();

// Routes for Login, Signup, and Authentication

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.route("/login").post(login);
// Route for user signup
router.route("/signup").post(singup);
// Route for sending OTP to the user's email
router.route("/sendotp").post(sendOTP);
// Route for Changing the password
router.route("/changePassword").post(verifyJWT, changePassword);


// Route for generating a reset password token
router.route("/reset-password-token").post( resetPasswordToken);

// Route for resetting user's password after verification
router.route("/reset-password").post(resetPassword);


export default router;