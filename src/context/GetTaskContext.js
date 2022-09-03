import React, { createContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { axiosInstanceBack } from "../data/axios";

export const TaskContext = createContext();

const GetTaskContext = ({ children }) => {
  const router = useRouter();
  const { taskId } = router.query;
  const fetcher = (...args) =>
    axiosInstanceBack(...args)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((error) => {
        return error;
      });
  const { data, error } = useSWR(`todo/${taskId}/`, fetcher);
  const taskLoading = !data && !error;
  return (
    <TaskContext.Provider
      value={{ taskData: data, taskErr: error, taskLoading }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default GetTaskContext;
