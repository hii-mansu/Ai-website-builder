import { Request, Response } from "express";
import { json } from "better-auth";
import prisma from "../lib/prisma.js";
import openai from "../config/openAi.js";

export const reviseProject = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const { projectId } = req.params;
    const { message } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userId || !user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (user.credits < 5) {
      return res.status(401).json({ message: "Your credit is low." });
    }

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Invalid prompt." });
    }

    const currentProject = await prisma.websiteProject.findUnique({
      where: { id: projectId, userId },
      include: { versions: true },
    });

    if (!currentProject) {
      return res.status(404).json({ message: "No project found." });
    }

    await prisma.conversation.create({
      data: {
        role: "user",
        content: message,
        projectId,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: { decrement: 5 },
      },
    });

    const enhancePrompt = await openai.chat.completions.create({
      model: "z-ai/glm-4.5-air:free",
      messages: [
        {
          role: "system",
          content: `
                You are a prompt enhancement specialist. The user wants to make changes to their website. Enhance their request to be more specific and actionable for a web developer.

    Enhance this by:
    1. Being specific about what elements to change
    2. Mentioning design details (colors, spacing, sizes)
    3. Clarifying the desired outcome
    4. Using clear technical terms

Return ONLY the enhanced request, nothing else. Keep it concise (1-2 sentences).
                `,
        },
        {
          role: "user",
          content: `User's request: "${message}"`,
        },
      ],
    });

    const enhancedPrompt = enhancePrompt.choices[0].message.content;
    await prisma.conversation.create({
      data: {
        role: "assistant",
        content: `I have enhanced your input to : "${enhancedPrompt}"`,
        projectId,
      },
    });

    await prisma.conversation.create({
      data: {
        role: "assistant",
        content: "Making changes.....",
        projectId,
      },
    });

    const codeGeneration = await openai.chat.completions.create({
      model: "z-ai/glm-4.5-air:free",
      messages: [
        {
          role: "system",
          content: `
            You are an expert web developer. 

    CRITICAL REQUIREMENTS:
    - Return ONLY the complete updated HTML code with the requested changes.
    - Use Tailwind CSS for ALL styling (NO custom CSS).
    - Use Tailwind utility classes for all styling changes.
    - Include all JavaScript in <script> tags before closing </body>
    - Make sure it's a complete, standalone HTML document with Tailwind CSS
    - Return the HTML Code Only, nothing else

    Apply the requested changes while maintaining the Tailwind CSS styling approach.
`,
        },
        {
          role: "user",
          content: `Here is the current code : "${currentProject.current_code}" ,the user the changes: "${enhancedPrompt}"`,
        },
      ],
    });

    const code = codeGeneration.choices[0].message.content || "";

    const version = await prisma.version.create({
      data: {
        code: code
          .replace(/```[a-z]*\n?/gi, "")
          .replace(/```$/g, "")
          .trim(),
        description: "Changed version",
        projectId,
      },
    });

    await prisma.conversation.create({
      data: {
        role: "assistant",
        content: "Changes created successfully, you can preview it.",
        projectId,
      },
    });

    await prisma.websiteProject.update({
      where: { id: projectId },
      data: {
        current_code: code
          .replace(/```[a-z]*\n?/gi, "")
          .replace(/```$/g, "")
          .trim(),
        current_version_index: version.id,
      },
    });

    res.json({ message: "Updated successfully" });
  } catch (error: any) {
    await prisma.user.update({
      where: { id: userId },
      data: { credits: { increment: 5 } },
    });
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const rollbackVersion = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { projectId, versionId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    if (!projectId || !versionId) {
      return res.status(401).json({ message: "Invalid projectId or versionId." });
    }
    const project = await prisma.websiteProject.findUnique({
        where: {id: projectId, userId},
        include: {versions: true}
    });

    if (!project) {
      return res.status(404).json({ message: "No project found." });
    }

    const version = project.versions.find((version)=>version.id === versionId);
    if(!version){
        return res.status(404).json({ message: "Version not found." });
    };


    await prisma.websiteProject.update({
        where:{id: projectId, userId},
        data:{
            current_code: version.code,
            current_version_index: version.id
        }
    });

    await prisma.conversation.create({
        data:{
            role:"assistant",
            content:"Rolled back successfully.",
            projectId
        }
    })
    
    res.json({message:'Rolled back successfully.'});

  } catch (error: any) {
    console.log(error.code || error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;


    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    if (!projectId) {
      return res.status(401).json({ message: "Invalid projectId." });
    }
    const project = await prisma.websiteProject.delete({
        where: {id: projectId, userId},
    });

    if (!project) {
      return res.status(404).json({ message: "No project found to delete." });
    }
    
    res.json({message:'Deleted successfully.'});

  } catch (error: any) {
    console.log(error.code || error.message);
    res.status(500).json({ message: error.message });
  }
};

export const previewProjectByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;


    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    if (!projectId) {
      return res.status(401).json({ message: "Invalid projectId." });
    }
    const project = await prisma.websiteProject.findFirst({
        where: {id: projectId, userId},
        include: {versions: true}
    });

    if (!project) {
      return res.status(404).json({ message: "No project found or invalid projectId." });
    }
    
    res.json({ project });

  } catch (error: any) {
    console.log(error.code || error.message);
    res.status(500).json({ message: error.message });
  }
};

export const allPublishedCode = async (req: Request, res: Response) => {
  try {

    const projects = await prisma.websiteProject.findMany({
        where: {isPublished: true},
        include: {user: true}
    });

    if (!projects) {
      return res.status(404).json({ message: "No public projects found." });
    }
    
    res.json({ projects });

  } catch (error: any) {
    console.log(error.code || error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res.status(401).json({ message: "Invalid projectId." });
    }
    const project = await prisma.websiteProject.findFirst({
        where: {id: projectId},
    });

    if (!project || project.isPublished===false || !project?.current_code) {
      return res.status(404).json({ message: "No project found or project is private." });
    }
    
    res.json({ code: project.current_code });

  } catch (error: any) {
    console.log(error.code || error.message);
    res.status(500).json({ message: error.message });
  }
};

export const saveProjectByUser = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const userId = req.userId;
    const {code} = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    if (!code) {
      return res.status(400).json({ message: "Empty code not accepted." });
    }

    if (!projectId) {
      return res.status(401).json({ message: "Invalid projectId." });
    }
    const project = await prisma.websiteProject.findUnique({
        where: {id: projectId, userId},
    });

    if (!project) {
      return res.status(404).json({ message: "No project found." });
    }

    await prisma.websiteProject.update({
        where:{
            id: projectId
        },
        data:{
            current_code: code, current_version_index: ''
        }
    })
    
    res.json({ message: 'Project saved successfully.' });

  } catch (error: any) {
    console.log(error.code || error.message);
    res.status(500).json({ message: error.message });
  }
};

