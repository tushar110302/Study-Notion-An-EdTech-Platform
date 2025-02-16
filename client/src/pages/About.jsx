import React from 'react'
import banner1 from '../assets/Images/aboutus1.webp'
import banner2 from '../assets/Images/aboutus2.webp'
import banner3 from '../assets/Images/aboutus3.webp'
import foundingImage from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/About/StatsComponent'
import Footer from '../components/Footer'
import LearningGrid from '../components/About/LearningGrid'
import ContactUsSection from '../components/About/ContactUsSection'
import ReviewSlider from '../components/Home/ReviewSlider'

function About() {
  return (
    <div>
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-3 text-white text-center'>
            <h1 className='text-4xl font-semibold pt-20 lg:w-[70%]'>
                Driving Innovation in Online Education for a <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">Brighter Future</span>
            </h1>
            <p className='tracking-wide text-base font-medium text-richblack-300 lg:w-[65%]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            <div className='grid grid-cols-3  gap-5 lg:gap-10 mt-10'>
                <img src={banner1} alt=""  />
                <img src={banner2} alt="" />
                 <img src={banner3} alt="" />  
            </div>
        </div>

        <div className='border-b border-richblack-700  '>
            <div className='mx-auto my-10 p-10 w-11/12 max-w-maxContent text-white text-center text-4xl font-semibold '>
                We are passionate about revolutionizing the way we learn. Our innovative platform 
                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                    {" "}
                    combines technology
                </span>, 
                <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
                    {" "}
                    expertise 
                </span>
                , and community to create an 
                <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
                    {" "}
                    unparalleled educational experience
                </span>.
            </div>
        </div>

        <div className='mx-auto my-20 w-11/12 max-w-maxContent flex flex-col-reverse lg:flex-row items-center justify-between text-richblack-500 lg:gap:0 gap-14 lg:text-left text-center'>
            <div className='lg:w-[45%] flex flex-col gap-8'>
                <h3 className=' bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent'>Our Founding Story</h3>
                <p className='text-base font-medium text-richblack-300 '>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>
                <p className='text-base font-medium text-richblack-300'>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>
            <div className='lg:w-[40%]'>
                <img src={foundingImage} className="shadow-[0_0_20px_0] shadow-[#FC6767]"/>
            </div>
        </div>

        <div className='mx-auto my-28 w-11/12 max-w-maxContent flex flex-col lg:flex-row items-center justify-between text-richblack-500 lg:gap:0 gap-14 lg:text-left text-center'>
            <div className='lg:w-[40%] flex flex-col gap-8 items-center justify-between'>
                <h3 className=' bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent'>Our Vision</h3>
                <p className='text-base font-medium text-richblack-300 '>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>
            </div>
            <div className='lg:w-[45%] flex flex-col gap-8 items-center justify-between'>
                <h3 className=' bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold'>Our Mission</h3>
                <p className='text-base font-medium text-richblack-300 '>
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
            </div>
        </div>

        <div className='bg-richblack-700  text-white'>
            <StatsComponent />
        </div>

        <div className="mx-auto my-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
            <LearningGrid />
            <ContactUsSection />
        </div>

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            {/* Reviws from Other Learner */}
            <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
            </h1>
            <ReviewSlider />
        </div>

        <Footer />

    </div>
  )
}

export default About