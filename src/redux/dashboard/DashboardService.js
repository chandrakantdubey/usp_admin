// import { GET_ANALYTICS } from "src/constants/apiEndpoints";
import { GET_ANALYTICS } from "src/constants/apiEndpoints";
import { SOMETHING_WENT_WRONG } from "src/constants/errorMessages";
import { getErrorMessageAndCode } from "src/services/helperService";
import { notificationApi } from "src/api/axiosApi";

const getAnayticsData = async () => {
  try {
    const response = await notificationApi.get(GET_ANALYTICS);
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

const LoginService = { getAnayticsData };

export default LoginService;
