import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { setSignupData} from "../../slices/authSlice";
import { sendOtp } from "../../services/operations/authAPI"
import { ACCOUNT_TYPE } from '../../utils/constants';

function SignUpForm() {

    const [formData, setFormData] = useState({firstName: "", lastName: "", email:"", password: "", confirmPassword: ""});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function changeHandler(e){
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }
        const signupData = {...formData, accountType};

        dispatch(setSignupData(signupData));
        await sendOtp(formData.email, navigate, dispatch);

        setFormData({firstName: "", lastName: "", email:"", password: "", confirmPassword: ""});
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

  return (
    <div>
        <div className='mx-auto md:mx-0 flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
            <button className={`${accountType === ACCOUNT_TYPE.STUDENT ? "bg-richblack-900 text-richblack-5"
            : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}>
                Student
            </button>
            <button className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR ? "bg-richblack-900 text-richblack-5"
            : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>
                Instructor
            </button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='flex gap-x-4 mt-[20px]'>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        First Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input type='text' name='firstName' placeholder='First Name' required value={formData.firstName} onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' />
                </label>
                <label className='w-full'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                        Last Name<sup className='text-pink-200'>*</sup>
                    </p>
                    <input type='text' name='lastName' placeholder='Last Name' required value={formData.lastName} onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'  />
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
