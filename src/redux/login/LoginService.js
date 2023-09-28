import { LOGIN_API } from "src/constants/apiEndpoints";
import { setItem } from "src/services/localStorageService";
import { SOMETHING_WENT_WRONG } from "src/constants/errorMessages";
import { getErrorMessageAndCode } from "src/services/helperService";
import { notificationApi } from "src/api/axiosApi";

const loginWithCred = async (creadPayload) => {
  try {
    const response = await notificationApi.post(LOGIN_API, creadPayload);
    setItem("loggedIn", "true");
    return response;
  } catch (err) {
    const { code, message } = getErrorMessageAndCode(err);
    const error = JSON.stringify({
      type: "error",
      message: message || SOMETHING_WENT_WRONG,
    });
    throw Error(error);
  }
};

const LoginService = { loginWithCred };

export default LoginService;
