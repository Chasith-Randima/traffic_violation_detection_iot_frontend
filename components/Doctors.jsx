import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { deletePatient } from "actions/patient";
import { deleteDoctor } from "actions/doctor";
import { getCookie } from "actions/auth";

const Doctors = ({ doctor }) => {
  const router = useRouter();
  const handleDelete = (id) => {
    // e.preventDefault();
    console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      if (JSON.parse(localStorage.getItem("user")).role == "admin") {
        token = getCookie("token_user");

        deletedoctor(id, token)
          .then((data) => {
            console.log(data);
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };
  return (
    <>
      <div className="grid grid-cols-5 md:grid-cols-6 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3 className="hidden md:block">
          {doctor &&
            doctor._id &&
            doctor._id.substr(doctor._id.length / 2, doctor._id.length)}
        </h3>
        <h3 className="md:hidden">
          {doctor &&
            doctor._id &&
            doctor._id.substr(doctor._id.length - 4, doctor._id.length)}
        </h3>

        <Link href={`/infoProfile/doctor/${doctor._id}`} className="">
          {/* <Link href={`/doctor/one/${doctor._id}`} className="col-span-2"> */}
          {doctor.name}
        </Link>

        <h3 className="hidden md:block">{doctor.role}</h3>
        <h3>{doctor.doctorId}</h3>
        <Link href={`/updateRole/doctor/${doctor._id}`} className="">
          {/* <Link href={`/doctor/one/${doctor._id}`} className="col-span-2"> */}
          update
        </Link>

        <h3
          value={"Cancel"}
          onClick={() => handleDelete(doctor._id)}
          // onClick={() => test()}
          className="cursor-pointer"
        >
          Delete
        </h3>
        {/* <h3>{doctor.active ? "Pending" : "Closed"}</h3> */}
        {/* <h3>Cancel</h3> */}
        {/* <h3>{doctor.diagnosisTitle}</h3>
        {type && (
          <Link href={`/doctor/update/${doctor._id}`}>
            <h3>Update</h3>
          </Link>
        )} */}
      </div>
    </>
  );
};

export default Doctors;
