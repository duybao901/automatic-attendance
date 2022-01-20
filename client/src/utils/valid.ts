import { UserRegister, UserLogin } from "../utils/interface"
export const validRegister = (userRegister: UserRegister) => {
    const errors: any = {};

    const { name, account, password, cfPassword } = userRegister;

    if (!name) {
        errors.errorName = "Name is required"
    } else {
        if (name.length > 50) {
            errors.errorName = "Your name is up to 50 chars long."
        }
    }

    if (!account) {
        errors.errorAccount = 'Account is required'
    } else if (!validEmail(account)) {
        errors.errorAccount = "Email format is incorrect."
    }

    if (!password) {
        errors.errorPassword = 'Password is required'
    } else {
        if (password.trim().length < 6) {
            errors.errorPassword = "Password is at least 6 characters"
        }
    }

    if (!cfPassword) {
        errors.errorCfPassword = 'Confirm password is required'
    }

    if (password !== cfPassword) {
        errors.errorPasswordMatch = "Password not match"
    }
    return errors;
}

export const validLogin = (userLogin: UserLogin) => {
    const errors: any = {};

    const { account, password } = userLogin

    if (!account) {
        errors.errorAccount = 'Account is required'
    } else if (!validEmail(account)) {
        errors.errorAccount = "Email format is incorrect."
    }

    if (!password) {
        errors.errorPassword = 'Password is required'
    } 
    return errors;
}

export const validEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}