import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {

  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  const fetchDetails = async () => {
    const courseData = await getFullDetailsOfCourse(courseId, token);
    // console.log("Course Data here... ", courseData.courseDetails)
    dispatch(setCourseSectionData(courseData.courseDetails.sections));
    dispatch(setEntireCourseData(courseData.courseDetails));
    dispatch(setCompletedLectures(courseData.completedVideos));

    let lectures = 0;
    courseData?.courseDetails?.sections?.forEach((sec) => {
      lectures += sec.subSections.length
    })
    dispatch(setTotalNoOfLectures(lectures));
  }

  useEffect(() => {
    fetchDetails();
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}
