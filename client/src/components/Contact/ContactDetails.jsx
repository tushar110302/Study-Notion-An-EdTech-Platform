import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
import { contactDetails } from "../../data/contact-details"

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {contactDetails.map((item, index) => {
        let Icon = Icon1[item.icon] || Icon2[item.icon] || Icon3[item.icon]
        return (
          <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200" key={index}>
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} />
              <h1 className="text-lg font-semibold text-richblack-5">
                {item?.heading}
              </h1>
            </div>
            <p className="font-medium">{item?.description}</p>
            <p className="font-semibold">{item?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails
