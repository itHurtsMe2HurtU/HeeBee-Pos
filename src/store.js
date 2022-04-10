import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userDetailsReducer, userLoginReducer } from "./reducers/userReducers";
import { productReducer } from "./reducers/productReducers";
import { categoryReducer } from "./reducers/categoryReducer";
import { cartReducer } from "./reducers/cartReducer";
import { customerInfoReducer } from "./reducers/customerInfoReducer";
import { lastCustomerOrderReducer } from "./reducers/lastCustomerOrderReducer";
import orderListReducer from "./reducers/orderListReducer";
import { logoutEmployeeOrdersReducer } from "./reducers/logoutEmployeeOrdersReducer";

const initialState = {
  //set userInfo to what stored in localStorage
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  product: {
    loading: false,
    product: { data: [] },
  },
  categories: {
    loadingCategory: true,
    categories: [],
  },
  userDetails: {
    loading: true,
    user: [],
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  customerInfo: {
    loading: false,
    customer: null,
  },
  lastCustomerOrder: {
    loading: false,
    lastCustomerOrders: [],
  },
  orderList: {
    loading: false,
    completedOrderList: {},
    cancelledOrderList: {},
    preparingOrderList: {},
    singleOrder: {},
    allOrderList: {},
    searchResultList: {},
  },
  logoutEmployeeOrder: {
    loading: false,
    logoutCustomerOrders: {},
  },
};

// all reducers
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  categories: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  customerInfo: customerInfoReducer,
  lastCustomerOrder: lastCustomerOrderReducer,
  orderList: orderListReducer,
  logoutEmployeeOrder: logoutEmployeeOrdersReducer,
});

//https://extension.remotedev.io/#usage
//https://redux.js.org/api/compose
//connect to chrome redux developer extension (download the extension first in Chrome)
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
