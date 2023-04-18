import { getCookie, isAuth } from "actions/auth";
import { createTicket } from "actions/ticket";
import Layout from "components/Layout";
import { withRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Message from "components/Message";
import { useRouter } from "next/router";
import { updateAppointment } from "actions/appointment";

const CreateTicket = ({ router }) => {
  const [values, setValues] = useState({
    diagnosisTitle: "",
    diagnosis: "",
    prescription: "",
    appointment: "",
    patients: "",
    doctors: "",
    pharmacists: "",
    hospitals: "",
  });
  const routerNew = useRouter();

  const {
    diagnosisTitle,
    diagnosis,
    prescription,
    doctors,
    appointment,
    patients,
    pharmacists,
    hospitals,
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

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });

    const data = {
      diagnosisTitle,
      diagnosis,
      prescription,
      appointment: router.query.appointmentId,
      patients: router.query.patientId,
      doctors: router.query.doctorId,
      hospitals: router.query.hospitals,
      // pharmacists,
    };
    const token = getCookie("token_doctor");
    console.log(data, token);
    await createTicket(data, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data, "success...");

          let updateData = {
            active: false,
          };
          updateAppointment(router.query.appointmentId, updateData, token)
            .then((data) => {
              console.log(data);
              setAlert({
                ...alert,
                loading: false,
                message: data.message,
                error: false,
                success: true,
              });

              window.setTimeout(() => {
                resetAlert();
              }, 1000);
              routerNew.push("/mainPage");
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
              message={"Loading...Please Waite..."}
              // alert={"loading"}
              resetAlert={resetAlert}
            />
          )}
        </div>
        <div className="mt-5 mr-5 shadow-xl">
          <h2 className="text-gray-400 text-xl font-semibold mx-5 ">
            Profile Info
          </h2>
          <form className="ml-2 mr-10">
            <div className=" m-2">
              <div className="border-2 border-gray-200 rounded-xl p-2 ">
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">
                    Diagnosis Title
                  </label>
                  <input
                    type="text"
                    value={diagnosisTitle}
                    onChange={handleChange("diagnosisTitle")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">Diagnosis</label>
                  <textarea
                    rows="5"
                    type="text"
                    value={diagnosis}
                    onChange={handleChange("diagnosis")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                    placeholder="Enter your Name"
                  />
                </div>
                <div className="">
                  <label class="text-gray-600 mb-2 block my-2">
                    Prescription
                  </label>
                  <textarea
                    rows="5"
                    type="text"
                    value={prescription}
                    onChange={handleChange("prescription")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                    placeholder="Enter your Name"
                  />
                </div>
              </div>
            </div>
            <div className="text-center col-span-3 my-5   ">
              <h2
                // type="submit"
                // value={"Make the Ticket"}
                className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer mb-5"
                onClick={(e) => handleSubmit(e)}
              >
                Make The Ticket
              </h2>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default withRouter(CreateTicket);
