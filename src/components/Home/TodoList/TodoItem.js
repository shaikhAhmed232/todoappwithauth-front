import React, { useState, useContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { mutate } from "swr";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import Task from "../../Task/Task";
import Modal from "../../Common/Modal";
import GetTaskContext from "../../../context/GetTaskContext";
import { TodoListContext } from "../../../context/GetTodoListContext";
// import { CsrfContext } from "../../../context/CsrfContext";
import { axiosInstanceBack } from "../../../data/axios";

const TodoItem = ({ id, title, task, completed }) => {
  // const { csrfToken, mutateCsrf } = useContext(CsrfContext);
  const router = useRouter();
  const [todoCompleted, setTodoCompleted] = useState(completed);
  const { todoList, mutateTodoList } = useContext(TodoListContext);

  const handleRedirect = (id, title) => {
    router.push(
      {
        pathname: "/[taskId]/edit",
        query: { taskId: id },
      }
      // `/${title}/edit`
    );
  };

  // axiosInstanceBack
  //     .delete(`todo/${id}/`, { headers: { "X-CSRFToken": csrfToken } })
  //     .then((res) => res.data.msg)
  //     .catch((error) => console.log(error.response.data));

  const deleteItem = (id) => {
    const deleteItem = async () => {
      const res = await axiosInstanceBack.delete(`todo/${id}/`);
      try {
        return res.data;
      } catch (err) {
        console.log(err.response);
      }
    };
    if (!completed) {
      const confirmation = confirm(
        `${title} not completed yet! Are you sure you want to delete it?`
      );
      if (confirmation) {
        mutate("todo/todo-list/", deleteItem());
        // mutateCsrf();
      } else {
        return;
      }
    } else {
      mutate("todo/todo-list/", deleteItem());
      // mutateCsrf();
    }
  };

  const checkboxChange = () => {
    const completedFlagReq = async () => {
      const response = await axiosInstanceBack.put(
        `todo/${id}/`,
        {
          title: title,
          task: task,
          completed: !todoCompleted,
        }
        // {
        //   headers: {
        //     "X-CSRFToken": csrfToken,
        //   },
        // }
      );
      try {
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    mutate(`todo/todo-list/`, completedFlagReq());
    // mutateCsrf();
  };

  return (
    <>
      <div className="bg-white mt-4 flex items-center px-3 h-16">
        <div className="">
          <input
            type="checkbox"
            checked={todoCompleted}
            onChange={checkboxChange}
            className="w-6 h-6"
          />
        </div>
        <div className="grow px-4 text-lg font-bold">
          <Link href={`/?taskId=${id}`} as={`/${id}`}>
            <a>{title}</a>
          </Link>
        </div>
        <div className="flex items-center">
          <div
            className="mx-1 cursor-pointer hover:text-blue-400 transition"
            onClick={() => handleRedirect(id, title)}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{ fontSize: "1.5rem" }}
            />
          </div>
          <div className="mx-1 cursor-pointer hover:text-red-500 transition">
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ fontSize: "1.5rem" }}
              onClick={() => deleteItem(id)}
            />
          </div>
        </div>
      </div>
      {router.query.taskId ? (
        <Modal>
          <GetTaskContext>
            <Task />
          </GetTaskContext>
        </Modal>
      ) : null}
    </>
  );
};

export default TodoItem;
