import axios from "axios";
import { axiosInstanceBack } from "../../data/axios";
import { BASE_URL_BACK_SERVER } from "../../data/_variables";

export async function loginUser(body, csrfToken) {
  const response = await axios.post(
    `${BASE_URL_BACK_SERVER}/user/login/`,
    body
    // {
    //   headers: {
    //     "X-CSRFToken": csrfToken,
    //   },
    // }
  );
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}
