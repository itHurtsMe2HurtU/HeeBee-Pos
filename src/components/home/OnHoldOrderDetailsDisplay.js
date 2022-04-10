import { MenuAlt2Icon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import Notification from '../layout/Notification';
import Sidebar from '../layout/Sidebar';
import Loader from "./Loader";
import OnHoldItems from "./OnHoldItems";
import OnHoldPlaceOrder from "./OnHoldPlaceOrder";



const getSingleOnHoldOrder = async (orderId) => {

    const url = `https://heebeetestapi.quadbtech.com/api/v1/webpos/fetch_single_order?order=${orderId}`
    try {
        const response = await axios.get(url)
        console.log('response:-', response);
        return response.data.data
    } catch (error) {
        console.log('error while getting singleOnHold data:-', error);
    }
}

const OnHoldOrderDetailsDisplay = (props) => {
    const { orderId } = props

    const [singleOnHoldOrder, setSingleOnHoldOrder] = useState({})

    useEffect(() => {
        if (orderId) {
            getSingleOnHoldOrder(orderId).then((data) => {
                setSingleOnHoldOrder(data)
            })
        }
    }, [orderId])

    const [isOpenMainSidebar, setIsOpenMainSidebar] = useState(false)
    const ToggleMainSidebar = () => {
        setIsOpenMainSidebar(!isOpenMainSidebar);
    }


    return (
        <>
            <section className="right-section w-full  h-[calc(100%_-_50px)] relative bg-bgColor">
                <div className="flex justify-between items-center bg-white borderRadius rounded-[10px] p-2 m-2">
                    <div
                        className="p-2 bg-primaryLightColor25 rounded-[10px] text-primaryColor cursor-pointer"
                        onClick={ToggleMainSidebar}
                    >
                        <MenuAlt2Icon className="w-6 h-6" />
                    </div>

                    <h1 className="font-bold text-2xl text-primaryColor">
                        ORDER:<span className="text-black"> {singleOnHoldOrder.order_id}</span>
                    </h1>
                    <div className="bg-primaryLightColor25 rounded-[10px] text-primaryColor relative cursor-pointer">
                        <Notification />
                        <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute top-[-5px] right-[-5px]">
                            11
                        </span>
                    </div>

                    <Sidebar
                        isOpenMainSidebar={isOpenMainSidebar}
                        setIsOpenMainSidebar={setIsOpenMainSidebar}
                        width="100%"
                        height="100%"
                    />
                </div>

                <div className="h-[calc(100vh_-_80px)] overflow-auto">
                    <div className="order-details-div-2 p-2 m-2 flex flex-wrap justify-between items-center text-[#17202A] bg-white rounded-[10px]">
                        <div>
                            {singleOnHoldOrder.sub_total && (<h1 className="mb-0 text-3xl text-[#17202A] font-bold">
                                ₹ {singleOnHoldOrder.sub_total + singleOnHoldOrder.tax + singleOnHoldOrder.discount}
                            </h1>)}
                        </div>
                        <div className="text-sm">
                            <div className="flex items-end justify-center flex-col">
                                <h6 className="mb-1 font-bold text-[#17202A] ">
                                    <span className="text-gray-500">Status:</span> {singleOnHoldOrder.status}
                                </h6>
                            </div>

                            <h6 className="mb-1 font-bold text-[#17202A]">
                                <span className="text-gray-500">Order Date: </span>
                                <Moment format="MMM D, YYYY hh:mm a">{singleOnHoldOrder.updatedAt}</Moment>
                            </h6>

                            <div className="flex items-end justify-center flex-col">
                                <h6 className="mb-1 font-bold text-[#17202A]">
                                    <span className="text-gray-500">Served by: </span>
                                    Shb1
                                </h6>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2 md:grid-cols-2 m-2 ">
                        <div className="bg-white rounded-[10px]">
                            <div className="order-details-div-2 p-2 text-sm rounded-lg bg-white">
                                <h6 className="font-bold uppercase">Billing Address</h6>
                                <p className="mb-0 font-bold text-gray-500">
                                    John Doe <br />
                                    Ashoknagar, Patna-800001 <br />
                                    9876543210
                                </p>
                            </div>
                        </div>
                        <div className="bg-white rounded-[10px] h-fit">
                            <div className="order-details-div-2 p-2 text-sm">
                                <h6 className="font-bold uppercase ">Shipping Address</h6>
                                <p className="mb-0 font-bold text-gray-500">
                                    John Doe <br />
                                    Ashoknagar, Patna-800001 <br />
                                    9876543210
                                </p>
                            </div>
                        </div>
                        <div className="bg-orange-200 rounded-[10px] h-fit bg-cancelledLightColor">
                            <div className="order-details-div-2 p-2 text-sm">
                                <h6 className="font-bold mb-2 uppercase h-fit">
                                    Payment Method
                                </h6>
                                <div className="flex justify-between align-items-center  ">
                                    <p className="mb-0 font-bold text-gray-500 text-orange-600">Onhold</p>
                                    <p className="mb-0 font-bold text-gray-500 text-orange-600 ">
                                        ₹ {singleOnHoldOrder.sub_total + singleOnHoldOrder.tax + singleOnHoldOrder.discount}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-[10px] h-fit">
                            <div className="order-details-div-2 p-2 text-sm  ">
                                <h6 className="font-bold mb-2 uppercase ">Shipping Method</h6>
                                <p className="mb-0 font-bold text-gray-500">
                                    POS Shipping - Store Pickup
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="list-of-products ">
                        <h6 className="font-bold mx-2 uppercase text-[#17202A]">
                            Order Items
                        </h6>
                        <ul className="p-2 w-full max-h-[340px] overflow-y-auto text-sm">
                            <OnHoldItems order_items={singleOnHoldOrder.order_items} />
                        </ul>
                    </div>

                    <div className="bg-white p-2 mx-2  rounded-[10px] ">
                        <div className="flex justify-between items-center  border-gray-200 p-1">
                            <h6 className=" text-sm text-gray-700">Subtotal</h6>

                            <h6 className="font-bold text-sm text-gray-500">₹ {singleOnHoldOrder.sub_total}</h6>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 p-1">
                            <h6 className=" text-sm text-gray-700">Add Discount</h6>
                            <h6 className="text-gray-500 font-bold cursor-pointer">₹ {singleOnHoldOrder.discount}</h6>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 p-1">
                            <h6 className=" text-sm text-gray-700">Tax</h6>
                            <h6 className="font-bold text-sm text-gray-500">₹ {singleOnHoldOrder.tax}</h6>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 p-1">
                            <h6 className=" text-md font-bold text-gray-700">Total</h6>
                            <h6 className="font-bold text-md text-gray-700">
                                ₹ {singleOnHoldOrder.sub_total + singleOnHoldOrder.tax + singleOnHoldOrder.discount}
                            </h6>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 p-1">
                            <h6 className=" text-sm text-gray-700">Change</h6>
                            <h6 className="font-bold text-sm text-gray-500">
                                ₹{singleOnHoldOrder.change ? singleOnHoldOrder.change : 0}
                            </h6>
                        </div>

                        {/* //Place Order Button// */}
                        <div className="row g-2 flex justify-center ">
                            <div>
                                <OnHoldPlaceOrder
                                    orderId={orderId}
                                />
                            </div>
                        </div>
                        <Loader />
                    </div>
                </div>
            </section>
            )
        </>
    )
}

export default OnHoldOrderDetailsDisplay;