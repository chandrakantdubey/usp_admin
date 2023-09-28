import * as Yup from "yup";
import {
  Button,
  Column,
  Grid,
  Stack,
  TextInput,
  Form,
  Loading,
} from "@carbon/react";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { TrashCan } from "@carbon/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector, connect } from "react-redux";
import {
  generateId,
  handleError,
  handleResponse,
  navigateBack,
} from "src/utils/utils";
import Heading from "src/components/heading/Heading";
import ToastAlert from "src/components/toastAlert/ToastAlert";
import { toast } from "react-toastify";
import { fetchSingleFamily } from "src/redux/chargeBee/chargeBeeSlice";
import { CB_FAMILY } from "src/constants/apiEndpoints";
import { uspAdminApi } from "src/api/axiosApi";

const ChargeBeeManageFamily = (user_role) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = location.pathname.includes("/edit/");
  const singleFamilyData = useSelector(
    (state) => state.chargeBee.singleFamily.data
  );
  const [initialValues, setInitialValues] = useState({
    id: singleFamilyData?.id || "",
    name: singleFamilyData?.name || "",
    description: singleFamilyData?.description || "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const formResponse = await uspAdminApi.delete(CB_FAMILY, {
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
    const id = generateId(values.name);
    values = { ...values, id: id };
    let formResponse = {};
    setIsLoading(true);
    try {
      if (isEdit) {
        formResponse = await uspAdminApi.post(CB_FAMILY, {
          ...values,
          id: id,
        });
      } else {
        formResponse = await uspAdminApi.post(CB_FAMILY, values);
      }
      if (
        formResponse.status === 200 &&
        formResponse.data.status === "success"
      ) {
        toast.success(formResponse.data.response.message);
      } else if (formResponse.data.status === "failed") {
        toast.error(formResponse.data.response.message);
      }
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
      navigateBack(navigate);
    }
  };

  if (isEdit) {
    useEffect(() => {
      dispatch(fetchSingleFamily(id));
    }, [dispatch, id]);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Heading
        heading={<>{isEdit ? "Edit " : "Create "}Family</>}
        children={
          <>
            {isEdit && user_role?.user_role === 1 && (
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
                    id="description"
                    name="description"
                    type="text"
                    labelText="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter Description"
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

// export default ChargeBeeManageFamily;
const mapStateToProps = (state) => ({
  user_role: state.profile.profileData.data.user_role,
});

export default connect(mapStateToProps)(ChargeBeeManageFamily);
