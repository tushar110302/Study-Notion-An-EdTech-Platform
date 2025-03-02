import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from "react-icons/fa"
import UtilityButton from '../components/Home/UtilityButton'
import banner from "../assets/Images/banner.mp4"
import TextBlock from '../components/Home/TextBlock'
import CodeBlock from '../components/Home/CodeBlock'
import LearnLanguageSection from '../components/Home/LearnLanguageSection'
import TimelineSection from '../components/Home/TimelineSection'
import InstructorSection from '../components/Home/InstructorSection'
import ReviewSlider from '../components/ReviewSlider'
import Footer from '../components/Footer'
import ExploreMore from '../components/Home/ExploreMore'

function Home() {
  return (
    <div>
        <div className='relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white'>
            <Link to={"/signup"} >
                <div className='group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none'>
                  <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become An Instructor</p>
                    <FaArrowRight />
                  </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold '>
              Empower Your Future with <span className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold'>Coding Skills</span>
            </div>

            <div className='-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
              With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='mt-8 flex flex-row gap-7'>
                <UtilityButton text={"Learn More"} active={true} to={"/signup"}/>
                <UtilityButton text={"Book a Demo"} active={false} to={"/login"}/>
            </div>

            <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
              <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
                  <source src={banner} type='video/mp4' />
              </video>
            </div>

            <div className='flex flex-row lg:my-20 my-10 justify-between gap-10 '>
              <TextBlock 
                heading={<div>Unlock your <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">coding potential</span> with our online courses.</div>}
                subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."} 
                btn1={{text:"Try it Yourself", active:true, to:"/signup"}}
                btn2={{text:"Learn More", active:false, to:"/login"}} 
                />
              <CodeBlock
                text={`<!DOCTYPE html>\n<html>\n<head> <title>Example</title> <linkrel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1> <a href="/">Header</a>\n</h1>\n<nav> <a href="one/">One</a>\n<a href="two/">Two</a\n<a href="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-25"}
                backgroundGradient={<div className='codeblock1 absolute'></div>}
              />
            </div>

            <div className='flex flex-row lg:my-20 my-10 justify-between gap-10'>
              <CodeBlock
                text={`<!DOCTYPE html>\n<html>\n<head> <title>Example</title> <linkrel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1> <a href="/">Header</a>\n</h1>\n<nav> <a href="one/">One</a>\n<a href="two/">Two</a\n<a href="three/">Three</a>\n</nav>`}
                codeColor={"text-white"}
                backgroundGradient={<div className='codeblock2 absolute'></div>}
              />
              <TextBlock 
                heading={<div>Start  <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">coding in seconds</span></div>}
                subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."} 
                btn1={{text:"Continue Lesson", active:true, to:"/signup"}}
                btn2={{text:"Learn More", active:false, to:"/login"}} 
                
                />
            </div>
            
            <ExploreMore/>
        </div>

        <div className='bg-pure-greys-5 text-richblack-700'>
          <div className='homepage_bg h-[333px]'>

              <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">

                  <div className="lg:h-[150px]"></div>
                  <div className='flex gap-7 text-white lg:mt-8'>
                    <UtilityButton 
                      text={
                        <div className='flex items-center gap-2'>
                          Explore Full Catalog
                          <FaArrowRight className='text-xs'/>
                        </div>
                      } 
                      active={true}
                      to={"/signup"}
                      />
                    <UtilityButton
                      text={"Learn More"}
                      active={false}
                      to={"/login"} />
                  </div>
              </div>
          </div>

          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
              <div className='mb-10 mt-[-100px] flex flex-col lg:justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
                <div className='text-4xl lg:w-[45%] text-center lg:text-left '>
                  Get the skills you need for a <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">job that is in demand.</span>
                </div>
                <div className='lg:w-[40%] flex flex-col gap-10 lg:items-start items-center'>
                  <div className='text-[16px] text-center lg:text-left'>
                    The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                  </div>
                  <UtilityButton text={"Learn More"} active={true} to={"/signup"} />
                </div>
              </div>

              <TimelineSection />
              <LearnLanguageSection />
          </div>

        </div>

        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
          <InstructorSection />

          <h1 className="text-center text-4xl my-10">
            Reviews from other learners
          </h1>
          <ReviewSlider />
        </div>

      <Footer />
         
    </div>
  )

}

export default Home