import { Column, Grid, Theme, useTheme } from "@carbon/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import MainHeader from "src/components/headers/MainHeader";
import { getProfile } from "src/redux/profile/ProfileSlice";

const Layout = () => {
  let { data, isLoading, isError } = useSelector(
    (state) => state.profile.profileData
  );
  const { theme } = useTheme();
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <>
      <Theme theme={theme}>
        <Theme theme="g100">
          <MainHeader data={data} />
        </Theme>
        <main className="main">
          <Grid>
            <Column xlg={3} lg={4} md={0} sm={0}></Column>
            <Column xlg={13} lg={12} md={8} sm={4}>
              <Outlet />
            </Column>
          </Grid>
        </main>
      </Theme>
    </>
  );
};

export default Layout;
