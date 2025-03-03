import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row items-center justify-between pb-5 border-richblack-700">

              <img src={Logo} alt="" className="object-contain" />

                <div className="flex  gap-6 text-xl">
                  <div className="cursor-pointer hover:text-richblack-50 transition-all duration-200">
                        <Link to='/' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link>
                  </div>
                  <div className="cursor-pointer hover:text-richblack-50 transition-all duration-200">
                    <Link to='/about' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>About</Link>
                  </div>
                  <div className="cursor-pointer hover:text-richblack-50 transition-all duration-200" >
                    <Link to='/contact' onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Contact Us</Link>
                  </div>
                </div>

              <div className="flex gap-6 text-xl ">
                <FaFacebook className="cursor-pointer hover:text-richblack-50 transition-all duration-200"/>
                <FaGoogle className="cursor-pointer hover:text-richblack-50 transition-all duration-200"/>
                <FaTwitter className="cursor-pointer hover:text-richblack-50 transition-all duration-200"/>
                <FaYoutube className="cursor-pointer hover:text-richblack-50 transition-all duration-200"/>
              </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 "
                  } px-3 cursor-pointer hover:text-richblack-50 transition-all duration-200`}>
                  <Link to='/'>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Copyright © 2025 StudyNotion</div>
        </div>
      </div> 
    </div>
  );
};

export default Footer;
