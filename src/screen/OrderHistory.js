import React, { useEffect, useState } from "react";
import Filter from "../components/layout/Filter";

import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/outline";
import { connect } from "react-redux";
import orders from "../api/orders";

import {
  fetchOrders,
  fetchCancelledOrders,
  fetchPreparingOrders,
  fetchSingleOrder,
  fetchAllOrders,
  showLoader,
  hideLoader,
} from "../actions/orderListAction";
import OrderDetail from "../components/home/OrderDetail";
import OrdersList from "../components/home/OrdersList";
import { useNavigate } from "react-router-dom";

const OrderHistory = ({
  fetchOrders,
  fetchCancelledOrders,
  fetchPreparingOrders,
  fetchSingleOrder,
  completedOrders,
  cancelledOrders,
  allOrders,
  fetchAllOrders,
  preparingOrders,
  singleOrder,
  showLoader,
  hideLoader,
}) => {
  const [visible, setVisible] = React.useState(true);
  const [filter, setFilter] = useState("ALL_ORDERS");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetchAllOrders(page);

    return console.log("Completed now");
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchOrders = async (searchTerm) => {
    const response = await orders.get(`/search_order/1?search=${searchTerm}`);

    setSearchData(response);
  };
  console.log(searchData);
  const onOrderSelect = (order) => {
    showLoader();
    fetchSingleOrder(order);
    setTimeout(() => {
      hideLoader();
    }, 2000);
  };

  const onPreparingClick = () => {
    setSearchTerm("");
    setSearchData(null);
    showLoader();
    setFilter("PREPARING_ORDERS");
    fetchPreparingOrders();
    onOrderSelect(preparingOrders.data?.[0]);
    setTimeout(() => {
      hideLoader();
    }, 1000);
  };
  const onCompletedClick = () => {
    setSearchTerm("");
    setSearchData(null);
    showLoader();
    setFilter("COMPLETED_ORDERS");
    fetchOrders();
    onOrderSelect(completedOrders.data?.[0]);
    setTimeout(() => {
      hideLoader();
    }, 1000);
  };

  const onAllOrderClick = () => {
    setSearchTerm("");
    setSearchData(null);
    console.log(page);
    showLoader();
    setFilter("ALL_ORDERS");

    fetchAllOrders(page);

    onOrderSelect(allOrders.data?.[0]);
    setTimeout(() => {
      hideLoader();
    }, 1000);
  };

  const onCancelledClick = () => {
    setSearchTerm("");
    setSearchData(null);
    showLoader();
    setFilter("CANCELLED_ORDERS");
    fetchCancelledOrders();
    setTimeout(() => {
      hideLoader();
    }, 1000);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    searchOrders(searchTerm);
  };

  const searchOutputFunction = () => {
    if (searchData.data.status === "success") {
      return (
        <OrdersList
          ordersList={searchData.data}
          onOrderSelect={onOrderSelect}
        />
      );
    } else if (searchData.data.status === "failure") {
      return <div>No data Found</div>;
    }
  };

  const outputFunction = () => {
    if (filter === "ALL_ORDERS") {
      if (allOrders.data) {
        console.log(allOrders);

        return (
          <OrdersList
            ordersList={allOrders}
            onOrderSelect={onOrderSelect}
            page={page}
            setPage={setPage}
          />
        );
      } else if (allOrders.status === "failure") {
        return <div>No data found</div>;
      } else {
        return <div> Loading....</div>;
      }
    } else if (filter === "COMPLETED_ORDERS") {
      if (completedOrders.data) {
        return (
          <OrdersList
            ordersList={completedOrders}
            onOrderSelect={onOrderSelect}
          />
        );
      } else if (completedOrders.status === "failure") {
        return <div>No data found</div>;
      } else {
        return <div>Loading......</div>;
      }
    } else if (filter === "PREPARING_ORDERS") {
      if (preparingOrders.data) {
        return (
          <OrdersList
            ordersList={preparingOrders}
            onOrderSelect={onOrderSelect}
          />
        );
      } else if (preparingOrders.status === "failure") {
        return <div>No data found</div>;
      } else {
        return <div>Loading.....</div>;
      }
    } else if (filter === "CANCELLED_ORDERS") {
      if (cancelledOrders.data) {
        return (
          <OrdersList
            ordersList={cancelledOrders}
            onOrderSelect={onOrderSelect}
          />
        );
      } else if (cancelledOrders.status === "failure") {
        return <div>No data found</div>;
      } else {
        return <div>Loading.....</div>;
      }
    }
  };

  return (
    <>
      <div>
        <button
          className=" font-bold  py-2 px-4 rounded leading-normal sm:hidden bg-white/50 hover:bg-primaryLightColor25 text-primaryColor p-2 rounded-[10px] backdrop-blur-[3px] block md:hidden shadow fixed bottom-[60px] right-[20px]  z-50"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <FiShoppingCart className="text-3xl" />
          ) : (
            <MdOutlineCancel className="text-4xl" />
          )}
        </button>
      </div>

      <div className="bg-stone-200 h-screen flex flex-col md:flex-row">
        {/* left */}
        <section
          className={`left-section w-full md:w-[700px] h-full flex flex-col${
            visible ? " active" : ""
          }`}
        >
          <div className=" flex justify-between items-center bg-stone-50 borderRadius rounded-[10px] m-2 p-2">
            <div className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]">
              <ChevronLeftIcon
                className="h-6 w-6"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            <div className=" flex-end w-64 ">
              <h1 className="text-2xl text-center text-primaryColor font-bold">
                Orders
              </h1>
            </div>
            <Filter />
          </div>

          <div>
            <div className="search-bar bg-stone-50 m-2 p-2  rounded-[10px]">
              <form
                className="flex items-center py-1 px-1  leading-normal bg-primaryLightColorInput text-gray-800  rounded-[10px] search-input"
                onSubmit={(e) => onSubmit(e)}
              >
                <input
                  className="w-full py-1 px-2  leading-normal bg-transparent border-none rounded-[10px] text-gray-800  focus:outline-none"
                  type="search"
                  placeholder="Search Customer No or Order ID"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchData(null);
                  }}
                />
                <SearchIcon
                  width="4rem"
                  height="2rem"
                  className="text-primaryColor font-bold text-3xl bg-primaryLightColor25 cursor-pointer rounded-tr-[10px] rounded-br-[10px]"
                  onClick={onSubmit}
                />
              </form>

              <div className="order-status flex flex-wrap justify-start m-2 text-sm  ">
                <button
                  className=" m-1 text-black-400 bg-gray-200 focus:outline-none focus:ring focus:ring-grey-700 rounded-[10px] font-bold p-1   button-complete"
                  onClick={onAllOrderClick}
                >
                  {" "}
                  All Orders
                </button>
                <button
                  className=" m-1 text-green-500 bg-green-200 focus:outline-none focus:ring focus:ring-green-600 rounded-[10px] font-bold p-1    button-complete"
                  onClick={onCompletedClick}
                >
                  {" "}
                  Completed
                </button>
                <button
                  className=" m-1 text-red-500 bg-red-200 focus:outline-none focus:ring focus:ring-red-600 rounded-[10px] font-bold p-1    button-cancelled"
                  onClick={onCancelledClick}
                >
                  Cancelled
                </button>
                <button
                  className=" m-1 text-sky-500 bg-sky-200 focus:outline-none focus:ring focus:ring-sky-600 rounded-[10px] font-bold  p-1 button-closed"
                  onClick={onPreparingClick}
                >
                  Preparing
                </button>
              </div>
            </div>
          </div>

          <div className="right-sidebar-orders h-100 max-h-[600px] overflow-y-auto">
            {!searchData ? outputFunction() : searchOutputFunction()}
          </div>
        </section>

        <section className="right-section w-full  h-[calc(100%_-_80px)] h-full">
          {/* right*/}
          {singleOrder.data ? (
            <OrderDetail order={singleOrder.data} />
          ) : (
            <div>Loading</div>
          )}
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allOrders: state.orderList.allOrderList,
    completedOrders: state.orderList.completedOrderList,
    cancelledOrders: state.orderList.cancelledOrderList,
    preparingOrders: state.orderList.preparingOrderList,
    singleOrder: state.orderList.singleOrder,
  };
};
export default connect(mapStateToProps, {
  fetchOrders,
  fetchAllOrders,
  fetchCancelledOrders,
  fetchPreparingOrders,
  fetchSingleOrder,
  showLoader,
  hideLoader,
})(OrderHistory);
