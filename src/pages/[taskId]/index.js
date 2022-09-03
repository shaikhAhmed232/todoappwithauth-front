import axios from "axios";
import React from "react";
import { BASE_URL_BACK_SERVER } from "../../data/_variables";

import MainLayout from "../../components/Common/MainLayout";
// import CustButton from "../../components/Common/CommonComp/CustButton";
import Task from "../../components/Task/Task";

import GetTaskContext from "../../context/GetTaskContext";

function TaskPage() {
  return (
    <MainLayout title={"Todo | task"}>
      <GetTaskContext>
        <Task />
      </GetTaskContext>
    </MainLayout>
  );
}

export default TaskPage;
