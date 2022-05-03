import { 
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT
} from '../constants/userConstants';


// User loginReducer 
export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
            return ({ loading: true});
        case USER_LOGIN_SUCCESS:
            return ({ loading: false, userInfo: action.payload });
        case USER_LOGIN_FAIL:
            return ({ loading: false, error: action.payload });
        case USER_LOGOUT:
            return {};

        default:
            return state;
    }
};

//User Details reducer
export const userDetailsReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return ({ loading: true });
        case USER_DETAILS_SUCCESS:
            return ({ loading: false, user: action.payload });
        case USER_DETAILS_FAIL:
            return ({ loading: false, error: action.payload });
        default:
            return state;
    }
};