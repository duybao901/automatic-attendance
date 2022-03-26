import express from 'express'

const router = express.Router()
import { auth } from '../middlewares/auth'
import RollCallSessionController from '../controllers/rollCallSessionControllers'

router.post('/roll_call_session', auth, RollCallSessionController.createRollCallSession)
router.get('/roll_call_session/:id', auth, RollCallSessionController.getRollCallSessionDetail)

export default router;