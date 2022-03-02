import React, { Dispatch, useEffect, useState } from 'react';
import "./InforCourse.scss"
import { RootStore, Course } from '../../utils/interface'
import { useSelector } from 'react-redux'
import { getUserCourse } from '../../store/actions/profileActions'
import { AuthPayload } from '../../store/types/authTypes';
import { deleteCourse } from '../../store/actions/courseActions'
import CourseFormModal from '../course/CourseFormModal';
import MenuList from './MenuList';
// MUI
import { makeStyles } from '@mui/styles';

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
    height: "40px !important",
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
  },
  Button: {
    fontSize: "1rem !important",
    fontWeight: "600 !important",
    height: "36px",
    padding: "4px !important",

  },
})

const InforCourse: React.FC<InforCourseProps> = ({ auth, id, dispatch }) => {

  const classes = useStyle()
  const { profile } = useSelector((state: RootStore) => state)
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [onEdit, setOnEdit] = useState<Course | null>({});



  useEffect(() => {
    if (auth.access_token) {
      dispatch(getUserCourse(auth, id))
    }
  }, [auth.user?._id, auth])

  const handleEditCourse = (course: Course) => {
    setOpenForm(true);
    setOnEdit(course);

  }

  return <div className="profile__course">

    {
      profile.loading === false && profile.result === 0 && <h2 style={{ padding: '10px 20px', fontSize: "1.4rem" }} className='loading-text'>
        Bạn chưa có khóa học nào !
      </h2>
    }
    {
      profile.loading ? <h3 className="loading-text">
        Loading...
      </h3> :
        <div className="profile__course-list">
          {
            profile.userCourse && profile?.userCourse.map((course, index) => {
              return <div className="profile__course-list-item" key={index}>
                {/* Form Course */}
                <CourseFormModal open={openForm} hanldeSetOpen={setOpenForm} setOnEdit={setOnEdit} onEdit={onEdit} />
                <div className="item__heading">
                  <h2 className='item__course-code'>
                    {course.courseCode}
                  </h2>
                  <MenuList course={course} classes={classes} handleEditCourse={handleEditCourse} />
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
    }
  </div>;
};

export default InforCourse;
