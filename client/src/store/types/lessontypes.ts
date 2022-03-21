import { Lesson } from '../../utils/interface'
export const CREATE_LESSON = 'CREATE_LESSON'
export const GET_LESSONS = 'GET_LESSONS'

export interface LessonPayload {
    lessons: Lesson[],
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

export type LessonTypes = CreateLesson | GetLessons