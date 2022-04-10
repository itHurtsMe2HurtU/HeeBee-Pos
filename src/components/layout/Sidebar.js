import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  MenuAlt2Icon,
  XIcon,
  LogoutIcon,
  HomeIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ClipboardListIcon,
} from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Logo from "../../assets/images/logo-sm-light.png";

const Sidebar = ({ isOpenMainSidebar, setIsOpenMainSidebar }) => {
  const navigate = useNavigate();

  const ToggleSidebar = () => {
    isOpenMainSidebar === true
      ? setIsOpenMainSidebar(false)
      : setIsOpenMainSidebar(true);
  };

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetailFromStore = useSelector((state) => state.userDetails);
  const { loading, error, user: userData } = userDetailFromStore;
  const userDataList = userData || [];
  //  console.log(userList.branch,"shiva bhai")

  const userDataFromStore = useSelector((state) => state.userDetails?.user);

  //logout handler
  const handleLogout = () => {
    localStorage.setItem("userdetails", JSON.stringify(userDataFromStore));
    dispatch(logout());

    navigate("/logoutEmployeeOrders");
  };

  return (
    <>
      <div
        className={`sidebar p-2 ${isOpenMainSidebar === true ? "active" : ""}`}
      >
        <div className="sidebar-header p-1">
          <div className="flex justify-between items-center">
            <img src={Logo} alt="HeeBee" className="w-[40px] h-[40px]" />
            <button
              className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
              onClick={ToggleSidebar}
            >
              <XIcon className="h-6 w-6 close-icon" />
            </button>
          </div>
        </div>

        <div className="sidebar-body p-1">
          <div className="sidebar-user-details flex flex-col justify-center items-center mt-5 mb-5">
            <div className="profile-img w-[50px] h-[50px] rounded-full bg-primaryLightColor30 shadow-sm">
              <img
                src={userDataList.profile_pic}
                alt="..."
                className="w-full h-full rounded-full p-1"
              />
            </div>
            <h5 className="text-textColor font-bold mb-0">
              {userDataList.full_name}
            </h5>
            <h6 className="text-mutedColor font-bold text-sm">
              {userDataList.branch}
            </h6>
          </div>
          <div className="sidebar-menu">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sidebar-btn sidebar-btn-active flex mb-1"
                  : "sidebar-btn flex mb-1"
              }
              to="/"
            >
              <HomeIcon className="h-6 w-6 close-icon mr-2" /> Home
            </NavLink>
            {/* <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sidebar-btn sidebar-btn-active flex mb-1"
                  : "sidebar-btn flex mb-1"
              }
              to="/checkout"
            >
              <ShoppingCartIcon className="h-6 w-6 close-icon mr-2" /> Checkout
            </NavLink> */}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sidebar-btn sidebar-btn-active flex mb-1"
                  : "sidebar-btn flex mb-1"
              }
              to="/order-history"
            >
              <DocumentTextIcon className="h-6 w-6 close-icon mr-2" /> Orders
              History
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sidebar-btn sidebar-btn-active flex mb-1"
                  : "sidebar-btn flex mb-1"
              }
              to="/onhold-orders"
            >
              <ClipboardListIcon className="h-6 w-6 close-icon mr-2" /> Onhold
              Order
            </NavLink>
          </div>
        </div>
        <div className="sidebar-footer absolute bottom-0 p-1 mb-2">
          <button className="sidebar-btn flex" onClick={handleLogout}>
            <LogoutIcon className="h-6 w-6 close-icon mr-2" /> Log out
          </button>
        </div>
      </div>
      <div
        className={`sidebar-overlay ${
          isOpenMainSidebar === true ? "active" : ""
        } w-100%`}
        onClick={ToggleSidebar}
      ></div>
    </>
  );
};

export default Sidebar;