import { get } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../screen/auth/Login";
import HomeScreen from "../screen/home/HomeScreen";
import { detailsUser } from "../actions/userActions";
import SuccessPage from "../components/home/SuccessPage";
import OrderGotHold from "../components/home/OrderGotHold";
import LogoutEmployeeOrders from "../components/home/LogoutEmployeeOrders";
import OrderHistory from "../screen/OrderHistory";
import OnHoldOrders from "../screen/OnHoldOrders";
//import Private from "./Private";
//import Public from "./Public";

const Routing = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const token = get(userLogin, "userInfo.token");

  useEffect(() => {
    if (!!token) {
      dispatch(detailsUser());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/orderonhold" element={<OrderGotHold/>}/>
        <Route
          path="/logoutEmployeeOrders"
          element={<LogoutEmployeeOrders />}
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/onhold-orders" element={<OnHoldOrders />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
