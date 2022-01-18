import { UserRegister } from "../utils/interface"
export const validRegister = (userRegister: UserRegister) => {
    const errors: any = {};

    if (userRegister.name === "") {
        errors.errorName = "Name is required"
    } else {
        if (userRegister.name.length > 50) {
            errors.errorName = "Your name is up to 50 chars long."
        }
    }

    if (userRegister.account === "") {
        errors.errorAccount = 'Account is required'
    } else if (!validEmail(userRegister.account)) {
        errors.errorAccount = "Email format is incorrect."
    }

    if (userRegister.password === "") {
        errors.errorPassword = 'Password is required'
    } else {
        if (userRegister.password.trim().length < 6) {
            errors.errorPassword = "Password is at least 6 characters"
        }
    }

    if (userRegister.cfPassword === "") {
        errors.errorCfPassword = 'Confirm password is required'
    }

    if (userRegister.password !== userRegister.cfPassword) {
        errors.errorPasswordMatch = "Password not match"
    }
    return errors;
}

export const validEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}