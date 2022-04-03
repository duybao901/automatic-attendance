import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import './AttendanceDetailRow.scss'
import { Attendance, RollCallSession, InputChange } from '../../utils/interface';
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
    const [note, setNote] = useState<string>('');

    const handleAttendance = (e: InputChange, attendance: Attendance) => {
        // console.log(attendance?.student?.name)
    }

    useEffect(() => {
        if (attendance.note) {
            setNote(attendance.note)
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
                <FormControlLabel control={<Checkbox onChange={(e) => handleAttendance(e, attendance)} defaultChecked={attendance.absent ? false : true} color='primary' sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />} label="Có mặt" />
            </FormGroup>
        </TableCell>
        <TableCell className={classes.TableCellBody} align="left">
            <form className="detail__row-note">
                <div className='note__group'>
                    <textarea value={note} rows={3} cols={20} onChange={(e: InputChange) => setNote(e.target.value)}>
                    </textarea>
                    <PrimaryToolTip title="Lưu ghi chú">
                        <Button color='primary' variant='contained'>
                            <p style={{ textTransform: "capitalize", fontSize: "1.4rem" }}>
                                Lưu
                            </p>
                        </Button>
                    </PrimaryToolTip>
                </div>
            </form>
        </TableCell>

    </TableRow>

}

export default AttendanceDetailRow