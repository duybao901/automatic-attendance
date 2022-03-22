import express from 'express'

const router = express.Router();
import { auth } from '../middlewares/auth'
import LessonController from '../controllers/LessonControllers'

router.post('/lesson', auth, LessonController.createLesson);
router.get('/lesson', auth, LessonController.getLessonUser);

export default router;