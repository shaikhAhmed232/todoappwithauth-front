import { useRouter } from "next/router";
import React, { useEffect, useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function UserLogout() {
  const { setShouldFetch, mutateAuth } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return <h1>Logging out...</h1>;
}

export default UserLogout;
