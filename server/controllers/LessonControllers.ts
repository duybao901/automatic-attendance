import { Request, Response } from 'express'
import Lessons from '../models/lessonModel'

class LessonController {
    async createLesson(req: Request, res: Response) {
        try {
            const { timeStart, timeEnd, desc, course_id } = req.body;

            const newLesson = new Lessons({
                timeStart, timeEnd, desc, course: course_id
            }, {
                new: true
            })

            await newLesson.save();

            return res.json({
                msg: "",
                newLesson: newLesson._doc
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default new LessonController()