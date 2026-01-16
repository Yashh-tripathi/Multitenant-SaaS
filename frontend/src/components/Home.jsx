import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"
import { ServiceCard } from "./ServiceCard.jsx";
import { Navbar } from "./Navbar.jsx";

export const Home = () => {
    const { user, loading } = useAuth();

    if(loading) return null;
    if(user){
        return <Navigate to="/console" />
    }

    return (<div className="min-h-screen w-full">
    {/* Navbarbg-[#232B37] */}
    <Navbar/>
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
      <Link to="/about" className="flex justify-around"> 
        <ServiceCard text1="Create Blog" text="Know who can create blog!" text2="Only the admin can create blogs and post. Once created the user who creates it gets the access as admin."   />
        <ServiceCard text1="View Organisational Blogs" text="who has the authority?" text2="The blogs can be seen by anyone of the organisation but can be liked and reviewed only by member."   />
        <ServiceCard text1="Create organisation or request access to admin" text="what access?" text2="The user need to request access to the admin to become the member of organisation to access the blogs."   />
      </Link>
  </div>
);

}