export const DEBOUNCE_TIME = 500;
export const ROW_PER_PAGE_OPTIONS = [5, 10, 25, 50, 75, 100];
export const DEFAULT_ROW_PER_PAGE = 10;
export const STATUS_OPTIONS = [
  { id: 1, status: true, heading: "Make Active" },
  { id: 2, status: false, heading: "Make Inactive" },
];
export const FILE_SIZE = 2000000;

export const USER_ROLES = {
  1: "Super Admin",
  2: "Admin",
};
export const SETTINGS_NAME = "Settings";
export const dateFormat = "dddd , MMMM - Do - YYYY (hh:mm) A";
export const dateFormatShort = "MMMM-DD-YYYY";

export const period_units = [
  { id: "month", label: "month" },
  { id: "year", label: "year" },
];
export const period_year = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
];
export const period_month = [
  { id: "1", label: "1" },
  { id: "3", label: "3" },
  { id: "6", label: "6" },
];
export const ps_type = [
  { id: "metered", label: "metered" },
  { id: "non-metered", label: "non-metered" },
];
export const permission = [
  { id: "1", label: "read" },
  { id: "2", label: "read+write" },
];
