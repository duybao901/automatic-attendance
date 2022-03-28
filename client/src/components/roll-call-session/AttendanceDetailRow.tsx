import React from 'react'
import dayjs from 'dayjs'
import './AttendanceDetailRow.scss'
import { Attendance, RollCallSession } from '../../utils/interface';
// MUI
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import PrimaryToolTip from '../globals/tool-tip/Tooltip'

interface AttendanceDetailRowProps {
    detailRollCallSession: RollCallSession
    attendance: Attendance
}

const AttendanceDetailRow: React.FC<AttendanceDetailRowProps> = ({ attendance, detailRollCallSession }) => {
    return <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell>
            {
                attendance.student?._id
            }
        </TableCell>
        <TableCell align="left">
            {
                attendance.student?.name
            }
        </TableCell>
        <TableCell align="left">
            {
                attendance.student?.studentCode
            }
        </TableCell>
        <TableCell align="left">
            {
                dayjs(attendance?.date).format("DD-MM-YYYY")
            }
        </TableCell>
        <TableCell align="left">
            {
                detailRollCallSession.lesson?.course?.courseCode
            }
        </TableCell>
        <TableCell align="left">
            <form>
                <div className=''>
                    <textarea>

                    </textarea>
                    <PrimaryToolTip title="Lưu ghi chú">
                        <Button color='primary' variant='contained'>
                            <p style={{ textTransform: "capitalize" }}>
                                Lưu
                            </p>
                        </Button>
                    </PrimaryToolTip>
                </div>
            </form>
        </TableCell>
        <TableCell align="left">
            <input type='checkbox'></input>
        </TableCell>
    </TableRow>

}

export default AttendanceDetailRow