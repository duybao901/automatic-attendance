// Router
import authRouter from "./authRouters";
import userRouter from './userRouters';
import courseRouter from './courseRouter'
import studentRouter from './studentRouters'
import lessonRouter from './lessonRouters'

const routers = {
    authRouter,
    userRouter,
    courseRouter,
    studentRouter,
    lessonRouter
};
export default routers;
