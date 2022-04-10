import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useAlert } from "react-alert";

import { useSelector } from "react-redux";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const HoldModal = ({
  isopenhold,
  setIsOnHoldOpen,
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
}) => {
  // getting everthing from store whichever required for post api
  const navigate = useNavigate();
  console.log(isopenhold);

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

  if (cartItemsData != null) {
    for (let i = 0; i < cartItemsData.length; i++) {
      const item = cartItemsData[i];
      cartItemsModified.push({
        product_id: item.id,
        product_name: item.name,
        quantity: item.qty,
        price: item.price,
        add_ons: item.add_ons,
        discount: item.discount,
        product_type: "Kitchen",
        prepare_time: "2h3m23s",
        food_type: "Veg",
        order_sku: "SAL-MED-CHOCO",
      });
    }
  }

  /*   } */
  //console.log(cartItemsModified,"bhaiibhai")

  const alert = useAlert();

  function closeHoldModal() {
    setIsOnHoldOpen(false);
  }

  function OpenHoldModal() {
    setIsOnHoldOpen(true);
  }

  /* const handleChange = (e) => {
      const { name, value } = e.target;
      // console.log(e)
      setData({
        ...data,
        [name]: { value: value },
      });
    }; */

  const Onhold = () => {
    axios
      .post(
        "https://heebeetestapi.quadbtech.com/api/v1/webpos/checkout_order",
        {
          customer_no: customerInfoRenderData.mobile_no,
          employee_id: employeeIdFromStore,
          branch_id: branchIdfromStore,
          branch_name: branchNameFromStore,
          paid_price: null,
          sub_total: subTotal,
          discount: discountAmount,
          received: null,
          change: null,
          applied_coupons: {
            coupon: null,
          },
          comment: addComment,
          status: "Hold",
          paid: true,
          tax: taxAmount,
          payment_method: null,
          payment_id: null,
          account_id: null,
          order_items: cartItemsModified,
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          alert.success("Your order is on hold!");
          localStorage.removeItem("cartItems");
          localStorage.removeItem("customerInfo");
          navigate("/orderonhold");
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
      <Transition appear show={isopenhold} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 "
          style={{ zIndex: "67" }}
          onClose={closeHoldModal}
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
                  Are You Sure you would like to put your orders on hold?
                </Dialog.Title>

                <div className="flex mt-2 gap-2">

                <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-white bg-primaryColor border border-transparent rounded-[10px] hover:bg-primaryDarkColor w-2/3"
                    onClick={Onhold}
                  >
                    Yes, I'm Sure
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-slate-500 bg-slate-100 border border-transparent rounded-[10px] hover:bg-slate-200 w-1/3 "
                    onClick={closeHoldModal}
                  >
                    Cancel
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

export default HoldModal;
