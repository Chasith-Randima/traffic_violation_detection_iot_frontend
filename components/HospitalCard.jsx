import Link from "next/link";
import React from "react";

const HospitalCard = ({ doc }) => {
  console.log(doc.appointments, "hospital card....");
  // console.log(doc.appointments, doc.doctors, doc.name);
  return (
    <>
      <div className="col-span-4 shadow-2xl rounded-xl overflow-hidden">
        <img src="/img/hospital.png" />
        <div className="p-2 text-gray-600 text-xl bg-gray-100">
          <Link href={`/hospital/${doc._id}`}>
            <h2 className="font-bold text-xl text-gray-700">{doc.name}</h2>
          </Link>
          <div className="flex justify-between gap-1 text-lg">
            <h2 className="my-2">Appointments : {doc.appointments.length}</h2>
            <h2 className="my-2">Doctors : {doc.doctors.length}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalCard;
