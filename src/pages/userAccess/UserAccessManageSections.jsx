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
import { fetchSection } from "src/redux/userAccess/userAccessSlice";
import { UA_SECTION } from "src/constants/apiEndpoints";

const UserAccessManageSections = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isEdit = location.pathname.includes("/edit/");
  const sectionData = useSelector((state) => state.userAccess.section.data);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: sectionData.name || "",
    role: sectionData.role || "",
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const formResponse = await uspAdminApi.delete(UA_SECTION, {
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
        formResponse = await uspAdminApi.put(UA_SECTION, {
          ...values,
          id: id,
        });
      } else {
        formResponse = await uspAdminApi.post(UA_SECTION, values);
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
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
  });

  if (isEdit) {
    useEffect(() => {
      dispatch(fetchSection(id));
    });
  }

  return (
    <>
      {isLoading && <Loading />}
      <Heading
        heading={<>{isEdit ? "Edit " : "Create "}Section</>}
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
              setSubmitting(false);
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
              setFieldValue,
              setFieldTouched,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    labelText="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.name && touched.name}
                    invalidText={touched.name && errors.name}
                    placeholder="Enter Name"
                  />
                  <TextInput
                    id="role"
                    name="role"
                    type="text"
                    labelText="Role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={errors.role && touched.role}
                    invalidText={touched.role && errors.role}
                    placeholder="Enter role"
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

export default UserAccessManageSections;
