import { Rocket } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "../api/axios.js";

export const Login = () => {
    const location = useLocation();
    const expired = new URLSearchParams(location.search).get("expired");
    const {user, setUser, loading } = useAuth();
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    if(loading){
        return null;
    }
    if(user){
        return <Navigate to="/console" />
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            //login
            await axios.post("/auth/login", {
                email,
                password
            });
            //fetch 
            const me = await axios.get("/auth/me");
            setUser(me.data.data);
            navigate("/console");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password")
        }
    }

   
      
  return (
    
    <div className='min-h-screen w-full '>
            <div><h1 className='w-full text-center mt-20 text-xl font-medium'>Blog<span className='text-orange-500 font-bold text-3xl'>SaaS</span></h1></div>
        <div className='flex flex-col min-h-screen w-full justify-center items-center pb-90  mt-10'>
            <div className='flex '>
                <div className='flex flex-col '>
                {expired && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        Session expired. Please login again.
                    </p>
                    )}
                    <form action="" onSubmit={handleSubmit} className='flex flex-col px-20'>
                        <h1 className='font-bold text-center mb-2'>Login</h1>
                        <label className='text-sm font-bold text-black'>Email address <p className='text-[12px] font-normal text-black/60'>write the verified email with<br/> @gmail.com </p></label>
                        <input value={email}
  onChange={(e) => setEmail(e.target.value)} className='border rounded-[3px] outline-none px-2 py-0.5 mb-2' type="email"  />
                        <label className='text-sm font-bold text-black'>Password <p className='text-[12px] font-normal text-black/60'>The password must be of<br/> atleast 6 characters</p></label>
                        <input className='border rounded-[3px] outline-none px-2 py-0.5 mb-2' value={password}
  onChange={(e) => setPassword(e.target.value)}type="password" />
                        <button className='bg-[#FF9900] font-bold mt-3 py-1 px-5 hover:bg-[#cc7a00] cursor-pointer rounded-[3px]'>Sign in</button>
                    </form>
                </div>
                <div  className='divider border border-gray-300 '></div>
                <div className='flex flex-col mr-10 mt-10'>
                    <h1 className='font-bold mb-5 '>Try BlogSaaS for multitennant model</h1>
                    <p>If you already have account <br/> please <span onClick={() => navigate("/login")} className='text-blue-600 cursor-pointer hover:underline'>login</span> </p>
                    <Rocket className="w-60 h-20 mt-9" />
                </div>
            </div>
        </div>
    </div>
  )
}

