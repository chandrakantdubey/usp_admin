import { Grid, Column } from "@carbon/react";
import SubscriptionTrendsChart from "src/components/charts/SubscriptionTrendsChart";
import TopProductsChart from "src/components/charts/TopProductsChart";
import AddonsUtilisationChart from "src/components/charts/AddonsUtilisationChart";
import MeteredNonMeteredProductsChart from "src/components/charts/MeteredNonMeteredProductsChart";

const DashboardYearly = () => {
  return (
    <Grid>
      <Column
        max={16}
        lg={{ span: 8 }}
        md={{ span: 4 }}
        sm={{ span: 4 }}
        className="margin-bottom morphed"
      >
        <SubscriptionTrendsChart />
      </Column>
      <Column
        max={16}
        lg={{ span: 8 }}
        md={{ span: 4 }}
        sm={{ span: 4 }}
        className="margin-bottom morphed"
      >
        <TopProductsChart />
      </Column>
      <Column
        max={16}
        lg={{ span: 8 }}
        md={{ span: 4 }}
        sm={{ span: 4 }}
        className="margin-bottom morphed"
      >
        <AddonsUtilisationChart />
      </Column>
      <Column
        max={16}
        lg={{ span: 8 }}
        md={{ span: 4 }}
        sm={{ span: 4 }}
        className="margin-bottom morphed"
      >
        <MeteredNonMeteredProductsChart />
      </Column>
    </Grid>
  );
};

export default DashboardYearly;
