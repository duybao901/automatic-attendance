import * as types from '../types/lessontypes'
import { LessonPayload, LessonTypes } from '../types/lessontypes'

const initialState: LessonPayload = {
    lessons: []
}

const lessonReducer = (state: LessonPayload = initialState, action: LessonTypes): LessonPayload => {
    switch (action.type) {
        case types.GET_LESSONS:
            return {
                ...state,
                lessons: action.payload.lessons
            }
        case types.CREATE_LESSON: {
            console.log(action.payload.newLesson)
            return {
                ...state,
                lessons: state.lessons ? [action.payload.newLesson, ...state.lessons] : [action.payload.newLesson]
            }
        }
        case types.LOADING_LESSON: {
            return {
                ...state,
                loading: action.payload
            }
        }
        case types.UPDATE_LESSON: {
            return {
                ...state,
                lessons: state.lessons ?
                    state.lessons.map(lesson => lesson._id === action.payload.newLesson._id ?
                        action.payload.newLesson : lesson) : []
            }
        }
        case types.DELETE_LESSON: {
            return {
                ...state,
                lessons: state.lessons ? state.lessons.filter(lesson => {
                    return lesson._id !== action.payload.lesson_id
                }) : []
            }
        }
        default:
            return { ...state }
    }
}

export default lessonReducer;