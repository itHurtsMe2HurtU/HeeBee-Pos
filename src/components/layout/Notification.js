import React from "react";
import { Popover, Transition } from "@headlessui/react";
import { BellIcon, XCircleIcon, XIcon } from "@heroicons/react/outline";

const Notification = () => {
  return (
    <Popover className="relative">
      <Popover.Button className="button-pimary-light p-2 bg-primaryLightColor25 text-primaryColor rounded-[10px]">
        <BellIcon className="h-6 w-6" />
      </Popover.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute right-0 z-10 bg-white rounded-[10px] p-2 shadow-md my-2 w-[250px]">
          <div className="flex justify-between items-center border-b-[1px] pb-1 mb-2">
            <h5 className="font-bold mb-0 text-primaryColor">Notifications</h5>
            <button className="p-0.5 text-primaryColor rounded-[10px]">
              <XCircleIcon className="h-5 w-5 close-icon " />
            </button>
          </div>
          <div className="notification-items">
            <div className="notification-item bg-primaryLightColor25 p-1 rounded-[10px] mb-1 border-l-4 border-primaryColor/50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-primaryColor line-clamp-2">
                  Lorem ipsum Lorem ipsum Lorem{" "}
                </p>
                <button>
                  <XIcon className="h-5 w-5 font-bold close-icon text-primaryColor" />
                </button>
              </div>
            </div>
            <div className="notification-item bg-primaryLightColor25 p-1 rounded-[10px] mb-1 border-l-4 border-primaryColor/50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-primaryColor line-clamp-2">
                  Lorem ipsum Lorem ipsum Lorem Lorem ipsum Lorem ipsum Lorem{" "}
                </p>
                <button>
                  <XIcon className="h-5 w-5 font-bold close-icon text-primaryColor" />
                </button>
              </div>
            </div>
            <div className="notification-item bg-primaryLightColor25 p-1 rounded-[10px] mb-1 border-l-4 border-primaryColor/50">
              <div className="flex justify-between items-center">
                <p className="text-sm text-primaryColor line-clamp-2">
                  Lorem ipsum Lorem ipsum Lorem Lorem ipsum Lorem ipsum Lorem{" "}
                </p>
                <button>
                  <XIcon className="h-5 w-5 font-bold close-icon text-primaryColor" />
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Notification;
