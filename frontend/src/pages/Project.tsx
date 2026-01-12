import React, { useEffect, useRef, useState } from "react";
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
import DevPreview, {
  type ProjectPreviewRef,
} from "../components/Project/DevPreview";
import { dummyConversations, dummyProjects } from "../types/DummyData";
import api from "@/config/axios";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const ProjectPlayGround = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [device, setDevice] = useState<"desktop" | "mobile" | "tablet">(
    "desktop"
  );

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const previewRef = useRef<ProjectPreviewRef>(null);

  const fatchProject = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/user/project/${projectId}`);
      setProject(data.project);
      setIsGenerating(data.project.current_code ? false : true);
      setLoading(false);
      console.log(data);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
      setLoading(false);
    }
  };

  const downloadCode = async () => {
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code) {
      if (isGenerating) {
        return;
      }
      return;
    }
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "index.html";
    document.body.appendChild(element);
    element.click();
  };

  const publishProject = async () => {
    try {
      setIsPublishing(true);
      const { data } = await api.get(`/api/user/publish/${projectId}`);
      console.log(data);
      fatchProject();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
      setLoading(false);
    } finally{
      setIsPublishing(false)
    }
  };

  const saveProject = async () => {
    if (!previewRef.current) return;
    const code = previewRef.current?.getCode() || project?.current_code;
    if (!code) return;
    setIsSaving(true);
    try {
      const { data } = await api.put(`/api/project/save/${projectId}`, {
        code,
      });
      toast.success(data.message);
      setIsSaving(false);
    } catch (error: any) {
      setIsSaving(false);
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fatchProject();
    } else if (!isPending && !session?.user) {
      navigate("/");
      toast.warning("Login to view project");
    }
  }, [session?.user]);
  useEffect(() => {
    if (project && !project.current_code) {
      const intervall = setInterval(fatchProject, 10000);
      return () => clearInterval(intervall);
    }
  }, [project]);

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
      <div
        className="bg-blue-600/5 backdrop-blur-xl
        shadow-md shadow-blue-400/20 z-[50] flex flex-row sticky top-0 items-center gap-4 px-4 py-2"
      >
        {/*left*/}
        <div className=" flex flex-row gap-2 items-center justify-center">
          {/*<img src="/react.svg" alt="" className='h-5 cursor-pointer' />*/}
          <User
            onClick={() => navigate("/")}
            size={38}
            className="cursor-pointer"
          />
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
            to={`/project/${projectId}`}
            target="_blank"
            className="flex flex-row gap-1 px-3.5 py-1 rounded-md bg-violet-600 text-white hover:bg-violet-400 hover:text-white justify-center items-center text-sm"
          >
            <Fullscreen size={16} /> Preview
          </Link>
          <button
            onClick={downloadCode}
            disabled={!project?.current_code}
            className="flex flex-row gap-1 px-3.5 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-400 hover:text-white justify-center items-center text-sm"
          >
            <Download size={16} /> Download
          </button>
          <button
            onClick={publishProject}
            disabled={!project?.current_code}
            className="flex flex-row gap-1 px-3.5 py-1 rounded-md bg-green-600 text-white hover:bg-green-400 hover:text-white justify-center items-center text-sm"
          >
            {project.isPublished ? (
              <>
                {isPublishing? <Loader size={16} className="animate-spin" />: <EyeClosed size={16} />} Unpublish
              </>
            ) : (
              <>
                {isPublishing? <Loader size={16} className="animate-spin" />: <Eye size={16} />} Publish
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-row w-full items-center justify-between gap-2 px-4 py-2 h-full">
        <SideBar
          isMenuOpen={isMenuOpen}
          project={project}
          setProject={(p) => setProject(p)}
          isGenerating={isGenerating}
          setIsGenerating={setIsGenerating}
        />
        <DevPreview
          ref={previewRef}
          project={project}
          isGenerating={isGenerating}
          device={device}
        />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <p className="text-2xl text-blue-300 font-semibold">Project not found!</p>
    </div>
  );
};

export default ProjectPlayGround;
