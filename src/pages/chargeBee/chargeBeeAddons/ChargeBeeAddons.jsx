import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Pagination, Column, DataTableSkeleton } from "@carbon/react";
import ChargeBeeDataTable from "../ChargeBeeDataTable";
import {
  CHARGEBEE_ADDONS_CREATE,
  CHARGEBEE_ADDONS_EDIT,
} from "src/routes/routes";
import SidePanel from "src/components/sidePanel/SidePanel";

const headers = [
  {
    key: "addons",
    header: "Addons",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "type",
    header: "Type",
  },
  {
    key: "metered",
    header: "Metered",
  },
  {
    key: "price",
    header: "Price",
  },
  {
    key: "period",
    header: "Period",
  },
  {
    key: "period_unit",
    header: "Period Unit",
  },
];

const getRowItems = (data) => {
  return data.map((item) => ({
    id: item.id,
    addons: item.name,
    description: item.description,
    type: item.type,
    status: item.status,
    metered: item.metered ? "yes" : "no",
    price: `$ ${item?.addon_price_info[0]?.price || "N/A"}` || 0,
    period: `${item?.addon_price_info[0]?.period || "N/A"}` || 0,
    period_unit: `${item?.addon_price_info[0]?.period_unit || "N/A"}` || 0,
  }));
};

const ChargeBeeAddons = ({ addonsData }) => {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const navigate = useNavigate();
  const redirectToEditPage = (id) => {
    navigate(CHARGEBEE_ADDONS_EDIT.replace(":id", id));
  };

  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [panelContent, setPanelContent] = useState(null);
  const openPanel = () => {
    setIsSideNavExpanded(true);
    setPanelContent(<div>Default Configuration for Addons</div>);
  };
  const closePanel = () => {
    setIsSideNavExpanded(false);
    setPanelContent(null);
  };

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        {!addonsData.data || addonsData.error || addonsData.loading ? (
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={5}
            headers={headers}
          />
        ) : (
          <>
            <ChargeBeeDataTable
              headers={headers}
              rows={
                getRowItems(addonsData.data).slice(
                  firstRowIndex,
                  firstRowIndex + currentPageSize
                ) || []
              }
              add={CHARGEBEE_ADDONS_CREATE}
              edit={redirectToEditPage}
              title="Addons"
              description="The Addons DataTable is a powerful resource to offer additional products or services. The user-friendly interface is designed for managing addons efficiently, whether you're adding new options or updating existing ones. Simplify your product and service customization and enhance customer experiences."
              openPanel={openPanel}
            />
            <Pagination
              totalItems={addonsData?.data?.length}
              backwardText="Previous page"
              forwardText="Next page"
              pageSize={currentPageSize}
              pageSizes={[5, 10, 15, 25]}
              itemsPerPageText="Items per page"
              onChange={({ page, pageSize }) => {
                if (pageSize !== currentPageSize) {
                  setCurrentPageSize(pageSize);
                }
                setFirstRowIndex(pageSize * (page - 1));
              }}
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

export default ChargeBeeAddons;
