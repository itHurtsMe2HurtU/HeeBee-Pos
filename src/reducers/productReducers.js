import lodashGet from "lodash/get";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productsConstants";

//product reducer
export const productReducer = (state = { loading: true }, action) => {
    // show payload
//   console.log(action.payload);
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      if (!action.payload.reset) {
        const newList = lodashGet(action.payload, "data.data") || [];
        const oldList = lodashGet(state.product, "data") || [];
        const updatedList = [...oldList, ...newList];
        action.payload.data.data = updatedList;
      }

      return { loading: false, product: action.payload.data };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
