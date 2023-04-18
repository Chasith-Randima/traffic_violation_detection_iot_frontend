import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import Link from "next/link";
import { appointmentsCountByTime, oneHospital } from "actions/hospital";
import { getCookie } from "actions/auth";
import Users from "components/Users";
import Doctors from "components/Doctors";
import { useRouter } from "next/router";

const Hospital = ({ data }) => {
  const router = useRouter();
  const [appointmentCount, setAppointmentCount] = useState([]);
  console.log(data);

  const [checkAuth, setCheckAuth] = useState({
    role: "",
    auth: false,
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
    if (localStorage.getItem("user")) {
      console.log("from user");
      if (JSON.parse(localStorage.getItem("user")).role == "admin") {
        setCheckAuth({
          role: JSON.parse(localStorage.getItem("user")).role,
          auth: true,
        });
      }
    } else if (localStorage.getItem("doctor")) {
      console.log("from doctor");
      if (JSON.parse(localStorage.getItem("doctor")).role == "director") {
        setCheckAuth({
          role: JSON.parse(localStorage.getItem("doctor")).role,
          auth: true,
        });
      }
    }
  }, []);

  useEffect(() => {
    appointmentsCountByTime()
      .then((data) => {
        if (data.status && data.status == "success") {
          setAppointmentCount(data.countArray);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            resetAlert();
          }, 1500);
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
  }, []);
  return (
    <>
      <Layout>
        <div className="mt-5 mr-5">
          <h2 className="text-gray-400 text-xl font-semibold my-1">
            {data.doc.name}
          </h2>
          <div className="grid md:grid-cols-5">
            <div className=" md:col-span-3 overflow-hidden shadow-xl ">
              <img src="/img/hospital.png" />
            </div>
            <div className="md:col-span-2 mx-5 shadow-xl p-4">
              <div>
                <h2 className="text-gray-400 text-xl font-semibold my-1">
                  Description
                </h2>
                <p className="text-lg">{data.doc.summary}</p>
              </div>
              <div>
                <h2 className="text-gray-400 text-xl font-semibold my-2">
                  Total Appointments : {data.doc.appointments.length}
                </h2>
              </div>
              <div>
                <h2 className="text-gray-400 text-xl font-semibold my-2">
                  Total Doctors : {data.doc.doctors.length}
                </h2>
              </div>
              {/* <div>
                <h2 className="text-gray-400 text-xl font-semibold my-2">
                  Total Staff : 6
                </h2>
              </div> */}
              {getCookie("token_patient") && (
                <div className="text-center mt-10">
                  {/* {console.log(
                    data.doc.doctors[
                      Math.floor(Math.random() * data.doc.doctors.length)
                    ]._id
                  )} */}
                  <Link
                    // href="/appointment/CreateAppointment"
                    href={{
                      pathname: "/appointment/CreateAppointment",
                      query: {
                        hospitalId: data.doc._id,
                        doctorId:
                          data.doc.doctors.length != 0
                            ? data.doc.doctors[
                                Math.floor(
                                  Math.random() * data.doc.doctors.length
                                )
                              ]._id
                            : "0000",
                        hospitalName: data.doc.name,
                      },
                    }}
                    className="text-xl font-bold text-white bg-blue-600 p-4 hover:bg-blue-500 transition-all "
                  >
                    Make an Appointment
                  </Link>
                </div>
              )}
              <div className="text-center mt-10">
                {/* {console.log(
                    data.doc.doctors[
                      Math.floor(Math.random() * data.doc.doctors.length)
                    ]._id
                  )} */}
                <Link
                  // href="/appointment/CreateAppointment"
                  href={`/que/${data.doc._id}`}
                  className="text-xl font-bold text-white bg-blue-600 p-4 hover:bg-blue-500 transition-all "
                >
                  Que
                </Link>
              </div>
              {getCookie("token_user") && (
                <div className="text-center mt-10">
                  {/* {console.log(
                    data.doc.doctors[
                      Math.floor(Math.random() * data.doc.doctors.length)
                    ]._id
                  )} */}
                  <Link
                    // href="/appointment/CreateAppointment"
                    href={`/que/tickets/${data.doc._id}`}
                    className="text-xl font-bold text-white bg-blue-600 p-4 hover:bg-blue-500 transition-all "
                  >
                    Prescription Que
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="my-5">
            <h2 className="text-gray-400 text-xl font-semibold my-1">
              Today Pending Appointments
            </h2>
            <div>
              {/* <div className="grid grid-cols-9">
                <h2 className="text-sm p-1 font-semibold">8:00-9:00(AM)</h2>
                <h2 className="text-sm p-1 font-semibold">9:00-10:00(AM)</h2>
                <h2 className="text-sm p-1 font-semibold">11:00-12:00(AM)</h2>
                <h2 className="text-sm p-1 font-semibold">12:00-1:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">1:00-2:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">2:00-3:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">3:00-4:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">4:00-5:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">5:00-6:00(PM)</h2>
              </div> */}
              <div className="grid grid-cols-4 md:grid-cols-10">
                {appointmentCount &&
                  appointmentCount.map((count, index) => {
                    let start = index + 8;
                    let end = index + 9;
                    return (
                      <>
                        <h2 className="text-sm p-1 font-semibold">
                          {start + "-" + end}
                        </h2>
                        <div
                          className="bg-blue-200 p-2 border-2 border-blue-700  hover:bg-blue-500 transition-all "
                          key={index}
                        >
                          <h3 className="hover:text-white transition-all text-2xl font-bold text-blue-700 text-center">
                            {count}
                          </h3>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
          {/* <div className="my-5">
            <h2 className="text-gray-400 text-xl font-semibold my-1">
              Today Pending Appointments
            </h2>
            <div>
              <div className="grid grid-cols-9">
                <h2 className="text-sm p-1 font-semibold">8:00-9:00(AM)</h2>
                <h2 className="text-sm p-1 font-semibold">9:00-10:00(AM)</h2>
                <h2 className="text-sm p-1 font-semibold">11:00-12:00(AM)</h2>
                <h2 className="text-sm p-1 font-semibold">12:00-1:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">1:00-2:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">2:00-3:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">3:00-4:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">4:00-5:00(PM)</h2>
                <h2 className="text-sm p-1 font-semibold">5:00-6:00(PM)</h2>
              </div>
              <div className="grid grid-cols-10">
                {appointmentCount &&
                  appointmentCount.map((count, index) => {
                    return (
                      <div
                        className="bg-blue-200 p-2 border-2 border-blue-700  hover:bg-blue-500 transition-all "
                        key={index}
                      >
                     
                        <h3 className="hover:text-white transition-all text-2xl font-bold text-blue-700 text-center">
                          {count}
                        </h3>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div> */}
        </div>
        {console.log(checkAuth)}
        {checkAuth.auth && (
          <>
            <div>
              <h2 className="text-gray-400 text-xl font-semibold my-2">
                All Staff
              </h2>

              <div className=" mr-10 border-2 border-gray-200 rounded-xl">
                <div className="grid grid-cols-4 md:grid-cols-6 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb ">
                  <h2>Id</h2>
                  <h2 className="">Name</h2>
                  <h2 className="hidden md:block">Hospital Name</h2>
                  <h2 className="hidden md:block">Role</h2>
                  {/* <h2>hospitalName</h2> */}
                  <h2>Update</h2>
                  <h2>Delete</h2>
                </div>
                <div className="">
                  {/* {console.log(allData)} */}
                  {data &&
                    data.doc.users.map((user) => {
                      return <Users user={user} />;
                      // <Patients patient={patient} />
                    })}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-gray-400 text-xl font-semibold my-2">
                All Doctors
              </h2>
              <div className=" mr-10 border-2 border-gray-200 rounded-xl">
                <div className="grid grid-cols-5 md:grid-cols-6 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb ">
                  <h2>Id</h2>
                  <h2 className="">Name</h2>
                  <h2 className="hidden md:block">role</h2>
                  <h2>doctorId</h2>
                  {/* <h2>Date Of Birth</h2> */}
                  <h2>Update</h2>
                  <h2>Delete</h2>
                </div>
                <div className="">
                  {/* {console.log(allData)} */}
                  {data &&
                    data.doc.doctors.map((doctor) => {
                      return <Doctors doctor={doctor} />;
                    })}
                </div>
              </div>
            </div>
            <div className="text-center mt-10">
              {/* {console.log(
                      data.doc.doctors[
                        Math.floor(Math.random() * data.doc.doctors.length)
                      ]._id
                    )} */}
              <h2
                // href="/appointment/CreateAppointment"
                onClick={() =>
                  router.push(`/Analytics/hospital/${data.doc._id}`)
                }
                className="text-xl font-bold text-white bg-blue-600 p-4 hover:bg-blue-500 transition-all cursor-pointer"
              >
                Analytics
              </h2>
            </div>
          </>
        )}
      </Layout>
    </>
  );
};

Hospital.getInitialProps = async ({ query }) => {
  // console.log(query);
  return await oneHospital(query.hospital)
    .then((data) => {
      // console.log(data);
      return { data };
    })
    .catch((err) => {
      console.log(err);
    });
};
export default Hospital;
