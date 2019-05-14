import axios from 'axios';

import {
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from './types';

export const resetPassword = (passwordData, history) => dispatch => {
    dispatch(resetPasswordRequest())
    axios
        .post('http://142.93.122.156:5001/api/users/reset_password', passwordData)
        .then(res => {
            dispatch(resetPasswordSuccess(res))
        })
        .catch(err => 
            dispatch(resetPasswordFailure(err))
        )
}

export const resetPasswordSuccess = (res) => {
    return {
        type: RESET_PASSWORD_SUCCESS,
        payload: res
    }
}

export const resetPasswordRequest = () => {
    return {
        type: RESET_PASSWORD_REQUEST
    }
}

export const resetPasswordFailure = (err) => {
    return {
        type: RESET_PASSWORD_FAILURE,
        payload: err
    }
}