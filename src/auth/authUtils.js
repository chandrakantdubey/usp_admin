import { notificationApi } from "src/API/axiosApi";
import { removeToken } from "./removeToken";
export const logUserOut = async () => {
  try {
    await notificationApi.post("/logout");
  } catch (err) {
    console.log(err);
  } finally {
    removeToken();
    window.location.replace("/login");
  }
};
