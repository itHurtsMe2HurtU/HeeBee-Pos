import axios from 'axios';
import React, { useState } from 'react';

const OnHoldPlaceOrder = (props) => {
    console.log("OnHoldPlaceOrder Props-->", props);

    const [updateStatus, setUpdateStatus] = useState("Place Order")

    let updatedOrderId = props.orderId
    console.log("updatedOrderId-->", updatedOrderId);

    const postUpdateOrder = () => {
        axios.post(
            "https://heebeetestapi.quadbtech.com/api/v1/webpos/update_order",
            {
                order_id: updatedOrderId,
                paid: true,
                status: "preparing"
            }
        )
            .then((response) => {
                console.log("responce-->", response);
                console.log("res logged-->", response.data);
                // setUpdateStatus("Preparing")
            })
            .catch((error) => {
                console.log("error", error);
            });
    }

    return (
        <button className="my-5 bg-primaryColor text-white text-center w-[350px] uppercase font-bold rounded-[10px] p-2"
            onClick={postUpdateOrder}
        >
            {updateStatus}
        </button>
    )
}

export default OnHoldPlaceOrder;