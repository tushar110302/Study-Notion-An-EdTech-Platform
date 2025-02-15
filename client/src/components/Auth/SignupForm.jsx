import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setSignupData} from "../../slices/authSlice";
import { sendOtp } from "../../services/operations/authAPI"

function SignUpForm() {

    const [formData, setFormData] = useState({fname: "", lname: "", email:"", password: "", confirmPassword: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("student");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function changeHandler(e){
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }
        const signupData = {...formData, accountType};

        dispatch(setSignupData(signupData));
        sendOtp(formData.email, navigate, dispatch);

        setFormData({fname: "", lname: "", email:"", password: "", confirmPassword: ""});
        setAccountType("student");
    }

  return (
    <div>
        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button className={`${accountType === "student" ? "bg-richblack-900 text-richblack-5"
            : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType('student')}>
                Student
            </button>
            <button className={`${accountType === "instructor" ? "bg-richblack-900 text-richblack-5"
            : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType('instructor')}>
                Instructor
            </button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='flex gap-x-4 mt-[20px]'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        First Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input type='text' name='fname' placeholder='First Name' required value={formData.fname} onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' />
                </label>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Last Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input type='text' name='lname' placeholder='Last Name' required value={formData.lname} onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'  />
                </label>
            </div>
            
            <div className='mt-[20px]'>
                <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Email Address<sup className='text-pink-200'>*</sup>
                    </p>

                    <input type='email' name='email' placeholder='example@test.xom' required value={formData.email} onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'/>
                </label>
            </div>
            
            <div className='w-full flex gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Create Password<sup className='text-pink-200'>*</sup>
                    </p>

                    <input type={showPassword ? "text" : 'password'} placeholder='G47VIAgu' required value={formData.password} onChange={changeHandler} name='password' className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'/>
                    <span onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-[38px] cursor-pointer' >
                        {showPassword ?  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>: <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
                    </span>
                </label>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Confirm Password<sup className='text-pink-200'>*</sup>
                    </p>
                    <input type={showConfirmPassword ? "text" : 'password'} placeholder='G47VIAgu' required name='confirmPassword' value={formData.confirmPassword} onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'/>
                    <span onClick={() => setShowConfirmPassword(prev => !prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                        {showPassword ?  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>: <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
                    </span>
                </label>
            </div>
           

            <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>Sign in</button>
        </form>
    </div>
  )
}

export default SignUpForm
