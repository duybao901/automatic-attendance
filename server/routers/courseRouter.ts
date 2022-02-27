import express from 'express'

import { auth } from '../middlewares/auth'
import CourseControllers from '../controllers/courseControllers';

const router = express.Router();
router.post('/create_course', auth, CourseControllers.createCourse);
router.get('/get_courses', auth, CourseControllers.getCourses);
router.delete('/course/:id', auth, CourseControllers.deleteCourse);
router.put('/update_course/:id', auth, CourseControllers.updateCourse);
export default router;