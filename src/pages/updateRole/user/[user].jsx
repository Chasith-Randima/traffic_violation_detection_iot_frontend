import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { updateDoctor } from "actions/doctor";
import { updateUser } from "actions/user";
import { getCookie } from "actions/auth";
import Message from "components/Message";

const User = () => {
  const router = useRouter();
  const [role, setRole] = useState();
  const [values, setValues] = useState({
    formData: new FormData(),
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
  const { formData } = values;

  const handleSubmit = async () => {
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");

    formData.append("role", role);

    await updateUser(router.query.user, values.formData, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
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
  };
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
      ;
      <div className="m-10 border-2 border-gray-400 rounded">
        <form className="m-10 border-2 border-gray-400 p-10 rounded">
          <div>
            <label class="text-gray-600 mb-2 block">User Role</label>
            <select
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
              placeholder="Enter your email address"
            >
              <option></option>
              <option className="text-gray-600 text-xl">Staff</option>
              <option className="text-gray-600 text-xl">pharmacist</option>
              <option className="text-gray-600 text-xl">admin</option>
            </select>
          </div>
          <div className="text-center">
            <h2
              className="text-white text-xl bg-blue-500 font-semibold mt-5 hover:bg-blue-800 transition-all py-5 w-full md:w-1/3 mx-auto cursor-pointer"
              onClick={handleSubmit}
            >
              Update Role
            </h2>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default User;
