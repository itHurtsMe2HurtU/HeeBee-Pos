import React from "react";
import ProductCard from "./ProductCard";

const ProductsCard = ({ order_items }) => {
  return order_items?.map((order_item) => {
    return (
      <ProductCard order_item={order_item} key={order_item.order_items_id} />
    );
  });
};

export default ProductsCard;
