import express from "express";

const router = express.Router();
import UserController from "../controllers/userControllers";

router.put("/confirm/:id", UserController.confrimAccount);

export default router;
