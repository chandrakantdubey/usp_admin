import {
  Column,
  Grid,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnalyticsData } from "src/redux/dashboard/DashboardSlice";
import socket from "src/services/socketIoService";

// highcharts import
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
import HCExportData from "highcharts/modules/export-data";
import HighChartsAccessibility from "highcharts/modules/accessibility";
import darkUnicaTheme from "highcharts/themes/dark-unica";
import greyTheme from "highcharts/themes/brand-light";

import DashboardDaily from "./DashboardDaily";
import DashboardMonthly from "./DashboardMonthly";
import DashboardWeekly from "./DashboardWeekly";
import DashboardYearly from "./DashboardYearly";
import DashboardCards from "./DashboardCards";
import WelcomeBanner from "./WelcomeBanner";

// for exporting charts
Exporting(Highcharts, {
  url: "http://localhost:4001",
});
HCExportData(Highcharts);
HighChartsAccessibility(Highcharts);

// theme switch
switch (localStorage.getItem("theme")) {
  case "white":
    greyTheme(Highcharts);
    break;
  case "g90":
    darkUnicaTheme(Highcharts);
    break;
  case "g100":
    greyTheme(Highcharts);
    break;
  default:
    greyTheme(Highcharts);
    break;
}

const Dashboard = () => {
  const [activeUsers, setActiveUsers] = useState({
    userCount: 0,
    users: [],
    activityTable: { dates: [], userCounts: 0 },
    osInfo: {
      totalRam: 0,
      availableMemory: 0,
    },
  });
  socket.on("connect", () => {
    socket.emit("admin_data_request");
  });
  socket.on("admin_data_received", (data) => {
    setActiveUsers(data);
  });

  const { data } = useSelector((state) => state.dashboard.dashboardData);

  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("admin_data_request");
    dispatch(getAnalyticsData());
  }, []);

  return (
    <React.Fragment>
      <Grid>
        <WelcomeBanner userName={"Admin"} />
        <DashboardCards />
        <Column lg={16} md={8} span={4}>
          <Tabs>
            <TabList aria-label="List of tabs">
              <Tab>Daily</Tab>
              <Tab disabled>Weekly</Tab>
              <Tab disabled>Monthly</Tab>
              <Tab disabled>Yearly</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DashboardDaily activeUsers={activeUsers} />
              </TabPanel>
              <TabPanel>
                <DashboardWeekly />
              </TabPanel>
              <TabPanel>
                <DashboardMonthly />
              </TabPanel>
              <TabPanel>
                <DashboardYearly />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Column>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
