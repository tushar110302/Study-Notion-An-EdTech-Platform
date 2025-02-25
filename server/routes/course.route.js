import { Router } from "express";
import {createCourse, deleteCourse, editCourse, getAllCourses, getCourseById, getFullCourseDetails, getInstructorCourses } from "../controllers/course.controller.js"
import { createCategory, getAllCategories, getCategoryPageDetails} from "../controllers/category.controller.js";   
import {createSection, updateSection, deleteSection} from "../controllers/section.controller.js"
import {createSubSection, updateSubSection, deleteSubSection} from "../controllers/subSection.controller.js"
import {createRating, getAllRatingAndReviews, getAverageRating} from "../controllers/ratingAndReview.controller.js"
import { isAdmin, verifyJWT , isStudent, isInstructor} from "../middlewares/auth.js";
import { upload } from '../middlewares/multer.js';
import { updateCourseProgress } from "../controllers/courseProgress.controller.js";

const router = Router();

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.route('/createCourse').post(verifyJWT, isInstructor, upload.single("thumbnail"), createCourse)
router.route("/editCourse").post(verifyJWT, isInstructor, upload.single("thumbnail"), editCourse)
router.route("/deleteCourse").delete(deleteCourse)

//Add a Section to a Course
router.route('/addSection').post(verifyJWT, isInstructor, createSection)
router.route('/updateSection').post(verifyJWT, isInstructor, updateSection)
router.route('/deleteSection').post(verifyJWT, isInstructor, deleteSection)

// Edit Sub Section
router.route('/addSubSection').post(verifyJWT, isInstructor, upload.single("video"), createSubSection)
router.route('/updateSubSection').post(verifyJWT, isInstructor, upload.single("video"), updateSubSection)
router.route('/deleteSubSection').post(verifyJWT, isInstructor, deleteSubSection)

// Get all Registered Courses
router.route('/getAllCourses').get(getAllCourses)
router.route("/getInstructorCourses").get(verifyJWT, isInstructor, getInstructorCourses)
router.route("/getFullCourseDetails").post(verifyJWT, getFullCourseDetails)
// Get Details for a Specific Courses
router.route('/getCourseDetails').get( getCourseById)


router.route("/updateCourseProgress").post(verifyJWT, isStudent, updateCourseProgress)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Category can Only be Created by Admin
router.route("/createCategory").post(verifyJWT, isAdmin, createCategory)
router.route("/showAllCategories").get(getAllCategories)
router.route("/getCategoryPageDetails").post(getCategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.route("/createRating").post(verifyJWT, isStudent, createRating)

router.route("/getAverageRating").get(getAverageRating)

router.route("/getReviews").get(getAllRatingAndReviews)

export default router;