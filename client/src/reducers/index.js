import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import forgotPasswordReducers from './forgotPasswordReducers';
import resetPasswordReducer from './resetPasswordReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    forgotPass: forgotPasswordReducers,
    resetPass: resetPasswordReducer
})