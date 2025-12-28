import { Delete, Download, Edit, Eye, User } from "lucide-react";
import React, { useRef, useState } from "react";

const Card: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const divRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const deleteProject = (projecId: string)=>{
    console.log("Delete project with ID:", projecId);
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative w-80 h-90 rounded-xl overflow-hidden cursor-pointer
        bg-pink-200 dark:bg-transparent shadow-sm shadow-gray-400"
    >
      {/* Blue glow */}
      <div
        className={`pointer-events-none absolute z-0 size-50 rounded-full
          bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400
          blur-3xl transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0"}`}
        style={{
          top: position.y - 120,
          left: position.x - 120,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 h-full w-full rounded-[11px]
        bg-white/80 dark:bg-transparent backdrop-blur-md
         flex flex-col items-center text-center"
      >
        
        <img
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="Profile"
          className="w-full h-[50%] shadow-md rounded-b-2xl"
        />
        

        <h2 className="text-md font-semibold mt-4 text-slate-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>


        <p className="text-sm text-slate-600 px-4 mb-3">
          Passionate about clean code, scalable systems, and solving real-world
          problems with elegant software.
        </p>

        <div className="flex flex-row justify-evenly gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md text-[10px] font-medium transition flex flex-row items-center gap-1"><Edit size={14}/><span>By - </span> Mansu Singh</button>
            <button className="bg-indigo-400 hover:bg-indigo-200 text-white px-2 py-1 rounded-md text-[10px] font-medium transition flex flex-row items-center gap-1"><Download size={14}/> Code</button>
            <button className="bg-pink-400 hover:bg-pink-700 text-white px-2 py-1 rounded-md"><Eye size={14}/></button>
            <button onClick={()=>deleteProject("22222222222")} className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md"><Delete size={14}/></button>
        </div>
      </div>
    </div>
  );
};

export default Card;
