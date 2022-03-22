import React from 'react'

// MUI

import Menu from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert'
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import Loading from '../globals/loading/Loading'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import PrimaryTooltip from '../globals/tool-tip/Tooltip';
import CloseIcon from '@mui/icons-material/Close';

const useStyle = makeStyles({
    Menu: {
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px - 1px rgb(0 0 0 / 0.1) !important",
    },
    MenuItem: {
        fontSize: "1.4rem !important",
        fontFamily: "Inter !important",
        fontWeight: "500 !important",
        color: "#1e293b",
        height: "40px !important",
        transition: "all 0.1s ease-in-out",
        "&:hover": {
            backgroundColor: "#473fce !important",
            color: "#fff !important",
            "& svg": {
                fill: "#fff !important",
            }
        }
    },
    MenuItemDelete: {
        // color: "crimson !important"
    },
    MenuIcon: {
        color: "rgb(91, 100, 112) !important",
        marginRight: "5px !important",
    },
    MenuIconDelete: {
        color: "crimson"
    }
})

const MenuListLesson = () => {

    const classes = useStyle();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={event => setAnchorEl(event.currentTarget)}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <PrimaryTooltip title="chỉnh sửa buổi học" placement="right">
                    <MenuItem className={classes.MenuItem}>
                        <EditIcon className={classes.MenuIcon} /> Chỉnh sửa
                    </MenuItem >
                </PrimaryTooltip>
                <PrimaryTooltip title="xoá buổi học" placement="right">
                    <MenuItem className={classes.MenuItem}>
                        <DeleteIcon className={`${classes.MenuIcon} ${classes.MenuIconDelete}`} /> Xoá
                    </MenuItem >
                </PrimaryTooltip>
                <PrimaryTooltip title="đóng" placement="right">
                    <MenuItem onClick={handleClose} className={classes.MenuItem}>
                        <CloseIcon className={`${classes.MenuIcon} ${classes.MenuIconDelete}`} /> Đóng
                    </MenuItem >
                </PrimaryTooltip>

            </Menu>
        </React.Fragment>
    )
}

export default MenuListLesson