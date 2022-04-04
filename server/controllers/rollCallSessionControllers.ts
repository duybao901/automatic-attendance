import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { RequestUser } from '../config/interface'
import RollCallSessionModel from '../models/rollCallSessionModel';
import AttendanceDetailModel from '../models/attendanceDetailModel';

class RollCallSessionControllers {
    async createRollCallSession(req: RequestUser, res: Response) {
        try {
            const { lesson, comment } = req.body;

            const studentsArrayObject = lesson.course.students.map((student: any) => {
                return {
                    date: new Date().toString(),
                    note: "",
                    student: student._id
                }
            })

            const newAttendanceDetail = await AttendanceDetailModel.insertMany(studentsArrayObject)

            const newRollCallSession = new RollCallSessionModel({
                lesson,
                comment,
                course: lesson.course,
                teacher: req.user,
                attendanceDetails: newAttendanceDetail.map(attendanceDetail => attendanceDetail._id)
            })
            await newRollCallSession.save();

            return res.json({
                msg: "Tạo buổi điểm danh thành công",
                newRollCallSession: newRollCallSession._doc
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async getRollCallSessionDetail(req: RequestUser, res: Response) {
        try {
            const { id } = req.params;

            const rollCallSession = await RollCallSessionModel.findById(id)
                .populate(
                    {
                        path: 'attendanceDetails',
                        populate: [
                            {
                                path: "student"
                            }
                        ]
                    }
                )
                .populate({
                    path: 'lesson',
                    populate: {
                        path: 'course',
                    }
                })
                .populate("teacher", '-password')

            return res.json({ rollCallSession })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async getRollCallSessionUser(req: RequestUser, res: Response) {
        try {

            const { id } = req.params;

            const rollCallSessions = await RollCallSessionModel.find({ teacher: new mongoose.Types.ObjectId(id) })
                .populate({
                    path: 'attendanceDetails',
                    populate: [
                        {
                            path: "student"
                        }
                    ]
                })
                .populate({
                    path: 'lesson',
                    populate: {
                        path: 'course',
                    }
                })
                .populate("teacher", '-password').sort('-createdAt')

            return res.json({ rollCallSessions })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async updateRollCallSession(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { end, attendanceDetails, lesson, teacher, comment } = req.body;
            console.log({ id, end, attendanceDetails, lesson, teacher, comment })

            const rollCallSession = await RollCallSessionModel.findByIdAndUpdate(id, {
                end, attendanceDetails, lesson, teacher, comment
            }).populate(
                {
                    path: 'attendanceDetails',
                    populate: [
                        {
                            path: "student"
                        }
                    ]
                }
            )
                .populate({
                    path: 'lesson',
                    populate: {
                        path: 'course',
                    }
                })
                .populate("teacher", '-password')

            return res.json({ msg: "Chỉnh sửa thành công", rollCallSession: rollCallSession._doc });
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default new RollCallSessionControllers();