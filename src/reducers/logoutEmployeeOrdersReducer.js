import {
  LOGOUT_EMPLOYEE_ORDERS_REQUEST,
  LOGOUT_EMPLOYEE_ORDERS_SUCCESS,
  LOGOUT_EMPLOYEE_ORDERS_FAIL,
} from "../constants/logoutEmployeeOrdersConstants";

export const logoutEmployeeOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_EMPLOYEE_ORDERS_REQUEST:
      return {
        loading: true,
        logoutEmployeeorders: [],
      };

    case LOGOUT_EMPLOYEE_ORDERS_SUCCESS:
      return {
        loading: false,
        logoutEmployeeorders: action.payload,
      };

    case LOGOUT_EMPLOYEE_ORDERS_FAIL:
      return {
        loading: false,
        errorlogoutEmployeeorders: action.payload,
      };
    default:
      return state;
  }
};
