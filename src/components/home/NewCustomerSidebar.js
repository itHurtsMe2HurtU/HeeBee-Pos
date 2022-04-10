import React, { useState } from "react";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const gender = [
  {
    gender: "Male",
  },
  {
    gender: "Female",
  },
];

const NewCustomerSidebar = ({
  isOpenNewCustomerSidebar,
  setIsOpenNewCustomerSidebar,
}) => {
  const ToggleNewCustomerSidebar = () => {
    isOpenNewCustomerSidebar === true
      ? setIsOpenNewCustomerSidebar(false)
      : setIsOpenNewCustomerSidebar(true);
  };

  const [selected, setSelected] = useState(gender[0]);
  const [useSameAddress, setUseSameAddress] = useState(false);

  const alert = useAlert();

  const branchIdfromStore = useSelector(
    (state) => state.userDetails?.user?.branch_id
  );

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    profilepic: "",
    mobileno: "",
    email: "",
    dateofbirth: "",
    gender: "",
    branch: "",
    branchid: branchIdfromStore,
    shippingaddress: "",
    shippincode: "",

    billingaddress: "",
    billpincode: "",
    // shippingDistrict:"",
    // shippingState:"",
    // billingDistrict:"",
    // billingState:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(e)
    setData({
      ...data,
      [name]: { value: value },
    });
  };

  const OnchangeToggle = (e) => {
    setUseSameAddress(e.target.checked);
    console.log("Data here is: ", data);
    if (e.target.checked) {
      setData({
        ...data,
        billingaddress: { value: data.shippingaddress.value },
        billpincode: { value: data.shippincode.value },
      });
    } else {
      setData({
        ...data,
        billingaddress: { value: "" },
        billpincode: { value: "" },
      });
    }
  };

  const submitHandler = (e) => {
    // alert.success('customer added successfully');
    e.preventDefault();
    console.log(branchIdfromStore);

    axios
      .post("https://heebeetestapi.quadbtech.com/api/v1/webpos/new_customer", {
        first_name: data.firstname.value,
        last_name: data.lastname.value,
        profile_pic: data.profilepic.value,
        mobile_no: data.mobileno.value,
        email: data.email.value,
        date_of_birth: data.dateofbirth.value,
        gender: data.gender.value,
        branch: data.branch.value,
        branch_id: branchIdfromStore,
        shipping_address: {
          address: data.shippingaddress.value,
          pincode: data.shippincode.value,
        },
        billing_address: {
          address: data.billingaddress.value,
          pincode: data.billpincode.value,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === "success") {
          alert.success("customer added successfully!");
          setIsOpenNewCustomerSidebar(false);
          return;
        }
        if (res.data.status === "failure") {
          alert.error(`${res.data.msg}`);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className={`sidebar-new-customer p-2 ${
          isOpenNewCustomerSidebar === true ? "active" : ""
        }`}
      >
        <div className="sidebar-header p-1">
          <div className="flex justify-between items-center">
            <h6 className="text-gray-800 font-bold text-lg leading-tight uppercase">
              ADD NEW CUSTOMER
            </h6>
            <button
              className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]"
              onClick={ToggleNewCustomerSidebar}
            >
              <XIcon className="h-6 w-6 close-icon" />
            </button>
          </div>
        </div>
        <div className="p-1 w-full overflow-auto sidebar-new-customer-div">
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-primaryColor bg-primaryLightColor25 rounded-lg hover:bg-primaryLightColor30 mb-2">
                  <span>Customer Information</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-primaryColor`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-2 pb-2 ">
                  <div className="w-full flex gap-2 mb-2">
                    <input
                      type="text"
                      className="w-1/2 p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="First Name"
                      autoFocus
                      required
                      name="firstname"
                      value={data.firstname.value}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="w-1/2 p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Last Name"
                      name="lastname"
                      value={data.lastname.value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full mb-2">
                    <input
                      type="text"
                      className="w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Mobile Number"
                      required
                      name="mobileno"
                      value={data.mobileno.value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full mb-2">
                    <input
                      type="email"
                      className="w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Email Address"
                      name="email"
                      value={data.email.value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full mb-2">
                    <input
                      type="text"
                      className="w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Date Of Birth"
                      name="dateofbirth"
                      onChange={(e) => console.log(e.target.value)}
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                  </div>
                  <div className="w-full mb-2">
                    <RadioGroup value={selected} onChange={setSelected}>
                      <RadioGroup.Label className="sr-only">
                        Gender
                      </RadioGroup.Label>
                      <div className="flex gap-2">
                        {gender.map((gender) => (
                          <RadioGroup.Option
                            key={gender.gender}
                            value={gender}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-offset-2 ring-offset-primaryColor ring-white ring-opacity-60"
                                  : ""
                              }
                                                                ${
                                                                  checked
                                                                    ? "bg-primaryLightColorInput  text-primaryColor"
                                                                    : "bg-primaryLightColorInput"
                                                                }
                                                                    relative rounded-lg shadow-md px-2 w-1/2
                                                                     py-2 cursor-pointer flex focus:outline-none`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium   ${
                                          checked
                                            ? "text-primaryColor"
                                            : "text-primaryColor"
                                        }`}
                                      >
                                        {gender.gender}
                                      </RadioGroup.Label>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="flex-shrink-0 text-primaryColor">
                                      <CheckIcon className="w-6 h-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-primaryColor bg-primaryLightColor25 rounded-lg hover:bg-primaryLightColor30 mb-2">
                  <span>Shipping Address</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-primaryColor`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-2 pb-2">
                  <div className="w-full mb-2">
                    <input
                      type="text"
                      className="w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Address"
                      name="shippingaddress"
                      value={data.shippingaddress.value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full flex gap-2 mb-2">
                    <input
                      type="text"
                      className="w-2/6 p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Pin Code"
                      name="shippincode"
                      value={data.shippincode.value}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="w-4/6 p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="District/City"
                      // value={data.city.value}
                      onChange={handleChange}
                      name="city"
                    />
                  </div>
                  <div className="w-full mb-2">
                    <input
                      type="text"
                      className="w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="State"
                      // value={data.state.value}
                      name="state"
                      onChange={handleChange}
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <div className="flex items-center justify-start w-full mb-2">
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  type="checkbox"
                  id="toggle"
                  className="sr-only"
                  onChange={OnchangeToggle}
                  value={useSameAddress}
                />

                <div className="block bg-primaryLightColor25 w-7 h-4 rounded-full"></div>

                <div className="dot absolute left-0.5 top-0.5 bg-primaryColor/50 w-3 h-3 rounded-full transition"></div>
              </div>

              <div className="ml-2 text-gray-700 font-medium">
                Same as Shipping Address
              </div>
            </label>
          </div>
          <Disclosure defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-primaryColor bg-primaryLightColor25 rounded-lg hover:bg-primaryLightColor30 mb-2">
                  <span>Billing Address</span>
                  <ChevronUpIcon
                    className={`${
                      open ? "transform rotate-180" : ""
                    } w-5 h-5 text-primaryColor`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-2 pb-2">
                  <div className="w-full mb-2">
                    <input
                      type="text"
                      name="billingaddress"
                      className="w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Address"
                      value={data.billingaddress.value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full flex gap-2 mb-2">
                    <input
                      type="text"
                      className="w-2/6 p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="Pin Code"
                      value={data.billpincode.value}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      className="w-4/6 p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="District/City"
                      // value={data.city.value}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full mb-2">
                    <input
                      type="text"
                      className="w-full p-2 text-sm font-medium text-gray-700 bg-primaryLightColorInput rounded-[10px] focus:outline-primaryColor placeholder:text-primaryColor/70"
                      placeholder="State"
                      // value={data.state.value}
                      onChange={handleChange}
                    />
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="w-full mt-2">
          <button
            className="w-full px-4 py-2 text-sm font-medium text-white bg-primaryColor rounded-lg hover:bg-primaryDarkColor"
            onClick={submitHandler}
          >
            Save Customer Information
          </button>
        </div>
      </div>

      <div
        className={`sidebar-new-customer-overlay ${
          isOpenNewCustomerSidebar === true ? "active" : ""
        }`}
      ></div>
    </>
  );
};

export default NewCustomerSidebar;
