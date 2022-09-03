import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import useSWR from "swr";

import MainLayout from "../components/Common/MainLayout";
import HomePage from "../components/Home/HomePage";
import axiosInstance from "../data/axios";

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
