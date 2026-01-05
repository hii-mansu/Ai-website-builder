import React, { useEffect, useState } from "react";
import type { Project } from "../types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Riple } from "react-loading-indicators";
import {
  Download,
  Eye,
  EyeClosed,
  Fullscreen,
  Laptop,
  Loader,
  MessageCircle,
  Save,
  Smartphone,
  Tablet,
  User,
} from "lucide-react";
import SideBar from "../components/Project/SideBar";
import DevPreview from "../components/Project/DevPreview";
import { dummyConversations, dummyProjects } from "../types/DummyData";

const ProjectPlayGround = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { projectId } = useParams();
  const navigate = useNavigate();

  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [device, setDevice] = useState<"desktop" | "mobile" | "tablet">(
    "desktop"
  );

  const [isSaving, setIsSaving] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const fatchProject = async () =>{
    const projectt = dummyProjects.find(project => project.id === projectId);
    setTimeout(()=>{
      if(projectt){
        setProject({...projectt, conversation: dummyConversations});
        setLoading(false);
        setIsGenerating(projectt.current_code ? false : true);
      }
    },2000)
  }

  const downloadCode = async () => {};

  const publishProject = async () => {};

  const saveProject = async () => {};

  useEffect(()=>{
    fatchProject();
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-full flex justify-center items-center h-screen">
          <Riple color="#353ee8" size="medium" text="" textColor="" />
        </div>
      </>
    );
  }

  return project ? (
    //main
    <div className="flex mt-[-85px] flex-col h-screen w-full">
      {/* nav */}
      <div className="flex flex-row sticky top-0 items-center gap-4 px-4 py-2 border-b-2 border-blue-400">
        {/*left*/}
        <div className=" flex flex-row gap-2 items-center justify-center">
          {/*<img src="/react.svg" alt="" className='h-5 cursor-pointer' />*/}
          <User onClick={() => navigate("/")} size={38} className="cursor-pointer" />
          <div className="flex flex-col justify-center">
            <p className="text-gray-500 text-[16px]">Project Name</p>
            <p className="text-gray-400 text-[14px]">Current working version</p>
          </div>
        </div>
        <div className="sm:hidden flex flex-1 justify-end">
          {isMenuOpen ? (
            <MessageCircle
              onClick={() => setIsMenuOpen(false)}
              className="text-blue-600 size-7 cursor-pointer"
            />
          ) : (
            <Eye
              onClick={() => setIsMenuOpen(true)}
              className="text-blue-600 size-7 cursor-pointer"
            />
          )}
        </div>
        {/*right*/}
        <div className="flex flex-row gap-2 bg-blue-600 px-2 py-2 rounded-2xl">
          <Smartphone
            onClick={() => setDevice("mobile")}
            className={`size-7 rounded-md cursor-pointer p-1 ${
              device === "mobile" ? "bg-white text-blue-600" : "text-white"
            }`}
          />
          <Tablet
            onClick={() => setDevice("tablet")}
            className={`size-7 rounded-md cursor-pointer p-1 ${
              device === "tablet" ? "bg-white text-blue-600" : "text-white"
            }`}
          />
          <Laptop
            onClick={() => setDevice("desktop")}
            className={`size-7 rounded-md cursor-pointer p-1 ${
              device === "desktop" ? "bg-white text-blue-600" : "text-white"
            }`}
          />
        </div>

        {/*Right left */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <button
            onClick={saveProject}
            className="flex flex-row gap-1 px-3.5 py-1 rounded-md bg-pink-600 text-white hover:bg-pink-400 hover:text-white justify-center items-center text-sm"
          >
            {isSaving ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}{" "}
            Save
          </button>
          <Link
            to={`/project/${projectId}/settings`}
            target="_blank"
            className="flex flex-row gap-1 px-3.5 py-1 rounded-md bg-violet-600 text-white hover:bg-violet-400 hover:text-white justify-center items-center text-sm"
          >
            <Fullscreen size={16} /> Preview
          </Link>
          <button
            onClick={downloadCode}
            className="flex flex-row gap-1 px-3.5 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-400 hover:text-white justify-center items-center text-sm"
          >
            <Download size={16} /> Download
          </button>
          <button
            onClick={publishProject}
            className="flex flex-row gap-1 px-3.5 py-1 rounded-md bg-green-600 text-white hover:bg-green-400 hover:text-white justify-center items-center text-sm"
          >
            {project.isPublished ? (
              <>
                <EyeClosed size={16} /> Unpublish
              </>
            ) : (
              <>
                <Eye size={16} /> Publish
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-row w-full items-center justify-between gap-2 px-4 py-2 h-full">
        <SideBar isMenuOpen={isMenuOpen} project={project} setProject={(p)=>setProject(p)} isGenerating={isGenerating} setIsGenerating={setIsGenerating}/>
        <DevPreview />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl text-blue-300 font-semibold">Project not found!</p>
    </div>
  );
};

export default ProjectPlayGround;
