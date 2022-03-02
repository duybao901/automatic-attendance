import { User, Course } from '../../utils/interface'
export const GET_USER_COURSE = 'GET_USER_COURSE'
export const LOADING_USER_COURSE = 'LOADING_USER_COURSE'
export const UPDATE_USER_COURSE = 'UPDATE_USER_COURSE'
export const EDIT_USER_COURSE = 'EDIT_USER_COURSE'
export const DELETE_USER_COURSE = 'DELETE_USER_COURSE'

export interface ProfilePayload {
    userInfor?: User
    userCourse?: Course[]
    page?: number
    loading?: boolean
    result?: number
    stopScrol?: false
}

export interface GetUserCourse {
    type: typeof GET_USER_COURSE
    payload: {
        courses: Course[]
        result: number
    }
}

export interface LoadingUserCourse {
    type: typeof LOADING_USER_COURSE
    payload: {
        loading: boolean
    }
}

export interface UpdateUserCourse {
    type: typeof UPDATE_USER_COURSE,
    payload: {
        newCourse: Course[]
    }
}

export interface EditUserCourse {
    type: typeof EDIT_USER_COURSE,
    payload: {
        course: Course
    }
}

export interface DeleteUserCourse  {
    type: typeof DELETE_USER_COURSE,
    payload: {
        course_id: string
    }
}

export type ProfileType = GetUserCourse | LoadingUserCourse | UpdateUserCourse | EditUserCourse | DeleteUserCourse