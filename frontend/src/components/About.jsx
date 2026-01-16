import React from 'react'
import { Navbar } from './Navbar.jsx'

export const About = () => {
  return (
    <div className='min-h-screen w-full '>
        <Navbar/>
        {/* About section  */}
        <div className='min-h-screen w-full flex flex-col items-center mt-10'>
            <div className='shadow-[0_0_20px_0_rgba(0,0,0,0.2)] w-200  h-60 rounded-md  '>
                <h1 className='font-bold text-xl px-4'>About us</h1>
            </div>
        </div>
    </div>
  )
}
