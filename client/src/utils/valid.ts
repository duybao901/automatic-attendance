import { UserRegister, UserLogin } from "../utils/interface"
export const validRegister = (userRegister: UserRegister) => {
    const errors: any = {};

    const { name, account, password, cfPassword } = userRegister;

    if (!name) {
        errors.errorName = "Tên là bắt buộc"
    } else {
        if (name.length > 50) {
            errors.errorName = "Tên của bạn giới hạn 50 ký tự"
        }
    }

    if (!account) {
        errors.errorAccount = 'Email là bắt buộc'
    } else if (!validEmail(account)) {
        errors.errorAccount = "Email định dạng không hợp lệ"
    }

    if (!password) {
        errors.errorPassword = 'Mật khẩu là bắt buộc'
    } else {
        if (password.trim().length < 6) {
            errors.errorPassword = "Mật khẩu phải có ít nhất 6 kí tự"
        }
    }

    if (!cfPassword) {
        errors.errorCfPassword = 'Yêu cầu nhập lại mật khẩu'
    }

    if (password !== cfPassword) {
        errors.errorPasswordMatch = "Mật khẩu không trùng khớp"
    }
    return errors;
}

export const validLogin = (userLogin: UserLogin) => {
    const errors: any = {};

    const { account, password } = userLogin

    if (!account) {
        errors.errorAccount = 'Email là bắt buộc'
    } else if (!validEmail(account)) {
        errors.errorAccount = "Email định dạng không hợp lệ"
    }

    if (!password) {
        errors.errorPassword = 'Mật khẩu là bắt buộc'
    } 
    return errors;
}

export const validEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}