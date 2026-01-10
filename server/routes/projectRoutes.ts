import express from 'express';
import { protect } from '../middleware/auth.js';
import { allPublishedCode, deleteProject, getProjectById, previewProjectByUser, reviseProject, rollbackVersion, saveProjectByUser } from '../controllers/projectController.js';

const projectRouter = express.Router();

projectRouter.post('/revise/:projectId', protect, reviseProject);
projectRouter.get('/rollback/:projectId/:versionId', protect, rollbackVersion);
projectRouter.delete('/delete/:projectId', protect, deleteProject);
projectRouter.get('/userProjectPrev/:projectId', protect, previewProjectByUser);
projectRouter.get('/publicProjects', allPublishedCode);
projectRouter.get('/publicProjects/:projectId', getProjectById);
projectRouter.put('/save/:projectId', protect, saveProjectByUser);

export default projectRouter;