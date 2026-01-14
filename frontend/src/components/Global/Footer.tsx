import React from "react";
import mansuAi from "/mansuAi.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
      <div className="absolute inset-0 pointer-events-none select-none bottom-0 left-0 opacity-15 flex flex-row gap-3 items-center justify-center">
        <img src={mansuAi} alt="Mansu AI Logo" />
        <h1 className="text-blue-400 text-7xl font-extrabold">Mansu's Ai</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 z-5 lg:grid-cols-3 gap-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex flex-row gap-1 items-center">
            <div
              className="w-28 mb-[-18px] h-12 bg-blue-700"
              style={{
                WebkitMaskImage: `url(${mansuAi})`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskImage: `url(${mansuAi})`,
                maskRepeat: "no-repeat",
                maskSize: "contain",
              }}
            />
            <h1 className="text-blue-700 text-2xl font-semibold">Mansu's Ai</h1>
          </Link>
          <p className="text-sm/7 mt-6">
            Build straightforward web page using predefined layouts, clear sections, and minimal configuration for faster setup.
          </p>
        </div>
        <div className="flex flex-col lg:items-center lg:justify-center">
          <div className="flex flex-col text-sm space-y-2.5">
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <Link className="hover:text-slate-600 transition" to="/about-us">
              About us
            </Link>
            <Link className="hover:text-slate-600 transition" to="/">
              Home
            </Link>
            <Link className="hover:text-slate-600 transition" to="/community">
              Community
            </Link>
            <Link className="hover:text-slate-600 transition" to="/privacy-policy">
              Privacy policy
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-5">
            Subscribe to our newsletter
          </h2>
          <div className="text-sm space-y-6 max-w-sm">
            <p>
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="flex items-center">
              <input
                className="rounded-l-md bg-gray-100 outline-none w-full max-w-64 h-11 px-3"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-linear-to-b from-indigo-600 to-indigo-800 cursor-pointer hover:from-indigo-700 hover:to-indigo-900 transition px-4 h-11 text-white rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-t mt-6 border-slate-200">
        <p className="text-center">
          Copyright 2025 © <a href="https://mansusingh.in">Mansu Singh</a> All
          Right Reserved.
        </p>
        <div className="flex items-center gap-4">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
          <a href="/">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
