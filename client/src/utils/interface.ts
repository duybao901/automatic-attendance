import { ChangeEvent } from 'react'
import rootReducer from '../store/reducers/index'

export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
export type FormSubmit = ChangeEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>;
export interface Params {
    page: string
    slug: string
}

export interface UserLogin {
    account: string;
    password: string;
}
export interface UserRegister extends UserLogin {
    name?: string;
    cfPassword?: string
}

export interface User extends UserRegister {
    _id: string;
    avatar: string;
    role: string;
    confirm: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserAuthErrors {
    errorName?: string
    errorAccount: string
    errorPassword: string
    errorCfPassword?: string
    errorPasswordMatch?: string
}

export interface UserProfile {
    name?: string
    account?: string
    password?: string
    cfPassword?: string
    avatar?: string | Blob
}

export interface Course {
    courseCode?: string
    createdAt?: Date
    credit?: number
    name?: string
    semester?: string
    teacher?: User
    updatedAt?: Date
    yearEnd?: string
    yearStart?: string
    students?: any[]
    description?: string
    __v?: number
    _id?: string
}

export interface ErrorCourse {
    errorName?: string
    errorCourseCode?: string
    errorCredit?: string
    errorDescription?: string
}

export interface SortingCourse {
    onSort: 'course_name' | 'course_date',
    sortBy: "name" | "courseCode" | "credit" | "yearStart" | "yearEnd" | "semester" | "date",
    sort: "asc" | "desc"
}

export interface SearchingCourse {
    searchByCourseName?: string
    searchByCourseCode?: string
    searchByCourseTeacher?: string
    onSearch?: true | false
}