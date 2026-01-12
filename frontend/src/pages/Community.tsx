import React, { useEffect, useState } from 'react'
import type { Project } from '../types';
import { Riple } from 'react-loading-indicators';
import api from '@/config/axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import PublicCard from '@/components/community/publicCard';

const Community = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]); //
  
    const fatchProjects = async ()=>{
      try {
      setLoading(true);
      const {data} = await api.get('/api/project/publicProjects');
      setProjects(data.projects);
    } catch (error: any) {
          toast.error('Error occured.');
    } finally{
      setLoading(false);
    }
    }
  
    useEffect(()=>{
      fatchProjects();
    },[])

  return (
    <>
    <div className='px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col gap-10 my-45 '>

      <div className='flex w-full'>
        <h2 className='text-2xl text-blue-600/50 font-semibold '>
        Public Projects
      </h2>
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
                projects.map((Project)=>(
                  <PublicCard project={Project}/>
                ))
              }
            </div>
          )
        :(
          <div className='w-full h-screen flex flex-col gap-4 items-center justify-center'>
            <h3 className='text-3xl md:text-5xl lg:text-7xl text-gray-400 font-semibold'>No projects found</h3>
            <button onClick={()=> navigate('/')} className='bg-blue-800 px-4 py-2 rounded-xl text-white hover:bg-blue-400'>Create Project</button>
          </div>
        )
      }
    </div>
    </>
  )
}

export default Community