import React, { useEffect, useState } from 'react'
import type { Project } from '../types'
import { useNavigate, useParams } from 'react-router-dom';

const ProjectPlayGround = () => {

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const {projectId} = useParams();
  const navigate = useNavigate();

  const [isGenerating, setIsGenerating] = useState<boolean>(true);
  const [device, setDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const fatchProject = async () =>{

  }

  useEffect(()=>{
    fatchProject();
  }, []);

  return (
    <div>Project</div>
  )
}

export default ProjectPlayGround