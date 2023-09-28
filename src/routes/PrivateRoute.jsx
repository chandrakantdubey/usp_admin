import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "src/auth/getToken";
import { LOGIN } from "./routes";

const PrivateRoute = () => {
  const isUserLoggedIn = getToken();
  return isUserLoggedIn ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default PrivateRoute;
