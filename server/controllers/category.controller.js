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

export {createCategory, getAllCategories};