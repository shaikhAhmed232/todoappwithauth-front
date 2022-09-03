import { useState, createContext } from "react";

import useSWR from "swr";
import { axiosInstanceBack } from "../data/axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const fetcher = (...args) =>
    axiosInstanceBack
      .get(...args)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((error) => {
        setShouldFetch(false);
      });

  const { data, error, isValidating, mutate } = useSWR(
    shouldFetch ? `user/current/` : null,
    fetcher
  );
  const loading = !data && !error;
  const isAuthenticated = data ? true : false;
  return (
    <AuthContext.Provider
      value={{
        authData: data,
        authError: error,
        authValidating: isValidating,
        isAuthenticated,
        authLoading: loading,
        setShouldFetch,
        shouldFetch,
        mutateAuth: mutate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
