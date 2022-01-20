import React, { useState } from 'react'
import "./auth.scss"
import { InputChange, FormSubmit, UserRegister, UserAuthErrors } from '../../utils/interface'
import { validRegister } from '../../utils/valid'
const SignUpForm = () => {

    const initalState: UserRegister = {
        name: "",
        account: "",
        password: "",
        cfPassword: ""
    }

    const initalStateErores: UserAuthErrors = {
        errorName: "",
        errorAccount: "",
        errorPassword: "",
        errorCfPassword: "",
        errorPasswordMatch: ""
    }

    const [user, setUser] = useState<UserRegister>(initalState)
    const [errors, setErrors] = useState<UserAuthErrors>(initalStateErores)
    const [showPassword, setShowPassword] = useState(false);
    const [showCfPassword, setShowCfPassword] = useState(false);


    const { name, account, password, cfPassword } = user;

    const handleChange = (e: InputChange) => {
        const target = e.target;
        const name = target.name;
        const value = target.value

        setUser({
            ...user,
            [name]: value
        })

        if (name === "name") {
            setErrors({
                ...errors,
                errorName: ""
            })
        }
        if (name === "account") {
            setErrors({
                ...errors,
                errorAccount: ""
            })
        }
        if (name === "password") {
            setErrors({
                ...errors,
                errorPassword: ""
            })
        }
        if (name === "cfPassword") {
            setErrors({
                ...errors,
                errorCfPassword: ""
            })
        }

    }

    const handeSubmit = (e: FormSubmit) => {
        e.preventDefault()
        const errors = validRegister(user)
        setErrors(errors)
        // If no error -> Pass validation
        if(Object.keys(errors).length === 0){
            console.log(user)
        }
    }

    return (
        <form onSubmit={handeSubmit}>
            <div className='form-group'>
                <label htmlFor="name">Full name *</label>
                <input className={errors.errorName && "danger"} type="text" id="name" name="name" value={name} onChange={handleChange} />
                {
                    errors.errorName && <small className="error-text">{errors.errorName}</small>
                }
            </div>
            <div className='form-group'>
                <label htmlFor="account">Account *</label>
                <input className={errors.errorAccount && "danger"} type="text" id="account" name="account" value={account} onChange={handleChange} />
                {
                    errors.errorAccount && <small className="error-text">{errors.errorAccount}</small>
                }
            </div>
            <div className='form-group'>
                <label htmlFor="password">Password *</label>
                <div className="form-group__password">
                    <input className={errors.errorPassword && "danger"} type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={handleChange} />
                    <span onClick={() => setShowPassword(!showPassword)} className="btn-circle">
                        {
                            showPassword ?
                                <i className='bx bxs-show'></i> :
                                <i className='bx bxs-low-vision'></i>
                        }
                    </span>
                </div>
                {
                    errors.errorPassword && <small className="error-text">{errors.errorPassword}</small>
                }
            </div>
            <div className='form-group'>
                <label htmlFor="cfPassword">Confirm password *</label>
                <div className="form-group__password">
                    <input className={errors.errorCfPassword && "danger"} type={showCfPassword ? "text" : "password"} id="cfPassword" name="cfPassword" value={cfPassword} onChange={handleChange} />
                    <span onClick={() => setShowCfPassword(!showCfPassword)} className="btn-circle">
                        {
                            showCfPassword ?
                                <i className='bx bxs-show'></i> :
                                <i className='bx bxs-low-vision'></i>
                        }
                    </span>
                </div>
                {
                    errors.errorCfPassword && <small className="error-text">{errors.errorCfPassword}</small>
                }
                {
                    (!errors.errorCfPassword && errors.errorPasswordMatch) && <small className="error-text">{errors.errorPasswordMatch}</small>
                }
            </div>
            <button className="btn-primary">Sign up</button>
        </form>
    )
}

export default SignUpForm
