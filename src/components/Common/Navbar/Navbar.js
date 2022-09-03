import React, { useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import CustLink from "../CommonComp/CustLink";
import { AuthContext } from "../../../context/AuthContext";
import localStorageObj from "../../../data/localStorageObj";
import { axiosInstanceBack } from "../../../data/axios";

const Navbar = () => {
  const { isAuthenticated, authValidating, setShouldFetch } =
    useContext(AuthContext);

  const logoutUser = () => {
    localStorageObj._clearTokens();
    setShouldFetch(false);
  };
  return (
    <div>
      <nav className="flex justify-end">
        <CustLink content="Todo" url="/" />
        {authValidating ? (
          <h5>Loading...</h5>
        ) : isAuthenticated ? (
          <>
            <CustLink content="Profile" url="/profile" />
            <CustLink content="Logout" url="/login" logoutUser={logoutUser} />
          </>
        ) : (
          <>
            <CustLink content="Login" url="/login" />
            <CustLink content="Register" url="/register" />
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
