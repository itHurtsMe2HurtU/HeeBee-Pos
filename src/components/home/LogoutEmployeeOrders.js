import React, { useEffect, useState, useCallback } from "react";
// import { FcDocument } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { getLogoutEmployeeOrders } from "../../actions/logoutEmployeeOrdersAction";
import { useSelector, useDispatch } from "react-redux";
import { useCountUp } from "react-countup";
import Logo from "../../assets/images/logo-sm-light.png";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

const TOTALORDERS = "TOTAL ORDERS";
const COMPLETED = "COMPLETED ORDERS";
const PREPARING = "PREPARING ORDERS";
const CANCELLED = "CANCELLED ORDERS";
const HOLD = "HOLD ORDERS";

const LogoutEmployeeOrders = () => {
  const [totalOrdersList, setTotalOrdersList] = useState([]);
  const [completedOrdersList, setCompletedOrdersList] = useState([]);
  const [preparingOrdersList, setPreparingOrdersList] = useState([]);

  const [cancelledOrdersList, setCancelledOrdersList] = useState([]);
  const [holdOrdersList, setHoldOrdersList] = useState([]);

  const [activeOrderTab, setActiveOrderTab] = useState(TOTALORDERS);

  const isTotalOrdersActive = activeOrderTab === TOTALORDERS;
  const isCompletedOrdersActive = activeOrderTab === COMPLETED;
  const isPreparingOrdersActive = activeOrderTab === PREPARING;
  const isCancelledOrdersActive = activeOrderTab === CANCELLED;
  const isHoldOrdersActive = activeOrderTab === HOLD;

  const countUpRef = React.useRef(null);

  const hold = React.useRef(null);
  const completed = React.useRef(null);
  const preparing = React.useRef(null);
  const cancel = React.useRef(null);

  const dispatch = useDispatch();

  const userData = JSON.parse(localStorage.getItem("userdetails"));
  console.log(userData.employee_id, "userdata");

  useEffect(() => {
    dispatch(getLogoutEmployeeOrders(userData.employee_id, userData.branch_id));
  }, [dispatch, userData.employee_id, userData.branch_id]);

  const logoutEmployeeOrdersListFromStore = useSelector(
    (state) => state.logoutEmployeeOrder
  );

  const { loading: isLogoutOrdersLoading, logoutEmployeeorders } =
    logoutEmployeeOrdersListFromStore;

  useEffect(() => {
    setTotalOrdersList(logoutEmployeeorders?.all_orders);
  }, [logoutEmployeeorders]);

  console.log(totalOrdersList);
  const logoutEmployeeOrdersList = logoutEmployeeorders?.all_orders || [];
  // object
  console.log(
    logoutEmployeeOrdersListFromStore.logoutEmployeeorders?.total_on_hold_orders
  );
  // array
  console.log(logoutEmployeeOrdersList);

  const navigate = useNavigate();

  // completed order api

  const showCompletedOrders = useCallback(() => {
    setActiveOrderTab(COMPLETED);
    axios
      .get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_emp_completed_orders_logout_time/1?employee=${userData.employee_id}&branch=${userData.branch_id}`
      )
      .then((res) => {
        console.log(res);
        setCompletedOrdersList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // preparing orders api
  const showPreparingOrders = useCallback(() => {
    setActiveOrderTab(PREPARING);
    axios
      .get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_emp_preparing_orders_logout_time/1?employee=${userData.employee_id}&branch=${userData.branch_id}`
      )
      .then((res) => {
        console.log(res);
        setPreparingOrdersList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // cancelled orders api
  const showCancelledOrders = useCallback(() => {
    setActiveOrderTab(CANCELLED);
    axios
      .get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_emp_cancelled_orders_logout_time/1?employee=${userData.employee_id}&branch=${userData.branch_id}`
      )
      .then((res) => {
        console.log(res);
        setCancelledOrdersList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // hold orders api
  const showHoldOrders = useCallback(() => {
    setActiveOrderTab(HOLD);
    axios
      .get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_emp_hold_orders_logout_time/1?employee=${userData.employee_id}&branch=${userData.branch_id}`
      )
      .then((res) => {
        console.log(res);
        setHoldOrdersList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const OrdersList = isTotalOrdersActive
    ? totalOrdersList
    : isCompletedOrdersActive
    ? completedOrdersList
    : isPreparingOrdersActive
    ? preparingOrdersList
    : isCancelledOrdersActive
    ? cancelledOrdersList
    : isHoldOrdersActive
    ? holdOrdersList
    : [];

  // ANIMATION CONFIGS
  const { update: updateTotalOrdersCount } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: logoutEmployeeorders?.total_orders,
    delay: 0,
    duration: 1,
  });
  const { update: updatePreparingOrdersCount } = useCountUp({
    ref: preparing,
    start: 0,
    end: logoutEmployeeorders?.total_preparing_orders,
    delay: 0,
    duration: 1,
  });
  const { update: updateHoldOrdersCount } = useCountUp({
    ref: hold,
    start: 0,
    end: logoutEmployeeorders?.total_on_hold_orders,
    delay: 0,
    duration: 1,
  });
  const { update: updateCompletedOrdersCount } = useCountUp({
    ref: completed,
    start: 0,
    end: logoutEmployeeorders?.total_completed_orders,
    delay: 0,
    duration: 1,
  });
  const { update: updateCancelOrdersCount } = useCountUp({
    ref: cancel,
    start: 0,
    end: 5000,
    delay: 0,
    duration: 1,
  });

  useEffect(() => {
    updateTotalOrdersCount(logoutEmployeeorders?.total_orders);
    updateCancelOrdersCount(logoutEmployeeorders?.total_cancelled_orders);
    updateCompletedOrdersCount(logoutEmployeeorders?.total_completed_orders);
    updatePreparingOrdersCount(logoutEmployeeorders?.total_preparing_orders);
    updateHoldOrdersCount(logoutEmployeeorders?.total_on_hold_orders);
  }, [
    logoutEmployeeorders,
    updateTotalOrdersCount,
    updateCancelOrdersCount,
    updateCompletedOrdersCount,
    updatePreparingOrdersCount,
    updateHoldOrdersCount,
  ]);

  return (
    <div>
      <div className="flex justify-between bg-primaryLightColor25 rounded-[10px] m-2 border-b-4  border-primaryDarkColor">
        <div className="m-2 ">
          <img alt="logo" src={Logo} className="w-12 h-12 cursor-pointer" />
        </div>
        <div>
          <button
            className="m-2 p-2 bg-primaryDarkColor text-[#fff] rounded-[10px] md:w-60 font-bold"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </div>

      <div className="md:flex-row md:m-4 w-100  items-center justify-center flex-col flex m-2">
        <div className="md:w-[350px] w-[100%] h-[100px] bg-[#fff] rounded-[10px] m-2 flex p-5 items-center gap-4 justify-center p-2 shadow-lg hover:shadow-xl border-b-4  border-primaryDarkColor cursor-pointer shadow-gray-200	">
          <h1 className="text-[#2C3E50] flex items-center justify-center font-bold text-2xl ">
            Total Orders
          </h1>
          <h1
            className="font-bold flex items-center justify-center text-primaryDarkColor text-2xl "
            ref={countUpRef}
          >
            1075/<span className="text-xl text-gray-500 ">day</span>
          </h1>
        </div>
        <div className="md:w-[350px] w-[100%] h-[100px] bg-[#fff] rounded-[10px] m-2 flex p-5 items-center gap-4 justify-center p-2 shadow-lg hover:shadow-xl border-b-4  border-processingColor cursor-pointer	 ">
          <h1 className="text-processingColor flex items-center justify-center font-bold text-2xl ">
            Preparing
          </h1>
          <h1
            className="font-bold flex items-center justify-center text-primaryDarkColor text-2xl "
            ref={preparing}
          ></h1>
        </div>
        <div className="md:w-[350px] w-[100%] h-[100px] bg-[#fff] rounded-[10px] m-2 flex p-5 items-center gap-4 justify-center p-2 shadow-lg hover:shadow-xl border-b-4  border-pendingColor cursor-pointer	">
          <h1 className="text-pendingColor flex items-center justify-center font-bold text-2xl ">
            On Hold
          </h1>
          <h1
            className="font-bold flex items-center justify-center text-primaryDarkColor text-2xl "
            ref={hold}
          ></h1>
        </div>
        <div className="md:w-[350px] w-[100%] h-[100px] bg-[#fff] rounded-[10px] m-2 flex p-5 items-center gap-4 justify-center p-2 shadow-lg hover:shadow-xl border-b-4  border-completeColor cursor-pointer	">
          <h1 className="text-completeColor flex items-center justify-center font-bold text-2xl p-2 ">
            Completed
          </h1>
          <h1
            className="font-bold flex items-center justify-center text-primaryDarkColor text-2xl "
            ref={completed}
          ></h1>
        </div>
        <div className="md:w-[350px] w-[100%] h-[100px] bg-[#fff] rounded-[10px] m-2 flex p-5 items-center gap-4 justify-center p-2 shadow-lg hover:shadow-xl border-b-4  border-cancelledColor cursor-pointer	">
          <h1 className="text-cancelledColor flex items-center justify-center font-bold text-2xl ">
            Cancelled
          </h1>
          <h1
            className="font-bold flex items-center justify-center text-primaryDarkColor text-2xl "
            ref={cancel}
          ></h1>
        </div>
      </div>

      <div className="order-status flex flex-wrap justify-start m-2 text-sm ml-5 ">
        <button
          className={`m-1 rounded-[10px] px-2 text-closedColor bg-closedLightColor font-bold ${
            activeOrderTab === TOTALORDERS ? "text-xl p-3 " : ""
          }`}
          onClick={() => {
            dispatch(
              getLogoutEmployeeOrders(userData.employee_id, userData.branch_id)
            );
            setActiveOrderTab(TOTALORDERS);
          }}
        >
          All Orders
        </button>
        <button
          className={`m-1 rounded-[10px] font-bold bg-processingLightColor text-processingColor px-2  button-processing ${
            activeOrderTab === PREPARING ? "text-xl p-3 " : ""
          } `}
          onClick={showPreparingOrders}
        >
          Preparing
        </button>
        <button
          className={` m-1 rounded-[10px] font-bold bg-pendingLightColor px-2 text-pendingColor  button-accepted ${
            activeOrderTab === HOLD ? "text-xl p-3 " : ""
          }`}
          onClick={showHoldOrders}
        >
          On Hold
        </button>
        <button
          className={` m-1 rounded-[10px] font-bold bg-completeLightColor px-2 text-completeColor  button-complete ${
            activeOrderTab === COMPLETED ? "text-xl p-3 " : ""
          }`}
          onClick={showCompletedOrders}
        >
          Completed
        </button>
        <button
          className={` m-1 rounded-[10px] font-bold bg-cancelledLightColor px-2 text-cancelledColor  button-cancelled ${
            activeOrderTab === CANCELLED ? "text-xl p-3 " : ""
          }`}
          onClick={showCancelledOrders}
        >
          Cancelled
        </button>
      </div>

      <div className="p-1 border-2  rounded-[10px] m-2 md:m-3 relative">
        {isLogoutOrdersLoading
          ? "loading"
          : OrdersList &&
            OrdersList.map((order, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer m-2 md:h-[150px] h-[175px]"
                >
                  <div className="flex items-center gap-1 m-2">
                    {/* <FcDocument className="w-9 h-9 text-primaryColor/30" /> */}
                    <div>
                      <h6 className="font-bold text-gray-700 text-2xl leading-none m-2">
                        Order Id:{" "}
                        <span className="text-closedColor">
                          {" "}
                          {order?.order_id}
                        </span>
                      </h6>
                      {/* <h6 className="font-bold text-gray-700 text-2xl leading-none m-2">
                        {order?.employee_id}
                      </h6> */}
                      <h6 className="font-bold text-gray-700 text-md lining-nums ml-[10px]">
                        createdAt:{" "}
                        <span className="text-closedColor">
                          {order?.createdAt}
                        </span>
                      </h6>

                      <h6 className="font-bold text-gray-700 text-md lining-nums ml-[10px]">
                        Status:{" "}
                        <span className="text-primaryDarkColor processingLightColor">
                          {order?.status}
                        </span>
                      </h6>
                    </div>
                  </div>
                  {/* drop down of amount details */}
                  <div className="w-46 mr-4 text-right absolute bottom-[30px] right-[15px] md:bottom-[70px] md:mr-4">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primaryLightColor25 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" id=""
                        >
                          Amount Details
                          <ChevronDownIcon
                            className="w-5 h-5 ml-2 -mr-1 text-primaryLightColor25 hover:primaryLightColor25"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-primaryDarkColor text-white"
                                      : "text-gray-900"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  Subtotal: &#8377;{order.sub_total}
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-primaryDarkColor text-white"
                                      : "text-gray-900"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  Paid Price: &#8377;{order.paid_price}
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-primaryDarkColor text-white"
                                      : "text-gray-900"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  Tax: &#8377;{order.tax}
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-primaryDarkColor text-white"
                                      : "text-gray-900"
                                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                >
                                  Change: &#8377;{order.change}
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                          <div className="px-1 py-1"></div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default LogoutEmployeeOrders;
