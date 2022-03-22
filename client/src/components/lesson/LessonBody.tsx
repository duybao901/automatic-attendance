import React, { useState } from 'react'
import "./LessonBody.scss"
import { useSelector } from 'react-redux'
import { InputChange, RootStore } from '../../utils/interface'
import LessonFormModal from './LessonFormModal'
import dayjs from 'dayjs'
import MenuListLesson from './MenuListLesson'
// MUI
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material'
import PrimaryTooltip from '../../components/globals/tool-tip/Tooltip'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const useStyle = makeStyles({
    ButtonAdd: {
        fontSize: "1.2rem !important",
        fontWeight: "600 !important",
        height: "36px",
        padding: "4px !important",
        "& i": {
            marginTop: "-2px",
            fontSize: "1.6rem"
        }
    },
})

const LessonBody = () => {

    const classes = useStyle();
    const { lesson } = useSelector((state: RootStore) => state);
    const [search, setSearch] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);


    const addStudentClass = (student: number) => {
        if (student >= 0 && student < 10) {
            return 'student-10'
        }
        if (student >= 10 && student < 20) {
            return 'student-20'
        }
        if (student >= 20 && student < 30) {
            return 'student-30'
        }
        if (student >= 30 && student < 40) {
            return 'student-40'
        }
        return 'student-10'
    }

    return (
        <>
            <div className="dashbroad__body lesson__body">
                <div className="lesson__body-control">
                    <form className="control__form">
                        <div className="form-group">
                            <input placeholder='Tìm theo tên môn học...' type='text' value={search} onChange={(e: InputChange) => setSearch(e.target.value)}></input>
                            <i className='bx bx-search'></i>
                        </div>
                    </form>
                    <div className="control__add">
                        <PrimaryTooltip title="Thêm buổi học">
                            <Button onClick={() => setOpenModal(true)} variant='contained' color="primary" className={classes.ButtonAdd}>
                                <i className='bx bx-plus'></i>
                                Thêm buổi học
                            </Button>
                        </PrimaryTooltip>
                    </div>
                </div>
                <div className="lesson__body-list">
                    {
                        lesson.loading && <Box display='flex' alignItems='center'>
                            <CircularProgress size={30} /> <p className="loading-text" style={{ marginLeft: "5px" }}>Đang tải môn học...</p>
                        </Box>
                    }
                    {
                        (lesson.loading === false && lesson.lessons) && lesson.lessons.length === 0 && <p style={{fontSize:"1.4rem"}} className="loading-text">Không có buổi học nào!</p>
                    }

                    <div className="list__row">
                        {
                            lesson.lessons && lesson.lessons.map((lesson) => {
                                return <div className='list__row-item' key={lesson._id}>
                                    <div className="item__heading">
                                        <span className={addStudentClass(lesson.course?.students?.length as number)}>
                                            {lesson.course?.students?.length} sinh viên
                                        </span>
                                        <MenuListLesson />
                                    </div>
                                    <div className="item__infor">
                                        <p className="item__infor-name">
                                            <span>({lesson.course?.courseCode})</span>
                                            {lesson.course?.name}
                                        </p>
                                        <span className="item__infor-credit">Tín chỉ: {lesson.course?.credit}</span>
                                        <span className="item__infor-semester">học kì: {lesson.course?.semester}</span>


                                    </div>
                                    <div className="item__indicator"></div>
                                    <div className="item__bottom">
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
                                    <div className="item__line">

                                    </div>
                                    <div className="item__button">
                                        <button className="btn-primary">Điểm danh <i className='bx bx-right-arrow-alt'></i></button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <LessonFormModal open={openModal} setOpen={setOpenModal} />
        </>
    )
}

export default LessonBody