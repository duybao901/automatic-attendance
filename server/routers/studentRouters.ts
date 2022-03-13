import express from 'express'

const router = express.Router()
import { auth } from '../middlewares/auth'
import StudentController from '../controllers/studentControllers'

router.put('/student/:id', auth, StudentController.updateStudent)

export default router