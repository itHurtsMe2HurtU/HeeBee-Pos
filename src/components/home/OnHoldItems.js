import React from "react";
import OnHoldItemsCard from "./OnHoldItemsCard";

const OnHoldItems = ({ order_items }) => {

    return (
        <>
            {
                order_items?.map((order_item) => {
                    return (
                        <OnHoldItemsCard order_item={order_item} key={order_item.order_items_id} />
                    )
                })
            }
        </>
    )
}

export default OnHoldItems;
