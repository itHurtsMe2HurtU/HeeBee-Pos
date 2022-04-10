import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Private = ({ children }) => {
    const {token} = useSelector((state) => state.authReducer);
    
    return token ? children : <Navigate to="/login" />;
}

export default Private;