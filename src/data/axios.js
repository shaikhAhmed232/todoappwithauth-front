import axios from "axios";
import jwt_decode from "jwt-decode";
import localStorageObj from "./localStorageObj";

import { BASE_URL_BACK_SERVER } from "./_variables";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.withCredentials = true;

export const axiosInstanceBack = axios.create({
  baseURL: BASE_URL_BACK_SERVER,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstanceBack.interceptors.request.use(
  (config) => {
    if (typeof window === "undefined") {
      return config;
    }
    const accessToken = localStorageObj._getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      return config;
    } else {
      return config;
    }
  },
  (error) => {
    throw new Error(error);
  }
);

axiosInstanceBack.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.config.url === "api/token/refresh/"
    ) {
      localStorageObj._clearTokens();
      window.location = "/login";
    } else if (error.response.status === 401) {
      return axios
        .post(`${BASE_URL_BACK_SERVER}/api/token/refresh/`, {
          refresh: localStorageObj._getRefreshToken(),
        })
        .then((response) => {
          localStorageObj._updateAccessToken(response.data.access);
          error.response.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.access}`;
          return axios(error.response.config);
        })
        .catch((error) => {
          localStorageObj._clearTokens();
          return Promise.reject(error);
        });
    } else {
      return Promise.reject();
    }
  }
);

// async function refreshAccessToken() {
//   const refreshToken = localStorageObj._getRefreshToken();
//   try {
//     const response = await axiosInstanceBack.post("/api/token/refresh/", {
//       refresh: refreshToken,
//     });
//     const result = response?.data;
//     return result;
//   } catch (err) {
//     localStorageObj._clearTokens();
//     window.location = "/login";
//   }
// }

// axiosInstanceBack.interceptors.response.use(
//   (response) => {
//     console.log("running response interceptor", response);
//     return response;
//   },
//   async (error) => {
//     console.log("got error in response interceptors");
//     const { config, response } = error;
//     if (response.status === 401 && !config.sent) {
//       config.sent = true;
//       console.log("fetching refresh token");
//       const result = await refreshAccessToken();
//       if (result?.accessToken) {
//         config.headers["Authorization"] = "Bearer " + accessToken;
//         localStorageObj._updateAccessToken(accessToken);
//       }
//       return axios(config);
//     }
//     return Promise.reject(error);
//   }
// );

// export const axiosInstanceClient = axios.create({
//   baseURL: BASE_URL_CLIENT_SERVER,
//   timeout: 5000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
