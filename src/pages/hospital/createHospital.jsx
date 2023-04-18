import React from "react";
import Layout from "components/Layout";
import { withRouter } from "next/router";
import { getCookie } from "actions/auth";
import { allUsers, getAllUsers } from "actions/user";
import Message from "components/Message";
import { createHospital } from "actions/hospital";
import { useRouter } from "next/router";

import {
  oneDoctor,
  updateDoctor,
  updateDoctorPassword,
  allDoctors,
  getAllDoctors,
} from "actions/doctor";
import { useState, useEffect } from "react";

const CreateHospital = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    city: "",
    summary: "",
    images: "",
    // doctors: "",
    // doctorsArray: [],
    // users: "",
    // usersArray: [],
    directorName: "",
    directorId: "",

    formData: new FormData(),
  });
  const routerNew = useRouter();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  // const [allDoctors, setAllDoctors] = useState([]);
  // const [allUsers, setAllUsers] = useState([]);

  // const userArrayHandle = (data) => {
  //   if (data) {
  //     data.doc.map((user) => {
  //       let userId = user._id;
  //       let userName = user.name;
  //       allUsers.push({ userId, userName });
  //     });
  //   }
  // };

  // const doctorArrayHandle = (data) => {
  //   // console.log(data);
  //   if (data) {
  //     data.doc.map((user) => {
  //       // console.log(user);
  //       if (user.role == "director") {
  //         let userId = user._id;
  //         let userName = user.name;
  //         allDoctors.push({ userId, userName });
  //         // console.log(allUser);
  //       }
  //     });
  //   }
  // };

  // useEffect(() => {
  //   getAllUsers()
  //     .then((data) => {
  //       userArrayHandle(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   getAllDoctors()
  //     .then((data) => {
  //       doctorArrayHandle(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // const addDoctors = (id) => {
  //   if (allDoctors.includes(id)) {
  //     return;
  //   } else {
  //     allDoctors.push(id);
  //   }
  // };
  // const addUsers = (id) => {
  //   if (allUsers.includes(id)) {
  //     return;
  //   } else {
  //     allUser.push(id);
  //   }
  // };

  const {
    name,
    city,
    summary,
    images,
    // doctors,
    // doctorsArray,
    // users,
    // usersArray,
    directorName,
    directorId,
    formData,
  } = values;
  //   useEffect(() => {
  //     let token = getCookie("token_doctor");
  //     if (router.isReady) {
  //       oneDoctor(router.query.Doctor, token)
  //         .then((data) => {
  //           console.log(data);
  //           setValues({
  //             name: data.doc.name,
  //             city: data.doc.city,
  //             summary: data.doc.summary,
  //             formData: new FormData(),
  //             images: data.doc.images,
  //           });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     }
  //   }, [router.isReady]);

  const handleChange = (name) => (e) => {
    e.preventDefault();
    let value = name == "images" ? e.target.files[0] : e.target.value;
    if (name == "images") {
      console.log(name, value, "workin..");
      formData.append(name, value);
      setValues({ ...values, [name]: value, formData });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_user");
    let data = {
      name,
      summary,
      city,
      directorId,
      directorName,
      // usersArray,
      // doctorsArray,
    };
    for (const key in data) {
      formData.append(key, data[key]);
      setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }
    console.log(token);
    await createHospital(values.formData, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          routerNew.push("/mainPage");
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
      <div className="mt-5 mr-10 border-2 border-gray-200 rounded-xl">
        <form className="block md:grid md:grid-cols-3">
          <div className="md:col-span-1 overflow-hidden">
            {images ? (
              <img
                src={`http://127.0.0.1:3000/api/v1/doctors/image/${images[0]}`}
                className="md:rounded-full my-5 w-4/5 m-auto"
              />
            ) : (
              <img src="/img/hospital.png" />
            )}
            <div className="flex justify-center mx-auto">
              <label for="profileImage" className="flex justify-center">
                <input
                  id="profileImage"
                  type="file"
                  accept="images/*"
                  onChange={handleChange("images")}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700
        hover:file:bg-violet-100"
                />
              </label>
            </div>
          </div>
          <div className="md:col-span-2 m-2">
            <h2 className="text-gray-400 text-xl font-semibold my-1">
              Create Hospital
            </h2>
            <div className="border-2 border-gray-200 rounded-xl p-2 ">
              <div className="">
                <label class="text-gray-600 mb-2 block my-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={handleChange("name")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                  placeholder="Enter your Name"
                />
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Description</label>
                <textarea
                  type="text"
                  value={summary}
                  cols="5"
                  rows="5"
                  onChange={handleChange("summary")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your Doctor Id"
                />
              </div>

              <div className="my-2">
                <label class="text-gray-600 mb-2 block">city</label>
                <input
                  type="text"
                  value={city}
                  onChange={handleChange("city")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your city"
                />
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Director Name</label>
                <input
                  type="text"
                  value={directorName}
                  onChange={handleChange("directorName")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your city"
                />
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Director Id</label>
                <input
                  type="text"
                  value={directorId}
                  onChange={handleChange("directorId")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="Enter your city"
                />
              </div>
            </div>
          </div>
          <div className="text-center col-span-3 my-5  ">
            <input
              type="submit"
              value={"Create Hospital"}
              onClick={handleSubmit}
              className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default withRouter(CreateHospital);
