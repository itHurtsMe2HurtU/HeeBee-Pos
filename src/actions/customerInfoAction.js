import axios from 'axios';
import { CUSTOMER_INFO_FAIL,CUSTOMER_INFO_SUCCESS,CUSTOMER_INFO_REQUEST } from '../constants/customerInfoConstants';

// product action
export const getCustomerInfo =
  (mobileno="" ) =>
  async (dispatch) => {
    dispatch({ type: CUSTOMER_INFO_REQUEST });

    // try {
      const config = { headers: { "Content-Type": "application/json" } };
 

      const { data } = await axios.get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/customer_info?mobile_no=${mobileno}`,
        config
      );
        // console.log()

      // if success, dispatch success and set payload to data
      dispatch({ type: CUSTOMER_INFO_SUCCESS, payload: data.data  });
    // } catch (error) {
    //   // if error, dispatch FAIL, set payload to error message
    //   dispatch({
    //     type: CUSTOMER_INFO_FAIL,
    //     payload:
    //       error.response && error.response.data.message
    //         ? error.response.data.message
    //         : error.message,
    //   });
    // }
  };
