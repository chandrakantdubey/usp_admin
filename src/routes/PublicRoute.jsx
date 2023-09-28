import { Navigate, Outlet } from "react-router-dom";

import { getToken } from "src/auth/getToken";
import { DASHBOARD } from "./routes";

const PublicRoute = () => {
  const isUserLoggedIn = getToken();
  return isUserLoggedIn ? <Navigate to={DASHBOARD} /> : <Outlet />;
};

export default PublicRoute;
