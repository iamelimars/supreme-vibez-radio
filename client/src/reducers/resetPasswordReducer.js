import {
    RESET_PASSWORD_REQUEST, 
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE
} from '../actions/types';

const initialState = {
    response: {},
    errors: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                response: action.payload
            }
        case RESET_PASSWORD_FAILURE:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}