import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deletePatient } from "actions/patient";
import { getCookie } from "actions/auth";

const Patients = ({ patient }) => {
  const router = useRouter();
  const handleDelete = (id) => {
    // e.preventDefault();
    console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      if (JSON.parse(localStorage.getItem("user")).role == "admin") {
        token = getCookie("token_user");

        deletePatient(id, token)
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
          {patient._id.substr(patient._id.length / 2, patient._id.length)}
        </h3>
        <h3 className="md:hidden">
          {patient._id.substr(patient._id.length - 5, patient._id.length)}
        </h3>

        <Link href={`/infoProfile/patient/${patient._id}`} className="">
          {/* <Link href={`/patient/one/${patient._id}`} className="col-span-2"> */}
          {patient.name}
        </Link>

        <h3>{patient.nic}</h3>
        <h3>{patient.dateOfBirth.split("T")[0]}</h3>
        <h3 className="hidden md:block">{patient.city}</h3>
        <h3
          value={"Cancel"}
          onClick={() => handleDelete(patient._id)}
          // onClick={() => test()}
          className="cursor-pointer"
        >
          Cancel
        </h3>
        {/* <h3>{patient.active ? "Pending" : "Closed"}</h3> */}
        {/* <h3>Cancel</h3> */}
        {/* <h3>{patient.diagnosisTitle}</h3>
        {type && (
          <Link href={`/patient/update/${patient._id}`}>
            <h3>Update</h3>
          </Link>
        )} */}
      </div>
    </>
  );
};

export default Patients;
