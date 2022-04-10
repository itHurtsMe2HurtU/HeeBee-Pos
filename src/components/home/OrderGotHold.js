import React from "react";

import { useNavigate } from "react-router-dom";

const OrderGotHold = () => {
  let navigate = useNavigate();
  /*   const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
    window.href = "/";
  } */

  return (
    <div className="bg-primaryLightColor25 w-full h-[100vh] flex justify-center items-center ">
      <div className="bg-white border-[rgba(0, 0, 0, 0.35) 0px 5px 15px]  w-[350px] rounded-[10px] p-5">
        <div className="flex items-center justify-center font-bold text-[orange] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[100px] w-15 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h1 className="flex-col justify-centre text-[orange] text-bold flex justify-center items-center m-2 font-bold text-3xl ">
            ThankYou!
          </h1>
          <span className="flex justify-center items-center text-mutedColor text-xs">
            Your cart data is Successfully added in hold cart.
          </span>
        </div>

        {/* <button className="uppercase m-4 p-2 w-[280px] flex justify-center items-center rounded-[10px] bg-primaryLightColor25 text-primaryDarkColor font-bold" onClick={routeChange}>
          Return Home
        </button> */}
        <a
          href="/"
          className="uppercase m-4 p-2 w-[280px] flex justify-center items-center rounded-[10px] bg-primaryLightColor25 text-primaryDarkColor font-bold"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default OrderGotHold;
