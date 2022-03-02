import { Request } from 'express'
import { Document } from 'mongoose'
export interface UserLogin {
    account: string;
    password: string;
}
export interface UserRegister extends UserLogin {
    name: string;
}

export interface User extends UserRegister {
    _id: string;
    avatar: string;
    role: string;
    confirm: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DecodeToken {
    id: string;
    iat: number;
    exp: number;
}

export interface RequestUser extends Request {
    user?: User
}

export interface ICourse extends Document {
    _id: string
    name: string
    semester: string
    yearStart: string
    yearEnd: string
    credit: number
    courseCode: string
    students: any[]
    _doc: Document<ICourse>
}