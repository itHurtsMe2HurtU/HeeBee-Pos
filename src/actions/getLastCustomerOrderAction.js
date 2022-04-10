import axios from 'axios';
import { CUSTOMER_ORDER_FAIL,CUSTOMER_ORDER_SUCCESS,CUSTOMER_ORDER_REQUEST } from '../constants/lastCustomerOrderConstants';

// customerorder action
export const getLastCustomerOrderAction =
  (mobile_no) =>
  async (dispatch) => {
    dispatch({ type: CUSTOMER_ORDER_REQUEST });

    try {
      const config = { headers: { "Content-Type": "application/json" } };
 

      const { data } = await axios.get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/fetch_recent_customer_order?mobile=${mobile_no}`,
        config
      );
        // console.log()

      // if success, dispatch success and set payload to data
      dispatch({ type: CUSTOMER_ORDER_SUCCESS, payload: data.data  });
    } catch (error) {
      // if error, dispatch FAIL, set payload to error message
      dispatch({
        type: CUSTOMER_ORDER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
