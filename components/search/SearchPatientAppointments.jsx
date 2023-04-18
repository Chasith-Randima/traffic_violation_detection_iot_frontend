import {
  searchAppointments,
  searchPatientAppointments,
} from "actions/appointment";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const SearchPatientAppointments = ({ patientId }) => {
  //   const [search, setSearch] = useState();
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
    console.log("submitte...");
    handleSubmit();
    // console.log(data);
  }, [values.search]);

  console.log(values.search);

  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log("triggerd..");
    console.log(search);
    await searchAppointments({ search: search })
      .then((data) => {
        console.log(data);
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
        console.log(data.data.patients[0]._id);
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
          placeholder="Search Appointments"
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
            data.data.map((appointment) => {
              console.log(appointment.name);
              return (
                <>
                  <div className="grid grid-cols-7 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl text-center">
                    <h3 className="col-span-1">
                      {appointment._id.substr(
                        appointment._id.length / 2,
                        appointment._id.length
                      )}
                    </h3>

                    {/* <h3></h3> */}
                    <Link
                      className="col-span-2"
                      href={`/appointment/one/${appointment._id}`}
                    >
                      {appointment.hospitals[0].name}
                    </Link>

                    <h3 className="col-span-2">{appointment.name}</h3>
                    <h3 className="col-span-2">
                      {appointment.active ? "Active" : "Closed"}
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

export default SearchPatientAppointments;
