import React, { useState, useContext } from "react";

import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import localStorageObj from "../../data/localStorageObj";
import { inputChangeHandler } from "../../handlers/commonHandlers/inputChangeHandler";
import { loginUser } from "../../handlers/commonHandlers/userAuth";
import { AuthContext } from "../../context/AuthContext";
// import { CsrfContext } from "../../context/CsrfContext";

function Login() {
  const router = useRouter();
  const { setShouldFetch } = useContext(AuthContext);
  // const { csrfToken, mutateCsrf } = useContext(CsrfContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleUserLogin = (e) => {
    e.preventDefault();
    const res = loginUser(formData);
    res
      .then((res) => {
        if (res.status === 200) {
          localStorageObj._setTokens(
            res.data.tokens.access,
            res.data.tokens.refresh
          );
          setShouldFetch(true);
          router.push("/");
          // mutateCsrf();
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setErrMsg(err.response.data);
        }
      });
  };

  return (
    <div className="bg-slate-300 flex justify-center">
      <form className="w-full max-w-2xl py-4" onSubmit={handleUserLogin}>
        {errMsg ? (
          <div className="text-red-500 text-lg font-bold">{errMsg.msg}</div>
        ) : null}
        <div className="py-4">
          <input
            type="text"
            placeholder="Enter username."
            name="username"
            value={formData.username}
            onChange={(e) => inputChangeHandler(formData, setFormData, e)}
            required
            className="w-full px-5 py-3 rounded-lg text-lg focus:outline-none"
          />
        </div>
        <div className="py-4 flex">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password."
            name="password"
            value={formData.password}
            onChange={(e) => inputChangeHandler(formData, setFormData, e)}
            required
            className="w-full px-5 py-3 rounded-l-lg text-lg focus:outline-none flex-grow"
          />
          <div
            className={`bg-white rounded-r-lg cursor-pointer text-xl flex items-center ${
              showPassword ? "text-blue-500" : "text-black"
            }`}
            onClick={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon icon={faEye} />
          </div>
        </div>
        <div className="w-full md:w-1/2 mx-auto bg-blue-500 cursor-pointer py-3 text-xl font-bold text-white tracking-wider hover:bg-blue-400 transition">
          <input
            type="submit"
            value="Login"
            className="w-full cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
