import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({allows})=> {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();


    return (
        authstate?.isAdmin == allows
            ? <Outlet state={{from: location}} />
            : authstate?.user
            ? <Navigate to={location.state?.from || authstate.isAdmin ? '/admin' : '/'} replace />
            : <Navigate to="/login" state={{ from: location.pathname }} replace />
    )
}


export default RequireAuth;