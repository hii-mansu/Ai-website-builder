import express from 'express';
import { buyCredits, createProject, getUserCredit, getUserProject, getUserProjects } from '../controllers/UserController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.get('/credits',protect, getUserCredit);
userRouter.post('/project',protect, createProject);
userRouter.get('/project/:projectId',protect, getUserProject);
userRouter.get('/projects',protect, getUserProjects);
userRouter.get('/publish/:projectId',protect, getUserProjects);
userRouter.get('/buy-credits',protect, buyCredits);


export default userRouter;