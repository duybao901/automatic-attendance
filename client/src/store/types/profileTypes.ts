import { User } from '../../utils/interface'
export const GET_PROFILE_USER = "GET_PROFILE_USER"
export const LOADING_PROFILE = "LOADING_PROFILE"
export const GET_ID = "GET_ID"


export interface ProfilePayload {
    ids?: string[] 
    loading?: boolean
    users?: User[]
    course?: any[]
}

export interface GetProfileUser {
    type: typeof GET_PROFILE_USER,
    payload: {
        user: User
    }
}

export interface GetId {
    type: typeof GET_ID
    payload: {
        id: string
    }
}

export interface LoadingProfile {
    type: typeof LOADING_PROFILE
    payload: boolean
}

export type ProfileType = GetProfileUser | GetId | LoadingProfile