import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../Redux/store";

function PrivateRoute() {
    const isLoggedIn = useSelector((state: RootState) => state.account.isLoggedIn);
    const location = useLocation();
    console.log(isLoggedIn)

    if (isLoggedIn === null) {
        return null;
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }}/>;
    }
    return <Outlet />;
}

export default PrivateRoute;
