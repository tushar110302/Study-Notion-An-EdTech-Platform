import React from 'react'
import UtilityButton from '../Home/UtilityButton';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highliteText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

function LearningGrid() {
  return (
    <div className='grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12"'>
        {
            LearningGridArray.map((item, index) => (
                <div key={index} 
                className={` ${index ==0 && "xl:col-span-2 xl:h-[294px]"} ${index%2==1 ? "bg-richblack-700 h-[294px]" : item.order % 2 === 0 ? "bg-richblack-800 h-[294px]" : "bg-transparent"} ${item.order === 3 && "xl:col-start-2"} `} >
                    {
                        item.order<0 ? 
                        (
                            <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                <div className="text-4xl font-semibold ">
                                    {item.heading}
                                    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                                    {item.highliteText}
                                    </span>
                                </div>
                                <p className="text-richblack-300 font-medium">
                                {item.description}
                                </p>

                                <div className="w-fit mt-2">
                                <UtilityButton text={item.BtnText} active={true} to={item.BtnLink} />
                                </div>
                            </div>
                        ) :
                        (
                            <div className="p-8 flex flex-col gap-8">
                                <h1 className="text-richblack-5 text-lg">{item.heading}</h1>

                                <p className="text-richblack-300 font-medium">
                                    {item.description}
                                </p>
                            </div>
                        )
                    }
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid