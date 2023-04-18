import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { deletePatient } from "actions/patient";
import { getCookie } from "actions/auth";
import { deleteUser } from "actions/user";

const Users = ({ user }) => {
  console.log(user.role);
  const router = useRouter();
  const handleDelete = (id) => {
    // e.preventDefault();
    console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_user")) {
      if (JSON.parse(localStorage.getItem("user")).role == "admin") {
        token = getCookie("token_user");

        deleteUser(id, token)
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
      <div className="grid grid-cols-4 md:grid-cols-5 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3 className="hidden md:block">
          {user._id.substr(user._id.length / 2, user._id.length)}
        </h3>
        <h3 className="md:hidden">
          {user._id.substr(user._id.length - 5, user._id.length)}
        </h3>

        <Link href={`/infoProfile/user/${user._id}`} className="">
          {/* <Link href={`/user/one/${user._id}`} className="col-span-2"> */}
          {user.name}
        </Link>

        <h3 className="hidden md:blcok">
          {user.hospitals.length > 0 && user.hospitals[0].name}
        </h3>
        <h3 className="hidden md:block">{user.role}</h3>
        {/* <h3 className="">{user.city}</h3> */}
        <Link href={`/updateRole/user/${user._id}`} className="">
          {/* <Link href={`/user/one/${user._id}`} className="col-span-2"> */}
          update
        </Link>
        <h3
          value={"Cancel"}
          onClick={() => handleDelete(user._id)}
          // onClick={() => test()}
          className="cursor-pointer"
        >
          Delete
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

export default Users;
