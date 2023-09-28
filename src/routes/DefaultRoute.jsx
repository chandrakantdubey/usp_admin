import { Navigate } from "react-router-dom";

import { getToken } from "src/auth/getToken";
import { LOGIN, DASHBOARD } from "./routes";

const DefaultRoute = () => {
  const tokenCheck = getToken();
  return tokenCheck ? <Navigate to={DASHBOARD} /> : <Navigate to={LOGIN} />;
};

export default DefaultRoute;
