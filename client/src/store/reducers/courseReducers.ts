import { GET_COURSES, CoursePayload, CourseType, LOADING_COURSE, CREATE_COURSE } from '../types/courseTypes'

const initialState: CoursePayload = {
    courses: [],
    coursesLength: 0,
    loading: false,
    page: 2,
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
                result: action.payload.courses?.slice(0, ((state?.page as number) - 1) * (state?.limit as number))
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
                courses: state.courses ? [{ ...action.payload.course }, ...state.courses] : [{ ...action.payload.course }]
            }
        }
        default: return state;
    }
}

export default courseReducer