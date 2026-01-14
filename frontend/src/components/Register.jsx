import React, { useState } from 'react'
import { Rocket } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from "../api/axios";

export const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {user, loading} = useAuth();
    if(loading) return null;
    if(user) {
        return <Navigate to="/console" />
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
          await axios.post("/auth/register", {
            name,
            email,
            password
          });
    
          // after successful registration → login page
          navigate("/login");
        } catch (err) {
          setError(err.response?.data?.message || "Registration failed");
        }
      };
    
  return (
    <div className='min-h-screen w-full '>
            <img src="/background.png" alt="" />
            <div><h1 className='w-full text-center mt-20 text-xl font-medium'>Blog<span className='text-orange-500 font-bold text-3xl'>SaaS</span></h1></div>
        <div className='flex flex-col min-h-screen w-full justify-center items-center pb-90 '>
            <div className='flex '>
                <div className='flex flex-col mr-10 mt-10'>
                    <h1 className='font-bold mb-5 '>Try BlogSaaS for multitennant model</h1>
                    <p>If you already have account <br/> please <span onClick={() => navigate("/login")} className='text-blue-600 cursor-pointer hover:underline'>login</span> </p>
                    <Rocket className="w-60 h-20 mt-9" />
                </div>
                <div  className='divider border border-gray-300 '></div>
                <div className='flex flex-col '>
                    <form action="" onSubmit={handleSubmit} className='flex flex-col px-20'>
                        <label className='text-sm font-bold text-black' htmlFor="name" >Name <p className='text-[12px] font-normal text-black/60'>write a name for your account</p></label>
                        <input type="text" value={name}
              onChange={(e) => setName(e.target.value)} className='border rounded-[3px] outline-none px-2 py-0.5 mb-2'   />
                        <label className='text-sm font-bold text-black' htmlFor="email">Email address <p className='text-[12px] font-normal text-black/60'>write the verified email with<br/> @gmail.com </p></label>
                        <input  value={email}
              onChange={(e) => setEmail(e.target.value)} className='border rounded-[3px] outline-none px-2 py-0.5 mb-2' type="email"   />
                        <label className='text-sm font-bold text-black' htmlFor="password">Password <p className='text-[12px] font-normal text-black/60'>The password must be of<br/> atleast 6 characters</p></label>
                        <input  value={password}
              onChange={(e) => setPassword(e.target.value)} className='border rounded-[3px] outline-none px-2 py-0.5 mb-2' type="password"  />
                        {error && (
              <p className="text-red-500 text-sm mb-2">{error}</p>
            )}

                        <button className='bg-[#FF9900] font-bold mt-3 py-1 px-5 hover:bg-[#cc7a00] cursor-pointer rounded-[3px]'>register user</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

