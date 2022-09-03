import React from "react";

import MainLayout from "../components/common/MainLayout";
import Register from "../components/Accounts/Register";

function UserRegister() {
  return (
    <>
      <MainLayout title={"Todo | Register"}>
        <Register />
      </MainLayout>
    </>
  );
}

export default UserRegister;
