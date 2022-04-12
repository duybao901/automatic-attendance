import React, { useState } from 'react'
import "./LessonBody.scss"
import { useSelector, useDispatch } from 'react-redux'
import { InputChange, RootStore } from '../../utils/interface'
import LessonFormModal from './LessonFormModal'
import LessonCard from './LessonCard'
import { searchLesson } from '../../store/actions/lessonActions'
// MUI
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material'
import PrimaryTooltip from '../../components/globals/tool-tip/Tooltip'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Skeleton from '@mui/material/Skeleton';

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
    SkeletonTop: {
        borderRadius: "5px !important",
    },
    SkeletonButton: {
        borderRadius:"20px"
    },
})

const LessonBody = () => {

    const dispatch = useDispatch();
    const classes = useStyle();
    const { lesson, auth } = useSelector((state: RootStore) => state);
    const [search, setSearch] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [selected, setSelected] = useState(false);

    const handleAddStudentClass = (student: number) => {
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

    const handleToggleMyLesson = () => {
        setSelected(!selected);
        dispatch({ type: "TOGGLE_MY_LESSON", payload: { toggle: !lesson.myLesson?.toggle, auth } })
    }

    const handleSearchLesson = (e: InputChange) => {
        setSearch(e.target.value);
        dispatch(searchLesson(e.target.value))
    }

    return (
        <>
            <div className="dashbroad__body lesson__body">
                <div className="lesson__body-control">
                    <Box className="control__wrapper">
                        <form className="control__form">
                            <div className="form-group">
                                <input placeholder='Tìm theo tên môn học...' type='text' value={search} onChange={handleSearchLesson}></input>
                                <i className='bx bx-search'></i>
                            </div>
                        </form>
                        <ToggleButton
                            value="check"
                            selected={selected}
                            onChange={handleToggleMyLesson}
                            color="primary"
                        >
                            <p className='control__my-lesson'>Buổi học của tôi</p>
                            {selected ? <BookmarkAddedIcon /> : <BookmarkAddedOutlinedIcon />}
                        </ToggleButton>
                    </Box>
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
                        lesson.loading && <div className="list__row">
                            {
                                [1, 2, 3, 4].map((_, index) => {
                                    return <div key={index} className='lesson-card'>
                                        <div style={{ padding: "0 20px", display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                            <span>
                                                <Skeleton variant="text" width={100} height={35} animation='wave' />
                                            </span>
                                            {

                                                <Skeleton variant="circular" width={30} height={30} animation='wave' />
                                            }
                                        </div>
                                        <div style={{ padding: "0 20px", marginBottom: "20px" }}>
                                            <p className="lesson-card__infor-name">
                                                <Skeleton variant="text" width={"100%"} height={40} animation='wave' />
                                            </p>
                                            <Box display={'flex'} >
                                                <span style={{ display: "flex", marginRight: "20px" }}>
                                                    <Skeleton variant="text" width={50} height={20} animation='wave' />
                                                    &nbsp;
                                                    <Skeleton variant="text" width={10} height={20} animation='wave' />
                                                </span>
                                                <span style={{ display: "flex" }} className="lesson-card__infor-semester">
                                                    <Skeleton variant="text" width={50} height={20} animation='wave' />
                                                    &nbsp;
                                                    <Skeleton variant="text" width={10} height={20} animation='wave' />
                                                </span>
                                            </Box>
                                        </div>
                                        <div className="lesson-card__indicator"></div>
                                        <div style={{padding:"0px 20px", marginBottom:"20px"}}>
                                            <div>
                                                <Skeleton variant="text" width={"25%"} height={25} animation='wave' />
                                            </div>
                                            <div>
                                                <Skeleton variant="text" width={"100%"} height={25} animation='wave' />
                                            </div>
                                            <div>
                                                <Skeleton variant="text" width={"100%"} height={25} animation='wave' />
                                            </div>
                                            <div>
                                                <Skeleton variant="text" width={"80%"} height={25} animation='wave' />
                                            </div>
                                        </div>

                                        <div className="lesson-card__button">
                                            <Skeleton style={{marginRight:"10px"}} className={classes.SkeletonButton} variant="rectangular" width={125} height={40} animation='wave' />
                                            <Skeleton className={classes.SkeletonButton} variant="rectangular" width={125} height={40} animation='wave' />
                                        </div>
                                    </div>
                                })}
                        </div>
                    }

                    {
                        (lesson.loading === false && lesson.lessons) && lesson.lessons.length === 0 && <p style={{ fontSize: "1.4rem" }} className="loading-text">Không có buổi học nào!</p>
                    }


                    {
                        !lesson.loading && <div className="list__row">
                            {
                                (lesson.searching.onSearch) ? lesson.searching.lessonSearch?.map((lesson, index) => {
                                    return <LessonCard key={index} auth={auth} lesson={lesson} addStudentClass={handleAddStudentClass} />
                                }) : (lesson.lessons && lesson.myLesson?.toggle === false && lesson.loading === false) ?
                                    lesson.lessons.map((lesson, index) => {
                                        return <LessonCard key={index} auth={auth} lesson={lesson} addStudentClass={handleAddStudentClass} />
                                    })
                                    :
                                    lesson.myLesson?.list.map((lesson, index) => {
                                        return <LessonCard key={index} auth={auth} lesson={lesson} addStudentClass={handleAddStudentClass} />
                                    })
                            }
                        </div>
                    }

                </div>
            </div>
            <LessonFormModal open={openModal} setOpen={setOpenModal} />
        </>
    )
}

export default LessonBody