import {Course} from '../models/course.model.js';
import {Category} from '../models/category.model.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { convertSecondsToDuration } from '../utils/secToDuration.js';
import { CourseProgress } from '../models/courseProgress.model.js';
import { Section } from '../models/section.model.js';
import { SubSection } from '../models/subSection.model.js';

const createCourse = async (req, res) => {
 try {
    const {courseName, courseDescription, whatYouWillLearn, price, category, tag, status } = req.body;
    const thumbnail = req.file.path;

    if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }
    const tags = JSON.parse(tag)
    if (!status || status === undefined) {
        status = "Draft"
    }

    const instructorId = req.user._id;

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
        thumbnail: uploadThumbnail.url,
        tag: tags,
        status
    });

    await User.findByIdAndUpdate(instructorId, 
        {
            $push: {
                courses: course._id
            }
        }
    );

    await Category.findByIdAndUpdate(category,
        {
            $push: {
                courses: course._id
            }
        }
    );
    return res.status(200).json({
        success: true,
        message: "Course created successfully",
        data: course
    });
 } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Could not create course"
    }); 
 }
}
const editCourse = async (req, res) => {
    try {

      const { courseId } = req.body
      const updates = Object.fromEntries(req.body.entries ? req.body.entries() : Object.entries(req.body));
      console.log(typeof updates)
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.path
        const thumbnailImage = await uploadOnCloudinary(thumbnail)
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        console.log(key)
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "profileDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "sections",
          populate: {
            path: "subSections",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}
const getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user._id
      const courseDetails = await Course.findOne({ _id: courseId})
        .populate({
          path: "instructor",
          populate: {
            path: "profileDetails",
          },
        })
        // .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "sections",
          populate: {
            path: "subSections",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      let totalDurationInSeconds = 0
      courseDetails.sections.forEach((content) => {
        content.subSections.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.duration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}
const getInstructorCourses = async (req, res) => {
    try {

      const instructorId = req.user._id
      const instructorCourses = await Course.find({instructor: instructorId,}).sort({ createdAt: -1 })

      res.status(200).json({
        success: true,
        data: instructorCourses,
      })

    } 
    catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
      })
    }
}
const getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find({ status: "Published" }, {
            courseName: true,
            price: true,
            instructor: true,
            ratingAndReview: true,
            studentsEnrolled: true,
            category: true,
            thumbnail: true
        }).populate("instructor");

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: allCourses
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not fetch courses"
        }); 
    }
}

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.sections
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSections
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Remove the course from the category
    const categoryId = course.category;
    await Category.findByIdAndUpdate(categoryId, {
      $pull: {courses: courseId}
    })
    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
const getCourseById = async (req, res) => { 
  try {
    const { courseId } = req.body;
    console.log(courseId)
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "profileDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "sections",
        populate: {
          path: "subSections",
          select: "-videoUrl",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0;
    courseDetails.sections.forEach((content) => {
      content.subSections.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } 
  catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
export {createCourse, editCourse, getAllCourses, getFullCourseDetails, getInstructorCourses, deleteCourse, getCourseById};