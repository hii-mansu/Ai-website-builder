import type { Project } from "@/types";
import { Delete, DonutIcon, Eye, EyeClosed, EyeIcon, Loader } from "lucide-react";
import React, { useRef, useState } from "react";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import api from "@/config/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

type CardProps = {
  project: Project;
  reFatch: ()=> void;
};


const Card: React.FC<CardProps> = ({project, reFatch}) => {

  console.log(project);
  const navigate = useNavigate();
    const { data: session } = authClient.useSession();
    const [loading, setLoading] = useState(false);



  const deleteProject = async(projecId: string)=>{
    if(!session?.user){
      return navigate('/auth/sign-in');
    }
    const confirm = window.confirm('Do you want to delete this project?.');
    if(!confirm) return;
    try {
      setLoading(true);
      const {data} = await api.delete(`/api/project/delete/${projecId}`);
      reFatch();
      toast.success(data.message || 'Project deleted.');
      reFatch();
    } catch (error) {
      toast.error('Error accured');
    } finally{
      setLoading(false);
    }
  }

  return (
    <div
      className="relative w-80 h-90 rounded-xl overflow-hidden
        bg-pink-200 dark:bg-transparent shadow-sm shadow-gray-400"
    >

      {/* Content */}
      <div
        className="relative z-10 h-full w-full rounded-[11px]
        bg-white/80 dark:bg-transparent backdrop-blur-md
         flex flex-col items-center text-center"
      >
        

        <div className="w-full h-[200px] border rounded overflow-hidden flex items-center justify-center bg-blue-300/50">
      {project.current_code ? <iframe
        srcDoc={project.current_code}
        className="w-full h-full"
        sandbox="allow-same-origin"
        scrolling="no"
      /> : <span className="text-center text-2xl font-bold text-gray-500">No preview</span>}
    </div>
        

        <h2 className="text-md font-semibold mt-4 text-slate-900">
          {project.name}
        </h2>


        <p className="text-xs text-slate-600 px-4 mb-3">
          {project.initial_prompt.slice(0,35)+"...."}
        </p>

        <div className="flex flex-row justify-around w-full p-2 text-xs">
          <div className="flex flex-col gap-1">
            <p className="font-semibold justify-self-start text-gray-500">Created on :</p>
            <p className="text-gray-400">{moment(project.createdAt).format("DD MMM YYYY")}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-gray-500">Updated on :</p>
            <p className="text-gray-400">{moment(project.updatedAt).format("DD MMM YYYY")}</p>
          </div>
        </div>

        <div className="flex flex-row justify-evenly gap-2">
            <button className="bg-blue-100/85 hover:bg-gray-200 cursor-not-allowed text-blue-600 px-2 py-1 rounded-md text-[10px] font-medium transition flex flex-row items-center gap-1">{project.isPublished? <><EyeIcon size={14}/>Published</> : <><EyeClosed size={14}/>Private</>}</button>
            <button onClick={()=>navigate(`/projects/${project.id}`)} className="bg-indigo-400 hover:bg-indigo-200 text-white px-2 py-1 rounded-md text-[10px] font-medium transition flex flex-row items-center justify-center gap-1"><DonutIcon size={14}/> Edit</button>
            <button disabled={!project.current_code || project.current_code==='' || project.current_code===undefined} onClick={()=>navigate(`/preview/${project.id}`)} className="bg-pink-400 hover:bg-pink-700 text-white px-2 py-1 rounded-md"><Eye size={14}/></button>
            <button onClick={()=>deleteProject(project.id)} className="flex flex-row gap-1 items-center justify-center bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md text-xs">{loading? <><Loader className="animate-spin" size={14}/>Deleting..</> : <><Delete size={14}/>Delete</>}</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
