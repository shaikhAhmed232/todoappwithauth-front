import React from "react";

import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";

import CustButton from "../Common/CommonComp/CustButton";

function HomePage() {
  return (
    <div className="w-full bg-slate-200 shadow-md">
      <h1 className="w-full text-center py-6 text-4xl font-bold tracking-wide">
        Todo List
      </h1>
      <div className="flex flex-col md:flex-row w-full">
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default HomePage;
