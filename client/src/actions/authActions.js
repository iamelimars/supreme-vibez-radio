import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from './types';

//Register user
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('https://supreme-vibez-backend.supremevibezradio.now.sh/api/users/register', userData)
        .then(res => history.push('/login')) //re-direct to login pae on successful register
        .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
        )
}

//Login - get user token
export const loginUser = userData => dispatch => {
    console.log(userData);

    // fetch("http://localhost:5000/post", {
    //     method: 'post',
    //     body: {
    //         email: 'test',
    //         password: 'test'
    //     }
    // }).then(response => {
    //     console.log(response);
        
    // })
    
    axios
        .post("https://supreme-vibez-backend.supremevibezradio.now.sh/api/users/login", userData)
        // .post("http://142.93.122.156:5001/api/users/login", userData)
        // .post("http://localhost:5000/post", {
        //     email: 'test',
        //     password: 'test'
        // })
        .then(res => {
            //save to local storage

            //set token to local storage
            const { token } = res.data;
            localStorage.setItem('jwToken', token);

            //set token to auth header
            setAuthToken(token);

            //Decode token to get user data
            const decoded = jwt_decode(token);

            //set current user
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
            console.log(err);
            
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        )
}

//set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    }
}

//Log user out
export const logoutUser = () => dispatch => {
    //Remove token from local storage
    localStorage.removeItem("jwToken");

    //Remove auth header for future requests
    setAuthToken(false);

    //Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}