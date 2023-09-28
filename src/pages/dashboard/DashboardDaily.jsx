import { Grid, Column } from "@carbon/react";
import SubscriptionTrendsChart from "src/components/charts/SubscriptionTrendsChart";
import TopProductsChart from "src/components/charts/TopProductsChart";
import AddonsUtilisationChart from "src/components/charts/AddonsUtilisationChart";
import MeteredNonMeteredProductsChart from "src/components/charts/MeteredNonMeteredProductsChart";
import RamGauge from "src/components/charts/RamGauge";
import UserActivityChart from "src/components/charts/UserActivityChart";

const DashboardDaily = ({ activeUsers }) => {
  return (
    <Grid>
      <Column max={16} lg={8} md={4} sm={4} className="margin-bottom morphed">
        <SubscriptionTrendsChart />
      </Column>
      <Column max={16} lg={8} md={4} sm={4} className="margin-bottom morphed">
        <TopProductsChart />
      </Column>
      <Column max={16} lg={8} md={4} sm={4} className="margin-bottom morphed">
        <AddonsUtilisationChart />
      </Column>
      <Column max={16} lg={8} md={4} sm={4} className="margin-bottom morphed">
        <MeteredNonMeteredProductsChart />
      </Column>
      <Column max={16} lg={8} md={4} span={4} className="margin-bottom morphed">
        <RamGauge
          availableRam={activeUsers.osInfo.availableMemory}
          totalRam={activeUsers.osInfo.totalRam}
        />
      </Column>
      <Column max={16} lg={8} md={4} span={4} className="margin-bottom morphed">
        <UserActivityChart activeUsers={activeUsers} />
      </Column>
    </Grid>
  );
};

export default DashboardDaily;
