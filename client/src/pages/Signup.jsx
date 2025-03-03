import React from 'react'
import FormTemplate from '../components/Auth/FormTemplate'
import signupImg from "../assets/Images/signup.webp"

function Signup() {

  return (
    <div className='my-auto'>
        <FormTemplate  
            title="Join the millions learning to code with StudyNotion for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            formImage={signupImg}
            formType="signup"
        />
    </div>
  )
}

export default Signup
