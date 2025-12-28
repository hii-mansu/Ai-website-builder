import { ArrowBigRight } from "lucide-react";
import React from "react";

const MidBanner = () => {
  return (
      <div className="flex mt-25 mb-[-70px] flex-col md:flex-row items-center justify-around text-sm border-2 border-violet-700 rounded-2xl m-2 w-full md:w-[80%] mx-auto">
        <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800">
            Boost your productivity.
            <br />
            Start using our app today.
          </h2>

          <div className="flex items-center gap-4 mt-6">
            <button
              type="button"
              aria-label="getStarted"
              className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
            >
              Upgrade
            </button>
            <button
              type="button"
              className="group flex items-center gap-2 px-7 py-2.5 active:scale-95 transition"
            >
              Pricing
              <ArrowBigRight />
            </button>
          </div>
        </div>

        <img
          className="max-w-[375px] z-[-1] pt-10 md:p-0"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/appDownload/excitedWomenImage.png"
          alt="excitedWomenImage"
        />
      </div>
  );
};

export default MidBanner;
