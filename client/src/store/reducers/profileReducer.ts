import { ProfilePayload, ProfileType, UPDATE_USER_COURSE } from '../types/profileTypes'
import * as types from '../types/profileTypes'
import { Course } from '../../utils/interface'

const initalState: ProfilePayload = {
    userCourse: [],
    page: 1,
    loading: false,
    stopScrol: false,
    result: 0
}

const profileReducer = (state: ProfilePayload = initalState, action: ProfileType): ProfilePayload => {
    switch (action.type) {

        // Lay cac mon hoc cua user
        case types.GET_USER_COURSE: {
            return {
                ...state,
                userCourse: [...action.payload.courses],
                result: action.payload.result
            }
        }

        case types.LOADING_USER_COURSE: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }

        case types.UPDATE_USER_COURSE: {
            return {
                ...state,
                userCourse: [...state.userCourse as Course[], ...action.payload.newCourse as Course[]]
            }
        }

        case types.EDIT_USER_COURSE: {
            return {
                ...state,
                userCourse: state.userCourse && state.userCourse.map((course: Course) => {
                    return course._id === action.payload.course._id ? action.payload.course : course
                })
            }
        }

        case types.DELETE_USER_COURSE: {
            return {
                ...state,
                userCourse: state.userCourse && state.userCourse.filter((course: Course) => {
                    return course._id !== action.payload.course_id
                }),
                result: state.result as number - 1

            }
        }

        default:
            return state;
    }
}

export default profileReducer;