import React, { useState, useContext } from "react";
import { axiosInstanceBack } from "../../../data/axios";
import { mutate } from "swr";

import { TodoListContext } from "../../../context/GetTodoListContext";
// import { CsrfContext } from "../../../context/CsrfContext";

import { inputChangeHandler } from "../../../handlers/commonHandlers/inputChangeHandler";

function TodoForm() {
  // const { csrfToken, mutateCsrf } = useContext(CsrfContext);
  const { todoList, mutateTodoList } = useContext(TodoListContext);
  const [errMsg, setErrMsg] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    task: "",
  });

  const handleFormDataChange = (e) => {
    inputChangeHandler(formData, setFormData, e);
  };

  const addTodoItem = (e) => {
    e.preventDefault();
    const addTaskReq = async () => {
      const response = await axiosInstanceBack.post(
        "todo/todo-list/",
        { ...formData }
        // { headers: { "X-CSRFToken": csrfToken } }
      );
      try {
        return response.data;
      } catch (error) {
        if (error.response.status === 400) {
          setErrMsg(error.response.data);
        } else {
          throw new Error(error);
        }
      }
    };
    mutateTodoList(addTaskReq());
    // mutateCsrf();
    setFormData({
      task: "",
      title: "",
    });
  };

  return (
    <form className="md:w-1/2" onSubmit={addTodoItem}>
      <div className="w-full py-4 px-2">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormDataChange}
          placeholder="Enter title of task"
          className="w-full rounded-md border-2 border-slate-300 py-3 px-5 text-lg"
        />
        {errMsg && errMsg.title ? (
          <div className="text-lg text-red-500">{errMsg.title[0]}</div>
        ) : null}
      </div>
      <div className="w-full py-4 px-2">
        <textarea
          type="text"
          name="task"
          value={formData.task}
          onChange={handleFormDataChange}
          placeholder="Task to be done."
          className="w-full rounded-md border-2 border-slate-300 px-5 py-3 text-lg"
        />
        {errMsg && errMsg.task ? (
          <div className="text-lg text-red-500">{errMsg.task[0]}</div>
        ) : null}
      </div>
      <div className="py-2 px-2 w-full">
        <input
          type="submit"
          className="bg-sky-600 text-white px-9 py-2 rounded-md text-lg font-bold tracking-wide cursor-pointer mx-auto hover:bg-sky-500"
          value="Add Task"
        />
      </div>
    </form>
  );
}

export default TodoForm;
