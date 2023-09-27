import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function checkAuth({ allows }) {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();

  return (
    !authstate?.accessToken === allows
    ? <Outlet />
    : <Navigate to="/error" state={{ from: location }} replace />
  )
}

export default checkAuth