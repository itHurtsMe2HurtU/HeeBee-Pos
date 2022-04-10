const orderListReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_ALL_ORDERS":
      return { ...state, allOrderList: action.payload };
    case "FETCH_ORDERS":
      return { ...state, completedOrderList: action.payload };
    case "FETCH_CANCELLED_ORDERS":
      return { ...state, cancelledOrderList: action.payload };
    case "FETCH_PREPARING_ORDERS":
      return { ...state, preparingOrderList: action.payload };
    case "FETCH_SINGLE_ORDER":
      return { ...state, singleOrder: action.payload };
    case "SHOW_LOADER":
      return { ...state, loading: true };
    case "HIDE_LOADER":
      return { ...state, loading: false };
    case "SEARCH_ORDERS":
      return { ...state, searchResultList: action.payload };
    default:
      return state;
  }
};
export default orderListReducer;
