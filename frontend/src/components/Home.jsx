import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"

export const Home = () => {
    const { user, loading } = useAuth();

    if(loading) return null;
    if(user){
        return <Navigate to="/console" />
    }

    return (<div className="min-h-screen w-full">
    {/* Navbar */}
    <nav className="flex justify-between items-center px-10 py-5 border-b">
      <h1 className="text-xl font-bold">
        Blog<span className="text-orange-500">SaaS</span>
      </h1>
      <div className="space-x-4">
        <Link to="/login" className="text-sm font-medium hover:underline">
          Sign In
        </Link>
        <Link
          to="/register"
          className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
        >
          Sign Up
        </Link>
      </div>
    </nav>

    {/* Hero Section */}
    <div className="flex flex-col items-center text-center mt-32 px-6">
      <h2 className="text-4xl font-bold mb-4">
        Multitenant Blogging SaaS
      </h2>
      <p className="text-gray-600 max-w-xl">
        A secure, organisation-based blogging platform with IAM,
        role-based access, and AWS-style console experience.
      </p>

      <Link
        to="/register"
        className="mt-8 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
      >
        Get Started
      </Link>
    </div>
  </div>
);

}