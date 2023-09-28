import React, { useState, useEffect } from "react";
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
  CHARGEBEE_PRODUCTS_CREATE,
  CHARGEBEE_PRODUCTS_EDIT,
} from "src/routes/routes";
import SidePanel from "src/components/sidePanel/SidePanel";

const headers = [
  {
    key: "product",
    header: "Product",
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
    product: item.name,
    description: item.description,
    type: item.type,
    status: item.status,
    metered: item.metered ? "yes" : "no",
    price: `$ ${item?.product_price_info[0]?.price || "N/A"}`,
    period: `${item?.product_price_info[0]?.period || "N/A"}`,
    period_unit: `${item?.product_price_info[0]?.period_unit || "N/A"}`,
  }));
};

const ChargeBeeProducts = ({ productsData }) => {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const navigate = useNavigate();
  const redirectToEditPage = (id) => {
    navigate(CHARGEBEE_PRODUCTS_EDIT.replace(":id", id));
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
        {!productsData.data || productsData.error || productsData.loading ? (
          <DataTableSkeleton
            columnCount={headers.length + 1}
            rowCount={5}
            headers={headers}
          />
        ) : (
          <>
            <ChargeBeeDataTable
              headers={headers}
              rows={getRowItems(productsData.data).slice(
                firstRowIndex,
                firstRowIndex + currentPageSize
              )}
              add={CHARGEBEE_PRODUCTS_CREATE}
              edit={redirectToEditPage}
              title="Products"
              description="The Products DataTable serves as a foundational component for businesses, enabling efficient management of product catalog. It offers a user-friendly interface for adding new products or updating existing ones, ensuring that your product offerings are up-to-date and accessible."
              openPanel={openPanel}
            />
            <Pagination
              totalItems={productsData?.data?.length}
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

export default ChargeBeeProducts;
