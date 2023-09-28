import * as Yup from "yup";
import {
  Button,
  Column,
  Grid,
  Stack,
  TextInput,
  Form,
  Dropdown,
  NumberInput,
  FileUploader,
  Loading,
} from "@carbon/react";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { TrashCan } from "@carbon/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import { useDispatch, useSelector, connect } from "react-redux";
import { toast } from "react-toastify";
import {
  generateId,
  handleError,
  handleResponse,
  navigateBack,
} from "src/utils/utils";
import { uspAdminApi } from "src/api/axiosApi";
import Heading from "src/components/heading/Heading";
import ToastAlert from "src/components/toastAlert/ToastAlert";
import {
  period_units,
  period_month,
  period_year,
  ps_type,
} from "src/constants/constants";
import { fetchAddon, fetchFamily } from "src/redux/chargeBee/chargeBeeSlice";
import { CB_ADDONS, CB_ADDONS_IMAGE } from "src/constants/apiEndpoints";

const getFamilyId = (data) => {
  return data.map((item) => ({
    id: item.int_id,
    label: item.id,
  }));
};

const ChargeBeeManageAddons = (user_role) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = location.pathname.includes("/edit/");
  const {
    data: addonData,
    error,
    loading,
  } = useSelector((state) => state.chargeBee.addon.data);
  const familyData = useSelector((state) => state.chargeBee.family.data);
  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    description: "",
    type: "addon",
    addon_type: "",
    item_family_id: "",
    price_in_decimal: 0.0,
    period_unit: "",
    period: "",
    file: null,
  });

  const [imageSrc, setImageSrc] = useState(
    initialValues?.file ? URL.createObjectURL(initialValues.file) : null
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price_in_decimal: Yup.number()
      .required("Price is required in decimal format")
      .min(0, "Price must be greater than or equal to 0"),
  });

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const formResponse = await uspAdminApi.delete(CB_ADDONS, {
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
        formResponse = await uspAdminApi.put(CB_ADDONS, {
          ...values,
          id: id,
        });
      } else {
        const id = generateId(values.name);
        const numPeriod = Number(values.period);
        values = { ...values, id: id, period: numPeriod };
        formResponse = await uspAdminApi.post(CB_ADDONS, values);
      }
      if (
        formResponse.status === 200 &&
        formResponse.data.status === "success"
      ) {
        if (values.file) {
          const formData = new FormData();
          formData.append("img", values.file);
          formData.append("id", formResponse?.data?.response?.item?.id);
          const imageResponse = await uspAdminApi.post(
            CB_ADDONS_IMAGE,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (
            imageResponse?.status === 200 &&
            imageResponse?.data?.status === "success"
          ) {
            toast.success(
              formResponse.data.response.message + imageResponse?.data?.message
            );
          } else {
            toast.error(
              formResponse.data.response.message +
                "Image upload failed" +
                imageResponse?.message
            );
          }
        }
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

  const fetchAddonImage = async (id) => {
    try {
      const response = await uspAdminApi.get(CB_ADDONS_IMAGE, {
        params: {
          id: id,
        },
        responseType: "arraybuffer",
      });
      if (response.status === 200) {
        const base64Image = arrayBufferToBase64(response.data);
        setImageSrc(`data:image/jpeg;base64,${base64Image}`);
      } else {
        setImageSrc(null);
        toast.error("Failed to load image");
      }
    } catch (error) {
      setImageSrc(null);
    }
  };

  const arrayBufferToBase64 = (arrayBuffer) => {
    let binary = "";
    const bytes = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(fetchAddon(id));
      fetchAddonImage(id);
    }
    dispatch(fetchFamily());
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (addonData?.response) {
      setInitialValues({
        id: addonData?.response?.addon_id || "",
        name: addonData?.response?.addon_name || "",
        description: addonData?.response?.description || "",
        type: "addon",
        addon_type: addonData?.response?.addon_type || "",
        item_family_id: "",
        price_in_decimal: addonData?.response?.price?.[id]?.[0] || 0.0,
        period_unit: addonData?.response?.period_unit || null,
        period: addonData?.response?.period || null,
        file: null,
      });
    }
  }, [addonData, id]);

  console.log(addonData);

  return (
    <>
      {isLoading && <Loading />}
      <Heading
        heading={<>{isEdit ? "Edit " : "Create "}Addon</>}
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
          {isEdit && loading ? (
            <Loading />
          ) : (
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
                    <Dropdown
                      id="family"
                      label="Item Family"
                      name="item_family_id"
                      titleText="Item Family"
                      value={values.item_family_id}
                      onChange={(e) => {
                        setFieldValue("item_family_id", e.selectedItem.label);
                      }}
                      selectedItem={values.item_family_id}
                      items={getFamilyId(familyData)}
                    />
                    <Dropdown
                      id="period_unit"
                      label="Period Unit"
                      name="period_unit"
                      titleText="Period Unit"
                      value={values.period_unit}
                      onChange={(e) => {
                        setFieldValue("period_unit", e.selectedItem.label);
                        setFieldValue("period", "");
                      }}
                      selectedItem={values.period_unit}
                      items={period_units}
                    />
                    {values.period_unit === "year" && (
                      <Dropdown
                        id="period"
                        name="period"
                        titleText="Year Value"
                        label="Select Year Value"
                        value={values.period}
                        onChange={(e) =>
                          setFieldValue("period", e.selectedItem.label)
                        }
                        items={period_year}
                        selectedItem={values.period}
                      />
                    )}
                    {values.period_unit === "month" && (
                      <Dropdown
                        id="period"
                        name="period"
                        titleText="Period in month"
                        label="Period in month"
                        value={values.period}
                        onChange={(e) => {
                          setFieldValue("period", e.selectedItem.label);
                        }}
                        items={period_month}
                        selectedItem={values.period}
                      />
                    )}
                    <NumberInput
                      id="price_in_decimal"
                      name="price_in_decimal"
                      min={0}
                      step={0.01}
                      label="Price in decimal"
                      value={values.price_in_decimal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Dropdown
                      id="addon_type"
                      name="addon_type"
                      titleText="Addon Type"
                      label="Select product type"
                      value={values.addon_type}
                      onChange={(e) => {
                        setFieldValue("addon_type", e.selectedItem.label);
                      }}
                      items={ps_type}
                      selectedItem={values.addon_type}
                    />
                    <FileUploader
                      accept={[".jpg", ".png", ".jpeg", "gif"]}
                      buttonLabel="Add file"
                      filenameStatus="edit"
                      iconDescription="Delete file"
                      labelDescription="Max file size is 500kb. Only .jpg & .png files are supported."
                      labelTitle="Upload files"
                      multiple={false}
                      size="md"
                      onChange={(event) => {
                        const uploadedFile = event?.currentTarget?.files[0];
                        setFieldValue("file", uploadedFile);
                        setImageSrc(URL.createObjectURL(uploadedFile)); // Update the imageSrc with the newly selected file
                      }}
                      onDelete={(event) => {
                        setImageSrc(null);
                      }}
                    />
                    {imageSrc && (
                      <img
                        src={imageSrc}
                        alt="Addon"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    )}
                    <Button type="submit" disabled={isSubmitting || !isValid}>
                      Submit
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </Column>
      </Grid>
      <ToastAlert />
    </>
  );
};
// export default ChargeBeeManageAddons;
const mapStateToProps = (state) => ({
  user_role: state.profile.profileData.data.user_role,
});

export default connect(mapStateToProps)(ChargeBeeManageAddons);
