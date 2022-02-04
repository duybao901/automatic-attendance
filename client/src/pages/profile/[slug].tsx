import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import DashBroadUser from '../../components/dashbroad/DashBroadUser';
import Infor from '../../components/profile/Infor';
import { RootStore, Params } from '../../utils/interface'
import { useParams } from 'react-router-dom'

const Profile = () => {

    const dispatch = useDispatch()
    const { slug } = useParams<Params>()
    const { auth } = useSelector((state: RootStore) => state)

    return <div className="profile">
        <DashBroadUser auth={auth} />

        <Infor id={slug} auth={auth} dispatch={dispatch} />
    </div>;
};

export default Profile;
