import React, { Component, useContext } from "react";

import { useRouter } from "next/router";
import { AuthContext } from "../../../context/AuthContext";

function WithAuth(Component) {
  function WithAuthComponent(props) {
    const { isAuthenticated, authValidating } = useContext(AuthContext);
    if (authValidating) {
      return <h1 className="text-4xl font-boldest">Loading ...</h1>;
    } else if (typeof window !== "undefined" && !isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    return <Component {...props} />;
  }
  return WithAuthComponent;
}

export default WithAuth;
