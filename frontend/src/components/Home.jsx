import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"

export const Home = () => {
    const { user, loading } = useAuth();

    if(loading) return null;
    if(user){
        return <Navigate to="/console" />
    }

    return (<div className="min-h-screen w-full">
    {/* Navbarbg-[#232B37] */}
    <nav className="flex justify-between items-center  px-10 py-4  shadow-md">
      <h1 className="text-xl font-bold">
        Blog<span className="text-orange-500">SaaS</span>
      </h1>
      <div className="space-x-4">
        <Link to="/about" className="text-sm font-medium hover:text-blue-500 transition-all duration-100 mr-10">About</Link>
        <Link to="/contact" className="text-sm font-medium hover:text-blue-500 transition-all duration-100 mr-10">Contact us</Link>
        <Link to="/login" className="text-sm font-medium transition-all duration-200 hover:bg-black/30 px-2 py-2">
          Sign In
        </Link>
        <Link
          to="/register"
          className=" px-8 py-4 
  bg-slate-900 
  text-white 
  rounded-full 
  font-semibold
  transition-all 
  duration-300
  hover:shadow-[0_0_20px_rgba(99,102,241,0.8),0_0_40px_rgba(99,102,241,0.4)]"
        >
          Sign Up
        </Link>
      </div>
    </nav>

    {/* Hero Section */}
    <div className="h-64 w-full top-0 flex flex-col items-center text-center bg-linear-to-br pt-10 from-blue-900 to-black/70 px-6">
      <h2 className="text-4xl font-bold mb-4 px-4 py-2  bg-linear-to-r from-yellow-500 to-purple-500">
        Multitenant Blogging SaaS
      </h2>
      <p className=" max-w-xl text-white/70">
        A secure, organisation-based blogging platform with IAM,
        role-based access, and console experience.
      </p>

      <Link
        to="/register"
        className="mt-8 bg-orange-500 text-white px-6 py-2 transition-all 
  duration-300
  hover:shadow-[0_0_20px_rgba(99,102,241,0.8),0_0_40px_rgba(99,102,241,0.4)] rounded hover:bg-orange-600"
      >
        Get Started
      </Link>
    </div>
  </div>
);

}