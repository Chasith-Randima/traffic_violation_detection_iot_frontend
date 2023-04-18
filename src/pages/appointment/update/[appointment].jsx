import { getCookie } from "actions/auth";
import React, { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { oneAppointment, updateAppointment } from "actions/appointment";
import Layout from "components/Layout";
// import { isAuth } from "actions/auth";
import Router from "next/router";

const Appointment = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const { name, appointmentDate, appointmentTime } = values;

  useEffect(() => {
    if (getCookie("token_patient")) {
      Router.push(`/`);
    }
  }, []);

  useEffect(() => {
    let token = getCookie("token_patient");

    if (router.isReady) {
      oneAppointment(router.query.appointment)
        .then((data) => {
          console.log(data);
          setValues({
            ...values,
            name: data.doc.name,
            appointmentDate: data.doc.appointmentDate.split("T")[0],
            appointmentTime: data.doc.appointmentTime,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady]);
  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let token = getCookie("token_patient");
    let data = {
      name,
      appointmentDate,
      appointmentTime,
    };
    await updateAppointment(router.query.appointment, data, token)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Layout>
        <div className="mt-5 mr-5 shadow-xl">
          <h2 className="text-gray-400 text-xl font-semibold mx-5 ">
            Profile Info
          </h2>
          <form className="ml-2 mr-10">
            <div className=" m-2">
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
                    value={appointmentTime}
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
                value={"Update the Appointment"}
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

export default withRouter(Appointment);
