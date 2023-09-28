import { useEffect, useState } from "react";
import { Grid, Pagination, Column, DataTableSkeleton } from "@carbon/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "src/redux/chargeBeeBilling/chargeBeeBillingSlice";
import Heading from "src/components/heading/Heading";
import { getFormattedDate } from "src/utils/utils";
import ChargeBeeBillingDataTable from "../ChargeBeeBillingDataTable";

const headers = [
  {
    key: "account_id",
    header: "Account Id",
  },
  {
    key: "fullName",
    header: "Name",
  },
  {
    key: "createdAt",
    header: "Created At",
  },
  {
    key: "companyName",
    header: "Company",
  },
];
const getRowItems = (data) => {
  return data.map((row) => ({
    id: row.id.toString(),
    account_id: row.account_id,
    fullName: row.fullName,
    createdAt: getFormattedDate(row.signup_time),
    companyName: row.companyName,
  }));
};

const ChargeBeeSubscriptions = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const { data, error, loading } = useSelector(
    (state) => state.chargeBeeBilling.customers
  );

  const handlePageChange = (pageData) => {
    let filter = {
      // skip: (pageData?.page - 1) * pageData?.pageSize || 0,
      skip: pageData?.page,
      limit: pageData?.pageSize || 10,
      keyword,
    };
    dispatch(fetchCustomers(filter));
  };
  useEffect(() => {
    let filter = {
      skip: 1,
      limit: 10,
      keyword,
    };
    dispatch(fetchCustomers(filter));
  }, [dispatch]);

  return (
    <>
      <Heading heading={"Subscriptions"} />
      <>
        {!data && error && loading ? (
          <Grid>
            <Column lg={16} md={8} sm={4}>
              <DataTableSkeleton
                columnCount={headers.length + 1}
                rowCount={5}
                headers={headers}
              />
            </Column>
          </Grid>
        ) : (
          <Grid>
            <Column lg={16} md={8} sm={4}>
              <ChargeBeeBillingDataTable
                headers={headers}
                rows={getRowItems(data?.users_list || [])}
                add={false}
                edit={false}
                title="Subscriptions"
              />
              <Pagination
                totalItems={data?.user_count}
                pageSizes={[10, 15, 25]}
                onChange={(pageData) => handlePageChange(pageData)}
              />
            </Column>
          </Grid>
        )}
      </>
    </>
  );
};

export default ChargeBeeSubscriptions;
