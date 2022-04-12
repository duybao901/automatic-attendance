import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FormSubmit, InputChange, Params } from '../../utils/interface'
import { RootStore, RollCallSession, Attendance } from '../../utils/interface'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailRollCallSession, updateDetailRollCallSession } from '../../store/actions/rollCallSession'
import dayjs from 'dayjs'
import "./RollCallSessionDetail.scss"
import Loading from '../../components/globals/loading/Loading'
import Logo from '../../images/logo.png';
import { ALERT } from '../../store/types/alertTypes'
import { countAbsent } from '../../utils/student'

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttendanceDetailRow from '../../components/roll-call-session/AttendanceDetailRow'
import { makeStyles } from '@mui/styles';
import PrimaryTooltip from '../../components/globals/tool-tip/Tooltip'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const useStyles = makeStyles({
    TableContainer: {
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important",
        borderRadius: "5px !important",
    },
    TableCellHead: {
        fontSize: "1.4rem !important",
        fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        fontWeight: "600 !important",
        height: "60px !important",
    },
    SekeletonRadius: {
        borderRadius: "5px"
    }
});

const RollCallSessionDetail = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { slug }: Params = useParams();
    const { detailRollCallSession: detailRollCallSessionStore, auth, course, lesson } = useSelector((state: RootStore) => state)

    const [detailRollCallSession, setDetailRollCallSession] = useState<RollCallSession>({})
    const [comment, setComment] = useState<string>();
    const [loadingComment, setLoadingCommnet] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (slug) {
            const handleGetDetailRollCallSession = async () => {
                dispatch(getDetailRollCallSession(detailRollCallSessionStore, slug, auth))
            }
            handleGetDetailRollCallSession()
        }

        detailRollCallSessionStore.rollCallSessions?.filter(rollCallSession => {
            if (rollCallSession._id === slug) {
                setDetailRollCallSession(rollCallSession)
                setComment(rollCallSession.comment)
            }
        })

    }, [slug, auth, detailRollCallSessionStore.rollCallSessions])

    //  Luu nhan xet
    const handleSubmit = async (e: FormSubmit) => {
        e.preventDefault()
        setLoadingCommnet(true)
        await dispatch(updateDetailRollCallSession({ ...detailRollCallSession, comment }, auth, detailRollCallSessionStore))
        setLoadingCommnet(false)
    }

    // Ket thuc buoi diem danh
    const handleEndRollCallSession = async (detailRollCallSession: RollCallSession) => {
        try {
            dispatch({ type: ALERT, payload: { loading: true } })
            await dispatch(updateDetailRollCallSession({ ...detailRollCallSession, end: true }, auth, detailRollCallSessionStore))
            handleCloseDialog()
        } catch (error: any) {
            dispatch({ type: ALERT, payload: { loading: false } })
            dispatch({ type: ALERT, payload: { error: error.response.dât.msg } })
        }
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <div className='dashbroad__body dashbroad__body--xl'>
            <div className='rollcallsession-detail'>
                <div className="rollcallsession-detail__header">
                    <div className="header__left">
                        <h2>
                            {
                                detailRollCallSession.lesson?.course?.name
                            }
                            {
                                detailRollCallSessionStore.loading && <Box display={'flex'} marginLeft={"-10px"}>
                                    <Skeleton width={300} height={40} variant='text'></Skeleton>
                                    <Box>
                                        <Skeleton width={50} height={40} variant='text'></Skeleton>
                                    </Box>
                                </Box>
                            }

                            {
                                !detailRollCallSessionStore.loading && <span>
                                    #{
                                        detailRollCallSession.lesson?.course?.courseCode
                                    }
                                </span>
                            }
                        </h2>
                        <p className="header__left-comment">
                            {
                                detailRollCallSessionStore.loading && <Box display={'flex'}>
                                    <Skeleton width={300} height={25} variant='text'></Skeleton>
                                </Box>
                            }
                            {

                                !detailRollCallSessionStore.loading && (detailRollCallSession.comment ? detailRollCallSession.comment : "Chưa có nhận xết về buổi học")

                            }
                        </p>

                    </div>
                    <div className="header__right">
                        {
                            detailRollCallSession.end && <h2><i className='bx bxs-alarm-exclamation' ></i>Buổi học đã kết thúc</h2>
                        }
                        <div className="header__btn-end">
                            {
                                detailRollCallSessionStore.loading && <Box display={'flex'}>
                                    <Skeleton className={classes.SekeletonRadius} width={100} height={40} variant='rectangular'></Skeleton>
                                </Box>
                            }
                            {
                                (!detailRollCallSession.end && detailRollCallSessionStore.loading === false) && <PrimaryTooltip title="Kết thúc buổi điểm danh" color='error'>
                                    <Button onClick={() => setOpen(true)} variant='contained'>
                                        <i style={{ fontSize: '2.4rem', marginRight: "5px" }} className='bx bx-stopwatch'></i>  <p className="button-text">Kết Thúc</p>
                                    </Button>
                                </PrimaryTooltip>
                            }
                            {/* Dialog Confirm End Roll Call Session */}
                            <Dialog
                                open={open}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <Box padding={2}>
                                    <Box display='flex' justifyContent="space-between" alignItems='center' mb={2}>
                                        <h2 className="modal__heading" style={{ color: "crimson" }}>Kết thúc buổi điểm danh</h2>
                                        <Box>
                                            <PrimaryTooltip title='Đóng hộp thoại'>
                                                <IconButton size="medium" onClick={handleCloseDialog}>
                                                    <i className='bx bx-x' style={{ color: "#473fce", fontSize: "2.6rem" }}></i>
                                                </IconButton>
                                            </PrimaryTooltip>
                                        </Box>
                                    </Box>
                                    <div style={{ marginBottom: "20px" }}>
                                        <p style={{ fontSize: "1.4rem" }}>
                                            Bạn có chắc muốn kết thúc buổi điểm danh, mọi hành động điểm danh sẽ không còn được thực hiện nữa !!!
                                        </p>
                                    </div>
                                    <DialogActions>
                                        <PrimaryTooltip title="Kết thúc buổi điểm danh">
                                            <Button color="success" onClick={handleCloseDialog} variant='contained'>
                                                <p className="button-text">Đóng</p>
                                            </Button>
                                        </PrimaryTooltip>
                                        <PrimaryTooltip title="Kết thúc buổi điểm danh" >
                                            <Button color="error" onClick={(() => handleEndRollCallSession(detailRollCallSession))} variant='contained'>
                                                <i style={{ fontSize: '2.4rem', marginRight: "5px" }} className='bx bx-exit'></i>  <p className="button-text">Kết Thúc</p>
                                            </Button>
                                        </PrimaryTooltip>
                                    </DialogActions>
                                </Box>
                            </Dialog>
                        </div>
                    </div>
                </div>
                <div className="rollcallsession-detail__control">
                    {/* Detail Roll Call Session Card */}
                    <div className='rollcallsession-detail__control-detail'>
                        <div className="detail__infor">
                            <div className="detail__infor-header">
                                <img src={Logo} alt="logo" />
                                <div className="header__right">
                                    <span className="header__right-badge">
                                        Có mặt: {countAbsent(detailRollCallSession.attendanceDetails ? detailRollCallSession.attendanceDetails : [], false)}
                                    </span>
                                    <span className="header__right-badge header__right-badge--absent">
                                        Vắng: {countAbsent(detailRollCallSession.attendanceDetails ? detailRollCallSession.attendanceDetails : [], true)}
                                    </span>
                                </div>
                            </div>
                            <div className="detail__infor-group">
                                {
                                    detailRollCallSessionStore.loading ? <Skeleton height={22} variant="text" width={50} />
                                        : <>
                                            <i className='bx bxs-calendar-week' ></i>
                                            <span>{detailRollCallSession.lesson?.weekday}</span>
                                        </>
                                }
                            </div>
                            <div className="detail__infor-group">
                                {
                                    detailRollCallSessionStore.loading ? <Skeleton height={22} variant="text" width={200} />
                                        : <>
                                            <i className='bx bxs-time'></i>
                                            <span>Thời gian bắt đầu: {dayjs(detailRollCallSession.lesson?.timeStart).format("hh:mm a")}</span>
                                        </>
                                }
                            </div>
                            <div className="detail__infor-group">
                                {
                                    detailRollCallSessionStore.loading ? <Skeleton height={22} variant="text" width={200} />
                                        : <>
                                            <i className='bx bxs-time-five'></i>
                                            <span>Thời gian kết thúc: {dayjs(detailRollCallSession.lesson?.timeEnd).format("hh:mm a")}</span>
                                        </>
                                }
                            </div>
                            <div className="detail__infor-group">
                                {
                                    detailRollCallSessionStore.loading ? <Skeleton height={22} variant="text" width={220} />
                                        : <>
                                            <i className='bx bxs-graduation'></i>
                                            {
                                                <span>{detailRollCallSession.teacher?.name} ({detailRollCallSession.teacher?.account})</span>
                                            }
                                        </>
                                }

                            </div>

                        </div>

                        {/* Comment */}
                        <div className="detail__comment">
                            <form onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label htmlFor="comment">Nhận xét buổi học</label>
                                    <textarea
                                        cols={20}
                                        rows={5}
                                        value={comment ? comment : ""}
                                        name='commnet'
                                        id='comment'
                                        onChange={(e: InputChange) => setComment(e.target.value)} />
                                </div>
                                <div className="form__button">
                                    <PrimaryTooltip title="Lưu nhận xét">
                                        <Button variant='contained' type='submit'>
                                            {
                                                loadingComment ?
                                                    <><Loading type='small'></Loading><p style={{ textTransform: "initial", fontSize: "1.3rem", marginLeft: "15px" }}>Đang lưu...</p></>
                                                    : <p style={{ textTransform: "initial", fontSize: "1.3rem" }}>Lưu</p>
                                            }
                                        </Button>
                                    </PrimaryTooltip>
                                </div>
                            </form>

                        </div>
                    </div>


                </div>
                <div className='rollcallsession-detail__table'>
                    <TableContainer className={classes.TableContainer} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.TableCellHead} align="left">Họ và tên</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">MSSV</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">Giới tính</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">Ngày</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">Học phần</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">Điểm danh</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">Ghi chú</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    detailRollCallSession.attendanceDetails?.map((attendance) => {
                                        return <AttendanceDetailRow key={attendance._id} attendance={attendance} detailRollCallSession={detailRollCallSession} />
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>

    )
}

export default RollCallSessionDetail