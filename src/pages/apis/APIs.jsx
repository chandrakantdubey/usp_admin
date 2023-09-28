import { Grid, Column, DataTableSkeleton } from "@carbon/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APIs_ADD, APIs_EDIT } from "src/routes/routes";
import Heading from "src/components/heading/Heading";
import { fetchApis } from "src/redux/apis/apisSlice";
import APIsDataTable from "./APIsDataTable";

const apisHeaders = [
  { key: "id", header: "Id." },
  { key: "role", header: "Name" },
  { key: "api_endpoint", header: "Path" },
  { key: "permission", header: "Roles" },
];

const APIs = () => {
  const dispatch = useDispatch();
  const {
    data: apisData,
    error: apisError,
    loading: apisLoading,
  } = useSelector((state) => state.apis.roles);
  useEffect(() => {
    dispatch(fetchApis());
  }, [dispatch]);
  return (
    <>
      <Heading heading={"APIs"} />
      <Grid>
        <Column lg={16} md={8} sm={4}>
          {!apisData || apisLoading || apisError ? (
            <DataTableSkeleton
              columnCount={apisHeaders.length + 1}
              rowCount={5}
              headers={apisHeaders}
            />
          ) : (
            <APIsDataTable
              title="User APIS"
              rows={apisData.data || []}
              headers={apisHeaders}
              edit={APIs_EDIT}
              add={APIs_ADD}
              description="The API Access Control DataTable empowers developers and administrators with a comprehensive and user-friendly interface to manage API access roles efficiently. Whether you need to update permissions for a single API or multiple endpoints, the DataTable offers a seamless and intuitive solution to keep your application secure and access permissions up-to-date. Simplify your access control management and maintain a strong security posture with this indispensable tool."
            />
          )}
        </Column>
      </Grid>
    </>
  );
};

export default APIs;
