import Layout from "components/Layout";
import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { getCookie } from "actions/auth";
import { oneUser, updateUser, updateUserPassword } from "actions/user";
import Message from "components/Message";

const User = ({ router }) => {
  console.log(router);
  const [values, setValues] = useState({
    name: "",
    hospitalName: "",
    email: "",
    // formData: "",
  });

  const { name, hospitalName, email, images } = values;

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
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");

    if (router.isReady) {
      oneUser(router.query.User, token)
        .then((data) => {
          if (data.status && data.status == "success") {
            console.log(data);
            setValues({
              name: data.doc.name,
              hospitalName: data.doc.hospitalName,
              email: data.doc.email,
              // formData: new FormData(),
              images: data.doc.images,
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
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
          setAlert({
            ...alert,
            loading: false,
            message: err.message,
            error: true,
            success: false,
          });
        });
    }
  }, [router.isReady]);

  return (
    <Layout>
      <div className="flex justify-center">
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
      </div>
      <div className="mt-5 mr-10 border-2 border-gray-200 ">
        <form className="block md:grid md:grid-cols-3">
          <div className="cmd:ol-span-1 overflow-hidden">
            {images ? (
              <img
                src={`http://127.0.0.1:3000/api/v1/users/image/${images[0]}`}
                className="rounded my-5 w-4/5 m-auto"
              />
            ) : (
              <img src="/img/profile.png" />
            )}

            {/* <div className="flex justify-center mx-auto">
              <label for="profileImage" className="flex justify-center">
                <input
                  id="profileImage"
                  type="file"
                  name="images"
                  accept="image/*"
                  //   onChange={handleChange("images")}
                  className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-violet-100"
                />
              </label>
            </div> */}
          </div>
          <div className="md:col-span-2 m-2">
            <h2 className="text-gray-400 text-xl font-semibold my-1">
              Profile Info
            </h2>
            <div className="border-2 border-gray-200 rounded-xl p-2 ">
              <div className="">
                <label class="text-gray-600 mb-2 block my-2">Name</label>
                <h2
                  type="text"
                  //   value={name}
                  //   onChange={handleChange("name")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded 
                  bg-blue-200
                  focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                  placeholder="Enter your Name"
                >
                  {name}
                </h2>
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Hospital Name</label>
                <h2
                  type="text"
                  //   value={hospitalName}
                  //   onChange={handleChange("hospitalName")}
                  class="block w-full border border-gray-300 px-4 py-3 
                  bg-blue-200
                  text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Hospital Name"
                >
                  {hospitalName}
                </h2>
              </div>

              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Email</label>
                <h2
                  type="text"
                  //   value={email}
                  //   onChange={handleChange("email")}
                  class="block w-full border border-gray-300 px-4 py-3 
                  bg-blue-200
                  text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Email"
                >
                  {email}
                </h2>
              </div>
            </div>
          </div>
          {/* <div className="text-center col-span-3 my-5  ">
            <input
              type="submit"
              value={"Update Profile"}
              onClick={handleSubmit}
              className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
            />
          </div> */}
        </form>
      </div>
    </Layout>
  );
};

export default withRouter(User);
