import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { searchdoctors } from "actions/patient";
import { getCookie } from "actions/auth";
import { searchDoctors } from "actions/doctor";

const SearchDoctors = () => {
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
    handleSubmit();
    // console.log(data);
  }, [values.search]);

  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log("triggerd..");
    // console.log(search);
    let token = getCookie("token_patient");
    await searchDoctors({ search: search })
      .then((data) => {
        console.log(data);
        setData(data);
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
          placeholder="Search patients"
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
            data.data.map((doctor) => {
              // console.log(patient.name);
              return (
                <>
                  <div className="grid grid-cols-4 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl text-center">
                    <h3 className="hidden md:block col-span-1">
                      {doctor._id.substr(
                        doctor._id.length / 2,
                        doctor._id.length
                      )}
                    </h3>
                    <h3 className="md:hidden col-span-1">
                      {doctor._id.substr(
                        doctor._id.length - 5,
                        doctor._id.length
                      )}
                    </h3>

                    {/* <h3></h3> */}
                    <h3
                    // className="col-span-2"
                    // href={`/doctor/one/${doctor._id}`}
                    >
                      {doctor.name}
                    </h3>
                    {/* <Link
                      className="col-span-2"
                      href={`/doctor/one/${doctor._id}`}
                    >
                      {doctor.name}
                    </Link> */}

                    <h3 className="">{doctor.role}</h3>
                    <h3 className="">{doctor.doctorId}</h3>
                    {/* <h3 className="">{doctor.city}</h3> */}
                    {/* <h3></h3> */}
                    {/* <h3 className="col-span-2">
                      {doctor.active ? "Active" : "Closed"}
                    </h3> */}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default SearchDoctors;
