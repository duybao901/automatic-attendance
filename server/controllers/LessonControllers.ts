import { Request, Response } from 'express'
import Lessons from '../models/lessonModel'
import { RequestUser } from '../config/interface'

class LessonController {

    async getLessonUser(req: RequestUser, res: Response) {
        try {
            const lessons = await Lessons.find({})
                .populate({
                    path: 'course',
                    populate: {
                        path: 'students'
                    }
                })
                .populate("teacher", '-password')
            return res.json({
                lessons
            })
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async createLesson(req: RequestUser, res: Response) {
        try {
            const { timeStart, timeEnd, desc, course_id } = req.body;

            const newLesson = new Lessons({
                timeStart, timeEnd, desc, course: course_id,
                teacher: req.user?._id
            })

            await newLesson.save();

            return res.json({
                msg: "Tạo buổi học thành công",
                newLesson: newLesson._doc
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default new LessonController()