import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

interface StudentTableProps {
    students?: any[]
}

const useStyles = makeStyles({

    TableContainer: {
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important",
        backgroundColor: ""
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
        maxWidth: "150px",
        WebkitLineClamp: "1",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
});

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
    const classes = useStyles()
    return <TableContainer component={Paper} className={classes.TableContainer} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.TableCellHead}>ID Sinh viên</TableCell>
                    <TableCell className={classes.TableCellHead} align="left">Họ và Tên</TableCell>
                    <TableCell className={classes.TableCellHead} align="left">MSSV</TableCell>
                    <TableCell className={classes.TableCellHead} align="left">Giới tính</TableCell>
                    {/* <TableCell className={classes.TableCellHead} align="left">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
                {students && students.map((student) => (
                    <TableRow
                        key={student._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row" className={`${classes.TableCellBody} ${classes.TableCellBodyId}`}>
                            {student._id}
                        </TableCell>
                        <TableCell align="left" className={classes.TableCellBody}>{student.name}</TableCell>
                        <TableCell align="left" className={classes.TableCellBody}>{student.studentCode}</TableCell>
                        <TableCell align="left" className={classes.TableCellBody}>{student.gender}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
        ;
}

export default StudentTable