import { getItem } from "src/services/localStorageService";

export const getToken = () => {
  return getItem("loggedIn") || "";
};
