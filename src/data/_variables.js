import { useRouter } from "next/router";
import { axiosInstanceBack } from "./axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENV;

export const BASE_URL_BACK_SERVER =
  ENVIRONMENT === "Production" ? BASE_URL : "http://127.0.0.1:8000";
export const BASE_URL_CLIENT_SERVER = "http://localhost:3000";

export const fetcher = (...args) =>
  axiosInstanceBack(...args)
    .then((res) => res.data)
    .catch((error) => {
      if (error.response.status === 404) {
        router.push("/404");
      } else {
        return error;
      }
    });
