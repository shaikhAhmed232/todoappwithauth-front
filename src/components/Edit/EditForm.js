import React, { useState, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import { mutate } from "swr";

import { inputChangeHandler } from "../../handlers/common/inputChangeHandler";
import { TaskContext } from "../../context/GetTaskContext";
// import { CsrfContext } from "../../context/CsrfContext";
import { axiosInstanceBack } from "../../data/axios";

function EditForm() {
  // const { csrfToken, mutateCsrf } = useContext(CsrfContext);
  const router = useRouter();
  const { taskData, taskLoading, taskErr } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: "",
    task: "",
  });

  const [todoCompleted, setTodoCompleted] = useState(false);

  const handleFormDataChange = (e) => {
    inputChangeHandler(formData, setFormData, e);
  };

  useEffect(() => {
    if (taskData) {
      setFormData({
        title: taskData.title,
        task: taskData.task,
      });
      setTodoCompleted(taskData.completed);
    }
  }, [router.query.id]);

  const editTodoItem = (e) => {
    e.preventDefault();
    const taskEditReq = async (id) => {
      const res = await axiosInstanceBack.put(
        `todo/${id}/`,
        {
          ...formData,
          completed: todoCompleted,
        }
        // {
        //   headers: {
        //     "X-CSRFToken": csrfToken,
        //   },
        // }
      );
      try {
        return res.data;
      } catch (error) {
        console.log(error.response);
      }
    };
    mutate(`todo/${taskData.id}`, taskEditReq(taskData.id));
    router.push("/");
  };

  return (
    <div className="bg-slate-300">
      <form className="md:w-1/2 mx-auto" onSubmit={editTodoItem}>
        <div className="w-full py-4 px-2">
          <input
            type="text"
            name="title"
            value={formData?.title}
            onChange={handleFormDataChange}
            placeholder="Enter title of task"
            className="w-full rounded-md border-2 border-slate-300 py-3 px-5 text-lg"
          />
        </div>
        <div className="w-full py-4 px-2">
          <textarea
            type="text"
            name="task"
            value={formData?.task}
            onChange={handleFormDataChange}
            placeholder="Task to be done."
            className="w-full rounded-md border-2 border-slate-300 px-5 py-3 text-lg"
          />
        </div>
        <div className="">
          <input
            type="checkbox"
            checked={todoCompleted}
            onChange={() => setTodoCompleted(!todoCompleted)}
            className="w-6 h-6"
          />
        </div>
        <div className="py-2 px-2 w-full">
          <input
            type="submit"
            className="bg-sky-600 text-white px-9 py-2 rounded-md text-lg font-bold tracking-wide cursor-pointer mx-auto hover:bg-sky-500"
            value="Edit Task"
          />
        </div>
      </form>
    </div>
  );
}

export default EditForm;
