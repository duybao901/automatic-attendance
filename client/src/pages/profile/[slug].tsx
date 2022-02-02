import React from 'react';
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/interface'
const Profile = () => {

    const { auth } = useSelector((state: RootStore) => state)

    return <div>Profile</div>;
};

export default Profile;
