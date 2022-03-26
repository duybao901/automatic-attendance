// Router
import authRouter from "./authRouters";
import userRouter from './userRouters';
import courseRouter from './courseRouter'
import studentRouter from './studentRouters'
import lessonRouter from './lessonRouters'
import rollCallSession from './rollCallSessionRouters'

const routers = {
    authRouter,
    userRouter,
    courseRouter,
    studentRouter,
    lessonRouter,
    rollCallSession
};
export default routers;
