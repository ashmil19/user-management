import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({allows})=> {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();


    return (
        authstate?.isAdmin == allows
            ? <Outlet />
            : authstate?.user
            ? <Navigate to="/error" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}


export default RequireAuth;