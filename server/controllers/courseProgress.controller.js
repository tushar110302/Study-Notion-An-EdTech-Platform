import {SubSection} from "../models/subSection.model.js";
import {CourseProgress} from "../models/courseProgress.model.js"

const updateCourseProgress = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req.user._id;

    const subSection = await SubSection.findById(subSectionId)
    if (!subSection) {
      return res.status(404).json({ 
        success: false,
        message: "Invalid subsection ID", 
      });
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    })

    if (!courseProgress) {

      return res.status(404).json({
        success: false,
        message: "Course Progress Not Found",
      })

    } 
    else {

      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({ 
          success: false,
          message: "Subsection already completed",
        });
      }

      courseProgress.completedVideos.push(subSectionId);
      await courseProgress.save();
  
      return res.status(200).json({ 
        success: true,
        message: "Course progress updated",
      });
    }

  } 
  catch (error) {

    return res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: error.message 
    });
  }
}
export {updateCourseProgress};
// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }
