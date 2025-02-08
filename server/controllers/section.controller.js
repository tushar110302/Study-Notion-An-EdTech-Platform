import { Section } from "../models/section.model.js";
import { Course } from "../models/course.model.js";
import { SubSection } from "../models/subSection.model.js";

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
            path: "sections",
            populate: { path: "subSections" }
        });

        return res.status(201).json({
            success: true,
            message: "Section is created",
            data: updatedCourse
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
            data: updatedSection
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
        // const {sectionId} = req.params;
        const {sectionId, courseId} = req.body;

        // await Course.findByIdAndUpdate(courseId,
        // {
        //     $pull: {
        //         sections: sectionId
        //     }
        // })
        const section = await Section.findByIdAndDelete(sectionId);

        await SubSection.deleteMany({
            _id:{
                $in: section.subSections
            }
        })
        return res.status(200).json({
            success: true,
            message: "Section is deleted Successfully "
        });
        

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Exception Occurred!! Unable to delete section",
            error: error.message
        });
    }
}

export {createSection, updateSection, deleteSection};