import { XIcon, ChevronRightIcon, DocumentTextIcon } from '@heroicons/react/outline';
import React, { useState } from 'react'
import OrderItemsSidebar from './OrderItemsSidebar';


const OrderHistorySidebar = ({ isOpenOrderHistorySidebar, setIsOpenOrderHistorySidebar }) => {

    const [isOpenOrderItemsSidebar, setIsOpenOrderItemsSidebar] = useState(false);

    const ToggleOrderHistorySidebar = () => {
        isOpenOrderHistorySidebar === true ? setIsOpenOrderHistorySidebar(false) : setIsOpenOrderHistorySidebar(true);
    }

    const ToggleOrderItemsSidebar = () => {
        isOpenOrderItemsSidebar === true ? setIsOpenOrderItemsSidebar(false) : setIsOpenOrderItemsSidebar(true);
    }

    return (
        <>

            <div className={`sidebar-order-history p-2 ${isOpenOrderHistorySidebar === true ? 'active' : ''}`}>
                <div className='sidebar-header p-1 mb-2'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h6 className='text-gray-800 font-bold text-lg leading-tight uppercase'>Order History</h6>
                            <h6 className='text-gray-600 font-bold text-sm leading-tight capitalize'>Shubham <span className='lining-num'>(9876543210)</span></h6>
                        </div>
                        <button className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]" onClick={ToggleOrderHistorySidebar}>
                            <XIcon className="h-6 w-6 close-icon" />
                        </button>
                    </div>
                </div>
                <div className='sidebar-body p-1 '>
                    
                   
                   
                   
                    <div className='w-full overflow-auto sidebar-order-history-div pr-1'>
                        
                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>

                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>

                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>

                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>

                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>

                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>

                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>
                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>
                        <div className='flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-2 border-2 border-primaryColor/25 cursor-pointer' onClick={ToggleOrderItemsSidebar}>
                            <div className='flex items-center gap-1'>
                                <DocumentTextIcon className='w-9 h-9 text-primaryColor/30'/>
                                <div>
                                    <h6 className='font-bold text-gray-700 text-md leading-none'>ORDER123456</h6>
                                    <h6 className='font-bold text-gray-500 text-xs lining-nums'>21-02-2022 12:06PM</h6>
                                </div>
                            </div>
                            <button className='text-primaryColor hover:text-primaryDarkColor'><ChevronRightIcon className='w-5 h-5'/></button>
                        </div>

                    </div>
                </div>
            </div>
            <div className={`sidebar-order-history-overlay ${isOpenOrderHistorySidebar === true ? 'active' : ''}`} ></div>
            <OrderItemsSidebar isOpenOrderItemsSidebar={isOpenOrderItemsSidebar} setIsOpenOrderItemsSidebar={setIsOpenOrderItemsSidebar}/>
        </>
    )
}

export default OrderHistorySidebar