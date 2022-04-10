import React, {
    useState
  } from "react";
  import {
    XCircleIcon,
  } from "@heroicons/react/outline";
  import EditCartItemModal from "../../components/home/EditCartItemModel";
  import { useDispatch } from "react-redux";


const CartItem = (item, removeItemsFromCart) => {
    const dispatch = useDispatch();

    const [isOpenEditCart, setIsOpenEditCart] = useState(false);

    const deleteCartItems = (sku) => {
        dispatch(removeItemsFromCart(sku));
      }

  return (
    <>
        <div className="product-card-item p-1.5 bg-white shadow-sm rounded-[10px] mb-1.5">
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex gap-2">
                      <div
                        className="flex-none relative w-[60px] h-[60px] rounded-[10px] cursor-pointer"
                        onClick={() => setIsOpenEditCart(!isOpenEditCart)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full rounded-[10px] relative"
                        />
                        <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute top-[-5px] right-[-5px]">
                          {item.qty}
                        </span>
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => setIsOpenEditCart(!isOpenEditCart)}
                      >
                        <h6 className="font-bold text-gray-800 capitalize text-md line-clamp-1 leading-tight">
                          {item.name}
                        </h6>
                        <h6 className="text-gray-400 leading-tight line-clamp-2 capitalize text-sm">
                          &#8377;{item.price}&nbsp;
                          {Object.entries(item.add_ons).map(([key, val], i) => (
                            <span className="mr-1" key={i}>
                              {key}: {val}{i !== Object.entries(item.add_ons).length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </h6>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <h6 className="font-bold text-md text-gray-700 leading-none">
                        {/* <del className="text-gray-400 text-sm">&#8377;3000</del>
                      <br /> */}
                        <span className="">&#8377;
                          {(item.price + (Object.values(item.add_on_price).reduce((a, b) => a + b, 0))) * item.qty}

                        </span>
                      </h6>
                      <button className="text-gray-600 hover:text-gray-800" onClick={() => deleteCartItems(item.sku)}>
                        <XCircleIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default CartItem