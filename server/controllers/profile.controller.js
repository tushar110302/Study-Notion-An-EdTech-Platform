import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {CourseProgress} from "../models/courseProgress.model.js";
import {Course} from "../models/course.model.js";
import { convertSecondsToDuration } from '../utils/secToDuration.js';

const updateProfile = async (req, res) => {
    try {
        const { gender, dateOfBirth="", about="", phone } = req.body;
        const userId = req.user._id;

        if( !phone){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const presentUser = await User.findById(userId);
        const profile = await Profile.findById(presentUser.profileDetails);

        profile.gender = gender ? gender : profile.gender;
        profile.dateOfBirth = dateOfBirth ? dateOfBirth : profile.dateOfBirth;
        profile.about = about ? about : profile.about;
        profile.phone = phone ? phone : profile.phone;

        await profile.save();

        const user = await User.findById(userId).populate("profileDetails");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: Could not update profile",
            error: error.message
        });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        await Profile.findByIdAndDelete(user.profileDetails);
        await User.findByIdAndDelete(userId);

        // REMOVE STUDENT FROM ALL COURSES

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });
  
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: Could not delete account",
            error: error.message
        });
    }
}

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("profileDetails");    

        return res.status(200).json({
            success: true,
            message: "User details retrieved successfully",
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: Could not get user details",
            error: error.message
        });
    }
}

const updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user._id;
        const profileImage = req.file.path;

        const user = await User.findById(userId);
        const uploadResponse = await uploadOnCloudinary(profileImage, 1000, 1000);

        user.profileImage = uploadResponse.url;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Display picture updated successfully",
            data: user
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error: Could not update display picture",
            error: error.message
        });
    }
}

const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user._id;
        let user = await User.findById(userId)
        .populate({
            path: "courses",
            populate:{
                path: "sections",
                populate: {
                    path: "subSections",
                },
            }
        });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user = user.toObject();
        let subsectionLength = 0;

        for (let i = 0; i < user.courses.length; i++) {
            let totalDurationInSeconds = 0;
            subsectionLength = 0;

            for (let j = 0; j < user.courses[i].sections.length; j++) {

                totalDurationInSeconds += user.courses[i].sections[j].subSections.reduce((acc, curr) => acc + parseInt(curr.duration), 0);
                user.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);
                subsectionLength += user.courses[i].sections[j].subSections.length;
            }        

            let courseProgressCount = await CourseProgress.findOne({
                courseId: user.courses[i]._id,
                userId: userId,
            });
            courseProgressCount = courseProgressCount?.completedVideos.length;
            if (subsectionLength === 0) {
                user.courses[i].progressPercentage = 100;
            } 
            else {
                user.courses[i].progressPercentage = Math.round((courseProgressCount / subsectionLength) * 100 ) 
            }
        }

        return res.status(200).json({
            success: true,
            message: "Enrolled courses retrieved successfully",
            data: user.courses
        });
    }
    catch (error) { 
        return res.status(500).json({
            success: false,
            message: "Server error: Could not get enrolled courses",
            error: error.message
        });
    }   
}
const instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user._id });
  
        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats;
        })
  
        return res.status(200).json({ 
            success: true,
            message: "Instructor Dashboard Data fetched Successfully",
            data: courseData 
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error" 
        }); 
    }
  }
export { updateProfile, deleteAccount ,getUserDetails, updateDisplayPicture, getEnrolledCourses, instructorDashboard};