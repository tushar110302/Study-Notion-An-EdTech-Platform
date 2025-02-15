import React from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignupForm'
import frame from "../../assets/Images/frame.png"
import {FcGoogle} from "react-icons/fc"
import { useSelector } from 'react-redux'

function FormTemplate({title, desc1, desc2, formType, formImage}) {
    const { loading } = useSelector((state) => state.auth);
  return (
    <div>
        {
            loading ? (<div className='spinner mx-auto'></div>) : 
            (
                <div className='flex justify-between w-11/12 max-w-maxContent md:flex-row flex-col-reverse py-12 mx-auto md:gap-x-12 gap-y-0'>
                    <div className='w-11/12 max-w-[450px] md:mx-0'>
                        <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'>{title}</h1>
                        <p className='text-[1.125rem] leading[1.625rem] mt-4'>
                            <span className='text-richblack-100'>{desc1}</span>
                            <span className='text-blue-100 italic font-edu-sa font-bold'>{desc2}</span>
                        </p>
                        {
                            formType === "login"?
                            (<LoginForm />):
                            (<SignUpForm />)
                        }

                        <div className='flex w-full items-center my-4 gap-x-2'>
                            <div className='w-full h-[1px] bg-richblack-700'></div>
                            <div className='text-richblack-700 font-medium leading[1.375rem]'>OR</div>
                            <div className='w-full h-[1px] bg-richblack-700'></div>
                        </div>

                        <button className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
                        border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 '>
                            <FcGoogle/>
                            <p>Sign up with Google</p>
                        </button>
                    </div>

                    <div className='relative w-11/12 max-w-[450px] mx-auto md:mx-0 my-auto'>
                        <img src={frame} width={558} height={504} loading='lazy'/>
                        <img src={formImage} width={558} height={504} loading='lazy' className='absolute -top-4 right-4 z-10'/>
                    </div>
                    
                </div>
            )
        }
    </div>
  )
}

export default FormTemplate