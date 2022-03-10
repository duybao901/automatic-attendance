import React from 'react'
import { AuthPayload } from '../../store/types/authTypes'
import { Course } from '../../utils/interface'
import dayjs from 'dayjs'
import "./CourseCard.scss"
import Logo from '../../images/logo.png'


// MUI
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import StudentTable from '../student/StudentTable'

interface CourseCardProps {
    course: Course
    auth: AuthPayload
    loading?: boolean
}

const CourseCard: React.FC<CourseCardProps> = ({ course, auth, loading }) => {

    return (
        <div className='course__card'>
            {
                loading ? <Box sx={{ display: 'flex' }} paddingLeft="65px">
                    <CircularProgress /> <p className="loading-text">Loading...</p>
                </Box> : <>
                    <div className="course__card-header">
                        <div className="header__infor">
                            <div className='header__infor-row' style={{ alignItems: "flex-start" }}>
                                <h2>{course.name}</h2>
                                <span className="infor__course-code" style={{ fontSize: '2.8rem', color: "#1e293b" }}> #{course.courseCode}   </span>
                            </div>
                            <div className='header__infor-row'>
                                <span>Số tín chỉ</span>
                                <p> {course.credit} </p>
                            </div>
                            <div className='header__infor-row'>
                                <span>Học kì</span>
                                <p> {course.semester} </p>
                            </div>
                            <div className='header__infor-row'>
                                <span>Ngày bắt đầu</span>
                                <p> {dayjs(course.yearStart).format("DD - MM, YYYY")} </p>
                            </div>
                            <div className='header__infor-row'>
                                <span>Ngày kết thúc</span>
                                <p> {dayjs(course.yearEnd).format("DD - MM, YYYY")} </p>
                            </div>
                            <div className='header__infor-row'>
                                <span>Ngày tạo</span>
                                <p> {dayjs(course.createdAt).format("DD - MM, YYYY")} </p>
                            </div>
                        </div>
                        <div className="header__teacher">
                            <div className="header__teacher-logo">
                                <img src={Logo} alt='logo'></img>
                            </div>
                            <div className="header__teacher-indicator"></div>
                            <div className="header__teacher-infor">
                                {
                                    course.teacher && <div>
                                        <img src={course.teacher.avatar} alt='logo'></img></div>
                                }

                                <span>Đại học cần thơ</span>
                                {
                                    course.teacher && <p className="infor__name">{course.teacher.name}</p>
                                }
                                {
                                    course.teacher && <p className="infor__email">{course.teacher.account}</p>
                                }

                            </div>
                        </div>
                    </div>
                    <div className="course__card-desc">
                        <h3>
                            Thông tin môn học
                        </h3>
                        <p>
                            {course.description}
                        </p>
                    </div>
                    <div className="course__card-student">
                        <h3>
                            Sinh viên
                        </h3>
                       <StudentTable students={course.students} />
                    </div>
                </>
            }
        </div>
    )
}

export default CourseCard