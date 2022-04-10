import React, { useState, useEffect } from "react";
import {
  DocumentTextIcon,
  DotsHorizontalIcon,
  PlusCircleIcon,
  RefreshIcon,
  TrashIcon,
  UserAddIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import UserSiderbar from "../../components/home/UserSiderbar";
//import OrderHistorySidebar from "../../components/home/OrderHistorySidebar";
import AddDiscountModal from "../../components/home/AddDiscountModal";
import EditCartItemModal from "../../components/home/EditCartItemModel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  removeItemsFromCart,
  removeAllItemsFromCart,
} from "../../actions/cartAction";
import emptyCart from "../../assets/images/empty_cart.svg";
import CheckoutModal from "../../components/home/CheckoutModal";
import HoldModal from "../../components/home/HoldModal";
import OrderItemsSidebar from "../../components/home/OrderItemsSidebar";

const RightSectionHome = () => {
  const dispatch = useDispatch();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOnHoldOpen, setIsOnHoldOpen] = useState(false);

  const [isOpenUserSidebar, setIsOpenUserSidebar] = useState(false);
  //const [isOpenOrderHistorySidebar, setIsOpenOrderHistorySidebar] = useState(false);
  const [visible, setVisible] = useState(
    window.innerWidth > 768 ? true : false
  );
  const [isOpen, setIsOpen] = useState(false);

  const [isOpenEditCart, setIsOpenEditCart] = useState(false);
  const [customerInfoRenderData, setCustomerInfoRenderData] = useState({});
  const [discount, setDiscount] = useState(null);

  const discountOnly = discount;
  // console.log(discountOnly.flat_discount)

  const hasApplyDiscount = !!discount;
  console.log(hasApplyDiscount, "discountbhai");

  const ToggleUserSidebar = () => {
    isOpenUserSidebar === true
      ? setIsOpenUserSidebar(false)
      : setIsOpenUserSidebar(true);
  };

  // const ToggleOrderHistorySidebar = () => {
  //   isOpenOrderHistorySidebar === true
  //     ? setIsOpenOrderHistorySidebar(false)
  //     : setIsOpenOrderHistorySidebar(true);
  // };

  // toggle orderitemsidebar

  const [isOpenOrderItemsSidebar, setIsOpenOrderItemsSidebar] = useState(false);

  const ToggleOrderItemsSidebar = () => {
    isOpenOrderItemsSidebar === true
      ? setIsOpenOrderItemsSidebar(false)
      : setIsOpenOrderItemsSidebar(true);
  };

  const branchIdfromStore = useSelector(
    (state) => state.userDetails?.user?.branch_id
  );
  // console.log(productListFromStore,"shiva")

  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const deleteAllCartItems = () => {
    dispatch(removeAllItemsFromCart());
    alert.success("All items removed from cart");
  };

  useEffect(() => {
    const customerInfoRender = JSON.parse(localStorage.getItem("customerInfo"));
    if (!customerInfoRender) {
      return;
    }
    // console.log(customerInfoRender.first_name, "bhaika jalwa");
    setCustomerInfoRenderData(customerInfoRender);
  }, []);

  //notes rupee count
  const [number10] = useState(10);
  const [number20] = useState(20);
  const [number50] = useState(50);
  const [number100] = useState(100);
  const [number200] = useState(200);
  const [number500] = useState(500);
  const [number2000] = useState(2000);

  const [notes10Count, setNotes10Count] = useState(0);
  const [notes20Count, setNotes20Count] = useState(0);
  const [notes50Count, setNotes50Count] = useState(0);
  const [notes100Count, setNotes100Count] = useState(0);
  const [notes200Count, setNotes200Count] = useState(0);
  const [notes500Count, setNotes500Count] = useState(0);
  const [notes2000Count, setNotes2000Count] = useState(0);

  const [resetAmount] = useState(0);
  const [totalReceived, setTotalReceived] = useState(0);

  const [addComment, setAddComment] = useState("");

  const number10btn = () => {
    setTotalReceived(totalReceived + number10);
    setNotes10Count((prevCount) => prevCount + 1);
  };

  const number20btn = () => {
    setTotalReceived(totalReceived + number20);
    setNotes20Count((prevCount) => prevCount + 1);
  };

  const number50btn = () => {
    setTotalReceived(totalReceived + number50);
    setNotes50Count((prevCount) => prevCount + 1);
  };

  const number100btn = () => {
    setTotalReceived(totalReceived + number100);
    setNotes100Count((prevCount) => prevCount + 1);
  };

  const number200btn = () => {
    setTotalReceived(totalReceived + number200);
    setNotes200Count((prevCount) => prevCount + 1);
  };

  const number500btn = () => {
    setTotalReceived(totalReceived + number500);
    setNotes500Count((prevCount) => prevCount + 1);
  };

  const number2000btn = () => {
    setTotalReceived(totalReceived + number2000);
    setNotes2000Count((prevCount) => prevCount + 1);
  };

  const resetReceivedAmount = () => {
    setTotalReceived(resetAmount);
    setNotes10Count(resetAmount);
    setNotes20Count(resetAmount);
    setNotes50Count(resetAmount);
    setNotes100Count(resetAmount);
    setNotes200Count(resetAmount);
    setNotes500Count(resetAmount);
    setNotes2000Count(resetAmount);
  };

  // passing data to checkoutmodalpage
  const subTotalAmount =
    Math.round(
      cartItems.reduce(
        (acc, item) =>
          acc +
          item.qty *
            (item.price +
              Object.values(item.add_on_price).reduce((a, b) => a + b, 0)),
        0
      ) * 100
    ) / 100;
  const totalAmount =
    Math.round(
      (cartItems.reduce(
        (acc, item) =>
          acc +
          item.qty *
            (item.price +
              Object.values(item.add_on_price).reduce((a, b) => a + b, 0)),
        0
      ) +
        cartItems.reduce(
          (acc, item) =>
            acc +
            item.qty *
              0.05 *
              (item.price +
                Object.values(item.add_on_price).reduce((a, b) => a + b, 0)),
          0
        )) *
        100
    ) / 100;
  const taxAmount =
    Math.round(
      cartItems.reduce(
        (acc, item) =>
          acc +
          item.qty *
            0.05 *
            (item.price +
              Object.values(item.add_on_price).reduce((a, b) => a + b, 0)),
        0
      ) * 100
    ) / 100;

  const employeeIdFromStore = useSelector(
    (state) => state.userDetails?.user?.employee_id
  );

  const [couponData, setCouponData] = useState({});

  const validCouponHandle = () => {
    axios
      .post("https://heebeetestapi.quadbtech.com/api/v1/webpos/valid_coupons", {
        branch_id: customerInfoRenderData.branch_id,
        customer_no: customerInfoRenderData.mobile_no,
        employee_id: employeeIdFromStore,
        price: subTotalAmount,
        bday: localStorage.getItem("bday"),
      })
      .then((res) => {
        setCouponData(res.data?.all_coupons || []);
        if (res.data.status === "Success") {
          //couponData = res.data.all_coupons;
          console.log(res.data.all_coupons[0]?.flat_discount, "ssss");

          return;
        }
        if (res.data.status === "failure") {
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [couponCode, setCouponCode] = useState("");

  const [discountAmount, setDiscountAmount] = useState(0);
  const [displayTotalAfterDiscount, setDisplayTotalAfterDiscount] =
    useState(totalAmount);
  console.log(displayTotalAfterDiscount);
  useEffect(() => {
    if (hasApplyDiscount) {
      setDisplayTotalAfterDiscount(totalAmount - discountOnly.flat_discount);
      setDiscountAmount(discountOnly.flat_discount);
      //console.log(discountOnly.coupon_code, 'coupon code');
      setCouponCode(discountOnly.coupon_code);
    }
  }, [hasApplyDiscount, totalAmount, discountOnly]);

  const changeAmount =
    Math.round(
      (totalReceived -
        (hasApplyDiscount ? displayTotalAfterDiscount : totalAmount)) *
        100
    ) / 100;

  return (
    <>
      <div className="w-full md:w-1/3 h-screen fixed right-0 bg-bgColor2 z-50">
        <div className="top-bar-right-home m-[5px] p-1 fixed top-0 rounded-[10px] shadow-sm bg-slate-50 ">
          <div className="flex justify-between items-center">
            <button
              className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
              onClick={deleteAllCartItems}
            >
              <TrashIcon className="h-6 w-6" />
            </button>
            <h6 className="font-bold text-primaryColor text-lg">
              Cart({cartItems.length})
            </h6>
            <button
              className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
              onClick={ToggleUserSidebar}
            >
              <UserAddIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        {localStorage.getItem("customerInfo") !== null ? (
          <div className="top-bar-right-home m-[5px] p-1 fixed top-[55px] rounded-[10px] shadow-sm bg-slate-50">
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap items-center gap-1">
                <h6 className="font-bold text-gray-700 text-md flex gap-1 items-center ml-1">
                  <UserCircleIcon className="h-5 w-5" />
                  {customerInfoRenderData.first_name}
                </h6>
                <span className="bg-red-200 text-red-500 font-bold px-2 py-0.5 text-xs rounded-[10px]">
                  {customerInfoRenderData.customer_type}
                </span>
              </div>
              <div className="flex gap-2">
                {customerInfoRenderData.first_name === "Guest" ? (
                  ""
                ) : (
                  <button
                    className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
                    onClick={ToggleOrderItemsSidebar}
                  >
                    <DocumentTextIcon className="h-6 w-6" />
                  </button>
                )}
                <Popover className="relative">
                  <Popover.Button className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]">
                    <DotsHorizontalIcon className="h-6 w-6" />
                  </Popover.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute right-0 z-10 bg-white rounded-[10px] p-2 shadow-md my-2 w-[250px] ">
                      <div className="flex justify-between items-center mb-2">
                        <h6 className="text-gray-700 font-bold text-lg">
                          Add Comment
                        </h6>
                        {/* <button className="bg-primaryColor text-white px-4 py-1 text-sm rounded-[10px] hover:bg-primaryDarkColor">
                            Save
                          </button> */}
                      </div>
                      <div className="w-full mb-0">
                        <textarea
                          className="bg-primaryLightColorInput text-gray-700 rounded-[10px] w-full focus:outline-primaryColor placeholder:text-primaryColor/70 p-1"
                          placeholder="Add New Comment"
                          rows="4"
                          onChange={(e) => setAddComment(e.target.value)}
                          value={addComment}
                        ></textarea>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>
            </div>
          </div>
        ) : (
          <div className="top-bar-right-home m-[5px] p-1 fixed top-[55px] rounded-[10px] shadow-sm bg-slate-50">
            <div className="flex justify-between items-center px-2">
              <h6 className="font-bold text-primaryColor">
                First to add New Customer
              </h6>
              <button
                className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px] font-bold"
                onClick={ToggleUserSidebar}
              >
                Add New Customer
              </button>
            </div>
          </div>
        )}
        <div className="middle-bar-right-home m-[5px] p-1 rounded-[10px] absolute top-[110px] bottom-[55px] shadow-sm bg-gray-50">
          {cartItems.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-3">
              <img src={emptyCart} alt="no items" style={{ height: "100px" }} />
              <h6 className="font-bold mt-1">No Product in Your Cart</h6>
            </div>
          ) : (
            <>
              {cartItems &&
                cartItems.map((item) => (
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
                              {Object.entries(item.add_ons).map(
                                ([key, val], i) => (
                                  <span className="mr-1" key={i}>
                                    {key}: {val}
                                    {i !==
                                    Object.entries(item.add_ons).length - 1
                                      ? ", "
                                      : ""}
                                  </span>
                                )
                              )}
                            </h6>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <h6 className="font-bold text-md text-gray-700 leading-none">
                            {/* <del className="text-gray-400 text-sm">&#8377;3000</del>
                      <br /> */}
                            <span className="">
                              &#8377;
                              {(item.price +
                                Object.values(item.add_on_price).reduce(
                                  (a, b) => a + b,
                                  0
                                )) *
                                item.qty}
                            </span>
                          </h6>
                          <button
                            className="text-gray-600 hover:text-gray-800"
                            onClick={() => deleteCartItems(item.sku)}
                          >
                            <XCircleIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </>
          )}
        </div>

        {cartItems.length === 0 ? (
          ""
        ) : (
          <div className="bottom-bar-right-home m-[5px] p-1 fixed bottom-0 rounded-[10px] shadow-sm bg-slate-50">
            <div className="flex flex-wrap justify-center items-center gap-2 mb-3">
              <button
                className="bg-primaryLightColor25 text-primaryColor px-3 font-bold rounded-[10px] hover:bg-primaryLightColor30 relative"
                onClick={number10btn}
              >
                10
                <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute bottom-[-5px] right-[-5px]">
                  {notes10Count}
                </span>
              </button>
              <button
                className="bg-primaryLightColor25 text-primaryColor px-3 font-bold rounded-[10px] hover:bg-primaryLightColor30 relative"
                onClick={number20btn}
              >
                20
                <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute bottom-[-5px] right-[-5px]">
                  {notes20Count}
                </span>
              </button>
              <button
                className="bg-primaryLightColor25 text-primaryColor px-3 font-bold rounded-[10px] hover:bg-primaryLightColor30 relative"
                onClick={number50btn}
              >
                50
                <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute bottom-[-5px] right-[-5px]">
                  {notes50Count}
                </span>
              </button>
              <button
                className="bg-primaryLightColor25 text-primaryColor px-2 font-bold rounded-[10px] hover:bg-primaryLightColor30 relative"
                onClick={number100btn}
              >
                100
                <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute bottom-[-5px] right-[-5px]">
                  {notes100Count}
                </span>
              </button>
              <button
                className="bg-primaryLightColor25 text-primaryColor px-2 font-bold rounded-[10px] hover:bg-primaryLightColor30 relative"
                onClick={number200btn}
              >
                200
                <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute bottom-[-5px] right-[-5px]">
                  {notes200Count}
                </span>
              </button>
              <button
                className="bg-primaryLightColor25 text-primaryColor px-2 font-bold rounded-[10px] hover:bg-primaryLightColor30 relative"
                onClick={number500btn}
              >
                500
                <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute bottom-[-5px] right-[-5px]">
                  {notes500Count}
                </span>
              </button>
              <button
                className="bg-primaryLightColor25 text-primaryColor px-2 font-bold rounded-[10px] hover:bg-primaryLightColor30 relative"
                onClick={number2000btn}
              >
                2000
                <span className="text-[9px] rounded-full bg-primaryColor text-white p-0.1 px-1 absolute bottom-[-5px] right-[-5px]">
                  {notes2000Count}
                </span>
              </button>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 p-1">
              <h6 className="font-bold text-md">
                <span className="text-gray-500">Recieved : </span>
                <span className="text-gray-700">&#8377;{totalReceived}</span>
              </h6>
              <button className="text-gray-700" onClick={resetReceivedAmount}>
                <RefreshIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 p-1">
              <h6 className="font-bold text-sm text-gray-500">Subtotal</h6>
              <h6 className="font-bold text-sm text-gray-500">
                &#8377;{subTotalAmount}
                {/* {localStorage.setItem(
                  "subTotal",
                  JSON.stringify(
                    Math.round(
                      cartItems.reduce(
                        (acc, item) =>
                          acc +
                          item.qty *
                            (item.price +
                              Object.values(item.add_on_price).reduce(
                                (a, b) => a + b,
                                0
                              )),
                        0
                      ) * 100
                    ) / 100
                  )
                )} */}
              </h6>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 p-1">
              <h6 className="font-bold text-sm text-gray-500">Add Discount</h6>
              <button
                className="text-gray-700"
                onClick={() => {
                  setIsOpen(!isOpen);
                  validCouponHandle();
                }}
              >
                <h6 className="font-bold text-sm text-red-700">
                  {hasApplyDiscount ? (
                    `₹${discount.flat_discount}` || discount.disc_percent
                  ) : (
                    <PlusCircleIcon className="w-5 h-5" />
                  )}
                </h6>
              </button>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 p-1">
              <h6 className="font-bold text-sm text-gray-500">Tax</h6>
              <h6 className="font-bold text-sm text-gray-500">
                &#8377;{taxAmount}
              </h6>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 p-1">
              <h6 className="font-bold text-md text-gray-700">Total</h6>
              <h6 className="font-bold text-md text-gray-700">
                &#8377;
                {hasApplyDiscount ? displayTotalAfterDiscount : totalAmount}
              </h6>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 p-1">
              <h6 className="font-bold text-sm text-gray-500">Change</h6>
              <h6 className="font-bold text-sm text-red-500">
                &#8377;
                {totalReceived >= 1 ? changeAmount : 0}
              </h6>
            </div>
            <div className="flex mt-2 gap-2">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-white bg-gray-800 border border-transparent rounded-[10px] hover:bg-gray-900 w-1/3 "
                onClick={() => setIsOnHoldOpen(!isOpen)}
              >
                Hold
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-bold uppercase text-white bg-primaryColor border border-transparent rounded-[10px] hover:bg-primaryDarkColor w-2/3"
                onClick={() => setIsCheckoutOpen(!isOpen)}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <UserSiderbar
        isOpenUserSidebar={isOpenUserSidebar}
        setIsOpenUserSidebar={setIsOpenUserSidebar}
        setCustomerInfoRenderData={setCustomerInfoRenderData}
      />
      {/* <OrderHistorySidebar
          isOpenOrderHistorySidebar={isOpenOrderHistorySidebar}
          setIsOpenOrderHistorySidebar={setIsOpenOrderHistorySidebar}
        /> */}
      <AddDiscountModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        couponData={couponData}
        setDiscount={setDiscount}
      />
      <CheckoutModal
        isCheckoutOpen={isCheckoutOpen}
        setIsCheckoutOpen={setIsCheckoutOpen}
        subTotal={subTotalAmount}
        totalAmount={totalAmount}
        taxAmount={taxAmount}
        addComment={addComment}
        hasApplyDiscount={hasApplyDiscount}
        displayTotalAfterDiscount={displayTotalAfterDiscount}
        discountAmount={discountAmount}
        changeAmount={changeAmount}
        totalReceived={totalReceived}
        customerInfoRenderData={customerInfoRenderData}
        couponCode={couponCode}
      />
      <HoldModal
        isopenhold={isOnHoldOpen}
        setIsOnHoldOpen={setIsOnHoldOpen}
        subTotal={subTotalAmount}
        totalAmount={totalAmount}
        taxAmount={taxAmount}
        addComment={addComment}
        hasApplyDiscount={hasApplyDiscount}
        displayTotalAfterDiscount={displayTotalAfterDiscount}
        discountAmount={discountAmount}
        changeAmount={changeAmount}
        totalReceived={totalReceived}
        customerInfoRenderData={customerInfoRenderData}
      />
      <OrderItemsSidebar
        isOpenOrderItemsSidebar={isOpenOrderItemsSidebar}
        setIsOpenOrderItemsSidebar={setIsOpenOrderItemsSidebar}
        customerInfoRenderData={customerInfoRenderData}
      />
    </>
  );
};

export default RightSectionHome;
