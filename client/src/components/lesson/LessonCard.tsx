import React from 'react'
import { Lesson } from '../../utils/interface'
import "./LessonCard.scss"
import MenuListLesson from './MenuListLesson'
import dayjs from 'dayjs'
import { AuthPayload } from '../../store/types/authTypes'

interface LessonCardProps {
  auth: AuthPayload
  addStudentClass: (student: number) => string,
  lesson: Lesson
}

const LessonCard: React.FC<LessonCardProps> = ({ auth, lesson, addStudentClass }) => {


  return (
    <div className='lesson-card'>
      <div className="lesson-card__heading">
        <span className={addStudentClass(lesson.course?.students?.length as number)}>
          {lesson.course?.students?.length} sinh viên
        </span>
        {
          (auth.user?.role === 'admin' || auth.user?._id === lesson.course?.teacher || auth.user?._id === lesson.course?.teacher?._id) &&
          <MenuListLesson auth={auth} lesson={lesson} />
        }
      </div>
      <div className="lesson-card__infor">
        <p className="lesson-card__infor-name">
          <span>({lesson.course?.courseCode})</span>
          {lesson.course?.name}
        </p>
        <span className="lesson-card__infor-credit">Tín chỉ: {lesson.course?.credit}</span>
        <span className="lesson-card__infor-semester">học kì: {lesson.course?.semester}</span>
      </div>
      <div className="lesson-card__indicator"></div>
      <div className="lesson-card__bottom">
        <div>
          <i className='bx bxs-calendar-week' ></i>
          <span>{lesson.weekday}</span>
        </div>
        <div>
          <i className='bx bxs-time'></i>
          <span>Thời gian bắt đầu: {dayjs(lesson.timeStart).format("hh:mm a")}</span>
        </div>
        <div>
          <i className='bx bxs-time-five'></i>
          <span>Thời gian kết thúc: {dayjs(lesson.timeEnd).format("hh:mm a")}</span>
        </div>
        <div>
          <i className='bx bxs-graduation'></i>
          {
            lesson.teacher && <span>{lesson.teacher?.name} ({lesson.teacher?.account})</span>
          }
        </div>
      </div>
      <div className="lesson-card__line">

      </div>
      <div className="lesson-card__button">
        <button
          disabled={(auth.user?.role === 'admin' || auth.user?._id === lesson.course?.teacher || auth.user?._id === lesson.course?.teacher?._id) ? false : true}
          className={`btn-primary 
          ${(auth.user?.role === 'admin' || auth.user?._id === lesson.course?.teacher || auth.user?._id === lesson.course?.teacher?._id) ?
              "" : "btn-primary--disable"}`}>
          Điểm danh <i className='bx bx-right-arrow-alt'>

          </i>
        </button>
      </div>
    </div>
  )
}

export default LessonCard