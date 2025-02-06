import { Section } from "../models/section.model";
import { Course } from "../models/course.model";

const createSection = async (req, res) => {
    try {
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Section Name && Course ID is required"
            });
        }
        const newSection = await Section.create({
            sectionName,
        });

        const updatedCourse = await Course.findByIdAndUpdate(courseId, 
            {
                $push: {
                    sections: newSection._id
                }
            },
            {new: true}
        )
        .populate("category", "name")
        .populate({
            path: "section",
            populate: { path: "subSection" }
        });

        return res.status(201).json({
            success: true,
            message: "Section is created",
            updatedCourse
        });
    } catch (error) {
        return res.status(500).json({
            success: false, 
            message: "Unable to create section"
        });
    }
}

const updateSection = async (req, res) => {
    try {
        const {sectionName, sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success: false,
                message: "Section Name and ID is required"
            });
        }
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName}, {new: true});

        return res.status(200).json({
            success: true,
            message: "Section is updated",
            updatedSection
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update section"
        });
    }
}

const deleteSection = async (req, res) => {
    try {
        const {sectionId} = req.params;
        // DELETING FROM COURSE 
        await Section.findByIdAndDelete(sectionId);

        return res.status(200).json({
            success: true,
            message: "Section is deleted"
        });
        

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section"
        });
    }
}

export {createSection, updateSection, deleteSection};