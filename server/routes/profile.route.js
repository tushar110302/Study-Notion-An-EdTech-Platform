import { Router } from "express";
import {deleteAccount, getEnrolledCourses, getUserDetails, instructorDashboard, updateDisplayPicture, updateProfile} from "../controllers/profile.controller.js"
import { isInstructor, verifyJWT } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.route("/deleteProfile").delete(verifyJWT, deleteAccount);
router.route("/updateProfile").put(verifyJWT, updateProfile);
router.route("/getUserDetails").get(verifyJWT, getUserDetails);

router.route("/getEnrolledCourses").get(verifyJWT, getEnrolledCourses);
router.route("/updateDisplayPicture").put(verifyJWT, upload.single("profileImage"), updateDisplayPicture);

router.route("/instructorDashboard").get(verifyJWT, isInstructor, instructorDashboard);

export default router;