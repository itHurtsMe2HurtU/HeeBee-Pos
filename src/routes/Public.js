import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Public = ({children}) => {
    const {token} = useSelector((state) => state.authReducer);
    
    return token ? <Navigate to="/" /> : children;
}

export default Public;