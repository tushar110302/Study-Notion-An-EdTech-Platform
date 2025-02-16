import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { login } from "../../services/operations/authAPI"

function LoginForm() {
    const [formData, setFormData] = useState({email:"", password: ""})
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function changeHandler(e){
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }
    async function handleSubmit(e){
        e.preventDefault();
        await login(formData.email, formData.password, navigate, dispatch)
    }
  return (
    <form className="flex flex-col w-full gap-y-4 mt-6 my-auto" onSubmit={handleSubmit}>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input type='email' name='email' placeholder='example@test.xom' required value={formData.email} onChange={changeHandler} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'/>
        </label>
        

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input type={showPassword ? "text" : 'password'} placeholder='G47VIAgu' required value={formData.password} onChange={changeHandler} name='password' className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]' />
            <span onClick={() => setShowPassword(prev => !prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword ?  <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />: <AiOutlineEye fontSize={24} fill='#AFB2BF'/>}
            </span>
            <Link to={"/forgot-password"}>
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link>
            
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Log in
        </button>
    </form>
  )
}

export default LoginForm