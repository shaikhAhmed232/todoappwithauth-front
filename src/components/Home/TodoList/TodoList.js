import React, { useState, useContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import TodoItem from "./TodoItem";
import CustButton from "../../Common/CommonComp/CustButton";
import { TodoListContext } from "../../../context/GetTodoListContext";
import { AuthContext } from "../../../context/AuthContext";
// import { CsrfContext } from "../../../context/CsrfContext";
import { axiosInstanceBack } from "../../../data/axios";
import { mutate } from "swr";

function TodoList() {
  const { todoList, todoListLoading, todoListIsValidating } =
    useContext(TodoListContext);
  // const { csrfToken, mutateCsrf } = useContext(CsrfContext);
  const [tasks, setTasks] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const deleteAllTasks = (e) => {
    const deleteAllTaskReq = async () => {
      const response = await axiosInstanceBack.delete(`todo/todo-list/`);
      try {
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    if (
      confirm(
        "There might be uncompleted task make sure each task completed before deleting them! to delete all task click ok."
      ) == true
    ) {
      mutate("todo/todo-list/", deleteAllTaskReq());
      // mutateCsrf();
    } else {
      return;
    }
  };

  return (
    <>
      {todoListLoading || todoListIsValidating ? (
        <h1>Loading ...</h1>
      ) : (
        <div className="md:w-1/2 w-full px-2">
          <div
            className={`max-h-64 ${
              todoList?.length ? "overflow-y-scroll" : "overflow-y-hidden"
            }`}
          >
            {isAuthenticated ? (
              todoList && todoList.length !== 0 ? (
                todoList.map((task) => {
                  return <TodoItem key={task.id} {...task} />;
                })
              ) : (
                <h1>No Tasks</h1>
              )
            ) : tasks.length !== 0 ? (
              tasks.map((task, index) => {
                return <TodoItem key={index} {...task} />;
              })
            ) : (
              <div className="flex flex-col w-full items-center justify-center">
                <h1 className="text-3xl font-bold">No Tasks!</h1>
                <h1 className="text-lg">
                  Please login to add tasks.{" "}
                  <Link href="/login">
                    <a className="text-blue-500 underline hover:text-blue-700">
                      Login
                    </a>
                  </Link>
                  .
                </h1>
              </div>
            )}
          </div>
          {(isAuthenticated && todoList?.length !== 0) || tasks.length !== 0 ? (
            <CustButton content={"Remove All"} onClick={deleteAllTasks} />
          ) : null}
        </div>
      )}
    </>
  );
}

export default TodoList;
