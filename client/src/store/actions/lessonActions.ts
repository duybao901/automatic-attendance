import { Dispatch } from 'react'
import * as types from '../types/lessontypes'
import { LessonPayload, LessonTypes } from '../types/lessontypes'
import { AlertType, ALERT } from '../types/alertTypes'
import { AuthPayload } from '../types/authTypes'
import { getAPI, postAPI } from '../../utils/fetchApi'
import { Lesson } from '../../utils/interface'

export const getLessons = (auth: AuthPayload) => async (dispatch: Dispatch<LessonTypes | AlertType>) => {
    if (!auth.user && !auth.access_token) return;

    try {
        const res = await getAPI('lessons', auth.access_token);
        dispatch({ type: types.GET_LESSONS, payload: { lessons: res.data.lessons } })
    } catch (error: any) {
        return dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }
}

export const createLesson = (lesson: Lesson, auth: AuthPayload) => async (dispatch: Dispatch<LessonTypes | AlertType>) => {
    if (!auth.user && !auth.access_token && !lesson) return;
    try {
        const res = await postAPI('lesson', { ...lesson, course_id: lesson.course?._id }, auth.access_token);
        dispatch({ type: types.CREATE_LESSON, payload: { newLesson: { ...res.data.newLesson } } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (error: any) {
        console.log(error.response)
        return dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }
}