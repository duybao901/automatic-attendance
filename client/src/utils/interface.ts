import { ChangeEvent } from 'react'

export type InputChange = ChangeEvent<HTMLInputElement>
export type FormSubmit = ChangeEvent<HTMLFormElement>

export interface Params {
    page: string
    slug: string
}

export interface UserLogin {
    account: string;
    password: string;
}
export interface UserRegister extends UserLogin {
    name: string;
    cfPassword: string
}

export interface User extends UserRegister {
    _id: string;
    avatar: string;
    role: string;
    confirm: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserRegisterErrors {
    errorName: string
    errorAccount: string
    errorPassword: string
    errorCfPassword: string
    errorPasswordMatch: string
}