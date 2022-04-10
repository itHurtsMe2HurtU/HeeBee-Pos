import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productsConstants";

// product action
export const getProductsList =
  (searchQuery = "", currentPage = 1, reset = true,category="",branch ) =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    try {
      const config = { headers: { "Content-Type": "application/json" } };
 

      const { data } = await axios.get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_product/${currentPage}?branch=${branch}&${searchQuery ? `search=${searchQuery}&`:''}${category ? `category=${category}`:''}`,
        config
      );

      // if success, dispatch success and set payload to data
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { data, reset } });
    } catch (error) {
      // if error, dispatch FAIL, set payload to error message
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
