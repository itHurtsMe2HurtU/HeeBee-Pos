import React, { useState, Fragment, useEffect } from 'react'
import { Dialog, Transition, Disclosure } from "@headlessui/react"
import { ChevronUpIcon, MinusIcon, PlusIcon } from '@heroicons/react/solid'
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';

import { addItemsToCart } from '../../actions/cartAction'
import { update } from 'lodash';

const Modal = ({ isOpen, setIsOpen, product }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const [qty, setQty] = useState(1);
    /* const [totalAddOnPrice, setTotalAddOnPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(product.product_list.price); */
    
    

    /* const [add_on, setAddOn] = useState('');
    const [add_on_value, setAddOnvalue] = useState('');
 */
    //const [addOn, setAddOn] = useState();
    const addOn = {}
    const addOnPrice = {}
    const addOnSKU = {}
    let skus = '';
    
    function onChangeValue(e) {
          //setTotalAddOnPrice(0);
          const abc = JSON.parse(e.target.value);
          addOn[e.target.name] = abc.title;
          addOnPrice[e.target.name] = abc.price;
          addOnSKU[e.target.name] = abc.sku;
        //console.log(Object.values(addOnSKU).join('-'));
        //skus= product.product_list.sku + '-' + JSON.stringify(Object.values(addOnSKU)).replace(/[\[\]"]+/g, '').replace(/[{()}]/g, '').replace(/,/g, '-')
        //skus= product.product_list.sku + '-' + Object.values(addOnSKU).join('-')
    }

    const incQty = () => {
        if (product.items_available <= qty) return;
        setQty(qty + 1);
    };

    const decQty = () => {
        if (1 >= qty) return;
        setQty(qty - 1);

    };

    
    useEffect(() => {
        
      }, []);

    /* const onChangeValue = (e) => {
        setAddOn({ ...addOn, [e.target.name]: e.target.value });
    } */

    const food_type = product.product_list.food_type;
    const prepare_time = product.product_list.prepare_time;
    const product_type = product.product_list.product_type;


    const addToCartHandler = () => {
        const id = product.product_id;
        //console.log(addOnPrice, 'sssss');
        dispatch(addItemsToCart(id, qty, addOn, addOnPrice, food_type, prepare_time, product_type,(product.product_list.sku + '-' + Object.values(addOnSKU).join('-'))));
        alert.success('Item added to cart');
        setIsOpen(false)
    }

    /* console.log(product.product_list.per_product_add_ons[0].add_on.title)
    for(let i=0;i<product.product_list.per_product_add_ons.length;i++){
        console.log(product.product_list.per_product_add_ons[i].add_on.title)
        for(let j=0;j<product.product_list.per_product_add_ons[i].add_on.add_on_options.length;j++){
            console.log(product.product_list.per_product_add_ons[i].add_on.add_on_options[j].order)
            console.log(product.product_list.per_product_add_ons[i].add_on.add_on_options[j].price)
        }
    } */


    /* product.product_list.per_product_add_ons.map(add_on => {
        console.log(add_on.add_on.title)
        add_on.add_on.add_on_options.map(add_on_option => {
            console.log(add_on_option.order)
            console.log(add_on_option.price)
        })
    }) */

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed md:left-[-33.33%] inset-0 " style={{ zIndex: '67' }}
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
                            <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-[3px] w-full md:w-full" />
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
                                <Dialog.Title className="flex bg-primaryLightColor25 p-1 rounded-[10px]">
                                    <img src={product.product_list.card_img} alt={product.product_list.product_name} className='w-[60px] h-[60px] rounded-[10px] bg-slate-100' />
                                    <div className='ml-1 w-full'>
                                        <div className="flex justify-between gap-2">
                                            <h6 className='font-bold text-primaryColor text-left leading-tight capitalize'>{product.product_list.product_name}</h6>
                                            {/* <h6 className='font-bold text-primaryColor text-left leading-tight capitalize'>&#8377;{product.product_list.price}</h6> */}
                                        </div>

                                        <p className='font-bold text-left text-sm leading-tight text-mutedColor line-clamp-2'>{product.product_list.description}</p>

                                    </div>
                                </Dialog.Title>
                                <div className="w-full" >
                                    <div className='w-full max-w-md p-2 mx-auto bg-white flex justify-between items-center'>
                                        <div className='flex justify-center items-center'>
                                            <button className="button-pimary-light p-2 bg-primaryLightColor25 text-sm text-primaryColor rounded-l-[10px]" onClick={decQty}>
                                                <MinusIcon className="h-5 w-5" />
                                            </button>
                                            <button className='button-pimary-light p-2 bg-primaryLightColor25 text-sm text-primaryColor font-bold w-[30px] cursor-default'>{qty}</button>
                                            <button className="button-pimary-light p-2 bg-primaryLightColor25 text-sm text-primaryColor rounded-r-[10px]" onClick={incQty}>
                                                <PlusIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <h6 className='text-primaryColor font-bold text-xl'>&#8377;{(product.product_list.price)}</h6>
                                    </div>

                                    <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl mb-2 h-[300px]" style={{overflowY:"auto"}}>
                                        {product.product_list.per_product_add_ons.map(add_on => {
                                            return (
                                                <Disclosure defaultOpen as="div" className="mb-2">
                                                    {({ open }) => (
                                                        <>
                                                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm text-left text-primaryColor bg-primaryLightColor25 rounded-[10px] hover:bg-primaryLightColor30 focus:outline-none uppercase font-bold">
                                                                <span>{add_on.add_on.title}</span>
                                                                <ChevronUpIcon
                                                                    className={`${open ? 'transform rotate-180' : ''
                                                                        } w-5 h-5 text-primaryColor`}
                                                                />
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="px-2 pt-2 pb-2 text-sm text-gray-500">
                                                                <ul className="flex flex-wrap gap-2">

                                                                    {add_on.add_on.add_on_options.map(add_on_option => {
                                                                        return (
                                                                            <>
                                                                                <li className="">
                                                                                    <input className="sr-only peer" type="radio" value={JSON.stringify(add_on_option)} name={add_on.add_on.title} id={add_on_option.order + add_on_option.price} onClick={onChangeValue} />
                                                                                    <label className="flex p-1 bg-white  border-2 border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-primaryColor peer-checked:ring-2  peer-checked:border-transparent" for={add_on_option.order + add_on_option.price}>{add_on_option.title}(+&#8377;{add_on_option.price})</label>
                                                                                </li>

                                                                            </>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            )
                                        })}
                                    </div>
                                    
                                </div>

                                <div className="flex mt-2 gap-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-slate-500 bg-slate-100 border border-transparent rounded-[10px] hover:bg-slate-200 w-1/3 "
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    {product.items_available > 0 ? 
                                    (<button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-white bg-primaryColor border border-transparent rounded-[10px] hover:bg-primaryDarkColor w-2/3" onClick={addToCartHandler}
                                    >
                                        Add To Cart
                                    </button>) : (<button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-white bg-primaryColor/75 border border-transparent rounded-[10px] w-2/3 cursor-not-allowed"
                                        
                                    >
                                        Out Of Stock
                                    </button>)}
                                    
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Modal