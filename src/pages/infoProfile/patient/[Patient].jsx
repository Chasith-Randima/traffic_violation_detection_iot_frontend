import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { onePatient, updatePatientPassword } from "actions/patient";
import { getCookie } from "actions/auth";
import { withRouter } from "next/router";
import { updatePatient } from "actions/patient";
import { allAppointmentsRelated } from "actions/appointment";
import Appointment from "components/Appointment";
import { useRouter } from "next/router";
import { allTicketsRelated } from "actions/ticket";
import Ticket from "components/Ticket";
import Message from "components/Message";

const Patient = ({ query, data }) => {
  console.log(query, data);
  //   const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    nic: "",
    dateOfBirth: "",
    city: "",
    email: "",
    // formData: "",
    images: "",
  });

  // if (data && data.status == "success") {
  //   setValues({});
  // }

  const { name, nic, dateOfBirth, city, email, images } = values;

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
    // console.log(router.query);
    setAlert({ ...alert, loading: true });
    let token = getCookie("token_patient");
    // if (router.isReady) {
    onePatient(query.Patient, token)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          setValues({
            name: data.doc.name,
            nic: data.doc.nic,
            dateOfBirth: data.doc.dateOfBirth.split("T")[0],
            city: data.doc.city,
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
    // }
  }, [query]);

  const [appointmentData, setAppointmentData] = useState();
  const [ticketData, setTicketData] = useState();
  useEffect(() => {
    setAlert({ ...alert, loading: true });
    let limit = 20;
    let page = 1;
    let hospitalName;
    let appointmentDate1;
    let appointmentDate2;
    let active;
    let field_name = "patients";
    let id;
    if (query) {
      id = query.Patient;
    }

    let params = {
      limit,
      page,
      active,
      appointmentDate1,
      appointmentDate2,
      hospitalName,
      field_name,
      id,
    };

    // console.log(params, "submit clicked...");
    allAppointmentsRelated(params)
      .then((data) => {
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            //   initialSet();
            //   setShow(false);
          } else {
            setAppointmentData(data);
            console.log(data);
            //   console.log(data.totalCount);
            //   let totalCount = data.totalCount;
            //   setTotalPages(Math.ceil(totalCount / limit));
            //   setShow(false);
          }

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
        }

        // return { data };
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

    //   -------------------tickets---------------
  }, [query]);

  useEffect(() => {
    setAlert({ ...alert, loading: true });
    // console.log(router.query);
    let limit = 100;
    let page = 1;
    let hospitalName;
    let appointmentDate1;
    let appointmentDate2;
    let active;
    let field_name = "patients";
    let id;

    if (query) {
      id = query.Patient;
    }
    let params = {
      limit,
      page,
      active,
      appointmentDate1,
      appointmentDate2,
      hospitalName,
      field_name,
      id,
    };

    console.log(params);
    // console.log(params, "submit clicked...");
    allTicketsRelated(params)
      .then((data) => {
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            //   console.log(data);
            //   initialSet();
            //   setShow(false);
          } else {
            setTicketData(data);
            console.log(data);
            //   let totalCount = data.totalCount;
            //   setTotalPages(Math.ceil(totalCount / limit));
            //   setShow(false);
          }

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
        }

        // return { data };
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
  }, [query]);

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
      <div className="mt-5 mr-10 border-2 border-gray-200 rounded-xl">
        <form className="block md:grid md:grid-cols-3">
          <div className="md:col-span-1 overflow-hidden">
            {images ? (
              <img
                src={`http://127.0.0.1:3000/api/v1/patients/image/${images[0]}`}
                className="rounded my-5 w-4/5 m-auto"
              />
            ) : (
              <img src="/img/profile.png" />
            )}
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
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400
                  bg-blue-200
                  "
                  placeholder="Enter your Name"
                >
                  {name}
                </h2>
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">NIC</label>
                <h2
                  type="text"
                  //   value={nic}
                  //   onChange={handleChange("nic")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400
                  bg-blue-200
                  "
                  placeholder="Enter your NIC"
                >
                  {nic}
                </h2>
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Date Of Birth</label>
                <h2
                  type="date"
                  //   value={dateOfBirth}
                  //   onChange={handleChange("dateOfBirth")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400
                  bg-blue-200
                  "
                  placeholder="Enter your Date Of Birth"
                >
                  {dateOfBirth}
                </h2>
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">City</label>
                <h2
                  type="text"
                  //   value={city}
                  //   onChange={handleChange("city")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400
                  bg-blue-200
                  "
                  placeholder="Enter your City"
                >
                  {city}
                </h2>
              </div>
              <div className="my-2">
                <label class="text-gray-600 mb-2 block">Email</label>
                <h2
                  type="text"
                  //   value={email}
                  //   onChange={handleChange("email")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary 
                  bg-blue-200
                  placeholder-gray-400"
                  placeholder="Enter your Email"
                >
                  {email}
                </h2>
              </div>
            </div>
          </div>
          {/* <div className="text-center col-span-3 my-5  ">
            <h2
              type="submit"
            //   value={"Update Profile"}
              onClick={handleSubmit}
              className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
            />
          </div> */}
        </form>
      </div>
      <div className="mt-10 mr-10 border-2 border-gray-200 rounded-xl">
        <h2 className="text-gray-400 text-xl font-semibold mx-5 my-3 ">
          All Past Appointments
        </h2>
        <div className="grid grid-cols-8 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb ">
          <h2>Id</h2>
          <h2 className="col-span-2">Hospital Name</h2>
          <h2>Date</h2>
          <h2>Time</h2>
          <h2>Status</h2>
          <h2>cancel</h2>
          <h2>update</h2>
        </div>
        <div className="">
          {appointmentData &&
            appointmentData.doc.map((appointment) => {
              return <Appointment appointment={appointment} />;
            })}
        </div>
      </div>

      <div className="mt-10 mr-10 border-2 border-gray-200 rounded-xl">
        <h2 className="text-gray-400 text-xl font-semibold mx-5 my-3 ">
          All Past Tickets
        </h2>
        <div className="grid grid-cols-9 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb ">
          <h2>Id</h2>
          <h2 className="col-span-2">Hospital Name</h2>
          <h2>Date</h2>
          <h2>Time</h2>
          <h2 className="">Doctor</h2>
          <h2>Status</h2>
          <h2>cancel</h2>
          {/* <h2>update</h2> */}
        </div>
        <div className="">
          {ticketData &&
            ticketData.doc.map((ticket) => {
              return <Ticket ticket={ticket} key={ticket._id} type={false} />;
            })}
        </div>
      </div>
    </Layout>
  );
};

Patient.getInitialProps = async ({ query }) => {
  console.log(query);
  let limit = 2;
  let page = 1;
  let hospitalName;
  let appointmentDate1;
  let appointmentDate2;
  let active;
  let field_name = "patient";
  let id = query.Patient;
  let data = {
    limit,
    page,
    hospitalName,
    appointmentDate1,
    appointmentDate2,
    active,
    field_name,
    id,
  };
  return await allTicketsRelated(data)
    .then((data) => {
      console.log(data);
      return { data, query };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Patient;
