import React, { Dispatch, SetStateAction, useState } from 'react'
import "./CourseFormModal.scss"
import { FormSubmit, InputChange, RootStore, ErrorCourse } from '../../utils/interface';
import { Course } from '../../utils/interface'
import { useDispatch, useSelector } from 'react-redux'
import { createCourse } from '../../store/actions/courseActions'
import Loading from '../globals/loading/Loading';
// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles'
import { modelStyle } from '../../utils/model-style'
import PrimaryTooltip from '../globals/tool-tip/Tooltip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { validCreateCourse } from '../../utils/valid';

interface CourseFormModalProps {
    open: boolean
    hanldeSetOpen: Dispatch<SetStateAction<boolean>>
}

const useStyles = makeStyles({
    Dialog: {
        width: "400px"
    },
    DialogTitle: {
        fontSize: "2rem !important",
        fontWeight: "600"
    },
    Button: {
        fontSize: "1.3rem !important",
        fontWeight: "600 !important",
        height: "36px",
        padding: "2px !important",

    },
    Select: {
        "width": "100%",
        "minHeight": "48px !important",
        "borderRadius": "6px !important",
        "padding": "0 16px !important",
        "border": "1px solid $border-color",
        "fontSize": "1.6rem !important",
        fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        "& > div": {
            padding: "0px !important"
        }
    },
    MenuItem: {
        fontSize: "1.6rem !important"
    },
});


const CourseFormModal: React.FC<CourseFormModalProps> = ({ open, hanldeSetOpen }) => {

    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootStore) => state)

    const initialErrorCourse: ErrorCourse = {
        errorName: "",
        errorCourseCode: "",
    }

    const initialCourse: Course = {
        name: "",
        courseCode: "",
        credit: 1,
        semester: "1",
        yearStart: new Date().toISOString(),
        yearEnd: new Date().toISOString(),
    }

    const classes = useStyles()
    const [course, setCourse] = useState<Course>(initialCourse);
    const [loading, setLoading] = useState<boolean>(false)
    const [errorCourse, setErrorCourse] = useState<ErrorCourse>(initialErrorCourse)

    const { name, courseCode, credit, semester, yearStart, yearEnd } = course;

    const handleChange = (e: InputChange | SelectChangeEvent) => {

        if (e.target.name === "name") {
            setErrorCourse({
                ...errorCourse,
                errorName: ''
            })
        }

        if (e.target.name === "courseCode") {
            setErrorCourse({
                ...errorCourse,
                errorCourseCode: ''
            })
        }

        setCourse({
            ...course,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeYearStart = (date: Date | null) => {
        setCourse({
            ...course,
            yearStart: date?.toISOString()
        })
    };

    const handleChangeYearEnd = (date: Date | null) => {
        setCourse({
            ...course,
            yearEnd: date?.toISOString()
        })
    };

    const handleSubmit = async (e: FormSubmit) => {

        e.preventDefault();

        let errorCourse: ErrorCourse = {};
        errorCourse = validCreateCourse(course);

        // Check error
        if (Object.keys(errorCourse).length > 0) {
            setErrorCourse(errorCourse);
            return;
        } else {
            // Submit form to back-end
            setLoading(true);
            await dispatch(createCourse(course, auth))
            setLoading(false)
            setCourse(initialCourse)
        }
    }

    const handleCloseModal = () => {
        hanldeSetOpen(!open)
        setCourse(initialCourse)
    }

    return <Modal
        open={open}
        onClose={() => hanldeSetOpen(!open)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={modelStyle}>
            <h2 className="modal__heading">Tạo khoá học</h2>
            <form className="course__form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Tên khoá học *</label>
                    <input type="text" id="name" name="name" value={name} onChange={handleChange} />
                    {
                        errorCourse?.errorName && <small className="text-error">{errorCourse?.errorName}</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="courseCode">Mã học phần *</label>
                    <input type="text" id="courseCode" name="courseCode" value={courseCode} onChange={handleChange} />
                    {
                        errorCourse?.errorCourseCode && <small className="text-error">{errorCourse?.errorCourseCode}</small>
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="credit">Số tín chỉ *</label>
                    <input type="number" id="credit" name="credit" min="0" max="10" value={credit} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Học kì *</label>
                    <Select
                        name='semester'
                        className={classes.Select}
                        value={semester}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={1} className={classes.MenuItem}> 1
                        </MenuItem>
                        <MenuItem value={2} className={classes.MenuItem}>2</MenuItem>
                        <MenuItem value={3} className={classes.MenuItem}>hè</MenuItem>
                    </Select>
                </div>
                <div className="form-group form-group--row">
                    <div className="form-group__row">
                        <label htmlFor="name">Năm bắt đầu *</label>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <DesktopDatePicker
                                inputFormat="MM/dd/yyyy"
                                value={yearStart}
                                onChange={handleChangeYearStart}
                                renderInput={(params: any) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="form-group__row">
                        <label htmlFor="name">Năm kết thúc *</label>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <DesktopDatePicker
                                inputFormat="MM/dd/yyyy"
                                value={yearEnd}
                                onChange={handleChangeYearEnd}
                                renderInput={(params: any) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                </div>

                <div className='modal__control'>
                    <div>
                        <Box mr={1}>
                            <PrimaryTooltip title='Làm mới'>
                                <Button variant='contained' onClick={() => setCourse(initialCourse)} color='success' className={classes.Button}><p style={{ textTransform: "capitalize" }}>Làm mới</p></Button>
                            </PrimaryTooltip>
                        </Box>
                    </div>
                    <Box display="flex">
                        <Box mr={1}>
                            <PrimaryTooltip title='Huỷ tạo'>
                                <Button variant='contained' onClick={handleCloseModal} color='error' className={classes.Button}><p style={{ textTransform: "capitalize" }}>Huỷ</p></Button>
                            </PrimaryTooltip>
                        </Box>

                        <Box>
                            <PrimaryTooltip title="Tạo khoá học">
                                <Button type="submit" variant='contained' className={classes.Button}>{loading ? <Loading type='small' /> : <p style={{ textTransform: "capitalize" }}>Tạo</p>}</Button>
                            </PrimaryTooltip>
                        </Box>
                    </Box>
                </div>
            </form>
        </Box>
    </Modal>
}

export default CourseFormModal