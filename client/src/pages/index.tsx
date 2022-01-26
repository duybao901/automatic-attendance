import React from 'react'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/interface'
import { Link } from 'react-router-dom'
import "./index.scss"
const Home = () => {

    const { auth } = useSelector((state: RootStore) => state)

    return (
        <div className="dashbroad">
            <div className="dashbroad__header">
                <i className='bx bx-menu btn-circle' ></i>
            </div>
            <div className="dashbroad__user">
                <div className="dashbroad__user-infor">
                    <img src={auth.user?.avatar} alt="avatar" />
                    <div>
                        <h2 className="infor__name">Chào mừng, {auth.user?.name}</h2>
                        <div className="infor__detail">
                            <i className='bx bxs-graduation'></i>
                            <span>Bạn đăng nhập với tư cách là {auth.user?.role}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashbroad__body">
                <div className="dashbroad__body-box">
                    <Link className="box-item" to="/student">
                        <i className='bx bx-id-card'></i>
                        <h3>Sinh viên</h3>
                    </Link>
                    <Link className="box-item" to="/identified">
                        <i className='bx bx-user-circle'></i>
                        <h3>Nhận diện</h3>
                    </Link>
                    <Link className="box-item" to="/attendance">
                        <i className='bx bx-edit'></i>
                        <h3>Điểm danh</h3>
                    </Link>
                    <Link className="box-item" to="/subjects">
                        <i className='bx bx-book-open'></i>
                        <h3>Môn học</h3>
                    </Link>
                    {/* <Link className="box-item" to="/student">
                        <i className='bx bx-id-card'></i>
                        <h3>Môn học</h3>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Home