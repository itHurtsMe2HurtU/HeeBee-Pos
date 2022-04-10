import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {  login } from "../../actions/userActions";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // set states for email and password
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // redirect user to shipping screen after sign in
  //first check if there is redirect query param on the url
  const redirect = location.search ? location.search.split("=")[1] : "../";

  //get userInfo from redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error, response } = userLogin;

  const dispatch = useDispatch();

  // handle login form submit
  const submitHandler = (e) => {
    e.preventDefault();
    // signin action here
    dispatch(login(email, password));
    
    
  };

  // if userInfo, redirect user on page load
  useEffect(() => {
    if (userInfo && userInfo?.status === "success") {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/3">
        <div className="flex flex-col justify-center items-center h-screen">
          <img
            src="https://lh3.googleusercontent.com/d/1lcKHr3nIWb_uOhYinDVmFRiEkTEgxC5C"
            alt="HeeBee"
            className="w-[50px] mb-2"
          />
          <h1 className="text-2xl textColor font-bold mb-1">Welcome Back!</h1>
          <p className="font-bold mb-4 mutedColor">
            Log in to continue to HeeBee Web Pos.
          </p>
          <form className="w-10/12" autoComplete="off" onSubmit={submitHandler}>
            <div className="outline outline-primaryLightColor30 relative input-primary my-5 p-1 ">
              <input
                type="email"
                name="email"
                placeholder=" "
                className="block py-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
              <label
                for="email"
                className="absolute top-0 text-md bg-transparent p-3 px-1 z-1 duration-300 origin-0"
              >
                Email
              </label>
            </div>
            <div className="outline outline-primaryLightColor30 relative input-primary my-5 p-1">
              <input
                type="password"
                name="password"
                placeholder=" "
                className="block py-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                for="password"
                className="absolute top-0 text-md bg-transparent p-3 px-1 z-1 duration-300 origin-0"
              >
                Password
              </label>
            </div>
            <div className="w-full mb-5">
              <button type="submit" className="button-primary">
                Login
              </button>
            </div>
            {/* {errors ? (<div className="text-red-500 text-sm font-bold capitalize text-center bg-red-200 p-2 rounded-[10px]">{errors}</div>) : null} */}
          </form>
        </div>
      </div>
      <div className="h-screen w-full md:w-2/3 hidden md:block">
        <div className="authentication-bg d-none d-md-block">
          <div className="bg-overlay"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
