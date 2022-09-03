import React, { createContext } from "react";
import { axiosInstanceBack } from "../data/axios";
import useSWR from "swr";
import axios from "axios";
import { BASE_URL_BACK_SERVER } from "../data/_variables";
export const CsrfContext = createContext();

export default function CsrfContextProvider({ children }) {
  const fetcher = (...args) =>
    axios
      .get(...args)
      .then((res) => {
        return res.headers["x-csrftoken"];
      })
      .catch((err) => err);
  const { data, error, mutate } = useSWR(
    `${BASE_URL_BACK_SERVER}/user/get-csrf/`,
    fetcher,
    {
      revalidationOnFocus: false,
    }
  );
  const context = {
    csrfToken: data,
    error,
    mutateCsrf: mutate,
  };
  return (
    <CsrfContext.Provider value={context}>{children}</CsrfContext.Provider>
  );
}
