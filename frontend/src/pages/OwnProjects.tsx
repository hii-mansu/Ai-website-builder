import React, { useEffect, useState } from 'react'
import type { Project } from '../types';

const OwnProjects = () => {

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const fatchProjects = async ()=>{

  }

  useEffect(()=>{
    fatchProjects();
  })
  return (
    <>
    <div className='px-4 md:px-16 lg:px-24 xl:px-32'>
      {
        loading? (
          <div>H</div>
        ) :
          projects.length > 0 ? (
            <div>H</div>
          )
        :(
          <div>H</div>
        )
      }
    </div>
    </>
  )
}

export default OwnProjects