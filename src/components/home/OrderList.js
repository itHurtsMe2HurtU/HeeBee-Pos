import React from "react";
import Moment from "react-moment";
import "moment-timezone";
const OrderList = ({ name, price, order, onOrderSelect }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const status = order.status;
  const borderColor =
    status === "Preparing" ? "border-l-sky-500" : "border-l-green-500";
  const onClick = () => {
    onOrderSelect(order);
  };
  return (
    <div
      className={`relative flex flex-col min-w-0 rounded-[10px] break-words bg-white border-closedColor cursor-pointer  p-2 m-2 border-l-4 ${borderColor}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center ">
        <div className="">
          <h6 className="font-bold mb-0">{name}</h6>
          <p className="font-bold mb-0 text-sm text-gray-500">
            {order?.customer_no || "8769969699"}
          </p>
        </div>
        <div className=" flex items-end justify-center flex-col">
          <h6 className="font-bold mb-0">₹{price}</h6>
          <p className="font-bold mb-0 text-sm text-gray-500 text-gray-500">
            <Moment format="MMM D, YYYY hh:mm a">{order.createdAt}</Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
