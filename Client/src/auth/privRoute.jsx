import { useContext } from "react";
import { AuthContext } from "./authContext";
import { Navigate, useLocation } from "react-router-dom";

export const PrivRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    const location = useLocation();

    if(!token){
        return <Navigate to="/login" state={{ from: location }}  />;
    };

    return children;
}