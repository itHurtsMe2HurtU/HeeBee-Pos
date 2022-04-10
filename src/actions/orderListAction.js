import orders from "../api/orders";

export const fetchAllOrders = (page) => async (dispatch) => {
  const response = await orders.get(
    `/fetch_all_orders/${page}?employee=01a1e1ec-9cc6-4808-a3cc-2d6143454fc8&branch=3e2f18a3-7143-4ada-8e97-b4745c63f06a`
  );

  dispatch({ type: "FETCH_ALL_ORDERS", payload: response.data });
};

export const fetchOrders = () => async (dispatch) => {
  const response = await orders.get(
    "/get_emp_completed_orders_logout_time/1?employee=01a1e1ec-9cc6-4808-a3cc-2d6143454fc8&branch=3e2f18a3-7143-4ada-8e97-b4745c63f06a"
  );
  console.log(response.data);
  dispatch({ type: "FETCH_ORDERS", payload: response.data });
};

export const fetchCancelledOrders = () => async (dispatch) => {
  const response = await orders.get(
    "/get_emp_cancelled_orders/1?employee=01a1e1ec-9cc6-4808-a3cc-2d6143454fc8&branch=3e2f18a3-7143-4ada-8e97-b4745c63f06a"
  );
  console.log(response.data.status);
  dispatch({ type: "FETCH_CANCELLED_ORDERS", payload: response.data });
};
export const fetchPreparingOrders = () => async (dispatch) => {
  const response = await orders.get(
    "/get_emp_preparing_orders/1?employee=01a1e1ec-9cc6-4808-a3cc-2d6143454fc8&branch=3e2f18a3-7143-4ada-8e97-b4745c63f06a"
  );
  dispatch({ type: "FETCH_PREPARING_ORDERS", payload: response.data });
};
export const fetchSingleOrder = (order) => async (dispatch) => {
  const id = order.order_id;
  const response = await orders.get(`/fetch_single_order?order=${id}`);
  dispatch({ type: "FETCH_SINGLE_ORDER", payload: response.data });
};

export const showLoader = () => (dispatch) => {
  dispatch({ type: "SHOW_LOADER" });
};
export const hideLoader = () => (dispatch) => {
  dispatch({ type: "HIDE_LOADER" });
};

export const searchOrders = (searchTerm) => async (dispatch) => {
  const response = await orders.get(`/search_order/1?search=${searchTerm}`);
  dispatch({ type: "SEARCH_ORDERS", payload: response.data });
};
