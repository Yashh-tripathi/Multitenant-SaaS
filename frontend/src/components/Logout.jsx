import React from 'react'

export const Logout = ({onclick}) => {
  return (
    <button   
                onClick={onclick}
                className="relative overflow-hidden ml-10 mb-4  px-6 py-2 font-medium text-black shadow-2xl bg-white/20 rounded-3xl  transition-all duration-500 group w-30 cursor-pointer ">
                <h1 className="relative z-10 group-hover:text-white duration-900">Logout</h1>
                <span className="absolute inset-0 w-full h-full  bg-red-700 transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-900"></span> 
            </button>
  )
}
