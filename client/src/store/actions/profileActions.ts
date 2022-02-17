import { Dispatch } from "react";
import { ALERT, AlertType } from '../types/alertTypes'
import { AUTH, AuthPayload, AuthType } from '../types/authTypes'
import { checkImageUpload, uploadImage } from '../../utils/imageHelper'
import { putAPI } from "../../utils/fetchApi";

export const updateProfile = (name: string, file: File, auth: AuthPayload) => async (dispatch: Dispatch<AlertType | AuthType>) => {
    if (!auth.access_token || !auth.user) return
    // Check image
    if (file) {
        let errors: string[] = []
        errors = checkImageUpload(file);
        if (errors.length !== 0) {
            return dispatch({ type: ALERT, payload: { error: errors } })
        }
    }

    // Update profile
    try {
        // Upload image to cloud
        let avatar: string = ""
        if (file) {
            const photo = await uploadImage(file);
            avatar = photo.url;
        }

        const res = await putAPI('update_user', {
            name: name ? name : auth.user.name,
            avatar: avatar ? avatar : auth.user.avatar
        }, auth.access_token)
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
        dispatch({
            type: AUTH, payload: {
                ...auth,
                user: {
                    ...auth.user,
                    name: name ? name : auth.user.name,
                    avatar: avatar ? avatar : auth.user.avatar
                }
            }
        })

    } catch (error: any) {
        return dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }

}

export const resetPassword = (password: string, auth: AuthPayload) => async (dispatch: Dispatch<AlertType>) => {
    if (!auth.access_token || !auth.user) return
    try {

        const res = await putAPI("reset_password", { password }, auth.access_token)
        dispatch({ type: ALERT, payload: { success: res.data.msg } })

    } catch (error: any) {
        console.log(error.response);
        dispatch({ type: ALERT, payload: { error: error.response.data.msg } })
    }
} 
