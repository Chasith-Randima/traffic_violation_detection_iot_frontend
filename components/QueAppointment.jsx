import { getCookie } from "actions/auth";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { deleteAppointment, deleteAppointmentUser } from "actions/appointment";
const QueAppointment = ({ appointment, indexId }) => {
  console.log(appointment);
  const router = useRouter();
  const handleDelete = (id) => {
    // e.preventDefault();
    console.log("clickkedd....", id);
    // e.preventDefault();
    let token;

    if (getCookie("token_patient")) {
      token = getCookie("token_patient");

      deleteAppointment(id, token)
        .then((data) => {
          console.log(data);
          router.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (getCookie("token_user")) {
      if (JSON.parse(localStorage.getItem("user")).role != "staff") {
        token = getCookie("token_user");

        deleteAppointmentUser(id, token)
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

  const test = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <div className="grid grid-cols-8 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3>{indexId + 1}</h3>
        <h3>{appointment.queNumber}</h3>
        <h3>
          {appointment._id.substr(
            appointment._id.length / 2,
            appointment._id.length
          )}
        </h3>

        {/* <h3></h3> */}
        <Link className="" href={`/appointment/one/${appointment._id}`}>
          {appointment.name}
        </Link>

        <h3>{appointment.appointmentDate.split("T")[0]}</h3>
        <h3>{appointment.appointmentTime}</h3>
        <h3>Active</h3>
        <h3
          value={"Cancel"}
          onClick={() => handleDelete(appointment._id)}
          // onClick={() => test()}
          className="cursor-pointer"
        >
          Cancel
        </h3>
        {/* <h3>Update</h3> */}
        {/* <h3>
          <Link
            className="col-span-2"
            href={`/appointment/update/${appointment._id}`}
          >
            update
          </Link>
        </h3> */}
      </div>
    </>
  );
};

export default QueAppointment;
