import { Cross, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-15 left-1/2 -translate-x-1/2 z-50
      w-[calc(100%-2rem)] flex flex-row justify-between items-center mx-auto md:w-[80%] md:justify-between px-6 py-4 rounded-full text-slate-800 text-sm bg-blue-600/5 backdrop-blur-xl
        border border-blue-100
        shadow-md shadow-blue-400/20"
    >
        <span className="bg-blue-400 w-35 md:w-45 h-10 rounded-full fixed left-[20%] top-1 -z-1 opacity-30  blur-xl animate-pulse"></span>
        <span className="bg-pink-300 w-35 md:w-45 h-10 rounded-full fixed right-[20%] bottom-1 -z-1 opacity-30  blur-xl animate-pulse"></span>

      <Link to="/">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="4.706" cy="16" r="4.706" fill="#2563EB" />
          <circle cx="16.001" cy="4.706" r="4.706" fill="#2563EB" />
          <circle cx="16.001" cy="27.294" r="4.706" fill="#2563EB" />
          <circle cx="27.294" cy="16" r="4.706" fill="#2563EB" />
        </svg>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 ml-7">
        {["/", "projects", "Community", "Pricing"].map((item) => (
          <Link key={item} to={item} className="relative overflow-hidden h-6 group">
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item === "/" ? "Home" : item === "projects" ? "My Projects" : item}
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-indigo-600">
              {item === "/" ? "Home" : item === "projects" ? "My Projects" : item}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden ml-14 md:flex items-center gap-4">
        <button className="border border-slate-300 hover:bg-slate-100 px-4 py-2 rounded-full text-sm font-medium transition">
          Login
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition">
          Signup
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-slate-700"
      >
        {open ? <span className="font-semibold text-3xl">X</span> : <Menu/>}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-slate-200 flex flex-col items-center gap-4 py-6 md:hidden shadow-lg">
          {["/", "projects", "Community", "Pricing"].map((item) => (
            <Link key={item} to={item} className="hover:text-indigo-600">
              {item === "/" ? "Home" : item === "projects" ? "My Projects" : item}
            </Link>
          ))}
          <button className="border border-slate-300 hover:bg-slate-100 px-4 py-2 rounded-full text-sm font-medium">
            Login
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium">
            Signup
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
