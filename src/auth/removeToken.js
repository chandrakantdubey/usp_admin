import { removeItem } from "src/services/localStorageService";

export const removeToken = () => {
  removeItem("loggedIn");
  window.location.replace(`http://${window.location.host}/login`);
};
