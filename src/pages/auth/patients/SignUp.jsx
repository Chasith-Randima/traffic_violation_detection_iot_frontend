import React from "react";
import { useState, useEffect } from "react";
// import Layout from "../../components/Layout";
import Router from "next/router";
import { isAuth, signup } from "../../../../actions/auth";
import Link from "next/link";
// import Message from "../../components/Message";
import Message from "components/Message";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelope,
  FaUser,
} from "react-icons/fa";
import { MdLockOutline, MdLocationCity } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    nic: "",
    dateOfBirth: "",
    email: "",
    city: "",
    password: "",
    passwordConfirm: "",
    error: "",
    loading: false,
    message: "",
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

  // useEffect(() => {
  //   if (isAuth("patient")) {
  //     Router.push(`/`);
  //   }
  // }, []);

  const {
    name,
    nic,
    city,
    dateOfBirth,
    email,
    password,
    passwordConfirm,
    error,
    loading,
    message,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    // console.log(values);
    const user = {
      name,
      nic,
      dateOfBirth,
      city,
      email,
      password,
      passwordConfirm,
    };
    signup(user, "patients")
      .then((data) => {
        if (data.status && data.status == "success") {
          // console.log(data);
          setValues({
            ...values,
            name: "",
            nic: "",
            dateOfBirth: "",
            email: "",
            city: "",
            password: "",
            passwordConfirm: "",
            error: "",
            loading: false,
            message: data.statusText,
          });
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

          Router.push(`/auth/patients/LogIn`);
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
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  let showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  let showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  let showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  return (
    <>
      {/* <Layout> */}
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
      <div className="flex flex-row md:flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <div className="flex flex-row md:flex-col items-center justify-center md:w-full flex-2 md:px-20 text-center">
          <form className="bg-white rounded-2xl shadow-2xl md:flex md:w-2/3 md:max-w-4xl">
            <div className="md:w-3/5 p-5">
              <div className="md:py-10">
                <h2 className="text-3xl font-bold text-blue-500 mb-2">
                  Create Account
                </h2>
                <div className="border-2 w-10 border-blue-500 inline-block mb-2"></div>

                {/* <div className='flex justify-center my-2'>
                  <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                    <FaFacebookF className='text-sm' />
                  </a>
                  <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                    <FaLinkedinIn className='text-sm' />
                  </a>
                  <a href='#' className='border-2 border-gray-200 rounded-full p-3 mx-1'>
                    <FaGoogle className='text-sm' />
                  </a>
                </div>

                <p className='text-gray-400 my-3'>or use your email for registration</p> */}

                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <AiOutlineUser className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="pname"
                      value={name}
                      onChange={handleChange("name")}
                      placeholder="Name"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <AiOutlineUser className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="patientnic"
                      value={nic}
                      onChange={handleChange("nic")}
                      placeholder="NIC"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <CiCalendarDate className="text-gray-400 m-2" />
                    <input
                      type="date"
                      name="dob"
                      value={dateOfBirth}
                      onChange={handleChange("dateOfBirth")}
                      placeholder="Date of Birth"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLocationCity className="text-gray-400 m-2" />
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={handleChange("city")}
                      placeholder="City"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
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
                      name="password"
                      value={password}
                      onChange={handleChange("password")}
                      placeholder="Password"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>
                  <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                    <MdLockOutline className="text-gray-400 m-2" />
                    <input
                      type="password"
                      name="cpassword"
                      value={passwordConfirm}
                      onChange={handleChange("passwordConfirm")}
                      placeholder="Confirm Password"
                      className="bg-gray-100 outline-none text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="border-2 border-blue-500 text-blue-500 rounded-full px-11 py-1 font-semibold hover:bg-blue-500 hover:text-white"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/5 bg-blue-500 text-white rounded-tr-2xl rounded-br-2xl md:py-36 md:px-16 pb-4 md:mb-2">
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
              <p className="mb-2">Already have an account?</p>
              <Link
                href={`/auth/patients/LogIn`}
                className="border-2 border-white rounded-full px-11 py-1 font-semibold hover:bg-white hover:text-blue-500"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="container py-16 mx-auto">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1 text-center">
            SignUp
          </h2>
          <p className="text-gray-600 mb-6 text-sm text-center">
            Signup to our website
          </p>
          <form action="">
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleChange("name")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">Full NIC</label>
                <input
                  type="text"
                  value={nic}
                  onChange={handleChange("nic")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your NIC"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Date Of Birth
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={handleChange("dateOfBirth")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Date Of Birth"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Email Address
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={handleChange("email")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="text-gray-600 mb-2 block">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={handleChange("password")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Password"
                />
              </div>
              <div>
                <label className="text-gray-600 mb-2 block">
                  Password Confirm
                </label>
                <input
                  type="text"
                  value={passwordConfirm}
                  onChange={handleChange("passwordConfirm")}
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Password"
                />
              </div>

              <div className="mt-4">
                <button
                  className="block w-full py-2 text-center text-black bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  onClick={handleSubmit}
                >
                  SignUp
                </button>
              </div>
            </div>
          </form>
          <p className="mt-4 text-gray-600 text-center">
            Already have an account?
            <Link href={`/auth/patients/LogIn`} className="text-primary">
              LogIn Now
            </Link>
          </p>
        </div>
      </div> */}
      {/* </Layout> */}
    </>
  );
};

export default SignUp;
