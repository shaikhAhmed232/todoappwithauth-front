import React, { createContext } from "react";
import useSWR from "swr";

import { fetcher } from "../data/_variables";

export const TodoListContext = createContext();

const TodoListContextProvider = ({ children }) => {
  const { data, error, mutate, isValidating } = useSWR(
    "todo/todo-list/",
    fetcher
  );
  const todoListLoading = !data && !error;
  return (
    <TodoListContext.Provider
      value={{
        todoList: data?.tasks,
        todoListErr: error,
        mutateTodoList: mutate,
        todoListIsValidating: isValidating,
        todoListLoading,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListContextProvider;
