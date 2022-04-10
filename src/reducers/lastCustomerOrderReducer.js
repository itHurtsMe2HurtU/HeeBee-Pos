import { CUSTOMER_ORDER_REQUEST,CUSTOMER_ORDER_SUCCESS,CUSTOMER_ORDER_FAIL } from "../constants/lastCustomerOrderConstants";



//  lastcustomerorderlist  reducer
export const lastCustomerOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case CUSTOMER_ORDER_REQUEST:
            return ({ loading: true});
        case CUSTOMER_ORDER_SUCCESS:
            return ({ loading: false, lastCustomerOrders: action.payload });
        case CUSTOMER_ORDER_FAIL:
            return ({ loading: false, error: action.payload });
        default:
            return state;
    }
};

