import { PROFILE_API } from "src/constants/apiEndpoints";
import { setItem } from "src/services/localStorageService";
import { SOMETHING_WENT_WRONG } from "src/constants/errorMessages";
import { getErrorMessageAndCode } from "src/services/helperService";
import { notificationApi } from "src/api/axiosApi";

const getProfile = async (id) => {
  try {
    const response = await notificationApi.get(PROFILE_API);
    return response;
  } catch (err) {
    const { code, message } = getErrorMessageAndCode(err);
    const error = JSON.stringify({
      type: "error",
      message: code === "INVALID_USER_PROFILE" ? message : SOMETHING_WENT_WRONG,
    });
    throw Error(error);
  }
};

const ProfileService = { getProfile };

export default ProfileService;
