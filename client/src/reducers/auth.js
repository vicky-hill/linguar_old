import {
    LOGIN_SUCCESS, 
    GET_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT,
    CHECK_LOGIN
} from '../actions/auth';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    loginCheck: false,
    user: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {

        case GET_USER:  
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        case CHECK_LOGIN:
            return {
                ...state,
                loginCheck: true
            }

        case LOGIN_SUCCESS: 
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                token: payload.token,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        case REGISTER_FAIL:
        case LOGOUT: 
            localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false,
                    user: 'loggedOut'
                }

        default:     
            return {
                ...state
            }
    }
}
