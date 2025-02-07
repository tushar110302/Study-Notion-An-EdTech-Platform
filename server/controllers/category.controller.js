import { Category } from "../models/category.model.js";

const createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;
        if(!name || !description) {
            return res.status(400)
            .json({
                success: false,
                message: "Name and Description are required"
            });
        }
        const category = await Category.create({
            name,
            description
        });

        return res.status(200)
        .json({
            success: true,
            message: "Category created successfully",
            category
        })

    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Could not create Category"
        });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200)
        .json({
            success: true,
            message: "Categorys fetched successfully",
            categories
        });
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Could not fetch Categories"
        });
    }
}

const categoryPageDetails = async (req, res) => {
    try {
        //get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success:false,
                message:'Data Not Found',
            });
        }
        //get coursesfor different categories
        const differentCategories = await Category.find({
                                     _id: {$ne: categoryId},
                                     })
                                     .populate("courses")
                                     .exec();

        //get top 10 selling courses
        //HW - write it on your own
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap((category) => category.courses);
        const mostSelling = allCourses.sort((a, b) => b.studentsEnrolled.length - a.studentsEnrolled.length).slice(0, 10);

        //return response
        return res.status(200).json({
            success:true,
            data: {
                selectedCategory,
                differentCategories,
                mostSelling
            },
        });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

export {createCategory, getAllCategories};