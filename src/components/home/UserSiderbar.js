import {
  XIcon,
  SearchIcon,
  UserIcon,
  UserCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { data } from "autoprefixer";
import axios from "axios";
import { get } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerInfo } from "../../actions/customerInfoAction";
import NewCustomerSidebar from "./NewCustomerSidebar";

const UserSiderbar = ({
  isOpenUserSidebar,
  setIsOpenUserSidebar,
  setCustomerInfoRenderData,
}) => {
  const [isOpenNewCustomerSidebar, setIsOpenNewCustomerSidebar] =
    useState(false);

  const [searchCustomer, setSearchCustomer] = useState("");

  const [birthdayFilter, setBirthdayFilter] = useState([]);
  const [showBdyUser, setShowBdyUser] = useState(false);
  const [customerList, setCustomerList] = useState([]);

  // const [showBirthdayToday, setShowBirthdayToday] = useState(false);
  //   const [saveCustomerData,setSaveCustomerData]=useState({
  //     customer_id: "",
  // first_name: "",
  // last_name: "",
  // mobile_no: "",
  // profile_pic: "",
  // email: "",
  // date_of_birth: "",
  // gender: "",
  // branch: "",
  // branch_id: "",
  //   })

  const dispatch = useDispatch();

  const ToggleUserSidebar = () => {
    isOpenUserSidebar === true
      ? setIsOpenUserSidebar(false)
      : setIsOpenUserSidebar(true);
  };

  const ToggleNewCustomerSidebar = () => {
    isOpenNewCustomerSidebar === true
      ? setIsOpenNewCustomerSidebar(false)
      : setIsOpenNewCustomerSidebar(true);
  };

  // get product from redux store

  const customerInfoFromStore = useSelector((state) => state.customerInfo);

  const { loading: isCustomerInfoLoading, customer: customerInfoData } =
    customerInfoFromStore;
  // console.log(customerInfoData, "customerinfodata");
  // console.log("first name is ", customerInfoData?.mobile_no);

  useEffect(() => {
    dispatch(getCustomerInfo(searchCustomer));
  }, [searchCustomer]);

  useEffect(() => {
    if (customerInfoData instanceof Array) {
      setCustomerList(customerInfoData);
    }
  }, [customerInfoData]);

  // const onToggleBirthday = (e) => {
  //   setShowBirthdayToday(e.target.checked);

  // };

  // const checkBirthday=()=>{
  //     if(showBirthdayToday===true);
  //   let today = new Date();
  //   let date =
  //     today.getFullYear() +
  //     "-" +
  //     (today.getMonth() + 1) +
  //     "-" +
  //     today.getDate();
  //   if (date === customerInfoData?.date_of_birth) {

  //   }
  // }
  // const onSetCustomerData=()=>{

  //   localStorage.setItem('savecustomerData', JSON.stringify())
  //   setSaveCustomerData()
  // }

  // guest post api turn on
  const guestUseron = () => {
    axios
      .post(
        "https://heebeetestapi.quadbtech.com/api/v1/webpos/guest_customer",
        {
          branch_id: "51d0409b-d99c-4aec-bbd3-0450ebc367a2",
          branch: "gorai branch",
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          ToggleUserSidebar();
          localStorage.setItem("customerInfo", JSON.stringify(res.data.data));

          setCustomerInfoRenderData(res.data.data);

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

  async function onToggleBirthday() {
    try {
      const result = await axios.get(
        `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_birthday_numbers/1`
      );
      // console.log(result)
      if (result.data["status"] === "success") {
        setBirthdayFilter(result.data);
        console.log(birthdayFilter, "shivabhai");
      } else {
        console.log("click not count");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onUseCustomer = () => {
    localStorage.setItem("customerInfo", JSON.stringify(customerInfoData));
    setCustomerInfoRenderData(customerInfoData);
    console.log({ customerInfoData }, "shi va");
    ToggleUserSidebar();
  };

  const onUseBdyBoy = useCallback(() => {
    const mobileNumber = get(birthdayFilter, "[0].mobile_no");
    const customerData =
      customerList.find(
        (customer) => get(customer, "mobile_no") === mobileNumber
      ) ||
      get(birthdayFilter, "[0]") ||
      null;

    localStorage.setItem("customerInfo", JSON.stringify(customerData));
    localStorage.setItem("bday", 'true');
    setCustomerInfoRenderData(customerData);
    ToggleUserSidebar();
  }, [customerList, birthdayFilter]);

  // const found = customerInfoData.find(() => customerInfoData.mobile_no === birthdayFilter.mobile_no);
  // console.log(found,"bhaikajlw")

  // birthday api call

  async function onToggleBirthday(e) {
    setShowBdyUser(e.target.checked);
    localStorage.setItem("bday",'false');
    if (!e.target.checked) {
      return;
    } else {
      try {
        const result = await axios.get(
          `https://heebeetestapi.quadbtech.com/api/v1/webpos/get_birthday_numbers/1`
        );
        // console.log(result)
        if (result.data["status"] === "success") {
          setBirthdayFilter(result.data.data);
          console.log(birthdayFilter, "bhhhhhhhh");
        } else {
          console.log("birthday not count");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  console.log(customerInfoData, "customerinfodata");

  return (
    <>
      <div
        className={`sidebar-user p-2 ${
          isOpenUserSidebar === true ? "active" : ""
        }`}
      >
        <div className="sidebar-header p-1">
          <div className="flex justify-between items-center">
            <h6 className="text-gray-800 font-bold text-lg leading-tight uppercase">
              CUSTOMER
            </h6>
            <button
              className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
              onClick={ToggleUserSidebar}
            >
              <XIcon className="h-6 w-6 close-icon" />
            </button>
          </div>
        </div>
        <div className="sidebar-body p-1">
          <button
            className="bg-primaryColor text-white w-full p-2 text-sm font-bold hover:bg-primaryDarkColor rounded-[10px] mb-2"
            onClick={ToggleNewCustomerSidebar}
          >
            Create New Customer
          </button>
          <button
            className="bg-primaryLightColor25 text-primaryColor w-full p-2 text-sm font-bold hover:bg-primaryLightColor30 rounded-[10px] mb-3"
            onClick={guestUseron}
          >
            Use Guest
          </button>
          <div className="search-input-div relative mb-1">
            <input
              type="search"
              placeholder="Search Customer Mobile Number"
              onChange={(e) => setSearchCustomer(e.target.value)}
              value={searchCustomer}
              className="w-full pl-[40px] rounded-[10px] p-2 bg-primaryLightColorInput text-textColor focus:outline-primaryColor"
            />
            <SearchIcon className="h-6 w-6 absolute top-[8px] left-[8px] text-primaryColor" />
          </div>
          <div className="flex items-center justify-start w-full mb-3">
            <label
              htmlFor="toggleB"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggleB"
                  className="sr-only"
                  onChange={onToggleBirthday}
                  checked={showBdyUser}
                  value={birthdayFilter}
                />

                <div className="block bg-primaryLightColor25 w-7 h-4 rounded-full"></div>

                <div className="dot absolute left-0.5 top-0.5 bg-primaryColor/50 w-3 h-3 rounded-full transition"></div>
              </div>

              <div className="ml-2 text-gray-700 font-medium">
                Show Today's Birthday
              </div>
            </label>
          </div>
          <div className="w-full overflow-auto sidebar-users-div pr-1">
            {showBdyUser
              ? birthdayFilter &&
                birthdayFilter.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-1 border-2 border-primaryColor/25 "
                  >
                    <div className="flex gap-1">
                      <UserCircleIcon className="w-9 h-9 text-primaryColor/30" />
                      <div>
                        <h6 className="font-bold text-gray-700 text-md leading-none">
                          {item.name}
                        </h6>
                        <h6 className="font-bold text-gray-600 text-sm lining-nums">
                          {item.mobile_no}
                        </h6>
                      </div>
                    </div>
                    <button
                      className="text-primaryColor hover:text-primaryDarkColor"
                      onClick={onUseBdyBoy}
                    >
                      <PlusCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))
              : !isCustomerInfoLoading &&
                !!customerInfoData && (
                  <div className="flex items-center justify-between p-2 bg-white rounded-[10px] shadow-sm mb-1 border-2 border-primaryColor/25 ">
                    <div className="flex gap-1">
                      <UserCircleIcon className="w-9 h-9 text-primaryColor/30" />
                      <div>
                        <h6 className="font-bold text-gray-700 text-md leading-none">
                          {customerInfoData?.first_name}
                        </h6>
                        <h6 className="font-bold text-gray-600 text-sm lining-nums">
                          {customerInfoData?.mobile_no}
                        </h6>
                      </div>
                    </div>
                    <button
                      className="text-primaryColor hover:text-primaryDarkColor"
                      onClick={onUseCustomer}
                    >
                      <PlusCircleIcon className="w-5 h-5" />
                    </button>
                  </div>
                  
                )}
          </div>
        </div>
      </div>
      <div
        className={`sidebar-user-overlay ${
          isOpenUserSidebar === true ? "active" : ""
        }`}
      ></div>
      <NewCustomerSidebar
        isOpenNewCustomerSidebar={isOpenNewCustomerSidebar}
        setIsOpenNewCustomerSidebar={setIsOpenNewCustomerSidebar}
      />
    </>
  );
};

export default UserSiderbar;
