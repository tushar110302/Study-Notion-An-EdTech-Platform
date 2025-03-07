import React, { useEffect, useState } from 'react'
import {  useForm } from 'react-hook-form'
import CountryCode from '../data/countrycode.json'
import { apiConnector } from '../services/apiConnector';

function ContactUsForm() {
    const [loading, setLoading] = useState(false);
    const {
        register, 
        handleSubmit, 
        reset, 
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    async function onSubmit(data) {
        console.log(data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", "/contact", data);
            // console.log(response)

            setLoading(false);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstName: "",
                lastName:"", 
                phone: "",
                message: "",
            })
        }
    }, [reset, isSubmitSuccessful])
  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor='firstName' className="lable-style">
                    First Name
                </label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter first name"
                        className="form-style"
                        {...register("firstName", { required: true })}
                    />
                
                {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your name.
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastname" className="lable-style">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter last name"
                    className="form-style"
                    {...register("lastName")}
                />
                
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="lable-style">
                Email Address
            </label>
            <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="form-style"
            {...register("email", { required: true })}
            />
            
            {errors.email && (
            <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Email address.
            </span>
            )}
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="phonenumber" className="lable-style">
                Phone Number
            </label>

            <div className="flex gap-5">
                <div className="flex w-[81px] flex-col gap-2">
                    <select
                    name="dropdown"
                    id="dropdown"
                    className="form-style"
                    {...register("countrycode", { required: true })}
                    >
                    {CountryCode.map((ele, i) => {
                        return (
                        <option key={i} value={ele.code}>
                            {ele.code} -{ele.country}
                        </option>
                        )
                    })}
                    </select>
                </div>
                <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                    <input
                    type="number"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="12345 67890"
                    className="form-style"
                    {...register("phone", {
                        required: {
                        value: true,
                        message: "Please enter your Phone Number.",
                        },
                        maxLength: { value: 12, message: "Invalid Phone Number" },
                        minLength: { value: 10, message: "Invalid Phone Number" },
                    })}
                    />
                </div>
            </div>
            
            {errors.phone && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                    {errors.phone.message}
                </span>
            )}
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="message" className="lable-style">
                Message
            </label>
            <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            className="form-style"
            {...register("message", { required: true })}
            />
            
            {errors.message && (
            <span className="-mt-1 text-[12px] text-yellow-100">
                Please enter your Message.
            </span>
            )}
        </div>

        <button disabled={loading} type="submit" className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${ !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"}  disabled:bg-richblack-500 sm:text-[16px] `}>
            Send Message
        </button>

    </form>

  )
}

export default ContactUsForm