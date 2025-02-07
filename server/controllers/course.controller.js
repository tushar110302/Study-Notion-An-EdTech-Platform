import {Course} from '../models/course.model.js';
import {Category} from '../models/category.model.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const createCourse = async (req, res) => {
 try {
    const {courseName, courseDescription, whatYouWillLearn, price, category } = req.body;
    const thumbnail = req.file.path;

    if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const instructorId = req.user._id;
    const instructor = await User.findById(instructorId);
    console.log(instructor);
    console.log(req.user._id);

    const uploadThumbnail = await uploadOnCloudinary(thumbnail); 
    if(!uploadThumbnail){
        return res.status(400).json({
            success: false,
            message: "Could not upload thumbnail on Cloudinary"
        });
    }   

    const categoryDetails = await Category.findById(category);
    if(!categoryDetails){
        return res.status(400).json({
            success: false,
            message: "category not found"
        });
    }

    const course = await Course.create({
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        category,
        instructor: instructorId,
        thumbnail: uploadThumbnail.url
    });

    await User.findByIdAndUpdate(instructorId, 
        {
            $push: {
                courses: course._id
            }
        },
        {new: true}
    );

    await Category.findByIdAndUpdate(category,
        {
            $push: {
                courses: course._id
            }
        },
        {new: true}
    );
    return res.status(200).json({
        success: true,
        message: "Course created successfully",
        course
    });
 } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Could not create course"
    }); 
 }
}

const getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({}, {
            courseName: 1,
            price: 1,
            instructor: 1,
            ratingAndReview: 1,
            studentsEnrolled: 1,
            category: 1,
            thumbnail: 1
        }).populate("instructor");

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            allCourses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not fetch courses"
        }); 
    }
}

const getCourseById = async (req, res) => { 
    try {
        const {courseId} = req.body;
        if(!courseId){
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        const course = await Course.findById(courseId)
        .populate({
            path: "instructor",
            populate: {
                path: "profileDetails"
            }
        })
        .populate("category")
        .populate({
            path: "sections",
            populate: {
                path: "subSections"
            }
        })
        .populate("ratingAndReview");

        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }   

        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            data: course
        });
    
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not fetch course"
        });
    }
}
export {createCourse, getAllCourses, getCourseById};