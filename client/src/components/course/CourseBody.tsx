import React, { useState } from 'react'
import "./CourseBody.scss"
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/interface'
import dayjs from 'dayjs'
import PaginationComponent from '../globals/pagination/Pagination'
// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ButtonGroup } from '@mui/material'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import PrimaryTooltip from '../globals/tool-tip/Tooltip'
import CourseFormModal from './CourseFormModal'
import Box from '@mui/material/Box';

const useStyles = makeStyles({
    TableContainer: {
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important"
    },
    TableCellHead: {
        fontSize: "1.4rem !important",
        fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        fontWeight: "600 !important"
    },
    TableCellBody: {
        fontSize: "1.4rem !important",
        fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        fontWeight: "500 !important",
    },

    TableCellBodyId: {
        fontSize: "1.4rem !important",
        fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        fontWeight: "500 !important",
        "maxWidth": "150px",
        "WebkitLineClamp": "1",
        "WebkitBoxOrient": "vertical",
        "overflow": "hidden",
        "textOverflow": "ellipsis",
    },
    Button: {
        fontSize: "1rem !important",
        fontWeight: "600 !important",
        height: "36px",
        padding: "4px !important",

    },
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
    Tooltip: {
        fontSize: "2rem !important",
    },
    Pagination: {
        "& button": { fontSize: "1.3rem" }
    }
});

const CourseBody = () => {

    const classes = useStyles()
    const { course, auth } = useSelector((state: RootStore) => state)
    const [searchByName, setSearchByName] = useState<string>('')
    const [searchByCode, setSearchByCode] = useState<string>('')
    const [searchByNameTeacher, setSearchByNameTeacher] = useState<string>('')
    const [page, setPage] = React.useState(1);

    const [open, setOpen] = React.useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value)
    };

    return (
        <div className="dashbroad__body course__body">
            <div className="course__control">
                <form>
                    <div className="form-group">
                        <input placeholder="Tìm kiếm theo tên môn học..." type="text" onChange={(e) => setSearchByName(e.target.value)} value={searchByName} />
                        <i className='bx bx-search'></i>
                    </div>
                    <div className="form-group">
                        <input placeholder="Tìm kiếm theo mã học phần..." type="text" onChange={(e) => setSearchByCode(e.target.value)} value={searchByCode} />
                        <i className='bx bx-search'></i>
                    </div>
                    <div className="form-group">
                        <input placeholder="Tìm kiếm theo giáo viên..." type="text" onChange={(e) => setSearchByNameTeacher(e.target.value)} value={searchByNameTeacher} />
                        <i className='bx bx-search'></i>
                    </div>
                </form>
                <div className="course__control-right">
                    <PrimaryTooltip title="Thêm môn học">
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button color="primary" className={classes.ButtonAdd} onClick={handleClickOpen}>
                                <i className='bx bx-plus'></i>
                                Thêm môn học
                            </Button>
                        </ButtonGroup>
                    </PrimaryTooltip>
                </div>
            </div>
            <TableContainer component={Paper} className={classes.TableContainer}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.TableCellHead}>ID Khoá học</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}>Tên khoá học</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}>Mã học phần</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}>Tín chỉ</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}>Giáo viên</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}>Học kì</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}>Năm học</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}>Ngày tạo</TableCell>
                            <TableCell align="left" className={classes.TableCellHead}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow>
                            {
                                course.loading && <TableCell> <h3 style={{ fontSize: "14px", padding: '10px', color: "#473fce" }}>Loading...</h3></TableCell>
                            }
                        </TableRow>
                        {
                            course.result?.map(course => {
                                return <TableRow
                                    key={course._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell className={classes.TableCellBodyId} component="th" scope="row">{course._id}</TableCell>
                                    <TableCell className={`${classes.TableCellBody} course-name`} align="left">{course.name}</TableCell>
                                    <TableCell className={classes.TableCellBody} align="center" style={{ textTransform: "uppercase" }}>{course.courseCode}</TableCell>
                                    <TableCell className={classes.TableCellBody} align="center">{course.credit}</TableCell>
                                    <TableCell className={classes.TableCellBody} align="left"><h3>{course.teacher?.name}</h3> ({course.teacher?.account})</TableCell>
                                    <TableCell className={classes.TableCellBody} align="center">{course.semester}</TableCell>
                                    <TableCell className={classes.TableCellBody} align="left">
                                        {dayjs(course.yearStart).format("DD/MM/YYYY")} - {dayjs(course.yearEnd).format("DD/MM/YYYY")}
                                    </TableCell>
                                    <TableCell className={classes.TableCellBody} align="left">{dayjs(course.createdAt).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell className={classes.TableCellBody} align="left">
                                        <div>
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <PrimaryTooltip title="Chi tiết môn học" className={classes.Tooltip}>
                                                    <Button className={classes.Button} color="info"><i style={{ fontSize: "2rem" }} className='bx bx-info-circle' ></i></Button>
                                                </PrimaryTooltip>
                                                {
                                                    // admin hoac teacher tao thi moi co the chinh sua hoac xoa
                                                    (auth.user?.role === 'admin' || auth.user?._id === course.teacher?._id) && <React.Fragment>
                                                        <PrimaryTooltip title="Chỉnh sửa">
                                                            <Button className={classes.Button} ><i className='bx bxs-edit-alt' style={{ fontSize: "2rem" }}></i></Button>
                                                        </PrimaryTooltip>
                                                        <PrimaryTooltip title="Xoá">
                                                            <Button className={classes.Button} color="error"><i style={{ fontSize: "2rem" }} className='bx bx-x'></i></Button>
                                                        </PrimaryTooltip>
                                                    </React.Fragment>
                                                }
                                            </ButtonGroup>
                                        </div>
                                    </TableCell>

                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display='flex' justifyContent="flex-end" bgcolor="#fff" padding="16px">
                <PaginationComponent variant='outlined' shape='rounded' onChange={handleChangePage} className={classes.Pagination} total={course.coursesLength ? course.coursesLength : 0}></PaginationComponent>
            </Box>
            {/* Dialog create course */}
            <CourseFormModal open={open} hanldeSetOpen={setOpen} />
        </div>
    )
}

export default CourseBody