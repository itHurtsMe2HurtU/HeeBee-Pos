import React from 'react';
import Moment from 'react-moment';
import { connect } from "react-redux";
import { hideLoader, showLoader } from "../../actions/orderListAction";



const OnHoldOrdersList = (props) => {
    const { onHoldOrder, setOrderId, showLoader, hideLoader, } = props

    function handleSetOrderId() {
        showLoader()
        setOrderId(onHoldOrder.order_id)
        setTimeout(() => {
            hideLoader();
        }, 500);
    }

    return (
        <div className="relative flex flex-col min-w-0 rounded-[10px] break-words bg-white border-orange-600 p-1 m-1 border-l-4"
            onClick={handleSetOrderId}
        >
            <div className="flex justify-between items-center ">
                <div className="">
                    <h6 className="font-bold mb-0">{onHoldOrder.order_id}</h6>
                    <p className="font-bold mb-0 text-sm text-gray-500">{onHoldOrder?.customer_no || "Guest"}</p>
                </div>
                <div className=" flex items-end justify-center flex-col">
                    <h6 className="font-bold mb-0">
                        ₹{onHoldOrder.sub_total + onHoldOrder.tax + onHoldOrder.discount}
                    </h6>
                    <p className="font-bold mb-0 small text-gray-500 text-gray-500">
                        <Moment format="MMM D, YYYY hh:mm a">{onHoldOrder.updatedAt}</Moment>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default connect(null, {
    showLoader,
    hideLoader,
})(OnHoldOrdersList);