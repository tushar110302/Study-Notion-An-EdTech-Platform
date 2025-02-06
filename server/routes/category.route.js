import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/category.controller.js";   
import { isAdmin, verifyJWT } from "../middlewares/auth.js";

const router = Router();

router.route("/create").post(verifyJWT, isAdmin, createTag);
router.route("/get-c").post(getAllCategories);

export default router;