import {
  Button,
  Column,
  Grid,
  Stack,
  TextInput,
  Form,
  Dropdown,
  Loading,
} from "@carbon/react";
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { TrashCan } from "@carbon/icons-react";
import * as Yup from "yup";
import Heading from "src/components/heading/Heading";
import { API_ROLES } from "src/constants/apiEndpoints";
import { fetchRole } from "src/redux/userAccess/userAccessSlice";
import { uspAdminApi } from "src/api/axiosApi";
import ToastAlert from "src/components/toastAlert/ToastAlert";
import { handleError, handleResponse } from "src/utils/utils";
import { permission } from "src/constants/constants";

const ManageAPIs = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEdit = location.pathname.includes("/edit/");
  const apiData = useSelector((state) => state.apis.role);
  const [isLoading, setIsLoading] = useState(false);
  const [inititialValues, setInitialValues] = useState({
    role: apiData.role || "",
    api_endpoint: apiData.api_endpoint || "",
    permission: apiData.permission || "",
    // roles: [],
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const formResponse = await uspAdminApi.delete(API_ROLES, {
        data: {
          id: id,
        },
      });
      handleResponse(formResponse, navigate);
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (values, setSubmitting) => {
    setIsLoading(true);
    let formResponse = {};
    console.log(values);
    try {
      if (isEdit) {
        formResponse = await uspAdminApi.put(API_ROLES, { ...values, id: id });
      } else {
        formResponse = await uspAdminApi.post(API_ROLES, values);
      }
      console.log(formResponse);
      handleResponse(formResponse, navigate);
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    api_endpoint: Yup.string()
      .trim()
      .matches(
        /^\/[a-zA-Z0-9_\-\/]+$/,
        "Invalid API path. It should start with a forward slash (/) and can contain alphanumeric characters, underscores, dashes, and additional slashes."
      )
      .required("API path is required."),
    role: Yup.string().required("Role is required"),
    permission: Yup.string().required("Permission is required"),
    // roles: Yup.array().min(1, "At least one item must be selected."),
  });

  if (isEdit) {
    useEffect(() => {
      dispatch(fetchRole(id));
    }, [dispatch]);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Heading
        heading={<>{isEdit ? "Edit " : "Add "}APIs</>}
        children={
          <>
            {isEdit && (
              <Button
                kind="danger"
                onClick={handleDelete}
                renderIcon={TrashCan}
              >
                Delete
              </Button>
            )}
          </>
        }
      />
      <Grid>
        <Column lg={12} md={8} span={16}>
          <Formik
            enableReinitialize
            initialValues={inititialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await handleFormSubmit(values, setSubmitting);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              status,
              isValid,
              setFieldTouched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack gap={7}>
                  <TextInput
                    labelText="Role"
                    type="text"
                    placeholder="Role"
                    name="role"
                    id="role"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.role}
                    invalid={errors.role && touched.role}
                    invalidText={errors.role}
                  />

                  <TextInput
                    labelText="Path"
                    type="text"
                    placeholder="Path"
                    name="api_endpoint"
                    id="api_endpoint"
                    helperText="Pattern - /path/subpath"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.api_endpoint}
                    invalid={errors.api_endpoint && touched.api_endpoint}
                    invalidText={errors.api_endpoint}
                  />
                  {/* <MultiSelect
                    label="Roles"
                    id="roles"
                    titleText="Roles"
                    onChange={(e) => setFieldValue("roles", e.selectedItems)}
                    selectedItems={values.roles}
                    items={items}
                    itemToString={(item) => (item ? item.text : "")}
                    invalid={errors.roles && touched.roles}
                    invalidText={errors.roles}
                    onMenuChange={(e) => {
                      setFieldTouched("roles", true);
                    }}
                  /> */}
                  <Dropdown
                    id="permission"
                    name="permission"
                    label="Select Permission"
                    titleText="Permission"
                    value={values.permission}
                    onChange={(e) => {
                      setFieldValue("permission", e.selectedItem.label);
                    }}
                    selectedItem={values.permission}
                    items={permission}
                  />
                  <Button type="submit" disabled={isSubmitting || !isValid}>
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Column>
      </Grid>
      <ToastAlert />
    </>
  );
};

export default ManageAPIs;
