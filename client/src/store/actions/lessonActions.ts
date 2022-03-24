import { Dispatch } from 'react'
import * as types from '../types/lessontypes'
import { LessonPayload, LessonTypes } from '../types/lessontypes'
import { AlertType, ALERT } from '../types/alertTypes'
import { AuthPayload } from '../types/authTypes'
import { deleteAPI, getAPI, postAPI, putAPI } from '../../utils/fetchApi'
import { Lesson } from '../../utils/interface'

// Lay buoi hoc
export const getLessons = (auth: AuthPayload) =>
    async (dispatch: Dispatch<LessonTypes | AlertType>) => {
        if (!auth.user && !auth.access_token) return;

        try {
            dispatch({ type: types.LOADING_LESSON, payload: true })
            const res = await getAPI('lesson', auth.access_token);
            dispatch({ type: types.GET_LESSONS, payload: { lessons: res.data.lessons } })
            dispatch({ type: types.LOADING_LESSON, payload: false })
        } catch (error: any) {
            return dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
        }
    }

// Them buoi hoc
export const createLesson = (lesson: Lesson, auth: AuthPayload) =>
    async (dispatch: Dispatch<LessonTypes | AlertType>) => {

        if (!auth.user && !auth.access_token && !lesson) return;
        try {
            
            const res = await postAPI('lesson', { ...lesson, course_id: lesson.course?._id }, auth.access_token);
            dispatch({ type: types.CREATE_LESSON, payload: { newLesson: { ...lesson, teacher: auth.user } } })
            dispatch({ type: ALERT, payload: { success: res.data.msg } })
        } catch (error: any) {
            console.log(error.response)
            return dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
        }
    }

// Chinh sua buoi hoc
export const updateLesson = (lesson: Lesson, auth: AuthPayload) =>
    async (dispatch: Dispatch<LessonTypes | AlertType>) => {
        if (!auth.access_token && !auth.user) return;
        try {
            // console.log(lesson.course?._id)
            const res = await putAPI(`lesson/${lesson._id}`, { ...lesson, course_id: lesson.course?._id }, auth.access_token)
            dispatch({ type: types.UPDATE_LESSON, payload: { newLesson: { ...lesson, teacher: auth.user } } })
            dispatch({ type: ALERT, payload: { success: res.data.msg } })
        } catch (error: any) {
            return dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
        }
    }

// Xoa buoi hoc
export const deleteLesson = (lesson_id: string, auth: AuthPayload) =>
    async (dispatch: Dispatch<LessonTypes | AlertType>) => {        
        if (!auth.access_token && !auth.user) return;
        try {
            const res = await deleteAPI(`lesson/${lesson_id}`, auth.access_token)
            dispatch({ type: types.DELETE_LESSON, payload: { lesson_id } })
            dispatch({ type: ALERT, payload: { success: res.data.msg } })
        } catch (error: any) {
            return dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
        }
    }