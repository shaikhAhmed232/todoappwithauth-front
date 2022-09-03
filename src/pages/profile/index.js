import React, { useContext } from "react";
import MainLayout from "../../components/Common/MainLayout";

import WithAuth from "../../components/Common/HOD/WithAuth";
import { AuthContext } from "../../context/AuthContext";

function Profile() {
  const { authData, authLoading } = useContext(AuthContext);
  return (
    <MainLayout>
      <div className="flex items-center flex-col bg-slate-300">
        <div className="grid grid-cols-3 w-2/5">
          <div className="text-xl font-bold">Username</div>
          <div className="text-xl font-bold">:</div>
          <div className="text-2xl font-bold">{authData.username}</div>
        </div>
        <div className="grid grid-cols-3 w-2/5">
          <div className="text-xl font-bold">email</div>
          <div className="text-xl font-bold">:</div>
          <div className="text-2xl font-bold">{authData.email}</div>
        </div>
        <div className="grid grid-cols-3 w-2/5">
          <div className="text-xl font-bold">First Name</div>
          <div className="text-xl font-bold">:</div>
          <div className="text-2xl font-bold">
            {authData.first_name ? authData.first_name : "Not Provided"}
          </div>
        </div>
        <div className="grid grid-cols-3 w-2/5">
          <div className="text-xl font-bold">Last Name</div>
          <div className="text-xl font-bold">:</div>
          <div className="text-2xl font-bold">
            {authData.last_name ? authData.last_name : "Not Provided"}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default WithAuth(Profile);
