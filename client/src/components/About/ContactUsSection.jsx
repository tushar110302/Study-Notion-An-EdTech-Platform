import React from 'react'
import ContactUsForm from '../ContactUsForm'

function ContactUsSection() {
  return (
    <div className="mx-auto my-20">
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactUsSection