import React, { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { getToken } from "src/auth/getToken";
import { useSelector } from "react-redux";
import { publicRoutes } from "src/routes/PublicRoutes";
import PublicRoute from "src/routes/PublicRoute";
import { WILDCARD } from "src/routes/routes";
import DefaultRoute from "src/routes/DefaultRoute";
import { privateRoutes } from "src/routes/PrivateRoutes";
import PrivateRoute from "src/routes/PrivateRoute";
import Layout from "src/components/layout/Layout";
import { Helmet } from "react-helmet";
import { useThemeDetector } from "./hooks/useTheme";
import { Loading } from "@carbon/react";
import "./App.scss";

function App() {
  const isuserLoggedIn = Boolean(getToken());
  const { isLoading, isError } = useSelector((state) => state.login?.loginData);
  const isDarkTheme = useThemeDetector();

  return (
    <Suspense fallback={<Loading />}>
      <Helmet>
        <link
          rel="shortcut icon"
          href={!!isDarkTheme ? "/logo.svg" : "/favicon.ico"}
        />
      </Helmet>
      <BrowserRouter>
        <Routes>
          {publicRoutes.map((routeDetail) => {
            return (
              <Route path="/" element={<PublicRoute />} key={routeDetail.id}>
                <Route
                  exact
                  path={routeDetail.path}
                  element={routeDetail.component}
                />
              </Route>
            );
          })}
          {isuserLoggedIn && !isLoading && !isError && (
            // {true && !isLoading && !isError && (
            <Route
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              {privateRoutes.map((routeDetail) => {
                return (
                  <Route
                    exact
                    path="/"
                    element={<PrivateRoute />}
                    key={routeDetail.id}
                  >
                    <Route
                      exact
                      path={routeDetail.path}
                      element={routeDetail.component}
                    />
                  </Route>
                );
              })}
            </Route>
          )}
          <Route path={WILDCARD} element={<DefaultRoute />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
