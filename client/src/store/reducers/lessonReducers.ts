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
            return {
                ...state,
                lessons: state.lessons ? [action.payload.newLesson, ...state.lessons] : [action.payload.newLesson]  
            }
        }
        default:
            return { ...state }
    }
}

export default lessonReducer;