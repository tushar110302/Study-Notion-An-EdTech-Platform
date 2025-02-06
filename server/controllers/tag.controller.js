import { Tag } from "../models/tag.model.js";

const createTag = async (req, res) => {
    try {
        const {name, description} = req.body;
        if(!name || !description) {
            return res.status(400)
            .json({
                success: false,
                message: "Name and Description are required"
            });
        }
        const tag = await Tag.create({
            name,
            description
        });
        return res.status(200)
        .json({
            success: true,
            message: "Tag created successfully",
            tag
        })
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Could not create Tag"
        });
    }
}

const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        return res.status(200)
        .json({
            success: true,
            message: "Tags fetched successfully",
            tags
        });
    } catch (error) {
        return res.status(500)
        .json({
            success: false,
            message: "Could not fetch Tags"
        });
    }
}