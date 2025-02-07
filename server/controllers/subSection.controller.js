import {subSection} from '../models/subSection.model.js';    
import {Section} from '../models/section.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';

const createSubSection = async (req, res) => {

    try {
        const {title, duration, description, sectionID } = req.body;
        const videoUrl = req.file.path;
        if(!title || !duration || !description || !sectionID || !videoUrl){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const uploadVideo = await uploadOnCloudinary(videoUrl);
        if(!uploadVideo){
            return res.status(400).json({
                success: false,
                message: "Could not upload video"
            });
        }

        const savedSubSection = await subSection.create({
            title,
            duration,
            description,
            videoUrl: uploadVideo.url
        });
        const updatedSection = await Section.findByIdAndUpdate(sectionID,
            {
                $push: {
                    subSections: savedSubSection._id
                }
            },
            {new: true}
        ).populate("subSections");

        console.log(updatedSection)

        return res.status(201).json({
            success: true,
            message: "SubSection created successfully",
            updatedSection
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message
        });
    }
}

const updateSubSection = async (req, res) => {
    try {
        const {title, duration, description, subSectionID } = req.body;
        // CHECK IF ALL FIELDS ARE PROVIDED AND THINK WHAT TO DO IF ALL FIELDS ARE NOT PROVIDED
        const updatedSubSection = await subSection.findByIdAndUpdate(subSectionID, {
            title,
            duration,
            description
        }, {new: true});

        return res.status(200).json({
            success: true,
            message: "SubSection is updated",
            updatedSubSection
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update subSection"
        });
    }
}

const deleteSubSection = async (req, res) => {
    try {
        const {subSectionID} = req.params;

        await subSection.findByIdAndDelete(subSectionID);

        return res.status(200).json({
            success: true,
            message: "SubSection is deleted"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete subSection"
        });
    }
}

export {createSubSection, updateSubSection, deleteSubSection};