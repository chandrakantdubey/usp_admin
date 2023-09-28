import { Column, Grid, DataTableSkeleton } from "@carbon/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoles,
  fetchSections,
  fetchPermissions,
} from "src/redux/userAccess/userAccessSlice";
import UserAccessDataTable from "./UserAccessDataTable";
import {
  USER_ACCESS_PERMISSIONS_CREATE,
  USER_ACCESS_PERMISSIONS_EDIT,
  USER_ACCESS_ROLES_CREATE,
  USER_ACCESS_ROLES_EDIT,
  USER_ACCESS_SECTIONS_CREATE,
  USER_ACCESS_SECTIONS_EDIT,
} from "src/routes/routes";
import Heading from "src/components/heading/Heading";

const rolesHeaders = [
  { key: "id", header: "Id." },
  { key: "name", header: "Role" },
];
const sectionsHeaders = [
  { key: "id", header: "Id." },
  { key: "sectionName", header: "Section" },
  { key: "role", header: "Roles" },
];
const permissionsHeaders = [
  { key: "id", header: "Id." },
  { key: "permission", header: "Permissions" },
];

const UserAccess = () => {
  const dispatch = useDispatch();
  const {
    data: rolesData,
    error: rolesError,
    loading: rolesLoading,
  } = useSelector((state) => state.userAccess.roles);
  const {
    data: sectionsData,
    error: sectionsError,
    loading: sectionsLoading,
  } = useSelector((state) => state.userAccess.sections);
  const {
    data: permissionsData,
    error: permissionsError,
    loading: permissionsLoading,
  } = useSelector((state) => state.userAccess.permissions);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchSections());
    dispatch(fetchPermissions());
    console.log(permissionsData, permissionsError);
  }, [dispatch]);
  return (
    <>
      <Heading heading={"User Access"} />
      <Grid>
        <Column lg={16} md={8} sm={4}>
          {!rolesData || rolesLoading || rolesError ? (
            <DataTableSkeleton
              columnCount={rolesHeaders.length + 1}
              rowCount={5}
              headers={rolesHeaders}
            />
          ) : (
            <UserAccessDataTable
              title="User Access Roles"
              rows={rolesData.data || []}
              headers={rolesHeaders}
              edit={USER_ACCESS_ROLES_EDIT}
              add={USER_ACCESS_ROLES_CREATE}
            />
          )}
        </Column>
      </Grid>
      <br />
      <br />
      <Grid>
        <Column lg={16} md={8} sm={4}>
          {!sectionsData || sectionsError || sectionsLoading ? (
            <DataTableSkeleton
              columnCount={sectionsHeaders.length + 1}
              rowCount={5}
              headers={sectionsHeaders}
            />
          ) : (
            <UserAccessDataTable
              title="User Access Sections"
              rows={sectionsData?.data || []}
              headers={sectionsHeaders}
              edit={USER_ACCESS_SECTIONS_EDIT}
              add={USER_ACCESS_SECTIONS_CREATE}
            />
          )}
        </Column>
      </Grid>
      <br />
      <br />
      <Grid>
        <Column lg={16} md={8} sm={4}>
          {!permissionsData || permissionsLoading || permissionsError ? (
            <DataTableSkeleton
              columnCount={permissionsHeaders.length + 1}
              rowCount={5}
              headers={permissionsHeaders}
            />
          ) : (
            <UserAccessDataTable
              title="User Permissions"
              rows={permissionsData?.data || []}
              headers={permissionsHeaders}
              edit={USER_ACCESS_PERMISSIONS_EDIT}
              add={USER_ACCESS_PERMISSIONS_CREATE}
            />
          )}
        </Column>
      </Grid>
    </>
  );
};

export default UserAccess;
