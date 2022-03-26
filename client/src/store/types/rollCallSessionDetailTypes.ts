import { RollCallSession } from '../../utils/interface'
export const GET_ROLL_CALL_SESSION_DETAIL = "GET_ROLL_CALL_SESSION_DETAIL"

export interface RollCallSessionDetailPayload {
    rollCallSessions?: RollCallSession[]
}

interface GetRollCallSessionDetail {
    type: typeof GET_ROLL_CALL_SESSION_DETAIL,
    payload: {
        rollCallSession: RollCallSession
    }
}

export type RollCallSessionDetailType = GetRollCallSessionDetail