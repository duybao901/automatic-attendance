import { Dispatch } from 'react'
import * as types from '../types/rollCallSessionTypes'
import { RollCallSessionType, RollCallSessionPayload } from '../types/rollCallSessionTypes'
import { GET_ROLL_CALL_SESSION_DETAIL, RollCallSessionDetailType, RollCallSessionDetailPayload } from '../types/rollCallSessionDetailTypes'
import { AuthPayload } from '../../store/types/authTypes'
import { ALERT, AlertType } from '../../store/types/alertTypes'
import { RollCallSession } from '../../utils/interface'
import { getAPI, postAPI } from '../../utils/fetchApi'

export const createRollCallSession = (data: any, auth: AuthPayload, history: any) =>
    async (dispatch: Dispatch<RollCallSessionType | AlertType>) => {
        if (!auth.access_token && !auth.user) return;
        try {
            const res = await postAPI('roll_call_session', data, auth.access_token);
            dispatch({ type: ALERT, payload: { success: res.data.msg } })
            history.push(`/roll-call-session/${res.data.newRollCallSession._id}`)
        } catch (error: any) {
            dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
        }
    }

export const getDetailRollCallSession =
    (rollCallSessionDetail: RollCallSessionDetailPayload, rollCallSession_ID: string, auth: AuthPayload) =>
        async (dispatch: Dispatch<RollCallSessionDetailType | AlertType>) => {
            if (!auth.access_token) return;
            if (rollCallSessionDetail.rollCallSessions?.every((item: RollCallSession) =>
                item._id !== rollCallSession_ID
            )) {
                try {
                    const res = await getAPI(`roll_call_session/${rollCallSession_ID}`, auth.access_token)
                    dispatch({
                        type: GET_ROLL_CALL_SESSION_DETAIL, payload: {
                            rollCallSession: { ...res.data.rollCallSession }
                        }
                    })
                } catch (error: any) {
                    dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
                }
            }
        }
