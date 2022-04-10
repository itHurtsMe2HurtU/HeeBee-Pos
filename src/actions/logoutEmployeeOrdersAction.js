import axios from "axios";
import {
  LOGOUT_EMPLOYEE_ORDERS_REQUEST,
  LOGOUT_EMPLOYEE_ORDERS_SUCCESS,
  LOGOUT_EMPLOYEE_ORDERS_FAIL,
  
} from "../constants/logoutEmployeeOrdersConstants";

export const getLogoutEmployeeOrders = (employee,branch) => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_EMPLOYEE_ORDERS_REQUEST });
    const data = await axios.get(
      `https://heebeetestapi.quadbtech.com/api/v1/webpos/logout_employee_orders/1?employee=${employee}&branch=${branch}`
    );
   
    dispatch({ type: LOGOUT_EMPLOYEE_ORDERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOGOUT_EMPLOYEE_ORDERS_FAIL, payload: error.response.data.message });
  }
};

