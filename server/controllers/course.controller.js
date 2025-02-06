import {Course} from '../models/course.model.js';
import {Tag} from '../models/tag.model.js';
import {User} from '../models/user.model.js';

const createCourse = async (req, res) => {
 try {
    const {courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;
    const thumbnail = req.file.path;

    if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
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
            message: "Could not upload thumbnail"
        });
    }   

    const tagDetails = await findById(tag);
    if(!tagDetails){
        return res.status(400).json({
            success: false,
            message: "Tag not found"
        });
    }

    const course = await Course.create({
        courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        tag,
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

    await Tag.findByIdAndUpdate(tag,
        {
            $push: {
                course: course._id
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
            thumbnail: 1
        }).populate("instructor", "name");

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