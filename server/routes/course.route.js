import { Router } from "express";
import {createCourse, getAllCourses, getCourseById } from "../controllers/course.controller.js"
import { createCategory, getAllCategories, getCategoryPageDetails} from "../controllers/category.controller.js";   
import {createSection, updateSection, deleteSection} from "../controllers/section.controller.js"
import {createSubSection, updateSubSection, deleteSubSection} from "../controllers/subSection.controller.js"
import {createRating, getAllRatingAndReviews, getAverageRating} from "../controllers/ratingAndReview.controller.js"
import { isAdmin, verifyJWT , isStudent, isInstructor} from "../middlewares/auth.js";
import { upload } from '../middlewares/multer.js';

const router = Router();

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.route('/createCourse').post(verifyJWT, isInstructor, upload.single("thumbnail"), createCourse)
//Add a Section to a Course
router.route('/addSection').post(verifyJWT, isInstructor, createSection)
// Update a Section
router.route('/updateSection').post(verifyJWT, isInstructor, updateSection)
// Delete a Section
router.route('/deleteSection').post(verifyJWT, isInstructor, deleteSection)
// Edit Sub Section
router.route('/updateSubSection').post(verifyJWT, isInstructor, upload.single("video"), updateSubSection)
// Delete Sub Section
router.route('/deleteSubSection').post(verifyJWT, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.route('/addSubSection').post(verifyJWT, isInstructor, upload.single("video"), createSubSection)
// Get all Registered Courses
router.route('/getAllCourses').get(getAllCourses)
// Get Details for a Specific Courses
router.route('/getCourseDetails').get( getCourseById)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.route("/createCategory").post(verifyJWT, isAdmin, createCategory)
router.route("/showAllCategories").get(getAllCategories)
router.route("/getCategoryPageDetails").get(getCategoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************

router.route("/createRating").post(verifyJWT, isStudent, createRating)

router.route("/getAverageRating").get(getAverageRating)

router.route("/getReviews").get(getAllRatingAndReviews)

export default router;