import React from "react";
import MainLayout from "../../components/Common/MainLayout";

import EditForm from "../../components/Edit/EditForm";
import GetTaskContext from "../../context/GetTaskContext";

function Edit() {
  return (
    <MainLayout title={"Todo | task"}>
      <GetTaskContext>
        <EditForm />
      </GetTaskContext>
    </MainLayout>
  );
}

export default Edit;
