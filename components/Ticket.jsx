import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Ticket = ({ ticket, type }) => {
  const router = useRouter();
  // console.log(ticket.doctors[0].hospitals[0].name);
  return (
    <>
      <div className="grid grid-cols-7  md:grid-cols-9 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl">
        <h3 className="hidden md:block">
          {ticket._id.substr(ticket._id.length - 5, ticket._id.length)}
        </h3>
        <h3 className="md:hidden">
          {ticket._id.substr(ticket._id.length - 5, ticket._id.length)}
        </h3>

        <Link
          href={`/ticket/one/${ticket._id}`}
          className="hidden md:col-span-2"
        >
          {ticket.doctors[0].hospitals[0].name}
        </Link>
        <h3
          className="col-span-1 md:col-span-2"
          onClick={() => router.push(`/ticket/one/${ticket._id}`)}
        >
          {ticket.diagnosisTitle.substr(0, 10)}
        </h3>
        <h3>{ticket.createdAt.split("T")[0]}</h3>
        <h3>{ticket.createdAt.split("T")[1].substring(0, 5)}</h3>
        <h3 className="hidden md:block">{ticket.doctors[0].name}</h3>
        <h3>{ticket.active ? "Pending" : "Closed"}</h3>
        <h3>Cancel</h3>

        {/* {type && ( */}
        <Link href={`/ticket/update/${ticket._id}`}>
          <h3>Update</h3>
        </Link>
        {/* )} */}
      </div>
    </>
  );
};

export default Ticket;
