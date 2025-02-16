import React from 'react'

function StatsComponent() {
  return (
    <div className='w-11/12 max-w-maxContent grid grid-cols-2 lg:grid-cols-4 text-center mx-auto'>
        <div className='flex flex-col gap-1 items-center py-10'>
            <p className='text-3xl font-bold'>5K</p>
            <p className='font-semibold text-[16px] text-richblack-500'>Active Students</p>
        </div>
        <div className='flex flex-col gap-1 items-center py-10'>
            <p className='text-3xl font-bold'>10+</p>
            <p className='font-semibold text-[16px] text-richblack-500'>Mentors</p>
            
        </div>
        <div className='flex flex-col gap-1 items-center py-10'>
            <p className='text-3xl font-bold'>200+</p>
            <p className='font-semibold text-[16px] text-richblack-500'>Courses</p>
        </div>
        <div className='flex flex-col gap-1 items-center py-10'>
            <p className='text-3xl font-bold'>50+</p>
            <p className='font-semibold text-[16px] text-richblack-500'>Awards</p>
        </div>
    </div>
  )
}

export default StatsComponent