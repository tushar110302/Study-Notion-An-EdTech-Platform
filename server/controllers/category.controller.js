import { Category } from "../models/category.model.js";

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

const createCategory = async (req, res) => {
    try {
        const {name, description} = req.body;
        if(!name) {
            return res.status(400)
            .json({
                success: false,
                message: "Name is required"
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
            data: category
        })

    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Exception Occured!! Could not create Category",
            error: error.message
        })
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200)
        .json({
            success: true,
            message: "ALL Categories fetched successfully",
            data: categories
        });
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Exception Occurred!! Could not fetch Categories",
            error: error.message
        });
    }
}

const getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: "ratingAndReviews",
        })

        if (!selectedCategory) {
            return res.status(404).json({ 
                success: false, 
                message: "Category not found" 
            });
        }
        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        // Get courses for other categories
        const categoriesExceptSelected = await Category.find({_id: { $ne: categoryId }});
        let id = categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id;

        let differentCategory = await Category.findOne({_id: id})
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: "ratingAndReviews",
        })
        .exec()

        // Get top-selling courses across all categories
        const allCategories = await Category.find()
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: "ratingAndReviews",
        })

        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        })

    }
    catch(error ) {

        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

export {createCategory, getAllCategories, getCategoryPageDetails};