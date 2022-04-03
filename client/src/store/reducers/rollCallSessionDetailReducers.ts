import * as types from '../types/rollCallSessionDetailTypes'
import { RollCallSessionDetailType, RollCallSessionDetailPayload } from '../types/rollCallSessionDetailTypes'

const initialState: RollCallSessionDetailPayload = {
    rollCallSessions: [],
    loading: false
}

const rollCallSessionDetailReducers = (state: RollCallSessionDetailPayload = initialState,
    action: RollCallSessionDetailType): RollCallSessionDetailPayload => {
    switch (action.type) {
        case types.GET_ROLL_CALL_SESSION_DETAIL: {
            return {
                rollCallSessions: state.rollCallSessions && [...state.rollCallSessions, action.payload.rollCallSession]
            }
        }
        case types.LOADING_ROLL_CALL_SESSION_DETAIL: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default rollCallSessionDetailReducers