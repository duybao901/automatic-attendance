import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FormSubmit, InputChange, Params } from '../../utils/interface'
import { RootStore, RollCallSession } from '../../utils/interface'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailRollCallSession } from '../../store/actions/rollCallSession'
import dayjs from 'dayjs'

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AttendanceDetailRow from '../../components/roll-call-session/AttendanceDetailRow'
const RollCallSessionDetail = () => {

    const dispatch = useDispatch();
    const { slug }: Params = useParams();
    const { detailRollCallSession: detailRollCallSessionStore, auth } = useSelector((state: RootStore) => state)

    const [detailRollCallSession, setDetailRollCallSession] = useState<RollCallSession>({})
    const [comment, setComment] = useState<string>("");

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

    }, [slug, auth, detailRollCallSessionStore])

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
    }

    console.log(detailRollCallSession)

    return (
        <div className='rollcallsession-detail'>
            <div className='rollcallsession-detail__table'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID sinh viên</TableCell>
                                <TableCell align="left">Họ và tên</TableCell>
                                <TableCell align="left">MSSV</TableCell>
                                <TableCell align="left">Ngày</TableCell>
                                <TableCell align="left">Học phần</TableCell>
                                <TableCell align="left">Ghi chú</TableCell>
                                <TableCell align="left">Có mặt</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                detailRollCallSession.attendanceDetails?.map((attendance) => {
                                    return <AttendanceDetailRow key={attendance._id} attendance={attendance} detailRollCallSession={detailRollCallSession}/>
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="rollcallsession-detail__control">
                {/* Detail Roll Call Session Card */}
                <div className='rollcallsession-detail__control-detail'>
                    <h2 className="detail__course-name">
                        {
                            detailRollCallSession.lesson?.course?.name
                        }
                    </h2>
                    <p className="detail__course-code">
                        {
                            detailRollCallSession.lesson?.course?.courseCode
                        }
                    </p>
                    <p className="detail__comment">
                        {
                            detailRollCallSession.comment
                        }
                    </p>
                    <div className="detail__group">
                        <i className='bx bxs-calendar-week' ></i>
                        <span>{detailRollCallSession.lesson?.weekday}</span>
                    </div>
                    <div className="detail__group">
                        <i className='bx bxs-time'></i>
                        <span>Thời gian bắt đầu: {dayjs(detailRollCallSession.lesson?.timeStart).format("hh:mm a")}</span>
                    </div>
                    <div className="detail__group">
                        <i className='bx bxs-time-five'></i>
                        <span>Thời gian kết thúc: {dayjs(detailRollCallSession.lesson?.timeEnd).format("hh:mm a")}</span>
                    </div>
                    <div className="detail__group">
                        <i className='bx bxs-graduation'></i>
                        {
                            <span>{detailRollCallSession.teacher?.name} ({detailRollCallSession.teacher?.account})</span>
                        }
                    </div>
                </div>

                {/* Form */}
                <div className="rollcallsession-detail__control-comment">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text" value={comment}
                            name='commnet'
                            id='comment'
                            onChange={(e: InputChange) => setComment(e.target.value)} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RollCallSessionDetail