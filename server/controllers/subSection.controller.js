import {SubSection} from '../models/subSection.model.js';    
import {Section} from '../models/section.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';

const createSubSection = async (req, res) => {

    try {
        const {title, description, sectionID } = req.body;
        const videoUrl = req.file.path;
        if(!title || !description || !sectionID || !videoUrl){
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

        const newSubSection = await SubSection.create({
            title,
            duration: `${uploadVideo.duration}`,
            description,
            videoUrl: uploadVideo.url
        });
        const updatedSection = await Section.findByIdAndUpdate(sectionID,
            {
                $push: {
                    subSections: newSubSection._id
                }
            },
            {new: true}
        ).populate("subSections");

        console.log(updatedSection)

        return res.status(201).json({
            success: true,
            message: "SubSection created successfully",
            data: updatedSection
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
        const {title, description, subSectionID } = req.body;
        // CHECK IF ALL FIELDS ARE PROVIDED AND THINK WHAT TO DO IF ALL FIELDS ARE NOT PROVIDED
        const subSection = await SubSection.findById(subSectionID)
  
        if (!subSection) {
            return res.status(404).json({
            success: false,
            message: "SubSection not found",
            })
        }
    
        if (title !== undefined) {
            subSection.title = title
        }
    
        if (description !== undefined) {
            subSection.description = description
        }
        if (req.file && req.file.path !== undefined) {
            const video = req.file.path
            const uploadDetails = await uploadOnCloudinary(video)
            subSection.videoUrl = uploadDetails.secure_url
            subSection.duration = `${uploadDetails.duration}`
        }
    
        await subSection.save()
    
        return res.status(200).json({
            success: true,
            message: "SubSection is updated",
            data: subSection
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
        const {subSectionID, sectionId} = req.body;

        await Section.findByIdAndUpdate(sectionId,
            {
                $pull: {
                    subSections: subSectionID
                }
            }
        )
        await SubSection.findByIdAndDelete(subSectionID);

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