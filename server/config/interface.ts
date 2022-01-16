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
    createdAt: string
    updatedAt: string;
}
