import React, { useState } from 'react';
import { Student } from '../../utils/interface';
// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StudentFormModal from './StudentFormModal';
interface StudentTableProps {
    students?: Student[]
}

const useStyles = makeStyles({
    TableContainer: {
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1) !important",
        backgroundColor: "",
        maxHeight: "500px",
    },
    TableCellHead: {
        fontSize: "1.4rem !important",
        fontFamily: "-apple-system, BlinkMacSystemFont, Inter,' Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
        fontWeight: "600 !important"
    },
    TableCellHeadAction: {
        width: "50px !important",
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
    Button: {
        fontSize: "1rem !important",
        fontWeight: "600 !important",
        height: "36px",
        padding: "4px !important",
        minWidth: "50px !important",

    },
});

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {

    const classes = useStyles()
    const [openModalForm, setOpenModalForm] = useState<boolean>(false)
    const [onEdit, setOnEdit] = useState<Student | null>({});

    const handleOpenModalForm = (student: Student | null) => {
        setOnEdit(student)
        setOpenModalForm(true)
    }

    return <TableContainer component={Paper} className={classes.TableContainer} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell className={classes.TableCellHead}>ID Sinh viên</TableCell>
                    <TableCell className={classes.TableCellHead} align="left">Họ và Tên</TableCell>
                    <TableCell className={classes.TableCellHead} align="left">MSSV</TableCell>
                    <TableCell className={classes.TableCellHead} align="left">Giới tính</TableCell>
                    <TableCell className={classes.TableCellHead} align="left">Số điện thoại</TableCell>
                    <TableCell className={`${classes.TableCellHead} ${classes.TableCellHeadAction}`} align="center">Chỉnh sửa</TableCell>
                    <TableCell className={`${classes.TableCellHead} ${classes.TableCellHeadAction}`} align="center">Xoá</TableCell>

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
                        <TableCell align="left" className={classes.TableCellBody}>{student.phone}</TableCell>

                        <TableCell align="center" className={classes.TableCellBody}>
                            <Button onClick={() => handleOpenModalForm(student)} className={classes.Button} variant='contained'>
                                <EditIcon />
                            </Button>
                        </TableCell>
                        <TableCell align="center" className={classes.TableCellBody}>
                            <Button className={classes.Button} variant='contained' color='error'>
                                <DeleteIcon />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <StudentFormModal open={openModalForm} hanldeSetOpen={setOpenModalForm} onEdit={onEdit} setOnEdit={setOnEdit} />
    </TableContainer>
        ;
}

export default StudentTable