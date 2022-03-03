import { ProfilePayload, ProfileType, UPDATE_USER_COURSE } from '../types/profileTypes'
import * as types from '../types/profileTypes'
import { Course, SearchingCourse } from '../../utils/interface'
import { arraySearch } from './courseReducers'

const initalState: ProfilePayload = {
    userCourse: [],
    totalCourse: 0,
    page: 1,
    limit: 4,
    loading: false,
    result: 0,
    stopLoadMore: false
}

const profileReducer = (state: ProfilePayload = initalState, action: ProfileType): ProfilePayload => {
    switch (action.type) {

        // Lay cac mon hoc cua user
        case types.GET_USER_COURSE: {
            return {
                ...state,
                userCourse: [...action.payload.courses],
                result: action.payload.result,
                totalCourse: action.payload.total
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
                userCourse: [...action.payload.newCourse],
                page: action.payload.page,
                result: state.result && action.payload.result + state.result as number,
                stopLoadMore: action.payload.stopLoadMore
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
                totalCourse: state.totalCourse as number - 1,
                result: state.result as number - 1,
            }
        }

        case types.CREATE_USER_COURSE: {
            return {
                ...state,
                userCourse: state.userCourse && [action.payload.course, ...state.userCourse],
                totalCourse: state.totalCourse as number + 1,
                result: state.result as number - 1,

            }
        }

        case types.SEARCH_BY_USER_COURSE_NAME: {

            if (state.searching) {
                const searching: SearchingCourse = {
                    ...state.searching,
                    onSearch: false
                }
                if (action.payload.search === "" &&
                    state.searching.searchByCourseCode === "") {
                    return {
                        ...state,
                        searching: {
                            ...searching,
                            searchByCourseName: "",
                        },
                        userCourseSearch: [],
                        
                    }
                }
            }

            const searching: SearchingCourse = {
                ...state.searching,
                onSearch: true,
                searchByCourseName: action.payload.search,
            }
            const newCourse = arraySearch(searching, state?.userCourse as Course[])
                     
            return {
                ...state,
                searching,
                userCourseSearch: newCourse,               
            }
        }

        case types.SEARCH_BY_USER_COURSE_CODE: {
            
            if (state.searching) {
                const searching: SearchingCourse = {
                    ...state.searching,
                    onSearch: false
                }
                if (action.payload.search === "" &&
                    state.searching.searchByCourseName === "") {
                    return {
                        ...state,
                        searching: {
                            ...searching,
                            searchByCourseCode: "",
                        },
                        userCourseSearch: [],
                    }
                }
            }

            const searching: SearchingCourse = {
                ...state.searching,
                onSearch: true,
                searchByCourseCode: action.payload.search,
            }
            const newCourse = arraySearch(searching, state?.userCourse as Course[])
                     
            return {
                ...state,
                searching,
                userCourseSearch: newCourse,               
            }
        }

        default:
            return state;
    }
}

export default profileReducer;