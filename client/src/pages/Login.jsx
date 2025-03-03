import React from 'react'
import FormTemplate from '../components/Auth/FormTemplate'
import loginImg from "../assets/Images/login.webp"

function Login() {

  return (
    <div className='my-auto'>
        <FormTemplate 
            title="Welcome Back"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            formImage={loginImg}
            formType="login"
        />
    </div>
  )
}

export default Login