import React from 'react'
import UtilityButton from './UtilityButton';
import { FaArrowRight } from 'react-icons/fa';

function TextBlock({heading, subHeading, btn1, btn2}) {

  return (
    <div className='flex flex-col w-[100%] lg:w-[50%] gap-8 lg:items-start items-center'>
        <div className='text-4xl text-center lg:text-left'>
            {heading}
        </div>
        <div className='text-richblack-300 text-base font-bold w-[85%] -mt-3'>
            {subHeading}
        </div>

        <div className='flex gap-7 mt-7 lg:justify-start justify-center'>
            <UtilityButton 
                text={
                    <div className='flex items-center gap-2'>
                        {btn1.text}
                        <FaArrowRight className='text-xs'/>
                    </div>} 
                active={btn1.active}
                to={btn1.to}
                />
            <UtilityButton {...btn2} />
        </div>
    </div>
  )
}

export default TextBlock