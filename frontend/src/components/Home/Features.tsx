import { CodeXml, DownloadCloud, PenTool } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <div className="flex flex-col gap-5 w-full mt-25">
      <div className="w-full text-center">
        <h1 className="text-2xl uppercase font-semibold text-slate-700">
          Our Workflow
        </h1>
        <div className="w-44 h-[3px] mx-auto rounded-full bg-gradient-to-r from-blue-600 to-[#DDD9FF]"></div>
      </div>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Understand how the platform helps you create websites efficiently in
        three simple steps.
      </p>
      <div className="relative max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-8 md:px-0 pt-10">
        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
            <PenTool color="blue"/>
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Prompt Your Idea
            </h3>
            <p className="text-sm text-slate-500">
              Enter your website requirements using simple text to describe
              layout, sections, and content clearly.
            </p>
          </div>
        </div>
        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
            <CodeXml color="red"/>
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Customize the Layout
            </h3>
            <p className="text-sm text-slate-500">
              Adjust sections, text, and structure easily to match your needs
              and preferences.
            </p>
          </div>
        </div>
        <div>
          <div className="size-10 p-2 bg-indigo-50 border border-indigo-200 rounded">
            <DownloadCloud color="green"/>
          </div>
          <div className="mt-5 space-y-2">
            <h3 className="text-base font-medium text-slate-600">
              Download the Code
            </h3>
            <p className="text-sm text-slate-500">
              Export the generated website code instantly for use, hosting, or
              further development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
