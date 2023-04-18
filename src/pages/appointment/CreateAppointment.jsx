import Layout from "components/Layout";
import React from "react";
import { useState, useEffect } from "react";
import { createAppointment } from "actions/appointment";
import { getCookie, isAuth } from "actions/auth";
import { useRouter, withRouter } from "next/router";
import GenerateQR from "components/GenerateQR";
import Message from "components/Message";

const CreateAppointment = ({ router }) => {
  // const router = useRouter();
  console.log(router);
  const { hospitalId, doctorId, hospitalName } = router.query;
  console.log(hospitalId, doctorId);
  console.log(isAuth("patient")._id);
  const [values, setValues] = useState({
    name: "",
    hospitalName: "",
    appointmentDate: "",
    appointmentTime: "",
    hospitals: "",
    tickets: "",
    patients: "",
    doctors: "",
  });
  const {
    name,
    appointmentDate,
    appointmentTime,

    hospitals,
    tickets,
    patients,
    doctors,
  } = values;

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
    if (getCookie("token_doctor")) {
      // alert("Only Patients can make appointments..");

      setAlert({
        ...alert,
        message: "Only Patients can make appointments...",
        loading: true,
      });
      router.push("/mainPage");
    } else if (getCookie("token_user")) {
      // alert("Only Patients can make appointments..");
      setAlert({ ...alert, message: "Only patients can make appointments.." });
      router.push("/mainPage");
    }
  }, []);

  const handleChange = (name) => (e) => {
    e.preventDefault();

    if (name == "appointmentTime") {
      console.log(e.target.value);
    }
    setValues({ ...values, [name]: e.target.value });
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_patient");

    let data = {
      name,
      hospitalName,
      appointmentDate,
      appointmentTime,
      patients: JSON.parse(localStorage.getItem("patient"))._id,
      doctors: doctorId,
      hospitals: hospitalId,
    };

    console.log(data);

    await createAppointment(data, token)
      .then((data) => {
        console.log(data, "Success...");
        if (data.status && data.status == "success") {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {}, 1500);
        }
      })
      .catch((err) => {
        console.log(err, "error...");
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });

    console.log(token, data);
  };
  let patientName;
  //   localStorage && localStorage.getItem("patient")
  //     ? JSON.parse(localStorage.getItem("patient")).name
  //     : "";

  if (typeof window !== "undefined") {
    // Perform localStorage action
    patientName = JSON.parse(localStorage.getItem("patient")).name;
  }
  return (
    <>
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
              message={alert.message}
              // alert={"loading"}
              resetAlert={resetAlert}
            />
          )}
        </div>
        <div className="mt-5 mr-5 shadow-xl">
          <h2 className="text-gray-400 text-xl font-semibold mx-5 ">
            Make An Appointment
          </h2>
          <form className="ml-2 mr-10">
            <div className=" m-2">
              <div className="border-2 border-gray-200 rounded-xl p-2 ">
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">Name</label>
                  <input
                    type="text"
                    // value={isAuth("patient").name}
                    value={patientName}
                    // value={JSON.parse(localStorage.getItem("patient")).name}
                    onChange={handleChange("name")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">
                    Hospital Name
                  </label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={handleChange("hospitalName")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">
                    Appointment Date
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={handleChange("appointmentDate")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your NIC"
                  />
                </div>
                <div className="my-2">
                  <label class="text-gray-600 mb-2 block">
                    Appointment Time
                  </label>
                  <input
                    type="time"
                    value={"14:00"}
                    min="09:00"
                    max="18:00"
                    onChange={handleChange("appointmentTime")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your Date Of Birth"
                  />
                </div>
              </div>
            </div>
            <div className="text-center col-span-3 my-5   ">
              <input
                type="submit"
                value={"Make the Appointment"}
                className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer mb-5"
                onClick={handleSubmit}
              />
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default withRouter(CreateAppointment);
