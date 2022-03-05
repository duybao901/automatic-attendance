import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DashBroadUser from '../../components/dashbroad/DashBroadUser'
import { Params, RootStore } from "../../utils/interface"
import { useParams } from 'react-router-dom'
const CourseDetal = () => {
    const { slug }: Params = useParams()
    const { auth } = useSelector((state: RootStore) => state)
    return (
        <div className='course-detail'>
            <DashBroadUser auth={auth} />
            <div className="dashbroad__body course-detail__body">
                asd
            </div>
        </div>
    )
}

export default CourseDetal

