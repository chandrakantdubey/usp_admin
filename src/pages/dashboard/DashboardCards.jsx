import { Grid, Column, Tile } from "@carbon/react";

const DashboardCards = () => {
  return (
    <Column lg={16} md={8} span={4}>
      <Grid>
        <Column lg={4} md={4} span={4}>
          <Tile id="tile-1" className="margin-bottom dashboard-tile">
            Total payment recieved
            <br />
            <h4>$345000</h4>
          </Tile>
        </Column>
        <Column lg={4} md={4} span={4}>
          <Tile id="tile-2" className="margin-bottom dashboard-tile">
            New invoices
            <br />
            <h4 className="">340</h4>
          </Tile>
        </Column>
        <Column lg={4} md={4} span={4}>
          <Tile id="tile-3" className="margin-bottom dashboard-tile">
            Unpaid invoices
            <br />
            <h4>340</h4>
          </Tile>
        </Column>
        <Column lg={4} md={4} span={4}>
          <Tile id="tile-4" className="margin-bottom dashboard-tile">
            Total refunds
            <br />
            <h4>$500</h4>
          </Tile>
        </Column>
      </Grid>
    </Column>
  );
};

export default DashboardCards;
