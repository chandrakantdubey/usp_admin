import {
  Button,
  Column,
  Grid,
  Stack,
  TextInput,
  Form,
  Loading,
} from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { uspAdminApi } from "src/api/axiosApi";
import Heading from "src/components/heading/Heading";
import ToastAlert from "src/components/toastAlert/ToastAlert";
import { handleError, handleResponse } from "src/utils/utils";
import { fetchPermission } from "src/redux/userAccess/userAccessSlice";
import { UA_PERMISSIONS } from "src/constants/apiEndpoints";

const UserAccessManagePermissions = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEdit = location.pathname.includes("/edit/");
  const permissionData = useSelector(
    (state) => state.userAccess.permission.data
  );
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    permission: permissionData?.data || "",
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const formResponse = await uspAdminApi.delete(UA_PERMISSIONS, {
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
    try {
      if (isEdit) {
        formResponse = await uspAdminApi.put(UA_PERMISSIONS, {
          ...values,
          id: id,
        });
      } else {
        formResponse = await uspAdminApi.post(UA_PERMISSIONS, values);
      }
      handleResponse(formResponse, navigate);
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    permission: Yup.string().required("Name is required"),
  });

  if (isEdit) {
    useEffect(() => {
      dispatch(fetchPermission(id));
    }, [dispatch, id]);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Heading
        heading={<>{isEdit ? "Edit " : "Create "}Permission</>}
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              await handleFormSubmit(values, setSubmitting);
            }}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              isValid,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                  <TextInput
                    id="permission"
                    name="permission"
                    type="text"
                    labelText="Permission"
                    value={values.permission}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.permission && touched.permission}
                    invalidText={touched.permission && errors.permission}
                    placeholder="Enter Permission"
                  />
                  <Button type="submit" disabled={isSubmitting || !isValid}>
                    {isEdit ? "Update" : "Submit"}
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

export default UserAccessManagePermissions;
