import React from "react";
import "./success.css";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  let navigate = useNavigate(); 
/*   const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
    window.href = "/";
  } */
 
  return (
    <div className="bg-primaryLightColor25 w-full h-[100vh] flex justify-center items-center ">
      <div className="bg-white border-[rgba(0, 0, 0, 0.35) 0px 5px 15px]  w-[350px] rounded-[10px] p-5">
        <div className="success-animation">
          <svg
            className="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              className="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              className="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <div>
          <h1 className="flex-col justify-centre text-[#4bb71b] text-bold flex justify-center items-center m-2 font-bold text-3xl ">
            Order Successful
          </h1>
          <span className="flex justify-center items-center text-mutedColor text-sm">
            Thank you so much for order
          </span>
        </div>

        {/* <button className="uppercase m-4 p-2 w-[280px] flex justify-center items-center rounded-[10px] bg-primaryLightColor25 text-primaryDarkColor font-bold" onClick={routeChange}>
          Return Home
        </button> */}
        <a href="/" className="uppercase m-4 p-2 w-[280px] flex justify-center items-center rounded-[10px] bg-primaryLightColor25 text-primaryDarkColor font-bold">Return Home</a>
      </div>
    </div>
  );
};

export default SuccessPage;
