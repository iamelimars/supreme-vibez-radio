import axios from 'axios';

import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from './types';

export const forgotPassword = (emailData, history) => dispatch => {
    dispatch(forgotPasswordRequest())
    axios
        .post('https://supreme-vibez-backend.supremevibezradio.now.sh/users/forgot_password', emailData)
        .then(res => {
            dispatch(forgotPasswordSuccess(res))
            // history.push('/forgot_password_sent')
        })
        .catch(err => 
                dispatch(forgotPasswordFailure(err))
        )
}

export const forgotPasswordSuccess = (res) => {
    return {
        type: FORGOT_PASSWORD_SUCCESS,
        payload: res
    }
}

export const forgotPasswordRequest = () => {
    return {
        type: FORGOT_PASSWORD_REQUEST
    }
}

export const forgotPasswordFailure = (err) => {
    return {
        type: FORGOT_PASSWORD_FAILURE,
        payload: err
    }
}