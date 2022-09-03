import React, { useContext } from "react";

import { useRouter } from "next/router";

import { TaskContext } from "../../context/GetTaskContext";
import CustButton from "../Common/CommonComp/CustButton";
import NotFoundPage from "../Common/NotFoundPage";

function Task() {
  const router = useRouter();
  const { taskData, taskLoading, taskErr } = useContext(TaskContext);

  const handleRedirect = (id, title) => {
    router.push(
      {
        pathname: "/[taskId]/edit",
        query: { taskId: id },
      }
      // `/${title}/edit`
    );
  };

  return (
    <div className="bg-slate-300 w-full flex flex-col items-center">
      {taskLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div>
            <p className="text-2xl font-bolder py-2">{taskData?.title}</p>
          </div>
          <div>
            <p className="text-2xl font-bolder py-2">{taskData?.task}</p>
          </div>
          <div>
            <p className="text-2xl font-bolder py-2">
              {JSON.stringify(taskData?.completed)}
            </p>
          </div>
          <CustButton
            content="Edit"
            onClick={() => handleRedirect(taskData.id)}
          />
        </>
      )}
    </div>
  );
}

export default Task;
