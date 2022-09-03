import React, { useContext } from "react";

import { useRouter } from "next/router";

import MainLayout from "../components/Common/MainLayout";
import Login from "../components/Accounts/Login";
import { AuthContext } from "../context/AuthContext";

const UserLogin = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  if (isAuthenticated) {
    router.push("/");
    return;
  }
  return (
    <>
      <MainLayout title={"Todo | Login"}>
        <Login />
      </MainLayout>
    </>
  );
};

export default UserLogin;
