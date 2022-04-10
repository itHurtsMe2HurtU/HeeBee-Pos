import {
  XIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLastCustomerOrderAction } from "../../actions/getLastCustomerOrderAction";

const OrderItemsSidebar = ({
  isOpenOrderItemsSidebar,
  setIsOpenOrderItemsSidebar,
  customerInfoRenderData
}) => {
  // const [productId,setProductId]=useState("");
  // console.log(productId);
  const dispatch = useDispatch();

  const mobile_no = customerInfoRenderData.mobile_no;
  //console.log(mobile_no, 'mobile_no');

  useEffect(() => {
    // console.log("shivaaaaaaa");
    dispatch(getLastCustomerOrderAction(mobile_no));
  }, [dispatch, mobile_no]);

  const ToggleOrderItemsSidebar = () => {
    isOpenOrderItemsSidebar === true
      ? setIsOpenOrderItemsSidebar(false)
      : setIsOpenOrderItemsSidebar(true);
  };


  const lastordersListFromStore = useSelector(
    (state) => state.lastCustomerOrder
  );

  const {
    loading: isLastOrderListLoading,
    lastCustomerOrders: lastCustomerOrdersData,
  } = lastordersListFromStore;
  const lastCustomerOrdersDataList = lastCustomerOrdersData?.order_items || [];

  // console.log(lastCustomerOrdersData);

  return (
    <>
      <div
        className={`sidebar-order-items p-2 ${
          isOpenOrderItemsSidebar === true ? "active" : ""
        }`}
      >
        <div className="sidebar-header p-1 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <h6 className="text-gray-800 font-bold text-lg leading-tight uppercase">
                {lastCustomerOrdersData?.customer_no}
              </h6>
              <h6 className="font-bold text-gray-500 leading-tight text-xs lining-nums">
                {lastCustomerOrdersData?.createdAt}
              </h6>
            </div>
            <button
              className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
              onClick={ToggleOrderItemsSidebar}
            >
              <XIcon className="h-6 w-6 close-icon" />
            </button>
          </div>
        </div>

        <div className="sidebar-body p-1 ">
          <div className="w-full overflow-auto sidebar-order-history-div pr-1">
            {lastCustomerOrdersDataList.length > 0 &&
              lastCustomerOrdersDataList.map((orderitem, i) => {
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2 p-1.5 bg-white rounded-[10px] mb-2 shadow-sm border-2 border-primaryColor/10"
                  >
                    <div className="flex items-center gap-2">
                      {/* <div className="flex-none relative w-[60px] h-[60px] rounded-[10px]">
                        <img
                          src="https://source.unsplash.com/random/900x900"
                          alt="product"
                          className="w-full h-full rounded-[10px] relative"
                        />
                        <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute top-[-5px] right-[-5px]">
                          {orderitem.quantity}
                        </span>
                      </div> */}
                      <div>
                        <h6 className="font-bold text-gray-700 text-md leading-tight capitalize">
                          {orderitem.product_name}
                        </h6>
                        <h6 className="font-bold text-gray-500 text-xs lining-nums leading-tight">
                        &#8377; {orderitem.price} | Quantity: {orderitem.quantity}
                        </h6>
                      </div>
                    </div>
                    <button className="text-primaryColor hover:text-primaryDarkColor">
                      <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div
        className={`sidebar-order-items-overlay ${
          isOpenOrderItemsSidebar === true ? "active" : ""
        }`}
      ></div>
    </>
  );
};

export default OrderItemsSidebar;
