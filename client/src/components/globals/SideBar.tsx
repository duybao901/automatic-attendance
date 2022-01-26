import React from 'react';
import Logo from '../../images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../../utils/interface'
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../../store/actions/authActions'
import "./SideBar.scss"

const SideBar = () => {

    const dispatch = useDispatch();

    const { auth } = useSelector((state: RootStore) => state)
    const localtion = useLocation();

    const avtive = (path: string) => {
        if (path === localtion.pathname) {
            return "active"
        }
        return "";
    }

    const handleLogout = () => {
        dispatch(logout())
    }


    return <div className="side-bar">
        <div className="side-bar__header">
            <img className="side-bar__header-logo" src={Logo} alt='logo'></img>
        </div>
        <div className='side-bar__infor'>
            <img src={auth.user ? auth.user.avatar : ""} alt="user-avatar">
            </img>
            <h2 className='side-bar__infor-name'>
                {auth.user?.name}
            </h2>
            <p className='side-bar__infor-email'>
                {auth.user?.account}
            </p>
        </div>
        <div className='side-bar__menu'>
            <div className="side-bar__menu-user">
                <div className="user__as">
                    <h3>Đăng nhập với tư cách</h3>
                    <p>{auth.user?.role}</p>
                </div>
                <ul className="user__list">

                    <li className={avtive("/")}>
                        <Link to="/">
                            <i className="bx bx-calendar-week"></i>
                            <span>Điều khiển</span>
                        </Link>
                    </li>

                    <li className={avtive(`/profile/${auth.user?._id}`)}>
                        <Link to={`/profile/${auth.user?._id}`}>
                            <i className="bx bx-user-circle"></i>
                            <span>Tài khoản</span>
                        </Link>
                    </li>

                    <li >
                        <a onClick={handleLogout}>
                            <i className="bx bx-exit"></i>
                            <span>Đăng xuất</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </div>;
};

export default SideBar;
