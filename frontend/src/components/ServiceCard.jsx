import React from 'react'

export const ServiceCard = ({text1,text, text2}) => {
  return (
    <div className="shadow-2xl transition-all duration-150 hover:shadow-[0_0_15px_rgba(34,197,94,0.8),0_0_30px_rgba(249,115,22,0.8),0_0_45px_rgba(234,179,8,0.8)] w-80 h-80 ml-10 mt-10 rounded-xl ">
        <div className="text-center h-30 w-full flex items-center justify-center font-bold text-2xl bg-linear-to-r from-blue-500 to-red-500 rounded-t-xl ">
            {text1}
        </div>
        <div className="group relative overflow-hidden h-50 w-full mt-3 px-4">
            <h1 className="font-semibold">{text}</h1>
            <span className="block mt-2 text-black/77 transition-all duration-500 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                {text2}
            </span>
            <p className="mt-5 text-blue-500 hover:underline">view more</p>
        </div>
    </div>
  )
}

