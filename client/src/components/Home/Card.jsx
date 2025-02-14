import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

function Card({heading, description, level, lessonNumber, clickedCard, setClickedCard}) {
  return (
    <div className={`flex flex-col justify-evenly  lg:w-[30%] w-[360px] h-[300px] box-border cursor-pointer ${clickedCard === heading ? 'bg-white shadow-[12px_12px_0_0] shadow-yellow-50' : 'bg-richblack-800'} `} 
    onClick={() => setClickedCard(heading)}>
        <div className='h-[80%] p-6 flex flex-col gap-5'>
            <div className={`text-2xl  ${clickedCard === heading ? 'text-richblack-900' : 'text-white'}`}>{heading}</div>
            <div className='text-richblack-400 tracking-wide'>{description}</div>
        </div>

        <div className={`flex p-5 h-[20%] justify-between items-center ${clickedCard === heading ? 'text-blue-300' : 'text-richblack-400'}  border-t-[2px] border-dashed border-richblack-400`}>
            <div className='flex items-center gap-2 text-[16px]'>
                <HiUsers />
                {level}
            </div>
            <div className='flex items-center gap-2 text-[16px]'>
                <ImTree/>
                {lessonNumber} Lessons
            </div>
            

        </div>
    </div>
  )
}

export default Card