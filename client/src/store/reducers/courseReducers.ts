import { GET_COURSES, CoursePayload, CourseType, LOADING_COURSE, CREATE_COURSE, CHANGE_PAGE } from '../types/courseTypes'

const initialState: CoursePayload = {
    courses: [],
    coursesLength: 0,
    loading: false,
    page: 1,
    result: [],
    limit: 5,
}

const courseReducer = (state: CoursePayload = initialState, action: CourseType): CoursePayload => {
    switch (action.type) {
        case GET_COURSES: {
            return {
                ...state,
                courses: action.payload.courses,
                coursesLength: action.payload.courses?.length,
                result: action.payload.courses?.slice(0, (state?.page as number) * (state?.limit as number))
            }
        }
        case LOADING_COURSE: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case CREATE_COURSE: {
            return {
                ...state,
                courses: state.courses ? [{ ...action.payload.course }, ...state.courses] : [{ ...action.payload.course }],
                coursesLength: state.coursesLength ? state.coursesLength + 1 : 1,
                result: !state.courses ?
                    [{ ...action.payload.course }] :
                    [{ ...action.payload.course }, ...state.courses].slice(
                        ((state.page ? state.page : 1) - 1) * ((state.limit) ? state.limit : 5),
                        ((state.page ? state.page : 1) * (state.limit ? state.limit : 5)))
            }
        }

        case CHANGE_PAGE: {
            return {
                ...state,
                page: action.payload.page,
                result: state.courses?.slice((action.payload.page - 1) * ((state.limit) ? state.limit : 5), (action.payload.page as number) * (state.limit ? state.limit : 5))
            }
        }

        default: return state;
    }
}

export default courseReducer