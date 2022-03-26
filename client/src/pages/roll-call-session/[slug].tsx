import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Params } from '../../utils/interface'
import { RootStore, RollCallSession } from '../../utils/interface'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailRollCallSession } from '../../store/actions/rollCallSession'

const RollCallSessionDetail = () => {

    const dispatch = useDispatch();
    const { detailRollCallSession: detailRollCallSessionStore, auth } = useSelector((state: RootStore) => state)
    const [detailRollCallSession, setDetailRollCallSession] = useState<RollCallSession>({})
    const { slug }: Params = useParams();

    useEffect(() => {
        if (slug) {
            const handleGetDetailRollCallSession = async () => {
                await dispatch(getDetailRollCallSession(detailRollCallSessionStore, slug, auth))
            }
            handleGetDetailRollCallSession()
        }

        detailRollCallSessionStore.rollCallSessions?.filter(rollCallSession => {
            if (rollCallSession._id === slug) {
                setDetailRollCallSession(rollCallSession)
            }
        })

    }, [slug, auth])

    return (
        <div>RollCallSessionDetail</div>
    )
}

export default RollCallSessionDetail