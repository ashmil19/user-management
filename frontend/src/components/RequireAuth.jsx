import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allows})=> {
    const { auth } = useAuth();
    const location = useLocation();


    return (
        auth?.isAdmin == allows
            ? <Outlet />
            : auth?.name
            ? <Navigate to="/error" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}


export default RequireAuth;