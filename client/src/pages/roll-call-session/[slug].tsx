import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FormSubmit, InputChange, Params } from '../../utils/interface'
import { RootStore, RollCallSession } from '../../utils/interface'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailRollCallSession, updateDetailRollCallSession } from '../../store/actions/rollCallSession'
import dayjs from 'dayjs'
import "./RollCallSessionDetail.scss"
import Loading from '../../components/globals/loading/Loading'

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
import { Box } from '@mui/system'


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
});

const RollCallSessionDetail = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { slug }: Params = useParams();
    const { detailRollCallSession: detailRollCallSessionStore, auth } = useSelector((state: RootStore) => state)

    const [detailRollCallSession, setDetailRollCallSession] = useState<RollCallSession>({})
    const [comment, setComment] = useState<string>();
    const [loadingComment, setLoadingCommnet] = useState<boolean>(false);

    useEffect(() => {
        if (slug) {
            const handleGetDetailRollCallSession = async () => {
                await dispatch(getDetailRollCallSession(detailRollCallSessionStore, slug, auth))
            }
            handleGetDetailRollCallSession()
        }

        detailRollCallSessionStore.rollCallSessions?.filter(rollCallSession => {
            if (rollCallSession._id === slug) {
                setDetailRollCallSession(rollCallSession)
            }
        })

    }, [slug, auth, detailRollCallSessionStore.rollCallSessions])

    useEffect(() => {
        if (detailRollCallSession) {
            setComment(detailRollCallSession.comment)
        }
    }, [detailRollCallSessionStore])

    //  Luu nhan xet
    const handleSubmit = async (e: FormSubmit) => {
        e.preventDefault()
        setLoadingCommnet(true)
        await dispatch(updateDetailRollCallSession({ ...detailRollCallSession, comment }, auth))
        setLoadingCommnet(false)
    }

    // console.log(detailRollCallSession)

    return (
        <div className='dashbroad__body dashbroad__body--xl'>
            <div className='rollcallsession-detail'>
                <div className="rollcallsession-detail__header">
                    {

                    }
                    <div className="header__left">
                        <h2>
                            {
                                detailRollCallSession.lesson?.course?.name
                            }
                            <span>
                                #{
                                    detailRollCallSession.lesson?.course?.courseCode
                                }
                            </span>
                        </h2>
                        <p className="header__left-comment">
                            {
                                detailRollCallSession.comment ? detailRollCallSession.comment : "Chưa có nhận xết về buổi học"
                            }
                        </p>

                    </div>
                    <div className="header__right">
                        <div className="header__btn-end">
                            <PrimaryTooltip title="Xuất file excel">
                                <Button variant='contained'>
                                    <i className='bx bx-export' style={{ fontSize: '2.4rem', marginRight: "5px", marginTop: "-5px" }}></i>
                                    <p className="button-text"> Xuất File</p>
                                </Button>
                            </PrimaryTooltip>
                        </div>
                        <div className="header__btn-end">
                            <PrimaryTooltip title="Kết thúc buổi điểm danh" color='error'>
                                <Button variant='contained'>
                                    <i style={{ fontSize: '2.4rem', marginRight: "5px" }} className='bx bx-stopwatch'></i>  <p className="button-text">Kết Thúc</p>
                                </Button>
                            </PrimaryTooltip>
                        </div>
                    </div>
                </div>
                <div className="rollcallsession-detail__control">
                    {/* Detail Roll Call Session Card */}
                    <div className='rollcallsession-detail__control-detail'>
                        <div className="detail__infor">
                            <div className="detail__infor-group">
                                <i className='bx bxs-calendar-week' ></i>
                                <span>{detailRollCallSession.lesson?.weekday}</span>
                            </div>
                            <div className="detail__infor-group">
                                <i className='bx bxs-time'></i>
                                <span>Thời gian bắt đầu: {dayjs(detailRollCallSession.lesson?.timeStart).format("hh:mm a")}</span>
                            </div>
                            <div className="detail__infor-group">
                                <i className='bx bxs-time-five'></i>
                                <span>Thời gian kết thúc: {dayjs(detailRollCallSession.lesson?.timeEnd).format("hh:mm a")}</span>
                            </div>
                            <div className="detail__infor-group">
                                <i className='bx bxs-graduation'></i>
                                {
                                    <span>{detailRollCallSession.teacher?.name} ({detailRollCallSession.teacher?.account})</span>
                                }
                            </div>
                        </div>
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

                    {/* End */}
                    <div className='rollcallsession-detail__control-button'>

                    </div>

                </div>
                <div className='rollcallsession-detail__table'>
                    <TableContainer className={classes.TableContainer} component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.TableCellHead} >ID sinh viên</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">Họ và tên</TableCell>
                                    <TableCell className={classes.TableCellHead} align="left">MSSV</TableCell>
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