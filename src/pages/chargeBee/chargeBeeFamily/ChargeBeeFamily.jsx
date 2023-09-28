import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Column, DataTableSkeleton } from "@carbon/react";
import ChargeBeeDataTable from "../ChargeBeeDataTable";
import {
  CHARGEBEE_FAMILY_CREATE,
  CHARGEBEE_FAMILY_EDIT,
} from "src/routes/routes";
import SidePanel from "src/components/sidePanel/SidePanel";

const headers = [
  {
    key: "id",
    header: "Id",
  },
  {
    key: "family",
    header: "Family",
  },
  {
    key: "description",
    header: "Description",
  },
];
const getRowItems = (data) => {
  return data.map((item) => ({
    id: item.id.toString(),
    family: item.name,
    description: item.description,
    status: item.status,
  }));
};

const ChargeBeeFamily = ({ familyData }) => {
  const navigate = useNavigate();
  const redirectToEditPage = (id) => {
    navigate(CHARGEBEE_FAMILY_EDIT.replace(":id", id));
  };

  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [panelContent, setPanelContent] = useState(null);
  const openPanel = () => {
    setIsSideNavExpanded(true);
    setPanelContent(<div>Default configuration for family goes here.</div>);
  };
  const closePanel = () => {
    setIsSideNavExpanded(false);
    setPanelContent(null);
  };

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        {!familyData.data || familyData.loading || familyData.error ? (
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={5}
            headers={headers}
          />
        ) : (
          <>
            <ChargeBeeDataTable
              headers={headers}
              rows={getRowItems(familyData.data) || []}
              // add={CHARGEBEE_FAMILY_CREATE}
              // edit={redirectToEditPage}
              title="Family"
              description="The table lists the family of products and services offered to the customer."
              // openPanel={openPanel}
            />
            <SidePanel
              isSideNavExpanded={isSideNavExpanded}
              closePanel={closePanel}
              panelContent={panelContent}
            />
          </>
        )}
      </Column>
    </Grid>
  );
};

export default ChargeBeeFamily;
