import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Footer from "../components/Footer"
import Course_Card from "../components/Catalog/Course_Card"
import Course_Slider from "../components/Catalog/Course_Slider"

import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")

  const fetchCategory = async () => {
    try {
      const res = await fetchCourseCategories();
      const category_id = res.filter((ele) => ele.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
      setCategoryId(category_id);

    } 
    catch (error) {
      console.log("Could not fetch Categories.", error);
    }
  }
  const getCatalogData = async () => {
    try {
      console.log(categoryId)
      const res = await getCatalogPageData(categoryId);
      console.log("CATALOG DATA FETCHED");
      console.log(res);
      setCatalogPageData(res);
    } 
    catch (error) {
      console.log(error);
    }
  }

  // Fetch All Categories
  useEffect(() => {
    fetchCategory();
  }, [catalogName])

  useEffect(() => {
    if (categoryId) {
      getCatalogData();
    }
  }, [categoryId])

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p className={`px-4 py-2 ${active === 1? "border-b border-b-yellow-25 text-yellow-25": "text-richblack-50"} cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p className={`px-4 py-2 ${ active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          {
            active === 1 ? 
            (
              <Course_Slider Courses={catalogPageData?.data?.mostSellingCourses} />
            ) : 
            (
              <Course_Slider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
            )
          }
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <Course_Slider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
