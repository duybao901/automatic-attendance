import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootReducer } from '../../utils/interface'
import { toast } from 'react-toastify'
import { ALERT } from '../../store/types/alertTypes'
const Alert = () => {
    const dispatch = useDispatch()
    const { alert } = useSelector((state: RootReducer) => state)

    const hanldeCloseToast = () => {
        dispatch({ type: ALERT, payload: {} })
    }

    const handleShowToastSuccess = () => {
        toast.success(alert.success, {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: hanldeCloseToast
        })
    }

    const handleShowToastError = () => {
        toast.error(alert.error, {
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            onClose: hanldeCloseToast
        })
    }

    useEffect(() => {
        alert.success && handleShowToastSuccess()
        alert.error && handleShowToastError()
    }, [alert])

    return <></>

}

export default Alert;
