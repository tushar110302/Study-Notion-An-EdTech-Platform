import React from 'react'
import { TypeAnimation } from "react-type-animation"

function CodeBlock({text, codeColor, backgroundGradient}) {
  return (
    <div className=' h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] '>
        {backgroundGradient}
        <div className='text-center flex flex-col w-[10%] select-none text-richblack-400 font-inter font-bold '>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
        <TypeAnimation
            sequence={[text, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
        />
        </div>
    </div>
  )
}

export default CodeBlock