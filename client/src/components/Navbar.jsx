import { Link, NavLink } from "react-router-dom"
import logo from '../assets/Logo/Logo-Full-Light.png'
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { TiArrowSortedDown } from "react-icons/ti";
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import ProfileDropDown from "./Auth/ProfileDropDown"
import { apiConnector } from "../services/apiConnector"

import { categories } from "../services/api"

function Navbar(){

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector(state => state.profile)
    const {totalItems} = useSelector(state => state.cart)
    const [catalogLinks, setCatalogLinks] = useState([])

    console.log(token , user, totalItems)

    async function fetchCatalogLinks(){
        try {
            const response = await apiConnector("GET",categories.CATEGORY_API )
            setCatalogLinks(response.data.data);

        } catch (error) {
            console.log("COULD NOT FETCH CATALOG LINKS")
        }
    }

    useEffect(() => {
        fetchCatalogLinks();
    }, [])


    return(
        <header  className="border-b border-richblack-700">
            <nav className=" flex flex-wrap justify-between items-center mx-auto py-2 px-10 w-11/12">
                <Link to="/">
                    <img src={logo} className="mr-3 h-8" alt="Logo" />
                </Link>
                <div className="lg:block hidden">
                    <ul className='text-richblack-100 flex gap-8 '>
                        <li>
                            <NavLink to="/" className={ ({isActive}) => ` ${isActive ? "text-yellow-50" : "text-richblack-25 " } `}>Home</NavLink>
                        </li>
                        <li>
                            <div  className='text-richblack-25'>
                                <div className="relative flex items-center gap-1 group">
                                    <p>Catalog</p>
                                    <TiArrowSortedDown />
                                    {
                                        catalogLinks.length > 0 &&
                                            <div className="lg:w-[300px] transition-all duration-200 z-[1000] bg-richblack-5 p-4 rounded-lg flex flex-col absolute top-10 -left-28 invisible opacity-0 group-hover:visible group-hover:opacity-100">
                                                <div className="h-6 w-6 top-0 translate-y-[-40%] left-40 translate-x-[30%]  bg-richblack-5 absolute rotate-45 rounded -z-10 transition-all duration-200"></div>
                                                {
                                                    catalogLinks.map((item) => (
                                                        <Link to={`/catalog/${item.name.split(" ").join("-").toLowerCase()}`} className="rounded-lg bg-transparent text-black py-4 pl-4 hover:bg-richblack-50" key={item._id}>
                                                            {item.name}
                                                        </Link>

                                                    ))
                                                }
                                            </div>
                                    }

                                </div>
                            </div>
                        </li>
                        <li>
                            <NavLink to="/about" className={ ({isActive}) => ` ${isActive ? "text-yellow-50" : "text-richblack-25 " } `}>About Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={ ({isActive}) => ` ${isActive ? "text-yellow-50" : "text-richblack-25 " } `}>Contact Us</NavLink>
                        </li>
                    </ul>
                </div>
                <div className='md:flex items-center gap-4 hidden'>
                    {
                        user && user?.accountType !== "Instructor" &&
                        <Link to={"/dashboard/cart"} className="relative">
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                                {
                                    totalItems > 0 &&
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                }
                        </Link>
                    }
                    {
                        token === null &&
                            <Link to="/login" >
                                <button className='bg-richblack-800 text-richblack-100 py-[8px] hover:text-richblack-5 px-[18px] rounded-[8px] border border-richblack-700 hover:border-richblack-5'>
                                    Log In
                                </button>
                            </Link>
                    }
                    
                    {
                        token === null &&
                            <Link to="/signup">
                                <button className='bg-richblack-800 text-richblack-100 py-[8px] hover:text-richblack-5 px-[18px] rounded-[8px] border border-richblack-700 hover:border-richblack-5'>
                                    Sign Up
                                </button>
                            </Link>
                    }
                    {/* {
                        isLoggedIn &&
                            <Link to="/">
                                <button onClick={() => {
                                    toast.success("Logged Out")
   
                                }} className='bg-richblack-800 text-richblack-100 py-[8px] hover:text-richblack-5 px-[18px] rounded-[8px] border border-richblack-700 hover:border-richblack-5'>
                                    Log Out
                                </button>
                            </Link>
                    }
                    {
                        isLoggedIn &&
                            <Link to="dashboard">
                                <button className='bg-richblack-800 text-richblack-100 py-[8px] hover:text-richblack-5 px-[18px] rounded-[8px] border border-richblack-700 hover:border-richblack-5'>
                                    Dashboard
                                </button>
                            </Link>
                    } */}
                    {
                        token && <ProfileDropDown />
                    }
                    

                </div>
                <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </nav>
        </header>
    )
}

export default Navbar