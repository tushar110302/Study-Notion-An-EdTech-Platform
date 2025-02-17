import React from 'react'
import Know_your_progress from "../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../assets/Images/Plan_your_lessons.svg";
import UtilityButton from './UtilityButton';

function LearnLanguageSection() {
  return (
    <div>
        <div className='flex flex-col gap-4 my-10'>
            <div className='text-4xl text-center my-10"'>
                Your swiss knife for <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Learning Language</span>
            </div>
            <div className='text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3"'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
                <img
                    src={Know_your_progress}
                    loading='lazy'
                    alt=""
                    className="object-contain  lg:-mr-32 "
                />
                <img
                    src={Compare_with_others}
                    loading='lazy'
                    alt=""
                    className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"
                />
                <img
                    src={Plan_your_lessons}
                    loading='lazy'
                    alt=""
                    className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16"
                />
            </div>
            <div className='lg:mb-20 mb-8 mt-7 w-fit mx-auto '>
                <UtilityButton text={"Learn More"} active={true} to={"/signup"} />
            </div>
        </div>
    </div>
  )
}

export default LearnLanguageSection