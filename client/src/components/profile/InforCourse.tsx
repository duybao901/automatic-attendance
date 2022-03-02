import React, { Dispatch, useEffect } from 'react';
import "./InforCourse.scss"
import { User, RootStore } from '../../utils/interface'
import { useSelector } from 'react-redux'
import { getUserCourse } from '../../store/actions/profileActions'
import { AuthPayload } from '../../store/types/authTypes';

// MUI
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
interface InforCourseProps {
  auth: AuthPayload
  id: string
  dispatch: Dispatch<any>
}

const useStyle = makeStyles({
  Menu: {
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px - 1px rgb(0 0 0 / 0.1) !important",
  },
  MenuItem: {
    fontSize: "1.4rem !important",
    fontFamily: "Inter !important",
    fontWeight: "500 !important",
    color: "#1e293b",
    height:"40px !important",
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

const InforCourse: React.FC<InforCourseProps> = ({ auth, id, dispatch }) => {

  const classes = useStyle()
  const { profile } = useSelector((state: RootStore) => state)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (auth.access_token) {
      dispatch(getUserCourse(auth, id))
    }
  }, [auth.user?._id, auth])

  return <div className="profile__course">
    <div className="profile__course-list">
      {
        profile.userCourse && profile?.userCourse.map((course, index) => {
          return <div className="profile__course-list-item" key={index}>
            <div className="item__heading">
              <h2 className='item__course-code'>
                {course.courseCode}
              </h2>
              <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
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
                className={classes.Menu}
              >
                <MenuItem className={classes.MenuItem} onClick={handleClose}>
                  <InfoIcon className={classes.MenuIcon} /> Chi tiết
                </MenuItem>
                <MenuItem className={classes.MenuItem} onClick={handleClose}>
                  <EditIcon className={classes.MenuIcon} /> Chỉnh sửa
                </MenuItem >
                <MenuItem className={`${classes.MenuItem} ${classes.MenuItemDelete}`} onClick={handleClose}>
                  <DeleteIcon className={`${classes.MenuIcon} ${classes.MenuIconDelete}`} /> Xoá
                </MenuItem>
              </Menu>
            </div>
            <div className='item__course-student'>
              <h3>
                {
                  course.students ? course.students.length : 0
                }
              </h3>
              <span>
                học viên
              </span>
            </div>
            <h3 className="item__course-name">
              {
                course.name
              }
            </h3>
          </div>
        })
      }
    </div>
  </div>;
};

export default InforCourse;
