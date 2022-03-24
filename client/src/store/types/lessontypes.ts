import { Lesson } from '../../utils/interface'
export const CREATE_LESSON = 'CREATE_LESSON'
export const GET_LESSONS = 'GET_LESSONS'
export const LOADING_LESSON = 'LOADING_LESSON'
export const UPDATE_LESSON = 'UPDATE_LESSON'
export const DELETE_LESSON = 'DELETE_LESSON'

export interface LessonPayload {
    lessons?: Lesson[],
    loading?: boolean
}


export interface CreateLesson {
    type: typeof CREATE_LESSON,
    payload: {
        newLesson: Lesson
    }
}

export interface GetLessons {
    type: typeof GET_LESSONS,
    payload: {
        lessons: Lesson[]
    }
}

export interface LoadingLesson {
    type: typeof LOADING_LESSON,
    payload: boolean
}

export interface UpdateLesson {
    type: typeof UPDATE_LESSON,
    payload: {
        newLesson: Lesson
    }
}

export interface DeleteLesson {
    type: typeof DELETE_LESSON,
    payload: {
        lesson_id: string
    }
}

export type LessonTypes = CreateLesson | GetLessons | LoadingLesson | UpdateLesson | DeleteLesson