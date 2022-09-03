import React, { useState, useContext } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { inputChangeHandler } from "../../handlers/commonHandlers/inputChangeHandler";
// import { CsrfContext } from "../../context/CsrfContext";
import { axiosInstanceBack } from "../../data/axios";

const Register = () => {
  const router = useRouter();
  // const { csrfToken, mutateCsrf } = useContext(CsrfContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [errMsg, setErrMsg] = useState(null);

  const signUpUser = (e) => {
    e.preventDefault();
    axiosInstanceBack
      .post(
        "user/signup/",
        { ...formData }
        // {
        //   headers: {
        //     "X-CSRFToken": csrfToken,
        //   },
        // }
      )
      .then((response) => {
        router.push("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrMsg(error.response.data);
        } else {
          throw new Error(error);
        }
      });
  };

  return (
    <>
      <div className="bg-slate-300 flex justify-center">
        <form className="w-full max-w-2xl py-4" onSubmit={signUpUser}>
          <div className="py-4">
            <input
              type="text"
              placeholder="Enter username."
              name="username"
              value={formData.username}
              onChange={(e) => inputChangeHandler(formData, setFormData, e)}
              className="w-full px-5 py-3 rounded-lg text-lg focus:outline-none"
            />
            {errMsg && errMsg.username ? (
              <div className="text-red-500 font-bold">{errMsg.username[0]}</div>
            ) : null}
          </div>
          <div className="py-4">
            <input
              type="email"
              placeholder="Enter Email."
              name="email"
              value={formData.email}
              onChange={(e) => inputChangeHandler(formData, setFormData, e)}
              className="w-full px-5 py-3 rounded-lg text-lg focus:outline-none"
            />
            {errMsg && errMsg.email ? (
              <div className="text-red-500 font-bold">{errMsg.email[0]}</div>
            ) : null}
          </div>
          <div className="py-4">
            <input
              type="password"
              placeholder="Enter password."
              name="password"
              value={formData.password}
              onChange={(e) => inputChangeHandler(formData, setFormData, e)}
              className="w-full px-5 py-3 rounded-lg text-lg focus:outline-none"
            />
            {errMsg && errMsg.password ? (
              <div className="text-red-500 font-bold">{errMsg.password[0]}</div>
            ) : null}
          </div>
          <div className="py-4">
            <input
              type="text"
              placeholder="Enter first name."
              name="first_name"
              value={formData.first_name}
              onChange={(e) => inputChangeHandler(formData, setFormData, e)}
              className="w-full px-5 py-3 rounded-lg text-lg focus:outline-none"
            />
          </div>
          <div className="py-4">
            <input
              type="text"
              placeholder="Enter last name."
              name="last_name"
              value={formData.last_name}
              onChange={(e) => inputChangeHandler(formData, setFormData, e)}
              className="w-full px-5 py-3 rounded-lg text-lg focus:outline-none"
            />
          </div>
          <div className="text-lg my-2">
            Already a user?{" "}
            <Link href="/login">
              <a className="text-blue-700 underline">Login</a>
            </Link>
          </div>
          <div className="w-full md:w-1/2 mx-auto bg-blue-500 cursor-pointer py-3 text-xl font-bold text-white tracking-wider hover:bg-blue-400 transition">
            <input
              type="submit"
              value="Sign up"
              className="w-full cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
