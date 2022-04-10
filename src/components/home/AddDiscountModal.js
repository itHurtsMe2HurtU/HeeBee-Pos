import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import axios from "axios";

const AddDiscountModal = ({ isOpen, setIsOpen, couponData=[],setDiscount }) => {
    console.log(couponData?.length)



  function closeModal() {
    setIsOpen(false);
  }

//  const couponApplyHandler = () => {
//         setDiscount(discount);
//         console.log(discount);
//     } 

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed md:left-[66.66%] inset-0 "
          style={{ zIndex: "67" }}
          onClose={closeModal}
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
              <Dialog.Overlay className="absolute inset-0 bg-black/20 backdrop-blur-[3px] w-full " />
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
              <div className="inline-block w-full max-w-xs p-4  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title>
                  <h6 className="uppercase font-bold text-xl text-center text-gray-800">
                    Add Discount
                  </h6>
                </Dialog.Title>
                <div className="w-full my-5 p-1">
                  {
                  !couponData?.length?"no coupon found":
                couponData?.map((coupon) => 
                <div className='w-full flex justify-between items-center bg-primaryColor/25 shadow p-2 mb-2 rounded-[10px] gap-2'>
                    <div>
                      <h6 className='font-bold uppercase text-primaryColor'>{coupon.coupon_code} - {coupon.flat_discount ? (`₹${coupon.flat_discount}`) : (`${coupon.disc_percent}%`) } </h6> 
                      <h6 className='font-bold Capitalize text-primaryColor text-sm'>{coupon.title}</h6>
                    </div>
                    
                    <button className='bg-primaryColor/50 text-white uppercase font-bold text-sm px-2 py-1 shadow-sm rounded-[10px] hover:bg-primaryColor/70' onClick={()=>{setDiscount(coupon); setIsOpen(false)}} >Apply</button>
                </div>

                )
            }
                </div>

                <div className="flex justify-center mt-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-slate-500 bg-slate-100 border border-transparent rounded-[10px] hover:bg-slate-200 w-1/3 "
                    onClick={closeModal}
                  >
                    Close
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

export default AddDiscountModal;
