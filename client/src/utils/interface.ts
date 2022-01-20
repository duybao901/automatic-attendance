import { ChangeEvent } from 'react'
import rootReducer from '../store/reducers/index'

export type InputChange = ChangeEvent<HTMLInputElement>
export type FormSubmit = ChangeEvent<HTMLFormElement>

export type RootReducer = ReturnType<typeof rootReducer>;
export interface Params {
    page: string
    slug: string
}

export interface UserLogin {
    account: string;
    password: string;
}
export interface UserRegister extends UserLogin {
    name?: string;
    cfPassword?: string
}

export interface User extends UserRegister {
    _id: string;
    avatar: string;
    role: string;
    confirm: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserAuthErrors {
    errorName?: string
    errorAccount: string
    errorPassword: string
    errorCfPassword?: string
    errorPasswordMatch?: string
}