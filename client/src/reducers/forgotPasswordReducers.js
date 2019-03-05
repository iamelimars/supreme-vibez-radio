import  {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from '../actions/types';

const initialState = {
    response: {},
    errors: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state
            }
        case FORGOT_PASSWORD_SUCCESS:            
            return {
                ...state,
                response: action.payload
            }
        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}