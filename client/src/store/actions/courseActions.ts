import { Dispatch } from 'react'
import { Course } from '../../utils/interface'
import {
    CREATE_COURSE,
    GET_COURSES, CourseType,
    LOADING_COURSE, CHANGE_PAGE,
    DELETE_COURSE, SORT_BY_DATE,
    SORT_BY_COURSE_NAME,
    SEARCH_BY_COURSE_NAME,
    SEARCH_BY_COURSE_CODE,
    SEARCH_BY_COURSE_TEACHER,
    UPDATE_COURSE,
}
    from '../types/courseTypes'
import { ALERT, AlertType } from '../types/alertTypes'
import { AuthPayload } from '../types/authTypes'
import { deleteAPI, getAPI, postAPI, putAPI } from '../../utils/fetchApi'
import { DELETE_USER_COURSE, EDIT_USER_COURSE, CREATE_USER_COURSE, ProfileType, ProfilePayload } from '../types/profileTypes'


export const getCourses = (auth: AuthPayload) => async (dispatch: Dispatch<CourseType | AlertType>) => {
    if (!auth.access_token) return;

    try {
        dispatch({ type: LOADING_COURSE, payload: { loading: true } })
        const res = await getAPI('get_courses', auth.access_token);
        dispatch({ type: GET_COURSES, payload: { courses: res.data.courses } })
        dispatch({ type: LOADING_COURSE, payload: { loading: false } })
    } catch (error: any) {
        dispatch({ type: LOADING_COURSE, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }
}

export const createCourse = (course: Course, auth: AuthPayload, profile: ProfilePayload) => async (dispatch: Dispatch<CourseType | AlertType | ProfileType>) => {
    if (!auth.access_token && !auth.user && !profile) return;
    const { name, courseCode, credit, yearStart, yearEnd, semester, description, students } = course;
    try {
        const res = await postAPI('create_course', { name, courseCode, credit, yearStart, yearEnd, semester, description, students }, auth.access_token);
        dispatch({ type: CREATE_COURSE, payload: { course: { ...res.data.newCourse, teacher: auth.user } } })
        const res_A = await getAPI(`user_course/${auth.user && auth.user._id}`, auth.access_token)
        const { courses, result, total } = res_A.data
        dispatch({ type: CREATE_USER_COURSE, payload: { courses: [...courses], result, total } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }

}

export const updateCourse = (course: Course, auth: AuthPayload) => async (dispatch: Dispatch<CourseType | AlertType | ProfileType>) => {
    if (!auth.access_token) return;
    console.log(course)
    const { name, courseCode, credit, yearStart, yearEnd, semester, description, students } = course;
    try {
        const res = await putAPI(`update_course/${course._id}`, { name, courseCode, credit, yearStart, yearEnd, semester, description, students }, auth.access_token);
        dispatch({ type: UPDATE_COURSE, payload: { course: { ...res.data.course, teacher: auth.user } } })
        dispatch({ type: EDIT_USER_COURSE, payload: { course: { ...res.data.course, teacher: auth.user } } });
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }
}

export const changePageCourse = (page: number) => async (dispatch: Dispatch<CourseType | AlertType>) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
}

export const deleteCourse = (course_id: string, auth: AuthPayload, profile: ProfilePayload) => async (dispatch: Dispatch<CourseType | AlertType | ProfileType>) => {
    if (!auth.access_token) return;

    try {
        const res = await deleteAPI(`course/${course_id}`, auth.access_token);
        dispatch({ type: DELETE_COURSE, payload: { course_id } })
        const res_A = await getAPI(`user_course/${auth.user && auth.user._id}`, auth.access_token)
        const { courses, result, total } = res_A.data
        dispatch({ type: DELETE_USER_COURSE, payload: { courses: [...courses], result, total } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } });
    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }
}
// Sort
export const sortByDate = (sort: "asc" | "desc") => async (dispatch: Dispatch<CourseType>) => {
    dispatch({ type: SORT_BY_DATE, payload: { sort } });
}

export const sortByCourseName = (sort: "asc" | "desc") => async (dispatch: Dispatch<CourseType>) => {
    dispatch({ type: SORT_BY_COURSE_NAME, payload: { sort } })
}

// Search
export const searchByCourseName = (search: string) => async (dispatch: Dispatch<CourseType>) => {
    dispatch({ type: SEARCH_BY_COURSE_NAME, payload: { courseName: search } });
}

export const searchByCourseCode = (search: string) => async (dispatch: Dispatch<CourseType>) => {
    dispatch({ type: SEARCH_BY_COURSE_CODE, payload: { courseCode: search } });
}


export const searchByCourseTeacher = (search: string) => async (dispatch: Dispatch<CourseType>) => {
    dispatch({ type: SEARCH_BY_COURSE_TEACHER, payload: { courseTeacher: search } });
}


