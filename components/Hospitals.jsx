import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteHospital } from "actions/hospital";

import { getCookie } from "actions/auth";

const Hospitals = ({ hospital }) => {
  const router = useRouter();
  const handleDelete = async (id) => {
    // e.preventDefault();
    console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      if (JSON.parse(localStorage.getItem("user")).role == "admin") {
        token = getCookie("token_user");

        await deleteHospital(id, token)
          .then((data) => {
            console.log(data);
            router.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("You dont't have the permission to perform this action...");
        return;
      }
    } else {
      alert("You dont't have the permission to perform this action...");
      return;
    }
  };
  return (
    <>
      <div className="grid grid-cols-5 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3 className="hidden md:block">
          {hospital._id.substr(hospital._id.length / 2, hospital._id.length)}
        </h3>
        <h3 className="md:hidden">
          {hospital._id.substr(hospital._id.length - 4, hospital._id.length)}
        </h3>

        <Link href={`/hospital/${hospital._id}`} className="">
          {/* <Link href={`/hospital/one/${hospital._id}`} className="col-span-2"> */}
          {hospital.name}
        </Link>

        <h3>{hospital.city}</h3>
        <Link href={`/hospital/update/${hospital._id}`} className="">
          {/* <Link href={`/hospital/one/${hospital._id}`} className="col-span-2"> */}
          Update
        </Link>

        <h3
          value={"Cancel"}
          onClick={() => handleDelete(hospital._id)}
          className="cursor-pointer"
        >
          Cancel
        </h3>
        {/* <h3>{hospital.active ? "Pending" : "Closed"}</h3> */}
        {/* <h3>Cancel</h3> */}
        {/* <h3>{hospital.diagnosisTitle}</h3>
        {type && (
          <Link href={`/hospital/update/${hospital._id}`}>
            <h3>Update</h3>
          </Link>
        )} */}
      </div>
    </>
  );
};

export default Hospitals;
