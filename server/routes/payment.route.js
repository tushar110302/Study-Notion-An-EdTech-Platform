import { Router } from "express";
import {capturePayment, verifySignature} from "../controllers/payment.controller.js"
import { verifyJWT, isStudent } from "../middlewares/auth.js";

const router = Router();

router.route("/capturePayment").post(verifyJWT, isStudent, capturePayment)
router.route("/verifySignature").post(verifyJWT, isStudent ,verifySignature)

export default router;