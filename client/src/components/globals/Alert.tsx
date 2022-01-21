import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/interface'
import { toast } from 'react-toastify'
import { ALERT } from '../../store/types/alertTypes'
import GlobalLoading from './GlobalLoading'
const Alert = () => {
    const dispatch = useDispatch()
    const { alert } = useSelector((state: RootStore) => state)

    const hanldeCloseToast = () => {
        dispatch({ type: ALERT, payload: { ...alert, success: "", error: "" } })
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
    }, [alert.success])

    useEffect(() => {
        alert.error && handleShowToastError()
    }, [alert.error])

    return <>
        {alert.loading && <GlobalLoading />}
    </>

}

export default Alert;
