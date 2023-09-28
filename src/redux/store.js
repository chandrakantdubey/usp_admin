import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./login/LoginSlice";
import ProfileSlice from "./profile/ProfileSlice";
import NotificationsSlice from "./notifications/NotificationsSlice";
import DashboardSlice from "./dashboard/DashboardSlice";
import chargeBeeSlice from "./chargeBee/chargeBeeSlice";
import userAccessSlice from "./userAccess/userAccessSlice";
import chargeBeeBillingSlice from "./chargeBeeBilling/chargeBeeBillingSlice";
import apisSlice from "./apis/apisSlice";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    profile: ProfileSlice,
    notifications: NotificationsSlice,
    dashboard: DashboardSlice,
    chargeBee: chargeBeeSlice,
    userAccess: userAccessSlice,
    chargeBeeBilling: chargeBeeBillingSlice,
    apis: apisSlice,
  },
});

export default store;
