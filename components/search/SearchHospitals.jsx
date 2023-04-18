import React, { useState, useEffect } from "react";
import { searchHospitals } from "actions/hospital";
import Link from "next/link";

const SearchHospitals = () => {
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
    await searchHospitals({ search: search })
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
          placeholder="Search Hospitals"
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
            data.doc.map((hospital) => {
              console.log(hospital.name);
              return (
                <>
                  <div className="grid grid-cols-3 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl text-center">
                    <h3 className="hidden md:block col-span-1">
                      {hospital._id.substr(
                        hospital._id.length / 2,
                        hospital._id.length
                      )}
                    </h3>
                    <h3 className="md:hidden col-span-1">
                      {hospital._id.substr(
                        hospital._id.length - 5,
                        hospital._id.length
                      )}
                    </h3>

                    {/* <h3></h3> */}
                    <Link className="" href={`/hospital/one/${hospital._id}`}>
                      {hospital.name}
                    </Link>

                    <h3 className="">{hospital.city}</h3>
                    {/* <h3 className="col-span-2">
                      {hospital.active ? "Active" : "Closed"}
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

export default SearchHospitals;

// {/* <div className="absolute z-100   h-auto pb-10 bg-gray-200 mr-10 rounded w-1/3">
//         {search.length != 0 && data && (
//             {/* {console.log(data.data)} */}
//         <div className="flex justify-between  p-1 my-5">
//               <h2 className="text-lg font-semibold ml-5">{data.message}</h2>
//               <span
//                 className="text-lg font-semibold pd-4 bg-red-500 text-white rounded mr-10 cursor-pointer"
//                 onClick={() => setValues({ ...values, search: "" })}
//               >
//                 close
//               </span>
//               </div>

//         )}
//         {console.log(data, "this is from line 62...")}
//         {search.length != 0 &&
//           data &&
//           data.doc.map((hospital) => {
//             console.log(hospital.name);
//             return (
//               <>
//                 <div className="grid grid-cols-7 p-4 border-b-2 border-gray-200 hover:bg-gray-300 transition-all rounded-xl text-center">
//                   <h3 className="col-span-1">
//                     {hospital._id.substr(
//                       hospital._id.length / 2,
//                       hospital._id.length
//                     )}
//                   </h3>

//                   {/* <h3></h3> */}
//                   <Link
//                     className="col-span-2"
//                     href={`/hospitals/one/${hospital._id}`}
//                   >
//                     {hospital.name}
//                   </Link>

//                   {/* <h3 className="col-span-2">{hospital.name}</h3> */}
//                   {/* <h3 className="col-span-2">
//                       {hospital.active ? "Active" : "Closed"}
//                     </h3> */}
//                 </div>
//               </>
//             );
//           })}
//           </div>
//       </div> */}
