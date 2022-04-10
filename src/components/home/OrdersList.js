import React, { useEffect } from "react";
import OrderList from "./OrderList";

const OrdersList = ({ ordersList, onOrderSelect }) => {
  useEffect(() => {
    return onOrderSelect(orders[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const orders = ordersList.data;

  if (orders) {
    return orders?.map((order) => {
      return (
        <OrderList
          name={order.order_id}
          price={order.paid_price}
          order={order}
          key={order.order_id}
          onOrderSelect={onOrderSelect}
        />
      );
    });
  } else {
    return <div>Loading.....</div>;
  }
};

export default OrdersList;
