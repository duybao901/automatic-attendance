import { Course } from '../../utils/interface'
export const GET_COURSES = "GET_COURSES"
export const LOADING_COURSE = "LOADING_COURSE"
export const CREATE_COURSE = "CREATE_COURSE"

export interface CoursePayload {
    courses?: Course[]
    loading?: boolean
    page?: number
    coursesLength?: number | 0
    result?: Course[] 
    limit?: number 
}

export interface GetCourses {
    type: typeof GET_COURSES,
    payload: CoursePayload
}

export interface LoadingCourses {
    type: typeof LOADING_COURSE,
    payload: CoursePayload
}

export interface CreateCourse {
    type: typeof CREATE_COURSE,
    payload: {
        course: Course
    }
}

export type CourseType = GetCourses | LoadingCourses | CreateCourse