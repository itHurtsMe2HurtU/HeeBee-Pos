import axios from "axios";
import {
  ALL_CATEGORY_REQUEST,
  ALL_CATEGORY_SUCCESS,
  ALL_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryConstants";

export const getCategory = (branch) => async (dispatch) => {
  try {
    dispatch({ type: ALL_CATEGORY_REQUEST });
    const data = await axios.get(
      `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_all_categories?branch=${branch}`
    );
    dispatch({ type: ALL_CATEGORY_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: ALL_CATEGORY_FAIL, payload: error.response.data.message });
  }
};

export const clearCategoryErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
