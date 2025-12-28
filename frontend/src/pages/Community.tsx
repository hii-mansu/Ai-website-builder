import React, { useEffect, useState } from 'react'
import type { Project } from '../types';
import { Riple } from 'react-loading-indicators';
import Card from '../components/OwnProjects/Card';
import { Pen } from 'lucide-react';

const Community = () => {

  const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([1,21,1,1,1,1,1,1]); //<Project[]>
  
    const fatchProjects = async ()=>{
      setTimeout(()=>{
        setLoading(false);
      }, 2000)
    }
  
    useEffect(()=>{
      fatchProjects();
    })

  return (
    <>
    <div className='px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col gap-10 mt-45'>

      <div className='flex w-full'>
        <h2 className='text-2xl text-blue-700 font-semibold '>
        My Projects
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
                projects.map((Project, index)=>(
                  <Card key={index}/>
                ))
              }
            </div>
          )
        :(
          <div className='w-full h-screen flex flex-col gap-4 items-center justify-center'>
            <h3 className='text-3xl md:text-5xl lg:text-7xl text-gray-400 font-semibold'>No projects found</h3>
            <button className='bg-blue-800 px-4 py-2 rounded-xl text-white hover:bg-blue-400'>Create Project</button>
          </div>
        )
      }
    </div>
    </>
  )
}

export default Community