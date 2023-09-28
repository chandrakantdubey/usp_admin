/* eslint-disable react/jsx-filename-extension */
import { lazy } from "react";

import { LOGIN, ROOT } from "./routes";

const Login = lazy(() => import("src/pages/login/Login"));
const DefaultRoute = lazy(() => import("./DefaultRoute"));

export const publicRoutes = [
  {
    id: 2,
    path: ROOT,
    component: <DefaultRoute />,
  },
  {
    id: 1,
    path: LOGIN,
    component: <Login />,
  },
];
