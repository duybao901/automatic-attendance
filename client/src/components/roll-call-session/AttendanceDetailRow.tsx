import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import dayjs from 'dayjs'
import './AttendanceDetailRow.scss'
import { Attendance, RollCallSession, InputChange, FormSubmit, RootStore } from '../../utils/interface';
import { useSelector, useDispatch } from 'react-redux'
import { updateAttendanceDetail } from '../../store/actions/rollCallSession'
import { ALERT } from '../../store/types/alertTypes'
import { putAPI } from '../../utils/fetchApi';
// MUI
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import PrimaryToolTip from '../globals/tool-tip/Tooltip'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';

interface AttendanceDetailRowProps {
    detailRollCallSession: RollCallSession
    attendance: Attendance
}

const useStyles = makeStyles({
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
});

const AttendanceDetailRow: React.FC<AttendanceDetailRowProps> = ({ attendance, detailRollCallSession }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { detailRollCallSession: detailRollCallSessionStore, auth } = useSelector((state: RootStore) => state)
    const [note, setNote] = useState<string>('');
    const [loadingAttendace, setLoadingAttendace] = useState<boolean>(false);
    const [loadingNote, setLoadingNote] = useState<boolean>(false);
    const [checked, setChecked] = useState<boolean>(false);
    const handleAttendance = async (e: InputChange, attendance: Attendance) => {

        if (loadingAttendace) return;

        setLoadingAttendace(true);
        try {
            const data = {
                absent: !attendance.absent
            }

            await putAPI(`attendance_detail/${attendance._id}`, data, auth.access_token)
            dispatch({ type: ALERT, payload: { success: "Điểm danh thành công" } })
            setLoadingAttendace(false)

            const newAttendanceDetails = detailRollCallSession.attendanceDetails?.map((_attendanceDetail) => {
                return _attendanceDetail._id === attendance._id ? { ...attendance, absent: !attendance.absent } : _attendanceDetail
            })

            dispatch(updateAttendanceDetail({ ...detailRollCallSession, attendanceDetails: newAttendanceDetails }, auth, detailRollCallSessionStore))

        } catch (error: any) {
            setLoadingAttendace(false)
            dispatch({ type: ALERT, payload: { error: error.response.dât.msg } })
        }
    }

    const handleSubmitNote = async (e: FormSubmit) => {
        e.preventDefault();
        setLoadingNote(true);
        try {

            const data = {
                note
            }

            await putAPI(`attendance_detail/${attendance._id}`, data, auth.access_token)
            setLoadingNote(false);
            dispatch({ type: ALERT, payload: { success: "Lưu thành công" } })


            const newAttendanceDetails = detailRollCallSession.attendanceDetails?.map((_attendanceDetail) => {
                return _attendanceDetail._id === attendance._id ? { ...attendance, note } : _attendanceDetail
            })

            dispatch(updateAttendanceDetail({ ...detailRollCallSession, attendanceDetails: newAttendanceDetails }, auth, detailRollCallSessionStore))
        } catch (error: any) {
            setLoadingNote(false);
            dispatch({ type: ALERT, payload: { error: error.response.dât.msg } })
        }

    }


    useEffect(() => {
        if (attendance.note) {
            setNote(attendance.note)
        }
        if (attendance) {
            setChecked(attendance.absent as boolean)
        }
    }, [attendance])

    return <TableRow
        className="detail__row"
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell className={`${classes.TableCellBody} ${classes.TableCellBodyId}`}>
            {
                attendance.student?._id
            }
        </TableCell>
        <TableCell className={classes.TableCellBody} align="left">
            {
                attendance.student?.name
            }
        </TableCell>
        <TableCell className={classes.TableCellBody} align="left">
            {
                attendance.student?.studentCode
            }
        </TableCell>
        <TableCell className={classes.TableCellBody} align="left">
            {
                dayjs(attendance?.date).format("DD-MM-YYYY")
            }
        </TableCell>
        <TableCell className={classes.TableCellBody} align="left">
            {
                detailRollCallSession.lesson?.course?.courseCode
            }
        </TableCell>
        <TableCell className={classes.TableCellBody} align="left">
            <FormGroup>
                {
                    loadingAttendace ? <p className="loading-text">Đang điểm danh...</p> :
                        <FormControlLabel control={<Checkbox checked={attendance.absent ? false : true} onChange={(e) => handleAttendance(e, attendance)} color='primary' sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />} label="Có mặt" />
                }
            </FormGroup>
        </TableCell>
        <TableCell className={classes.TableCellBody} align="left">
            <form className="detail__row-note" onSubmit={handleSubmitNote}>
                <div className='note__group'>
                    <textarea value={note} rows={3} cols={20} onChange={(e: InputChange) => setNote(e.target.value)}>
                    </textarea>
                    <PrimaryToolTip title="Lưu ghi chú">
                        <Button type='submit' color='primary' variant='contained'>
                            {/* {
                                loadingNote && <Loading type='small'>
                                </Loading>
                            } */}
                            <p style={{ textTransform: "capitalize", fontSize: "1.4rem" }}>
                                {
                                    loadingNote ? "Đang luư..." : "Lưu"
                                }
                            </p>
                        </Button>
                    </PrimaryToolTip>
                </div>
            </form>
        </TableCell>

    </TableRow>

}

export default AttendanceDetailRow