import img from "../assets/Images/404.svg"
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
    return (
      <section className="m-auto">
        <div className="container px-6 py-12 mx-auto flex lg:flex-row flex-col-reverse gap-16 lg:items-center lg:gap-12">
            <div className="w-full lg:w-1/2 flex lg:items-start items-center flex-col">
                <p className="text-7xl my-3 bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">404 error</p>
                <h1 className="my-3 text-2xl font-semibold text-richblack-5  md:text-3xl">Page not found</h1>
                <p className="mt-4 text-pure-greys-200">Sorry, the page you are looking for doesn't exist.Here are some helpful links:</p>

                <div className="flex items-center mt-6 gap-x-3">
                    <button onClick={() => navigate(-1)} className="flex items-center justify-center px-6 py-4 text-white transition-all duration-200 bg-pure-greys-900 border-[1px] border-richblack-700 rounded-lg gap-x-2 hover:bg-pure-greys-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Go back</span>
                    </button>

                    <button onClick={() => navigate("/")} className="px-6 py-4 border-[1px] border-blue-200 tracking-wide text-white transition-all duration-200 bg-blue-200 rounded-lg hover:bg-blue-400 ">
                        Take me home
                    </button>
                </div>
            </div>

            <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
                <img loading="lazy" className="w-full max-w-lg lg:mx-auto" src={img} alt="" />
            </div>
        </div>
    </section>
    );
  }
  
  export default Error;