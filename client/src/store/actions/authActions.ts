import { Dispatch } from 'react'
import { AUTH, AuthType, AuthPayload } from '../types/authTypes'

export const login = (data: AuthPayload) => async (dispatch: Dispatch<AuthType>) => {
    dispatch({ type: AUTH, payload: data })
    localStorage.setItem("first-login", 'first-login')
}