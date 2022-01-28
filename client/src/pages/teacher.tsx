import React from 'react';
import { useSelector } from 'react-redux'
import NotFound from '../components/globals/NotFound';
import { RootStore } from '../utils/interface'
import DashBroadHeader from '../components/dashbroad/DashBroadHeader';
import DashBroadUser from '../components/dashbroad/DashBroadUser';
const Teacher = () => {

    const { auth } = useSelector((state: RootStore) => state)

    // Không phải admin thì không được vào router này
    if (auth.user?.role !== "admin") return <NotFound />

    return <div className="dashbroad">
        <DashBroadHeader />
        <DashBroadUser auth={auth} />
        <div className="dashbroad__body">
            
        </div>
    </div>;
};

export default Teacher;
