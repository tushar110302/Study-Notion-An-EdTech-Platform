import React from 'react'
import Instructor from "../../assets/Images/Instructor.png"
import UtilityButton from './UtilityButton'
import { FaArrowRight } from 'react-icons/fa'

function InstructorSection() {
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-20 items-center my-10'>
            <div className="lg:w-[50%]">
                <img
                src={Instructor}
                alt=""
                className="shadow-white shadow-[-20px_-20px_0_0]"
                />
            </div>
            <div className='flex flex-col gap-4 lg:w-[40%] items-center lg:items-start'>
                <div className="lg:w-[50%] text-4xl ">
                    Become an <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">instructor</span>
                </div>
                <p className="tracking-wide text-[15px] text-justify w-[90%] text-richblack-300">
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className="w-fit mt-6">
                    <UtilityButton text={
                        <div className="flex items-center gap-3">
                        Start Teaching Today
                        <FaArrowRight />
                        </div>
                    }
                    active={true}
                    to={"/signup"} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection