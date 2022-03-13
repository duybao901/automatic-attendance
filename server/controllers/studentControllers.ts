import mongoose from 'mongoose'
import { Request, Response } from 'express'
import Students from '../models/studentModel'
import Course from '../models/courseModel'

class StudentControlles {
    async updateStudent(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { name, studentCode, gender, phone } = req.body

            let student = await Students.findById(id).populate('course')

            if (!student)
                return res.status(500).json({ msg: "Không tìm thấy học sinh" })

            await Students.findByIdAndUpdate(id, {
                name, studentCode, gender, phone
            }, { new: true })

            // Update cho course
            if (student.course) {
                await Course.updateOne(
                    { _id: new mongoose.Types.ObjectId(student.course._id as string), "students._id": new mongoose.Types.ObjectId(id) },
                    {
                        $set: {
                            'students.$.name': name,
                            'students.$.studentCode': studentCode,
                            'students.$.gender': gender,
                            'students.$.phone': phone
                        }
                    }
                )
            }

            res.json({
                msg: 'Cập nhật sinh viên thành công',
                newStudent: student
            })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }

    async delteStudent(req: Request, res: Response) {
        try {
            const { id } = req.params
            const student = await Students.findByIdAndDelete(id)

            if (!student)
                return res.status(500).json({ msg: "Không tìm thấy học sinh" })

            // Update cho course
            if (student.course) {
                await Course.updateOne(
                    { _id: new mongoose.Types.ObjectId(student.course._id as string) },
                    {
                        $pull: {
                            "students": {
                                "_id": new mongoose.Types.ObjectId(id)
                            }
                        }
                    }
                )
            }
            res.json({
                msg: 'Xóa sinh viên thành công',
                student: student
            })
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
        }
    }
}

export default new StudentControlles()