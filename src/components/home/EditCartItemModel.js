import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react"

import { MinusIcon, PlusIcon } from '@heroicons/react/solid'
import { addItemsToCart } from '../../actions/cartAction';
import {useDispatch } from 'react-redux';



const EditCartItemModal = ({ isOpenEditCart, setIsOpenEditCart, itemQty, stock, id }) => {
    const dispatch = useDispatch();


    function closeEditCartModal() {
        setIsOpenEditCart(false)
    }

    const [newQty, setNewQty] = useState(itemQty);

    const incQty = () => {
        if(stock<=newQty){
          return;
        }
        setNewQty(newQty + 1);
      };
  
      const decQty = () => {
        if(1>=newQty){
          return;
        }
        setNewQty(newQty - 1);
      };

    const updateCartHandler = (id) =>{
          dispatch(addItemsToCart(id, newQty));
          setIsOpenEditCart(false)
    }
        
      

  return (
    <>
            <Transition appear show={isOpenEditCart} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed md:left-[66.66%] inset-0 " style={{ zIndex: '67' }}
                    onClose={closeEditCartModal}
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
                                    <h6 className='uppercase font-bold text-xl text-center text-gray-800'>Update Cart</h6>
                                </Dialog.Title>
                                {/* <div className="w-full mt-2 flex p-2 justify-center items-center gap-2">
                                    <h6 className='font-bold leading-tight text-gray-600'>Coupon Code : </h6>
                                    <input input type='text' className='w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70' placeholder='Coupon Code' required />
                                </div> */}

                                <div className='w-full max-w-md mt-2 px-2 mx-auto bg-white flex justify-around items-center'>
                                <h6 className='text-primaryColor font-bold text-xl'>Quantity : </h6>
                                        <div className='flex justify-center items-center'>
                                            <button className="button-pimary-light p-2 bg-primaryLightColor25 text-sm text-primaryColor rounded-l-[10px]" onClick={decQty}>
                                                <MinusIcon className="h-5 w-5" />
                                            </button>
                                            <button className='button-pimary-light p-2 bg-primaryLightColor25 text-sm text-primaryColor font-bold w-[30px] cursor-default'>{newQty}</button>
                                            <button className="button-pimary-light p-2 bg-primaryLightColor25 text-sm text-primaryColor rounded-r-[10px]" onClick={incQty}>
                                                <PlusIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                       {/*  <h6 className='text-primaryColor font-bold text-xl'>&#8377;200</h6> */}
                                    </div>

                                <div className="flex mt-2 gap-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-slate-500 bg-slate-100 border border-transparent rounded-[10px] hover:bg-slate-200 w-1/3 "
                                        onClick={closeEditCartModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-white bg-primaryColor border border-transparent rounded-[10px] hover:bg-primaryDarkColor w-2/3"
                                        onClick={() => updateCartHandler(id)}
                                    >
                                        Update Cart
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
  )
}

export default EditCartItemModal