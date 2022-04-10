import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../constants/userConstants";

// userdetails
export const detailsUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
 
    const { data } = await axios.get(
      `https://heebeetestapi.quadbtech.com/api/v1/webpos/employee_info?token=${userInfo.token}`
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data?.data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// login action
export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });

  try {
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `https://heebeetestapi.quadbtech.com/api/v1/webpos/emp_login`,
      { email, password },
      config
    );
    // if success, dispatch success and set payload to data
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    // save data to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    // if error, dispatch FAIL, set payload to error message
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// logout action
export const logout = () => (dispatch) => {



  //remove userInfo and cartItems from localStorage upon user signout
  localStorage.removeItem("userInfo");
  
  //localStorage.removeItem('cartItems');
  dispatch({ type: USER_LOGOUT });
};
