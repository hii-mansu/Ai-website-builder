import { authClient } from "@/lib/auth-client";
import { Cross, Loader2, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserButton } from "@daveyplate/better-auth-ui";
import api from "@/config/axios";
import { toast } from "sonner";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [credits, setCredits] = useState(0);
  const [creditsLoading, setCreditsLoading] = useState<boolean>(true);

  const getCredits = async () => {
    try {
      setCreditsLoading(true)
      const { data } = await api.get("/api/user/credits");
      if (data) {
        console.log(data);
        setCredits(data.credit);
      }
      setCreditsLoading(false)
    } catch (error: any) {
      setCreditsLoading(false)
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getCredits();
    }
  }, [session?.user]);

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
          <Link
            key={item}
            to={item}
            className="relative overflow-hidden h-6 group"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item === "/"
                ? "Home"
                : item === "projects"
                  ? "My Projects"
                  : item}
            </span>
            <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-indigo-600">
              {item === "/"
                ? "Home"
                : item === "projects"
                  ? "My Projects"
                  : item}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop Buttons */}
      <div className="hidden ml-14 md:flex items-center gap-4">
        {!session?.user ? (
          <>
            <Link
              to="/auth/sign-in"
              className="border border-slate-300 hover:bg-slate-100 px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/auth/sign-up"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <UserButton size="icon" />
            <button className="text-white font-semibold py-1 flex flex-row gap-1 items-center bg-yellow-500 rounded-xl px-1 text-xs">
              Credits
              <span className="text-yellow-500 p-0.5 bg-white rounded-full font-semibold">{creditsLoading? <Loader2 size={10} className="animate-spin"/> : credits}</span>
            </button>
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-slate-700"
      >
        {open ? <span className="font-semibold text-3xl">X</span> : <Menu />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-slate-200 flex flex-col items-center gap-4 py-6 md:hidden shadow-lg">
          {["/", "projects", "Community", "Pricing"].map((item) => (
            <Link key={item} to={item} className="hover:text-indigo-600">
              {item === "/"
                ? "Home"
                : item === "projects"
                  ? "My Projects"
                  : item}
            </Link>
          ))}
          {!session?.user ? (
            <>
              <Link
                to="/auth/sign-in"
                className="border border-slate-300 hover:bg-slate-100 px-4 py-2 rounded-full text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/auth/sign-up"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <UserButton size="icon" />
              <button className="text-white bg-pink-300 rounded-xl px-2 py-1 text-sm">
                Credits{" "}
                <span className="text-orange-500 font-semibold">{credits}</span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
