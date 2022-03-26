import { RollCallSession } from '../../utils/interface'

export const CREATE_ROLL_CALL_SESSION = "CREATE_ROLL_CALL_SESSION"

export interface RollCallSessionPayload {
    rollCallSessions?: RollCallSession[]
}

interface CreateRollCallSession {
    type: typeof CREATE_ROLL_CALL_SESSION,
    payload: {
        rollCallSession: RollCallSession
    }
}

export type RollCallSessionType = CreateRollCallSession