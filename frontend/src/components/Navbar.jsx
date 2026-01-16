import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
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

    )
}