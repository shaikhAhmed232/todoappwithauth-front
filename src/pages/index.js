import MainLayout from "../components/Common/MainLayout";
import HomePage from "../components/Home/HomePage";
import TodoListContextProvider from "../context/GetTodoListContext";

export default function Home() {
  return (
    <TodoListContextProvider>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </TodoListContextProvider>
  );
}
