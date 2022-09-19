import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../Redux/store";

function PrivateRoute() {
  const isLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn);
  const location = useLocation();

  console.log("this is isL: ",isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;