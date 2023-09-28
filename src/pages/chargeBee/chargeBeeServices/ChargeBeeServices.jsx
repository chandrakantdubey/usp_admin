import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Pagination,
  Column,
  DataTableSkeleton,
  InlineNotification,
} from "@carbon/react";
import ChargeBeeDataTable from "../ChargeBeeDataTable";
import {
  CHARGEBEE_SERVICES_CREATE,
  CHARGEBEE_SERVICES_EDIT,
} from "src/routes/routes";
import SidePanel from "src/components/sidePanel/SidePanel";

const headers = [
  {
    key: "service",
    header: "Service",
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
    service: item.name,
    description: item.description,
    type: item.type,
    status: item.status,
    metered: item.metered ? "yes" : "no",
    price: `$ ${item?.service_price_info[0]?.price || "N/A"}`,
    period: `${item?.service_price_info[0]?.period || "N/A"}`,
    period_unit: `${item?.service_price_info[0]?.period_unit || "N/A"}`,
  }));
};

const ChargeBeeServices = ({ servicesData }) => {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const navigate = useNavigate();
  const redirectToEditPage = (id) => {
    navigate(CHARGEBEE_SERVICES_EDIT.replace(":id", id));
  };

  const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
  const [panelContent, setPanelContent] = useState(null);
  const openPanel = () => {
    setIsSideNavExpanded(true);
    setPanelContent(<div>This is the panel content.</div>);
  };
  const closePanel = () => {
    setIsSideNavExpanded(false);
    setPanelContent(null);
  };

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        {!servicesData.data || servicesData.loading || servicesData.error ? (
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={5}
            headers={headers}
          />
        ) : (
          <>
            <ChargeBeeDataTable
              headers={headers}
              rows={getRowItems(servicesData.data).slice(
                firstRowIndex,
                firstRowIndex + currentPageSize
              )}
              add={CHARGEBEE_SERVICES_CREATE}
              edit={redirectToEditPage}
              title="Services"
              description="The Services DataTable is a crucial resource for service-oriented products, facilitating the effective management of service offerings. Used for adding new services or updating existing ones, ensuring that service portfolio remains current and easily accessible to clients."
              openPanel={openPanel}
            />
            <Pagination
              totalItems={servicesData?.data?.length}
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

export default ChargeBeeServices;
