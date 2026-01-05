import { Bot, Loader, Send, User } from "lucide-react";
import type { Message, Project, Version } from "../../types";
import { useEffect, useRef, useState, type FormEvent } from "react";

interface sideBarProps {
    isMenuOpen: boolean;
    project: Project;
    setProject: (project:Project)=> void;
    isGenerating: boolean;
    setIsGenerating: (isGenerating:boolean)=> void;
}

const SideBar = ({isMenuOpen, project, setProject, isGenerating, setIsGenerating}: sideBarProps) => {
    const [userPrompt, setUserPrompt] =  useState<string>("");
    const messageRef =  useRef<HTMLDivElement>(null);

    const handleRollBack = async(versionId: string)=>{

    }

    const handleChat = async(e:FormEvent)=>{
        e.preventDefault();
        setIsGenerating(true);
    }

    useEffect(()=>{
        if(messageRef.current){
            messageRef.current.scrollIntoView({behavior: 'smooth'});
        }
    },[project.conversation.length, isGenerating]);
  return (
    <div className={`h-full sm:max-w-sm py-2 bg-transparent transition-all ${isMenuOpen ? "max-sm:w-0 overflow-hidden": "w-full"}`}>
        <div className="flex flex-col h-full">
            <div className="flex flex-col flex-1 gap-4 overflow-y-auto no-scrollbar px-3">
                {[...project.conversation, ...project.versions].sort((a,b)=>new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()).map((message)=> {
                    const isMessage = 'content' in message;
                    if(isMessage){
                        const msg = message as Message;
                        const isUser = msg.role === 'user';
                        return(
                            <div key={msg?.id} className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                                {
                                    isUser? (
                                        <div className="flex flex-col bg-blue-600 text-white p-2 rounded-lg rounded-tr-none">
                                            <User size={18} color="#f7f7f7"/>
                                            <p className="text-sm">{msg.content}</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col bg-gray-200 p-2 rounded-lg rounded-tl-none">
                                            <Bot size={18} color="#0f0100"/>
                                            <p className="text-sm">{msg.content}</p>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }else{
                        const ver = message as Version;
                        return(
                            <div className="w-4/5 mx-auto my-2 p-3 rounded-xl bg-gray-800 text-gray-100 shadow flex flex-col gap-2">
                                <div>code updated on <br/> 
                                <span className="text-gray-600 text-xs ">{new Date(ver.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    {project.current_version_index === ver.id ? 
                                    (<button className="rounded-md bg-gray-600 text-white px-2 py-0.5">Current Version</button>)
                                    :(
                                        <button onClick={()=>handleRollBack(ver.id)} className="rounded-md bg-blue-600 text-white px-2 py-0.5">Roll Back to</button>
                                    )
                                }
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <form onSubmit={handleChat} className="m-2 mb-16 relative max-w-full border-2 overflow-hidden border-blue-600 rounded-xl p-2 bg-white shadow-lg">
                <div className="flex flex-row gap-2 items-center justify-between w-full">
                    <textarea disabled={isGenerating} value={userPrompt} onChange={(e)=>setUserPrompt(e.target.value)}  rows={4} className="w-full outline-none text-sm text-blue-600" placeholder="Write your prompt to Ai."/>
                    <button disabled={isGenerating || !userPrompt.trim()} className="flex flex-row absolute right-0 bottom-0 hover:bg-blue-700 hover:gap-2.5 gap-1 items-center justify-center px-4 py-1 rounded-tl-md bg-blue-600 text-white">{
                        isGenerating ? (<><Loader size={16} className="animate-spin" /> Generating..</>) : (<><Send size={16} /> Send</>)
                        }</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SideBar