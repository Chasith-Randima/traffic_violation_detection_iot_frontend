import React, { useState, useEffect } from "react";
import Link from "next/link";
import SearchTickets from "./SearchTickets";
import { searchTicket } from "actions/ticket";

const SearchPatientTickets = ({ patientId }) => {
  const [values, setValues] = useState({
    search: "",
  });
  const [data, setData] = useState();
  const { search } = values;

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
  };

  useEffect(() => {
    handleSubmit();
    // console.log(data);
  }, [values.search]);

  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log("triggerd..");
    // console.log(search);
    await searchTicket({ search: search })
      .then((data) => {
        let array = [];
        console.log(data.data[0].patients[0]);
        data.data.map((app) => {
          if (app.patients[0] == patientId) {
            array.push(app);
          }
        });
        console.log(data);
        data.data = array;
        data.message = `${array.length} found..`;
        setData(data);
        console.log(data);
        console.log(data.data.doctors[0]._id);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="col-span-3">
        {/* {search.length == 0 && <h2>working..</h2>} */}
        <input
          type="text"
          value={search}
          onChange={handleChange("search")}
          className="w-full p-2 border-2 border-gray-400 rounded text-lg font-semibold text-gray-600"
          placeholder="Search Tickets"
        />
        <div className="absolute z-100   h-auto pb-10 bg-gray-200 mr-10 rounded">
          {/* {console.log(data.data)} */}
          {search.length != 0 && data && (
            <div className="flex justify-between  p-1 my-5">
              <h2 className="text-lg font-semibold ml-5">{data.message}</h2>
              <span
                className="text-lg font-semibold pd-4 bg-red-500 text-white rounded mr-10 cursor-pointer"
                onClick={() => setValues({ ...values, search: "" })}
              >
                close
              </span>
            </div>
          )}
          {search.length != 0 &&
            data &&
            data.data.map((ticket) => {
              // console.log(ticket.name);
              return (
                <>
                  <div className="grid grid-cols-7 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl text-center">
                    <h3 className="col-span-1">
                      {ticket._id.substr(
                        ticket._id.length / 2,
                        ticket._id.length
                      )}
                    </h3>

                    {/* <h3></h3> */}
                    <Link
                      className="col-span-2"
                      href={`/tickets/one/${ticket._id}`}
                    >
                      {ticket.hospitals[0].name}
                    </Link>

                    <h3 className="col-span-2">{ticket.name}</h3>
                    <h3 className="col-span-2">
                      {ticket.active ? "Active" : "Closed"}
                    </h3>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchPatientTickets;
