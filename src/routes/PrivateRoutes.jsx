import {
  DASHBOARD,
  APIs_ADD,
  APIs_EDIT,
  APIs_LIST,
  USER_ACCESS,
  CHARGEBEE,
  CHARGEBEE_FAMILY_EDIT,
  CHARGEBEE_FAMILY_CREATE,
  CHARGEBEE_PRODUCTS_EDIT,
  CHARGEBEE_PRODUCTS_CREATE,
  CHARGEBEE_SERVICES_EDIT,
  CHARGEBEE_SERVICES_CREATE,
  CHARGEBEE_ADDONS_EDIT,
  CHARGEBEE_ADDONS_CREATE,
  CHARGEBEE_CUSTOMERS,
  CHARGEBEE_CUSTOMER,
  CHARGEBEE_SUBSCRIPTIONS,
  CHARGEBEE_SUBSCRIPTION,
  CHARGEBEE_INVOICE,
  CHARGEBEE_INVOICES,
  USER_ACCESS_ROLES_CREATE,
  USER_ACCESS_ROLES_EDIT,
  USER_ACCESS_SECTIONS_CREATE,
  USER_ACCESS_SECTIONS_EDIT,
  USER_ACCESS_PERMISSIONS_CREATE,
  USER_ACCESS_PERMISSIONS_EDIT,
} from "./routes";
import Dashboard from "src/pages/dashboard/Dashboard";
import APIs from "src/pages/apis/APIs";
import ManageAPIs from "src/pages/apis/ManageAPIs";
import ChargeBee from "src/pages/chargeBee/ChargeBee";
import ChargeBeeManageProducts from "src/pages/chargeBee/chargeBeeProducts/ChargeBeeManageProducts";
import ChargeBeeManageServices from "src/pages/chargeBee/chargeBeeServices/ChargeBeeManageServices";
import ChargeBeeManageAddons from "src/pages/chargeBee/chargeBeeAddons/ChargeBeeManageAddons";
import ChargeBeeManageFamily from "src/pages/chargeBee/chargeBeeFamily/ChargeBeeManageFamily";
import ChargeBeeCustomers from "src/pages/chargeBeeBilling/chargeBeeCustomers/ChargeBeeCustomers";
import ChargeBeeCustomer from "src/pages/chargeBeeBilling/chargeBeeCustomers/ChargeBeeCustomer";
import ChargeBeeInvoice from "src/pages/chargeBeeBilling/chargeBeeInvoices/ChargeBeeInvoice";
import ChargeBeeInvoices from "src/pages/chargeBeeBilling/chargeBeeInvoices/ChargeBeeInvoices";
import ChargeBeeSubscriptions from "src/pages/chargeBeeBilling/chargeBeeSubscriptions/ChargeBeeSubscriptions";
import ChargeBeeSubscription from "src/pages/chargeBeeBilling/chargeBeeSubscriptions/ChargeBeeSubscription";
import UserAccess from "src/pages/userAccess/UserAccess";
import UserAccessManageSections from "src/pages/userAccess/UserAccessManageSections";
import UserAccessManagePermissions from "src/pages/userAccess/UserAccessManagePermissions";
import UserAccessManageRoles from "src/pages/userAccess/UserAccessManageRoles";

export const privateRoutes = [
  {
    id: 1,
    path: DASHBOARD,
    component: <Dashboard />,
  },
  // apis
  {
    id: 11,
    path: APIs_LIST,
    component: <APIs />,
  },
  {
    id: 12,
    path: APIs_ADD,
    component: <ManageAPIs />,
  },
  {
    id: 13,
    path: APIs_EDIT,
    component: <ManageAPIs />,
  },
  // chargebee
  {
    id: 21,
    path: CHARGEBEE,
    component: <ChargeBee />,
  },
  {
    id: 22,
    path: CHARGEBEE_FAMILY_CREATE,
    component: <ChargeBeeManageFamily />,
  },
  {
    id: 23,
    path: CHARGEBEE_FAMILY_EDIT,
    component: <ChargeBeeManageFamily />,
  },
  {
    id: 24,
    path: CHARGEBEE_PRODUCTS_CREATE,
    component: <ChargeBeeManageProducts />,
  },
  {
    id: 25,
    path: CHARGEBEE_PRODUCTS_EDIT,
    component: <ChargeBeeManageProducts />,
  },
  {
    id: 26,
    path: CHARGEBEE_SERVICES_CREATE,
    component: <ChargeBeeManageServices />,
  },
  {
    id: 27,
    path: CHARGEBEE_SERVICES_EDIT,
    component: <ChargeBeeManageServices />,
  },
  {
    id: 28,
    path: CHARGEBEE_ADDONS_EDIT,
    component: <ChargeBeeManageAddons />,
  },
  {
    id: 29,
    path: CHARGEBEE_ADDONS_CREATE,
    component: <ChargeBeeManageAddons />,
  },
  // chargebeeBilling
  {
    id: 31,
    path: CHARGEBEE_CUSTOMERS,
    component: <ChargeBeeCustomers />,
  },
  {
    id: 32,
    path: CHARGEBEE_CUSTOMER,
    component: <ChargeBeeCustomer />,
  },

  {
    id: 33,
    path: CHARGEBEE_INVOICES,
    component: <ChargeBeeInvoices />,
  },
  {
    id: 34,
    path: CHARGEBEE_INVOICE,
    component: <ChargeBeeInvoice />,
  },
  {
    id: 35,
    path: CHARGEBEE_SUBSCRIPTIONS,
    component: <ChargeBeeSubscriptions />,
  },
  {
    id: 36,
    path: CHARGEBEE_SUBSCRIPTION,
    component: <ChargeBeeSubscription />,
  },
  // user access
  {
    id: 41,
    path: USER_ACCESS,
    component: <UserAccess />,
  },
  {
    id: 42,
    path: USER_ACCESS_SECTIONS_EDIT,
    component: <UserAccessManageSections />,
  },
  {
    id: 43,
    path: USER_ACCESS_SECTIONS_CREATE,
    component: <UserAccessManageSections />,
  },
  {
    id: 44,
    path: USER_ACCESS_PERMISSIONS_CREATE,
    component: <UserAccessManagePermissions />,
  },
  {
    id: 45,
    path: USER_ACCESS_PERMISSIONS_EDIT,
    component: <UserAccessManagePermissions />,
  },
  {
    id: 46,
    path: USER_ACCESS_ROLES_EDIT,
    component: <UserAccessManageRoles />,
  },
  {
    id: 47,
    path: USER_ACCESS_ROLES_CREATE,
    component: <UserAccessManageRoles />,
  },
];
