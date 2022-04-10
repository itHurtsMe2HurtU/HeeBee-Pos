import { CUSTOMER_INFO_FAIL,CUSTOMER_INFO_SUCCESS,CUSTOMER_INFO_REQUEST } from '../constants/customerInfoConstants';



// User loginReducer 
export const customerInfoReducer = (state = {}, action) => {
    switch(action.type) {
        case CUSTOMER_INFO_REQUEST:
            return ({ loading: true});
        case CUSTOMER_INFO_SUCCESS:
            return ({ loading: false, customer: action.payload });
        case CUSTOMER_INFO_FAIL:
            return ({ loading: false, error: action.payload });
        default:
            return state;
    }
};

