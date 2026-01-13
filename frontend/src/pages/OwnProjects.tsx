import React, { useEffect, useState } from 'react'
import type { Project } from '../types';
import { Riple } from 'react-loading-indicators';
import Card from '../components/OwnProjects/Card';
import { Bot, Pen } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import api from '@/config/axios';

const OwnProjects = () => {

  const { data: session, isPending } = authClient.useSession();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const fatchProjects = async ()=>{
    if(!session?.user && !isPending){
      toast.warning('Signin to view your projects.');
      navigate('/auth/sign-in');
      return
    }
    try {
      setLoading(true);
      const {data} = await api.get('/api/user/projects');
      setProjects(data.projects);
    } catch (error: any) {
          toast.error('Error accured');
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fatchProjects();
  },[session?.user]);
  return (
    <>
    <div className='px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col gap-10 my-45'>

      <div className='flex flex-row w-full justify-between items-center'>
        <h2 className='text-2xl text-blue-600/50 font-semibold '>
        My Projects
      </h2>
      <button onClick={()=> navigate('/')} className='bg-blue-600 hover:bg-blue-400 px-2 py-1 text-sm flex flex-row gap-1 items-center justify-center text-white rounded-xl'><Pen color='blue' className='bg-white rounded-full'/><Bot size={16}/> Create Project</button>
      </div>
      {
        loading? (
          <div className='w-full h-screen flex items-center justify-center'>
            <Riple color="#2563EB" size="large" text="Loading" textColor="" />
          </div>
        ) :
          projects.length > 0 ? (
            <div className='flex flex-wrap gap-5 justify-center md:justify-evenly'>
              {
                projects.map((projectt)=>(
                  <Card project={projectt} reFatch={fatchProjects}/>
                ))
              }
            </div>
          )
        :(
          <div className='w-full h-screen flex flex-col gap-4 items-center justify-center'>
            <h3 className='text-3xl md:text-5xl lg:text-7xl text-gray-400 font-semibold'>No projects found</h3>
            <button onClick={()=> navigate('/')} className='bg-blue-600 px-2 py-1 text-md flex flex-row gap-1 items-center justify-center rounded-xl text-white hover:bg-blue-400'><Bot size={18}/>Create Project</button>
          </div>
        )
      }
    </div>
    </>
  )
}

export default OwnProjects