import { Dispatch } from 'react'
import { Course } from '../../utils/interface'
import { CREATE_COURSE, GET_COURSES, CourseType, LOADING_COURSE, CHANGE_PAGE } from '../types/courseTypes'
import { ALERT, AlertType } from '../types/alertTypes'
import { AuthPayload } from '../types/authTypes'
import { getAPI, postAPI } from '../../utils/fetchApi'

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

export const createCourse = (course: Course, auth: AuthPayload) => async (dispatch: Dispatch<CourseType | AlertType>) => {
    if (!auth.access_token) return;
    const { name, courseCode, credit, yearStart, yearEnd, semester } = course;
    try {
        const res = await postAPI('create_course', { name, courseCode, credit, yearStart, yearEnd, semester }, auth.access_token);
        dispatch({ type: CREATE_COURSE, payload: { course: { ...res.data.newCourse, teacher: auth.user } } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })

    } catch (error: any) {
        dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }

}

export const changePageCourse = (page: number) => async (dispatch: Dispatch<CourseType | AlertType>) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
}