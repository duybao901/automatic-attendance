import React from 'react'
import SignUpForm from '../components/auth/SignUpForm'
import Logo from '../images/logo.png'
import { Link } from 'react-router-dom'
const SignUp = () => {
    return (
        <div className="sign-up auth-page">
            <div className="auth-page__form">
                <div className="auth-page__form-wrapper">
                    <img src={Logo} alt="logo" className="auth-page__form-logo" />
                    <h2 className="auth-page__form-title">Sign up</h2>
                    <p className="auth-page__form-detail">Already have an account? <Link to='/sign-in'>Sign in</Link></p>
                    <SignUpForm />
                </div>
            </div>
            <div className="auth-page__background">
                <div className='auth-page__background-content'>
                    <h2>Welcome to ...</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius labore molestiae iusto ipsum repudiandae fugiat rem</p>
                    <div className='auth-page__background-circle auth-page__background-circle--small'></div>
                    <div className='auth-page__background-circle auth-page__background-circle--medium'></div>
                    <div className='auth-page__background-dots'>
                        <svg width="300" height="200" viewBox="0 0 100 100">
                            <defs>
                                <pattern id="lines" height="10" width="10" patternUnits="userSpaceOnUse">
                                    <line x1="0" y1="4" x2="2" y2="4" stroke-width="2" stroke="rgba(90, 102, 119, 0.5)" />
                                </pattern>
                            </defs>
                            <rect x="10" y="10" width="80" height="80" fill="url(#lines)" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
