import type { Project } from "@/types";
import { DonutIcon, Eye, EyeClosed, EyeIcon } from "lucide-react";
import moment from 'moment'
import { useNavigate } from "react-router-dom";

type CardProps = {
  project: Project;
};


const PublicCard: React.FC<CardProps> = ({project}) => {

  console.log(project);
  const navigate = useNavigate();


  return (
    <div
      className="relative w-80 h-90 rounded-xl overflow-hidden
        bg-pink-200 dark:bg-transparent shadow-sm shadow-gray-400"
    >

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
            <button className="bg-blue-100/85 hover:bg-gray-200 cursor-not-allowed text-blue-600 px-2 py-1 rounded-md text-xs font-medium transition flex flex-row items-center gap-1"><span className="font-semibold">By ⦿ </span>{project.user?.name}</button>
            <button disabled={!project.current_code || project.current_code==='' || project.current_code===undefined} onClick={()=>navigate(`/Community/${project.id}`)} className="flex flex-row items-center justify-center px-2 py-1 text-xs rounded-md gap-1 bg-pink-400 hover:bg-pink-700 text-white
            "><Eye size={14}/>View</button>
        </div>
      </div>
    </div>
  );
};

export default PublicCard;
