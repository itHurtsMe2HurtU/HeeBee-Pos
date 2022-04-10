import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ChevronUpIcon, MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useAlert } from "react-alert";
import { RadioGroup } from "@headlessui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import SuccessPage from "./SuccessPage";
import { useNavigate } from "react-router-dom";

const payment_method = [
  {
    payment_method: "Cash",
  },
  {
    payment_method: "QR Code",
  },
  {
    payment_method: "POS Machine",
  },
];

const CheckoutModal = ({
  isCheckoutOpen,
  setIsCheckoutOpen,
  subTotal,
  totalAmount,
  taxAmount,
  addComment,
  hasApplyDiscount,
  displayTotalAfterDiscount,
  discountAmount,
  changeAmount,
  totalReceived,
  customerInfoRenderData,
  couponCode
}) => {
  // getting everthing from store whichever required for post api
  const navigate=useNavigate();

  const branchIdfromStore = useSelector(
    (state) => state.userDetails?.user?.branch_id
  );
  /* const mobileNoFromStore = useSelector(
    (state) => state.userDetails?.user?.mobile_no
  ); */

  const employeeIdFromStore = useSelector(
    (state) => state.userDetails?.user?.employee_id
  );

  const branchNameFromStore = useSelector(
    (state) => state.userDetails?.user?.branch
  );

  let cartItemsData = JSON.parse(localStorage.getItem("cartItems"));

  let cartItemsModified = [];

/*   if (cartItemsData != null && cartItemsData.length < 1){ */    
//cartItemsData does exists

if(cartItemsData != null){
    for (let i = 0; i < cartItemsData.length; i++) {
      
      const item = cartItemsData[i];
      cartItemsModified.push({
        product_id: item.id,
        product_name: item.name,
        quantity: item.qty,
        "price": item.price,
              "add_ons": item.add_ons,
              "discount": item.discount,
              "product_type": item.product_type,
              "prepare_time": item.prepare_time,
              "food_type": item.food_type,
              "order_sku": item.sku
  
      });
    }
  }
  
/*   } */
  //console.log(cartItemsModified,"bhaiibhai")

  const alert = useAlert();

  function closeCheckoutModal() {
    setIsCheckoutOpen(false);
  }

  function openCheckoutModal() {
    setIsCheckoutOpen(true);
  }

  /* const handleChange = (e) => {
      const { name, value } = e.target;
      // console.log(e)
      setData({
        ...data,
        [name]: { value: value },
      });
    }; */

  const OnCheckOut = () => {
    axios
      .post(
        "https://heebeetestapi.quadbtech.com/api/v1/webpos/checkout_order",
        {
          customer_no: customerInfoRenderData.mobile_no,
          employee_id: employeeIdFromStore,
          branch_id: branchIdfromStore,
          branch_name: branchNameFromStore,
          paid_price: hasApplyDiscount ? displayTotalAfterDiscount : totalAmount,
          sub_total: subTotal,
          discount: discountAmount,
          received: totalReceived,
          change: changeAmount,
          applied_coupons: {
            coupon: couponCode,
          },
          comment: addComment,
          status: "Preparing",
          paid: true,
          tax: taxAmount,
          payment_method: "cash",
          payment_id: null,
          account_id: null,
          order_items: cartItemsModified,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          alert.success("Order Placed Successfully!");
          localStorage.removeItem("cartItems");
          localStorage.removeItem("customerInfo")
          localStorage.removeItem("bday")
          navigate("/success")
          return;
        }
        if (res.data.status === "failure") {
          alert.error(`${res.data.msg}`);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Transition appear show={isCheckoutOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 "
          style={{ zIndex: "67" }}
          onClose={closeCheckoutModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-[3px] w-full " />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xs p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title className="text-center text-xl font-bold">
                  Payment Method
                </Dialog.Title>
                <div className="w-full">
                  <div className="flex justify-between m-2">
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#664d03] checked:border-[#FFF] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        checked
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        for="inlineRadio10"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-[#664d03] checked:border-[#FFF] focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        for="inlineRadio20"
                      >
                        QR Code
                      </label>
                    </div>
                  </div>
                
                 
                  <div className="flex justify-between items-center border-b border-gray-200 p-1">
                    <h6 className="font-bold text-2xl text-gray-600">Total Amount</h6>
                    <h6 className="font-bold text-2xl text-gray-700">
                    &#8377;{hasApplyDiscount ? displayTotalAfterDiscount : totalAmount}
                    </h6>
                  </div>
                </div>

                <div className="flex mt-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-slate-500 bg-slate-100 border border-transparent rounded-[10px] hover:bg-slate-200 w-1/3 "
                    onClick={closeCheckoutModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-white bg-primaryColor border border-transparent rounded-[10px] hover:bg-primaryDarkColor w-2/3"
                    onClick={OnCheckOut}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CheckoutModal;
