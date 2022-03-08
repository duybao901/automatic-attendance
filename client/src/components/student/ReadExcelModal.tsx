import React, { useState, useRef } from 'react'
import { modelStyle } from '../../utils/model-style'
import "./ReadExcelModal.scss"
import * as XLSX from 'xlsx'
// MUI 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { makeStyles } from '@mui/styles'
import PrimaryTooltip from '../../components/globals/tool-tip/Tooltip'
import { IconButton } from '@mui/material';

const useStyles = makeStyles({
    Modal: {
        width: "600px !important"
    },
    Button: {
        fontSize: "1.3rem !important",
        fontWeight: "600 !important",
        height: "36px",
        padding: "2px !important",

    },
});

interface ReadExcelModalProps {
    handleSetStudent?: React.Dispatch<React.SetStateAction<any[]>>
}

const ReadExcelModal: React.FC<ReadExcelModalProps> = ({ handleSetStudent }) => {

    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const [students, setStudents] = useState<any[]>([])
    const [file,setFile] = useState<File>();
    const refInput = useRef()  as React.MutableRefObject<HTMLInputElement>;

    // Dong form va reset lai file
    const handleClose = () => {
        setOpen(false)
        if (refInput.current) {
            refInput.current.value = "";
        }
    };

    const handleChaneFile = (e: any) => {
        try {
            const file = e.target.files[0]
            setFile(file)
            // Bắt đầu đọc nội dung của blobOrFile, một khi hoàn thành,
            // fileReader.result sẽ là một đối tượng ArrayBuffer.
            const fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)

            fileReader.onload = async (e) => {
          
                if (e.target) {
                    const bufferArray = e.target.result;

                    const wb = XLSX.read(bufferArray, { type: 'buffer' })

                    // Lấy SheetNames đầu tiên
                    const wsname = wb.SheetNames[0]

                    const ws = wb.Sheets[wsname]

                    // Chuyển thành array để xử lý
                    const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
                    if (data) {
                        const newData = data.slice(7,).map((item: any) => {
                            return {
                                studentCode: item[1] ? item[1].trim() : "",
                                studentName: item[2] ? item[2].trim() : '',
                                gender: item[5] ? item[5] : 'male'
                            }
                        })
                        setStudents(newData)
                    }
                }
            }

        } catch (error: any) {
            console.log(error)
        }
    }

    const hanldeAddStudent = () => {
        if(!file){
            alert("Vui lòng chọn file excel")
            return;
        }
        if (typeof handleSetStudent === "function") {
            handleSetStudent(students)
            handleClose()
        }
    }

    return (
        <div className='student'>
            <Box mr={1}>
                <PrimaryTooltip title="Thêm sinh viên">
                    <Button onClick={handleOpen} color="info" variant='contained' className={classes.Button}><p>Thêm sinh viên</p></Button>
                </PrimaryTooltip>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                keepMounted={true}

            >
                <Box sx={modelStyle} className={classes.Modal}>
                    <Box display='flex' justifyContent="space-between">
                        <h2 className="modal__heading">Tạo khoá học</h2>
                        <Box>
                            <PrimaryTooltip title='Đóng hộp thoại'>
                                <IconButton size="medium" onClick={handleClose}>
                                    <i className='bx bx-x' style={{ color: "#473fce", fontSize: "2.6rem" }}></i>
                                </IconButton>
                            </PrimaryTooltip>
                        </Box>
                    </Box>
                    <div className="student__file">
                        <input ref={refInput} type="file" accept='xlsx' onChange={handleChaneFile} />
                    </div>
                    <div className='modal__control'>
                        <div>
                        </div>
                        <Box display="flex" justifyContent="flex-end">
                            <Box>
                                <PrimaryTooltip title="Tạo khoá học">
                                    <Button type="submit" variant='contained' onClick={hanldeAddStudent} className={classes.Button}><p style={{ textTransform: "capitalize" }}>Thêm</p></Button>
                                </PrimaryTooltip>
                            </Box>
                        </Box>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}


export default ReadExcelModal