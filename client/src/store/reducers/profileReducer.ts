import { ProfilePayload, ProfileType } from '../types/profileTypes'
import * as types from '../types/profileTypes'

const initalState: ProfilePayload = {
    ids: [],
    users: [],
    loading: false,
    course: []
}

export const profileReducer = (state: ProfilePayload = initalState, action: ProfileType): ProfilePayload => {
    switch (action.type) {

        case types.LOADING_PROFILE: {
            return {
                ...state,
                loading: action.payload
            }
        }

        case types.GET_ID: {
            if (typeof state.ids === "undefined") {
                return {
                    ...state,
                    ids: [action.payload.id]
                }
            } else {
                return {
                    ...state,
                    ids: [...state.ids, action.payload.id]
                }
            }
        }

        case types.GET_PROFILE_USER: {
            if (typeof state.users === "undefined") {
                return {
                    ...state,
                    users: [action.payload.user]
                }
            } else {
                return {
                    ...state,
                    users: [...state.users, action.payload.user]
                }
            }
        }

        default:
            return state;
    }
}