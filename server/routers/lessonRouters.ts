import express from 'express'

const router = express.Router();
import { auth } from '../middlewares/auth'
import LessonController from '../controllers/LessonControllers'

router.post('/create_lesson', auth, LessonController.createLesson);

export default router;