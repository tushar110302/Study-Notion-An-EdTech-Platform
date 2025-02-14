import React, { useState } from 'react'
import { HomePageExplore } from '../../data/homepage-explore';
import Card from './Card';

const tabs =[ "Free", "New to coding", "Most popular", "Skills paths", "Career paths"]
function ExploreMore() {
    const [currentTab, setCurrentTab] = useState(tabs[[0]]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [clickedCard, setClickedCard] = useState(HomePageExplore[0].courses[0].heading);

    const handleClick = (tab) => {
        setCurrentTab(tab);
        const res = HomePageExplore.filter((ele) => ele.tag === tab);
        setCourses(res[0].courses);
        setClickedCard(res[0].courses[0].heading);
    }

  return (
    <div className='my-14 flex flex-col items-center'>
        <div className='text-4xl text-center'>
             Unlock the <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Power of Code</span>
        </div>
        <p className='text-richblack-300 text-base text-center lg:mt-3 my-5'>Learn to Build Anything You Can Imagine</p>

        <div className=' hidden lg:flex mt-6  lg:-mb-10 text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {tabs.map((tab, index) => (
                <div key={index} className={` ${index == tabs.length-1 ? 'rounded-e-full' : '' } ${index==0 ? 'rounded-s-full' : ''} ${tab == currentTab ? 'bg-richblack-900 font-medium text-richblack-5' : 'bg-richblue-800'} px-5 py-2 cursor-pointer transition-all duration-200  hover:bg-richblack-900 hover:text-richblack-5 border border-richblack-800`} onClick={() => handleClick(tab)} >
                    {tab}
                </div>
            ))}
        </div>
        <div className="hidden lg:block lg:h-[200px]"></div>

        <div className='flex gap-10 justify-center lg:absolute lg:translate-y-[50%] lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%]  text-black lg:mb-0 mb-7 lg:px-0 px-3'>
            {courses.map((course, index) => (
                <Card key={index} 
                    heading={course.heading} 
                    description={course.description} 
                    level={course.level} 
                    lessonNumber={course.lessonNumber} 
                    clickedCard={clickedCard}
                    setClickedCard={setClickedCard}
                    />
            ))}
        </div>

    </div>
  )
}

export default ExploreMore