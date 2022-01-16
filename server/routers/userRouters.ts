import express from "express";

const router = express.Router();
import UserController from "../controllers/userControllers";
import { auth, authAdmin } from '../middlewares/auth'

router.put("/confirm/:id", auth, authAdmin, UserController.confirmAccount);

export default router;
