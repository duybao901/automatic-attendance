import React from 'react';
import { AuthPayload } from '../../store/types/authTypes'

interface DashBroadUserProps {
    auth: AuthPayload
}

const DashBroadUser: React.FC<DashBroadUserProps> = ({ auth }) => {
    return <div className="dashbroad__user">
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
    </div>;
};

export default DashBroadUser;
