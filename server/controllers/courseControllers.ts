import { Request, Response } from 'express'
import Course from "../models/courseModel";
import Users from '../models/userModel';
import { RequestUser } from '../config/interface'


class APIfeatures {

    query: any
    queryString: any

    constructor(query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 4
        const skip = (page - 1) * limit

        this.query = this.query.skip(skip).limit(limit)
        return this.query
    }
}

class CourseController {
    async createCourse(req: RequestUser, res: Response) {
        try {
            const { name, credit, yearStart, yearEnd, courseCode, semester } = req.body;

            // Tao mon hoc moi
            const newCourse = new Course({
                name, semester, credit, yearStart, yearEnd, courseCode,
                teacher: req.user?._id
            })

            // Luu vao data base
            await newCourse.save();

            // Them mon hoc vao model cua user
            await Users.findOneAndUpdate({ _id: req.user?._id },
                {
                    $push:
                        { courses: newCourse._id }
                }, {
                new: true
            })


            return res.json({
                msg: "Tạo khoá học thành công", newCourse: {
                    teacher: req.user,
                    ...newCourse._doc
                }
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async getCourses(req: Request, res: Response) {
        try {
            const courses = await Course.find({}).sort("-createdAt")
                .populate("teacher")
            return res.json({ courses, length: courses.length })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async deleteCourse(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await Course.findByIdAndDelete(id);

            return res.json({ msg: "Xoá môn học thành công" });

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async updateCourse(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, credit, yearStart, yearEnd, courseCode, semester } = req.body;

            const course = await Course.findByIdAndUpdate(id, {
                name, semester, credit, yearStart, yearEnd, courseCode,
            }, { new: true });

            return res.json({ msg: "Cập nhật môn học thành công", course: { ...course?._doc } })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }

    async getUserCourse(req: RequestUser, res: Response) {
        try {
            const { id } = req.params;
            const queryString = req.query;
            const query = new APIfeatures(Course.find({ teacher: id }), queryString).paginating()

            const courses = await query.sort("-createdAt").populate("teacher")

            return res.json({
                msg: "Lấy danh sách môn học thành công",
                courses,
                result: courses.length
            })

        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default new CourseController;