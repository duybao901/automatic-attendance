
import express from 'express'
import { saveLabledFaceDescriptors } from '../controllers/faceControllers'

import { auth } from '../middlewares/auth'

const router = express.Router();
router.post('/face_api', auth, saveLabledFaceDescriptors);

export default router;