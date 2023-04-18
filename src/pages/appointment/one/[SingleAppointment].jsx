import {
  allAppointments,
  oneAppointment,
  updateAppointment,
} from "actions/appointment";
import { isAuth } from "actions/auth";
import Layout from "components/Layout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GenerateQR from "components/GenerateQR";
import { getCookie } from "actions/auth";
import Message from "components/Message";

const SingleAppointment = ({ data }) => {
  console.log(data);
  const [totalCount, setTotalCount] = useState();
  const router = useRouter();
  console.log(data);
  console.log(router.asPath);
  console.log(new Date().toISOString().split("T")[1]);
  let user;

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  if (getCookie("token_user")) {
    user = true;
  }
  useEffect(() => {
    setAlert({ ...alert, loading: true });
    let limit;
    let page;
    let active;

    let appointmentDate1;
    let appointmentDate2;
    let hospitalName;
    let arrived;
    let qued;
    let params = {
      limit,
      page,
      active,
      appointmentDate1,
      appointmentDate2,
      hospitalName,
      arrived,
      qued: true,
      active: true,
    };
    allAppointments(params)
      .then((data) => {
        if (data.status && data.status == "success") {
          setTotalCount(data.totalCount);
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

  useEffect(() => {
    // console.log(data);
    // const newDate = new Date();
    // console.log(data.doc.appointmentDate.split("T")[0]);
    console.log(new Date(new Date().toISOString().split("T")[0]));

    // let currentDate = new Date(now).toISOString();
    // // currentDate = new Date(currentDate);
    // console.log(currentDate);
    // console.log(
    //   parseFloat(new Date().toISOString().split("T")[0]),
    //   parseFloat(data.doc.appointmentDate.split("T")[0])
    // );
    if (
      new Date(new Date().toISOString().split("T")[0]) <
      new Date(data.doc.appointmentDate)
    ) {
      // alert("Please wait till the date..");
      if (getCookie("token_doctor")) {
        setAlert({ ...alert, message: "Please wait till appointment date.." });
        router.push("/mainPage");
      } else {
        return;
      }
    } else {
      return;
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("patient")) {
      if (
        data &&
        data.doc.patients.length > 0 &&
        JSON.parse(localStorage.getItem("patient"))._id !=
          data.doc.patients[0]._id
      ) {
        alert("You dont have the permission to access this route..");
        router.push("/mainPage");
      }
    }
  }, []);

  // let arrivedTime = new Date()
  //   .toISOString()
  //   .split("T")[1]
  //   .split(":")
  //   .splice(0, 2);
  let arrivedTime = `${new Date().toISOString().split("T")[1].split(":")[0]}:${
    new Date().toISOString().split("T")[1].split(":")[1]
  }`;
  // console.log(data.doc.appointmentTime);
  // console.log(data.doc.appointmentTime.split(":")[0]);
  // console.log(data.doc.appointmentTime.split(":")[1]);
  let newAppointment = `${
    parseFloat(data.doc.appointmentTime.split(":")[0]) + 1
  }:${data.doc.appointmentTime.split(":")[1]}`;

  console.log(newAppointment > arrivedTime);
  console.log(newAppointment);
  console.log(arrivedTime);
  // console.log(
  //   parseFloat(arrivedTime) > parseFloat(data.doc.appointmentTime) + 1
  // );
  // console.log(newArrived);

  const handleHere = async (e) => {
    setAlert({ ...alert, loading: true });
    console.log("clicked...");
    let limit = 2;
    let page = 1;
    let active;
    let appointmentDate1;
    let appointmentDate2;
    let arrived = true;
    // let arrivedTime = new Date().toISOString().split("T")[1];
    let quedCount = totalCount;

    // if (data.doc.appointmentTime + 1 > arrivedTime) {
    //   if (quedcount > 100) {
    //     alert("You are too early...please come near your appointment time..");
    // } else {

    let arrivedTime = `${
      new Date().toISOString().split("T")[1].split(":")[0]
    }:${new Date().toISOString().split("T")[1].split(":")[1]}`;

    let newAppointment = `${
      parseFloat(data.doc.appointmentTime.split(":")[0]) + 1
    }:${data.doc.appointmentTime.split(":")[1]}`;

    console.log(newAppointment > arrivedTime);
    console.log(newAppointment);
    console.log(arrivedTime);

    if (newAppointment > arrivedTime && quedCount >= 100) {
      setAlert({
        ...alert,
        message:
          "You are too early..Please come around Your appointment time..",
      });
      alert("You are too early...Plase come around your appointment time");
    } else {
      let params = {
        arrived: true,
        arrivedTime: arrivedTime,
        qued: true,
        queNumber: quedCount + 1,
      };
      let token = getCookie("token_patient");
      await updateAppointment(data.doc._id, params, token)
        .then((data) => {
          if (data.status && data.status == "success") {
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
          console.log(data);
          router.reload();
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
    }

    // }
    // }
    // let appointmentDate1 = "2023-03-05T00:00:00.000Z";
    // let appointmentDate2 = "2023-07-05T00:00:00.000Z";
    let hospitalName;
  };
  return (
    <>
      <Layout>
        {/* {false && ( */}
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
        <div className="mt-5 mr-5 shadow-xl ">
          <h2 className="text-gray-400 text-xl font-semibold mx-5 ">
            Appointment Info
          </h2>
          <div className="border-2 border-gray-200 rounded-xl p-2 m-5 mb-5">
            <div className="grid grid-cols-4 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
              <div className="col-span-2 p-2">
                <h2 className="text-lg font-semibold text-gray-600 ">
                  Patient Name :{" "}
                  <span
                    onClick={() =>
                      router.push(
                        `/infoProfile/patient/${
                          data.doc.patients.length > 0 &&
                          data.doc.patients[0]._id
                        }`
                      )
                    }
                  >
                    {data.doc.patients.length > 0 && data.doc.patients[0].name}
                  </span>
                </h2>
              </div>
              <div className="col-span-2 p-2">
                <h2 className="text-lg font-semibold text-gray-600 ">
                  Patient Age :{" "}
                  <span>
                    {/* {console.log(data.doc.patients[0].dateOfBirth)}
                    {data.doc.patients[0].dateOfBirth} */}
                    {parseInt(new Date().toISOString()) -
                      parseInt(
                        data.doc.patients.length > 0 &&
                          data.doc.patients[0].dateOfBirth.split("T")[0]
                      )}
                  </span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-4 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
              <div className="col-span-2 p-2">
                <h2 className="text-lg font-semibold text-gray-600 ">
                  Doctor Name : <span>{data.doc.doctors[0].name}</span>
                </h2>
              </div>
              <div className="col-span-2 p-2">
                <h2 className="text-lg font-semibold text-gray-600 ">
                  Hospital : <span>{data.doc.hospitals[0].name}</span>
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-4 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
              <div className="col-span-2 p-2">
                <h2 className="text-lg font-semibold text-gray-600 ">
                  Status : <span>{data.doc.active ? "Pending" : "Closed"}</span>
                </h2>
              </div>
            </div>

            {true && data.doc.arrived != true && (
              <div className="grid grid-cols-4 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
                <div className="col-span-2 p-2">
                  <h2 className="text-lg font-semibold text-gray-600 ">
                    Arrived : <span>{data.doc.arrived ? "Pending" : "No"}</span>
                  </h2>
                </div>
                <div className="col-span-2 p-2 bg-blue-400 text-white rounded hover:bg-blue-700 transition-all hover:text-white cursor-pointer text-center">
                  <h2 className="text-lg font-semibold " onClick={handleHere}>
                    I'm Here
                  </h2>
                </div>
              </div>
            )}
          </div>
          {getCookie("token_doctor") && (
            <div className="text-center col-span-3 my-5   ">
              <Link
                className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer mb-5"
                href={{
                  pathname: "/ticket/CreateTicket",
                  query: {
                    doctorId: data.doc.doctors[0]._id,
                    appointmentId: data.doc._id,
                    patientId:
                      data &&
                      data.doc.patients.length > 0 &&
                      data.doc.patients[0]._id,
                    hospitals:
                      data &&
                      data.doc.hospitals.length > 0 &&
                      data.doc.hospitals[0]._id,
                  },
                }}
              >
                Create the Ticket
              </Link>
            </div>
          )}
        </div>
        {/* )} */}

        <div className="mt-5 mr-5 shadow-xl">
          <h2 className="text-gray-400 text-xl font-semibold mx-5 ">QR Code</h2>
          <div className="ml-2 mr-10">
            <GenerateQR
              data={`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}${router.asPath}`}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

SingleAppointment.getInitialProps = async ({ query }) => {
  // console.log(query);
  return await oneAppointment(query.SingleAppointment)
    .then((data) => {
      return { data };
    })
    .catch((err) => {
      console.log(err);
    });
};
export default SingleAppointment;
