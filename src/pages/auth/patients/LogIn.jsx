import React from "react";
import { useState, useEffect } from "react";
// import Layout from "../../components/Layout";
import { logIn, isAuth, authenticate } from "../../../../actions/auth";
import Router from "next/router";
// import Message from "../../components/Message";
import Link from "next/link";
import Message from "components/Message";
import { getCookie } from "../../../../actions/auth";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";

const LogIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  useEffect(() => {
    if (getCookie("token_patient")) {
      Router.push(`/mainPage`);
    }
  }, []);

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    await logIn(user, "patients")
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          data.data.token = data.token;
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);

          // console.log(data);
          // console.log(data.error);
          authenticate(data.data, "patient", () => {
            if (isAuth("patient")) {
              Router.push(`/mainPage`);
            }
          });
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  return (
    <>
      {/* <Layout> */}
      {/* <!-- Login --> */}
      {alert.error && (
        <Message
          message={alert.message}
          // alert={"error"}
          resetAlert={resetAlert}
        />
      )}
      {alert.success && (
        <Message
          message={alert.message}
          // alert={"success"}
          resetAlert={resetAlert}
        />
      )}
      {alert.loading && (
        <Message
          message={"Loading...Please Waite..."}
          // alert={"loading"}
          resetAlert={resetAlert}
        />
      )}

      {/* <div class="container py-16"> */}
      <div className="flex flex-row  md:flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="flex flex-row  md:flex-col items-center justify-center md:w-full md:flex-2 md:px-20 text-center">
          <div className="bg-white rounded-2xl shadow-2xl  md:flex md:w-2/3 md:max-w-4xl">
            <div className="md:w-3/5 p-5">
              <div className="md:py-10">
                <h2 className="text-3xl font-bold text-blue-500 mb-2">
                  Log in to Account
                </h2>
                <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>

                {/* <div className="flex justify-center my-2">
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaFacebookF className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaLinkedinIn className="text-sm" />
                  </a>
                  <a
                    href="#"
                    className="border-2 border-gray-200 rounded-full p-3 mx-1"
                  >
                    <FaGoogle className="text-sm" />
                  </a>
                </div>

                <p className="text-gray-400 my-3">or use your email account</p> */}

                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelope className="text-gray-400 m-2" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange("email")}
                      placeholder="Email"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      value={password}
                      onChange={handleChange("password")}
                      name="password"
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>

                  {/* <div className="flex justify-between w-64 mb-5">
                    <label className="flex item-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember me
                    </label>
                    <a href="#" className="text-xs">
                      Forgot Password?
                    </a>
                  </div> */}

                  <button
                    onClick={handleSubmit}
                    className="border-2 border-blue-500 text-blue-500 rounded-full px-11 py-1 font-semibold hover:bg-blue-500 hover:text-white"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl pb-4 md:py-36 md:px-16 pb-4 md:mb-2">
              <img
                src="/img/opd-logo.png"
                alt="logo"
                height={250}
                width={250}
                className="item-center item"
              />
              <div className="border-2 w-10 border-white inline-block mb-2"></div>
              <p className="mb-2 text-base">
                <b>Caring for you</b> beyond borders
              </p>
              <br />
              <p className="mb-2">Don't have an account?</p>
              <Link
                href={`/auth/patients/SignUp`}
                className="border-2 border-white rounded-full px-11 py-1 font-semibold hover:bg-white hover:text-blue-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 class="text-2xl uppercase font-medium mb-1 text-center">Login</h2>
          <p class="text-gray-600 mb-6 text-sm text-center">
            Login if you are a returning customer
          </p>

          <form action="">
            <div class="space-y-4">
              <div>
                <label class="text-gray-600 mb-2 block">Email Address</label>
                <input
                  type="text"
                  value={email}
                  onChange={handleChange("email")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label class="text-gray-600 mb-2 block">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={handleChange("password")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Password"
                />
              </div>

              <div class="mt-4">
                <button
                  class="block w-full py-2 text-center text-black bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  onClick={handleSubmit}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </form>
          <p class="mt-4 text-gray-600 text-center">
            Dont have an account?
            <Link href={`/auth/patients/SignUp`} class="text-primary">
              Register Now
            </Link>
          </p>
        </div> */}
      {/* </div> */}
      {/* </Layout> */}
    </>
  );
};

export default LogIn;
