import React from "react";
import Moment from "react-moment";
import { useState } from "react";
import { useRef } from "react";
import "moment-timezone";
import { MenuAlt2Icon } from "@heroicons/react/outline";
import { useReactToPrint } from "react-to-print";
import Notification from "../layout/Notification.js";
import ProductsCard from "./ProductsCard.js";
import Sidebar from "../layout/Sidebar.js";
import Loader from "./Loader.js";

const OrderDetail = ({ order }) => {
  const [isOpenMainSidebar, setIsOpenMainSidebar] = useState(false);
  const componentref = useRef();
  console.log(order);
  const ToggleMainSidebar = () => {
    setIsOpenMainSidebar(!isOpenMainSidebar);
  };

  const handlePrint = useReactToPrint({
    content: () => componentref.current,
  });

  if (!order) {
    return <div>Loading.....</div>;
  }
  return (
    <div ref={componentref}>
      <div className="flex justify-between items-center bg-stone-50 borderRadius rounded-[10px] p-3 m-2">
        <div
          className="p-2 bg-primaryLightColor25 rounded-[10px] text-primaryColor cursor-pointer"
          onClick={ToggleMainSidebar}
        >
          <MenuAlt2Icon className="w-6 h-6" />
        </div>

        <h1 className="font-bold text-2xl text-[#999999]">
          ORDER:<span className="text-[#17202A]"> {order.order_id}</span>
        </h1>

        <Notification />
      </div>

      <div className="h-[calc(100vh_-_80px)] overflow-auto">
        <Sidebar
          isOpenMainSidebar={isOpenMainSidebar}
          setIsOpenMainSidebar={setIsOpenMainSidebar}
          width="100%"
          height="100%"
        />
        <div className="order-details-div-2 p-2 m-2 flex flex-wrap justify-between items-center text-[#17202A]  bg-stone-50 rounded-[10px]">
          <div>
            <h1 className="mb-0 text-3xl text-[#17202A] font-bold">
              ₹ {order.paid_price}
            </h1>
          </div>
          <div>
            <div className="flex items-end justify-center flex-col">
              <h6 className="mb-1 font-bold text-[#17202A] ">
                <span className="text-gray-500">Status :</span> {order.status}
              </h6>
            </div>

            <h6 className="mb-1 font-bold text-[#17202A]">
              <span className="text-gray-500">Order Date :</span>{" "}
              <Moment format="MMM D, YYYY hh:mm a">{order.createdAt}</Moment>
            </h6>

            <div className="flex items-end justify-center flex-col">
              <h6 className="mb-1 font-bold text-[#17202A]">
                <span className="text-gray-500">Served by :</span>
                Shb1
              </h6>
            </div>
          </div>
        </div>

        <div className="grid gap-2 md:grid-cols-2 m-2 ">
          <div className="bg-stone-50 rounded-[10px]">
            <div className="order-details-div-2 p-2 text-sm">
              <h6 className="font-bold uppercase">Billing Address</h6>
              <p className="mb-0 font-bold text-gray-500">
                John Doe <br />
                Ashoknagar, Patna-800001 <br />
                9876543210
              </p>
            </div>
          </div>
          <div className="bg-stone-50 rounded-[10px] h-fit">
            <div className="order-details-div-2 p-2 text-sm">
              <h6 className="font-bold uppercase">Shipping Address</h6>
              <p className="mb-0 font-bold text-gray-500">
                John Doe <br />
                Ashoknagar, Patna-800001 <br />
                9876543210
              </p>
            </div>
          </div>
          <div className="bg-stone-50 rounded-[10px] h-fit">
            <div className="order-details-div-2 p-2 text-sm">
              <h6 className="font-bold mb-2 uppercase h-fit">Payment Method</h6>
              <div className="flex justify-between align-items-center">
                <p className="mb-0 font-bold text-gray-500">
                  {order.payment_method?.toUpperCase()}
                </p>
                <p className="mb-0 font-bold text-gray-500 ">
                  ₹{order.paid_price}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-stone-50 rounded-[10px] h-fit">
            <div className="order-details-div-2 p-2 text-sm ">
              <h6 className="font-bold mb-2 uppercase ">Shipping Method</h6>
              <p className="mb-0 font-bold text-gray-500">
                POS Shipping - Store Pickup
              </p>
            </div>
          </div>
        </div>

        <div className="list-of-products   ">
          <h6 className="font-bold mx-2 uppercase text-[#17202A]">
            Order Items
          </h6>
          <ul className="p-2 w-full max-h-[340px] overflow-y-auto">
            <ProductsCard order_items={order.order_items} />
          </ul>
        </div>

        <div className="bg-stone-50 p-2 mx-2  rounded-[10px] ">
          <div className="flex justify-between items-center  border-gray-200 p-1">
            <h6 className=" text-sm text-gray-700">Subtotal</h6>

            <h6 className="font-bold text-sm text-gray-500">
              ₹ {order.sub_total}
            </h6>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 p-1">
            <h6 className=" text-sm text-gray-700">Add Discount</h6>
            <h6 className="text-gray-500 font-bold cursor-pointer">
              ₹ {order.discount}
            </h6>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 p-1">
            <h6 className=" text-sm text-gray-700">Tax</h6>
            <h6 className="font-bold text-sm text-gray-500">₹{order.tax}</h6>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 p-1">
            <h6 className=" text-md font-bold text-gray-700">Total</h6>
            <h6 className="font-bold text-md text-gray-700">
              ₹ {order.paid_price}
            </h6>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 p-1">
            <h6 className=" text-sm text-gray-700">Change</h6>
            <h6 className="font-bold text-sm text-gray-500">
              ₹{order.change ? order.change : 0}
            </h6>
          </div>

          <div className="row  g-2 flex justify-center ">
            <div>
              <button
                className=" my-5 bg-primaryColor text-white text-center w-[350px] uppercase font-bold rounded-[10px] p-2"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
          <Loader />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
