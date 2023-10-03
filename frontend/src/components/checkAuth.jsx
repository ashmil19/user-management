import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function checkAuth() {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();

  return (
    authstate?.accessToken === null
    ? <Outlet state={{from: location}} />
    : authstate?.isAdmin
    ? <Navigate to="/admin" state={{ from: location }} replace />
    : <Navigate to="/" state={{ from: location }} replace />
  )
}

export default checkAuth