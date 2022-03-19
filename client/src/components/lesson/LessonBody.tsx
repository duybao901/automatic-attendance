import React, { useState } from 'react'
import "./LessonBody.scss"
import { InputChange } from '../../utils/interface'
import LessonFormModal from './LessonFormModal'

// MUI
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material'
import PrimaryTooltip from '../../components/globals/tool-tip/Tooltip'

const useStyle = makeStyles({
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
})

const LessonBody = () => {

    const classes = useStyle();
    const [search, setSearch] = useState<string>("");
    const [openModal, setOpenModal] = useState<boolean>(false);

    return (
        <>
            <div className="dashbroad__body lesson__body">
                <div className="lesson__body-control">
                    <form className="control__form">
                        <div className="form-group">
                            <input placeholder='Tìm theo tên môn học...' type='text' value={search} onChange={(e: InputChange) => setSearch(e.target.value)}></input>
                            <i className='bx bx-search'></i>
                        </div>
                    </form>
                    <div className="control__add">
                        <PrimaryTooltip title="Thêm buổi học">
                            <Button onClick={() => setOpenModal(true)}  variant='contained' color="primary" className={classes.ButtonAdd}>
                                <i className='bx bx-plus'></i>
                                Thêm buổi học
                            </Button>
                        </PrimaryTooltip>
                    </div>
                </div>
            </div>
            <LessonFormModal open={openModal} setOpen={setOpenModal} />
        </>
    )
}

export default LessonBody