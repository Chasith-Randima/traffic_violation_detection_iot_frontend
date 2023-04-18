import React, { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";
// import { isAuth } from "../actions/auth";
import { useRouter } from "next/router";

const Sidebar = ({ showSideBar }) => {
  const [patientId, setPatientId] = useState();
  const [doctorId, setDoctorId] = useState();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("patient")) {
      setPatientId(JSON.parse(localStorage.getItem("patient"))._id);
    } else if (localStorage.getItem("doctor")) {
      setDoctorId(JSON.parse(localStorage.getItem("doctor"))._id);
    } else if (localStorage.getItem("user"))
      setUserId(JSON.parse(localStorage.getItem("user"))._id);
    setUserData(JSON.parse(localStorage.getItem("user")));
    console.log(patientId, userId, doctorId);
    // console.log(JSON.parse(localStorage.getItem("user"))._id);
    // console.log(JSON.parse(localStorage.getItem("doctor"))._id);
    // console.log(JSON.parse(localStorage.getItem("patient"))._id);

    // if (isAuth("patient") == undefined) {
    //   const timeoutID = window.setTimeout(() => {
    //     console.log(isAuth("patient"));
    //     setId(isAuth("patient")._id);
    //   }, 5000);
    //   console.log(id);

    //   return () => window.clearTimeout(timeoutID);
    // } else {
    //   setId(isAuth("patient")._id);
    // }
  }, []);
  // console.log(router.asPath);
  // console.log(router.asPath == "/mainPage");
  const patientSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/mainPage"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/mainPage")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Hospitals
          </h2>
        </div>
        {/* <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/que/AllQue"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
         
          <h2
            
            onClick={() => router.push("/que/AllQue")}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Que
          </h2>
        </div> */}
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == `/appointment/allPatients/${patientId}`
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href={`/appointment/allPatients/${patientId}`}
            onClick={() => router.push(`/appointment/allPatients/${patientId}`)}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Appointments
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == `/ticket/allPatients/${patientId}`
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href={`/ticket/allPatients/${patientId}`}
            onClick={() => router.push(`/ticket/allPatients/${patientId}`)}
            className="my-1 ml-2 text-xl cursor-pointer"
          >
            Tickets
          </h2>
        </div>
        {patientId && (
          <div
            className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
              router.asPath == `/profile/onePatient/${patientId}`
                ? "bg-blue-300 text-white"
                : "text-black bg-gray-300"
            }`}
          >
            {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
            <h2
              // href={`/profile/onePatient/${patientId}`}
              onClick={() => router.push(`/profile/onePatient/${patientId}`)}
              className="my-1 ml-2 text-xl cursor-pointer"
            >
              Profile
            </h2>
          </div>
        )}
      </div>
    );
  };
  const doctorSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/mainPage"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            onClick={() => router.push("/mainPage")}
            className="my-1 ml-2 text-xl"
          >
            Hospitals
          </h2>
        </div>
        {/* <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/que/AllQue"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
      
          <h2
           
            onClick={() => router.push("/que/AllQue")}
            className="my-1 ml-2 text-xl"
          >
            Que
          </h2>
        </div> */}
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/qr/ScanQR"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/que/AllQue"
            onClick={() => router.push("/qr/ScanQR")}
            className="my-1 ml-2 text-xl"
          >
            Scan QR
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == `/appointment/allDoctors/${doctorId}`
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href={`/appointment/allDoctors/${doctorId}`}
            onClick={() => router.push(`/appointment/allDoctors/${doctorId}`)}
            className="my-1 ml-2 text-xl"
          >
            Appointments
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == `/ticket/allDoctors/${doctorId}`
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href={`/ticket/allDoctors/${doctorId}`}
            onClick={() => router.push(`/ticket/allDoctors/${doctorId}`)}
            className="my-1 ml-2 text-xl"
          >
            Tickets
          </h2>
        </div>
        {doctorId && (
          <div
            className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
              router.asPath == `/profile/oneDoctor/${doctorId}`
                ? "bg-blue-300 text-white"
                : "text-black bg-gray-300"
            }`}
          >
            {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
            <h2
              // href={`/profile/oneDoctor/${doctorId}`}
              onClick={() => router.push(`/profile/oneDoctor/${doctorId}`)}
              className="my-1 ml-2 text-xl"
            >
              Profile
            </h2>
          </div>
        )}
      </div>
    );
  };
  const staffSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == `/mainPage`
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            //  href="/mainPage"
            onClick={() => router.push(`/mainPage`)}
            className="my-1 ml-2 text-xl"
          >
            Hospitals
          </h2>
        </div>
        {/* <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/que/AllQue"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
         
          <h2
           
            onClick={() => router.push("/que/AllQue")}
            className="my-1 ml-2 text-xl"
          >
            Que
          </h2>
        </div> */}

        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/qr/ScanQR"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/que/AllQue"
            onClick={() => router.push("/qr/ScanQR")}
            className="my-1 ml-2 text-xl"
          >
            Scan QR
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/appointment/User"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/appointment/User"
            onClick={() => router.push("/appointment/User")}
            className="my-1 ml-2 text-xl"
          >
            Appointments
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/ticket/User"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/ticket/User"
            onClick={() => router.push("/ticket/User")}
            className="my-1 ml-2 text-xl"
          >
            Tickets
          </h2>
        </div>
        {userId && (
          <div
            className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
              router.asPath == `/profile/oneUser/${userId}`
                ? "bg-blue-300 text-white"
                : "text-black bg-gray-300"
            }`}
          >
            {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
            <h2
              // href={`/profile/oneUser/${userId}`}
              onClick={() => router.push(`/profile/oneUser/${userId}`)}
              className="my-1 ml-2 text-xl"
            >
              Profile
            </h2>
          </div>
        )}
      </div>
    );
  };
  const adminSidebar = () => {
    return (
      <div className="md:mr-10 ">
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/mainPage"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/mainPage"
            onClick={() => router.push("/mainPage")}
            className="my-1 ml-2 text-xl"
          >
            Hospitals
          </h2>
        </div>
        {/* <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/que/AllQue"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          
          <h2
            href="/que/AllQue"
            onClick={() => router.push("/que/AllQue")}
            className="my-1 ml-2 text-xl"
          >
            Que
          </h2>
        </div> */}

        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/qr/ScanQR"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/que/AllQue"
            onClick={() => router.push("/qr/ScanQR")}
            className="my-1 ml-2 text-xl"
          >
            Scan QR
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/appointment/User"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/main/Doctor"
            onClick={() => router.push("/appointment/User")}
            className="my-1 ml-2 text-xl"
          >
            Appointments
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/ticket/User"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            href="/main/User"
            onClick={() => router.push("/ticket/User")}
            className="my-1 ml-2 text-xl"
          >
            Tickets
          </h2>
        </div>
        {userId && (
          <div
            className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
              router.asPath == `/profile/oneUser/${userId}`
                ? "bg-blue-300 text-white"
                : "text-black bg-gray-300"
            }`}
          >
            {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
            <h2
              // href={`/profile/onePatient/${userId}`}
              onClick={() => router.push(`/profile/oneUser/${userId}`)}
              className="my-1 ml-2 text-xl"
            >
              Profile
            </h2>
          </div>
        )}
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/patients"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            href="/patients"
            onClick={() => router.push("/patients")}
            className="my-1 ml-2 text-xl"
          >
            All Patients
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/users"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            //  href="/users"
            onClick={() => router.push("/users")}
            className="my-1 ml-2 text-xl"
          >
            All Users
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/hospital/allHospitals"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            // href="/hospital/allHospitals"
            onClick={() => router.push("/hospital/allHospitals")}
            className="my-1 ml-2 text-xl"
          >
            All Hospitals
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/doctors"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            //  href="/doctors/"
            onClick={() => router.push("/doctors")}
            className="my-1 ml-2 text-xl"
          >
            All Doctors
          </h2>
        </div>
        <div
          className={`  my-2 font-medium p-2 w-full  rounded-md  hover:bg-blue-300 hover:text-white transition-all ${
            router.asPath == "/Analytics/AllAnalytics"
              ? "bg-blue-300 text-white"
              : "text-black bg-gray-300"
          }`}
        >
          {/* <h2 className="my-1 ml-2 text-xl">page 1</h2> */}
          <h2
            //  href="/doctors/"
            onClick={() => router.push("/Analytics/AllAnalytics")}
            className="my-1 ml-2 text-xl"
          >
            Analytics
          </h2>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* <div className={`${showSideBar ? "" : "hidden"}`}> */}
      {/* <div> */}
      <h2 className="text-gray-400 text-xl font-semibold my-3 md:my-1">
        Dashboard
      </h2>
      {/* {console.log(userId, patientId, doctorId)} */}
      {/* <div> */}
      {userId &&
        JSON.parse(localStorage.getItem("user")).role == "admin" &&
        adminSidebar()}
      {userId &&
        JSON.parse(localStorage.getItem("user")).role != "admin" &&
        staffSidebar()}

      {patientId && patientSidebar()}
      {doctorId && doctorSidebar()}
      {/* </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Sidebar;
