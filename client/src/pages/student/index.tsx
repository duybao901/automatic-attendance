import React from 'react'
import { useSelector } from 'react-redux'
import DashBroadUser from '../../components/dashbroad/DashBroadUser'
import { RootStore } from "../../utils/interface"

const Student = () => {

    const { auth } = useSelector((state: RootStore) => state)

    return (
        <div className='student'>
            <DashBroadUser auth={auth} />             
        </div>
    )
}

export default Student