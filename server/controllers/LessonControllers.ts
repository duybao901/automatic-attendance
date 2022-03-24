import { Request, Response } from 'express'
import Lessons from '../models/lessonModel'
import { RequestUser } from '../config/interface'

class LessonController {

    async getLessonUser(req: RequestUser, res: Response) {
        try {
            const lessons = await Lessons.find({}).sort('-createdAt')
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
            const { timeStart, timeEnd, desc, course_id, weekday } = req.body;

            const newLesson = new Lessons({
                timeStart, timeEnd, desc, course: course_id, weekday,
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

    async updateLesson(req: RequestUser, res: Response) {
        try {
            const { id } = req.params;
            const { timeStart, timeEnd, desc, course_id, weekday } = req.body;
            console.log(course_id)

            const newLesson = await Lessons.findByIdAndUpdate(id, {
                timeStart, timeEnd, desc, course: course_id, weekday
            })

            return res.json({
                msg: "Cập nhật thành công",
                newLesson: newLesson._doc
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async deleteLesson(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await Lessons.findByIdAndDelete(id);

            return res.json({
                msg: "Xóa buổi học thành công"
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default new LessonController()