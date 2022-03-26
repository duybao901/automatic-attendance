import * as types from '../types/rollCallSessionDetailTypes'
import { RollCallSessionDetailType, RollCallSessionDetailPayload } from '../types/rollCallSessionDetailTypes'

const initialState: RollCallSessionDetailPayload = {
    rollCallSessions: []
}

const rollCallSessionDetailReducer = (state: RollCallSessionDetailPayload = initialState,
    action: RollCallSessionDetailType): RollCallSessionDetailPayload => {
    switch (action.type) {
        case types.GET_ROLL_CALL_SESSION_DETAIL: {
            return {
                rollCallSessions: state.rollCallSessions && [...state.rollCallSessions, action.payload.rollCallSession]
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default rollCallSessionDetailReducer