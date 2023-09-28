import { toast } from "react-toastify";

export const handleResponse = (formResponse, navigate) => {
  if (formResponse.data.status === "success") {
    toast.success(formResponse.data.message);
  } else if (formResponse.data.status === "failed") {
    toast.error(formResponse.data.message);
  }
};

export const handleError = (error, navigate) => {
  toast.error("Form submission error: " + error.message);
};

export const navigateBack = (navigate) => {
  setTimeout(() => {
    navigate(-1);
  }, 4000);
};

export const generateId = (item) => {
  return item.replace(/\s+/g, "_");
};

export const redirectToEditPage = (path) => {
  navigate(path);
};

export const getFormattedDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export const rowsWithIds = (rows) => {
  rows.map((row, index) => ({
    ...row,
    id: row.id.toString(),
  }));
};
