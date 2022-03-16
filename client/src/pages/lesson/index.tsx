import React from 'react'
import LessonBody from '../../components/lesson/LessonBody'
import DashBroadUser from '../../components/dashbroad/DashBroadUser'
import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/interface'

const Lesson = () => {

    const { auth } = useSelector((state: RootStore) => state)

    return (
        <div className="lesson">
            <DashBroadUser auth={auth}/>
            <LessonBody />
        </div>

    )
}

export default Lesson