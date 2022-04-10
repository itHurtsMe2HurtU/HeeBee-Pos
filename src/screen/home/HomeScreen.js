import React, {
  useState,
} from "react";
import {
  XIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import LeftSectionHome from "./LeftSectionHome";
import RightSideHome from "./RightSectionHome";


const HomeScreen = () => {

  const [visible, setVisible] = useState(
    window.innerWidth > 768 ? true : false
  );


  return (
    <>
      <div className="flex">

        <LeftSectionHome />
        {visible && (
          <RightSideHome />
        )}
        {/* hidden md:block */}

      </div>
      <button
        className="bg-white/50 hover:bg-primaryLightColor25 text-primaryColor p-2 rounded-[10px] backdrop-blur-[3px] block md:hidden shadow fixed bottom-[60px] right-[20px] "
        onClick={() => setVisible(!visible)}
        style={{ zIndex: "51" }}
      >
        {visible ? (
          <XIcon className="w-7 h-7" />
        ) : (
          <ShoppingCartIcon className="w-7 h-7" />
        )}
      </button>
    </>
  );
};

export default HomeScreen;
