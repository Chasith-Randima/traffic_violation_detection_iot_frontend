import React, { useEffect, useState } from "react";
import Layout from "components/Layout";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { allPatients } from "actions/patient";
import SearchPatients from "components/search/all/SearchPatients";
import { getCookie } from "actions/auth";
import Patients from "components/Patients";
import { allUsers } from "actions/user";
import Users from "components/Users";
import SearchUsers from "components/search/all/SearchUsers";
import SearchHospitals from "components/search/SearchHospitals";
import { allHospitals } from "actions/hospital";
import Hospitals from "components/Hospitals";
import Link from "next/link";
import Message from "components/Message";
// import cookie from "js-cookie";
// import Appointment from "components/Appointment";

const Index = () => {
  // const Index = ({ data, token, cookie }) => {
  //   console.log(token, cookie);
  const [allData, setAllData] = useState();
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  //   const [totalPages, setTotalPages] = useState(
  //     Math.ceil(allData.totalCount / limit)
  //   );
  console.log(getCookie("token_user"));
  const [name, setName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  //   const [appointmentDate2, setAppointmentDate2] = useState();
  const [city, setCity] = useState();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };
  const initialSet = () => {
    setAllData(data);
  };

  // const [filters, setFilters] = useState({
  //   name: undefined,
  //   dateOfBirth: undefined,
  //   appointmentDate2: undefined,
  //   city: undefined,
  // });

  // const { name, dateOfBirth, appointmentDate2, city } = filters;

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setFilters({ ...filters, [name]: e.target.value });
  };

  // useEffect(() => {
  //   initialSet();
  // }, [data]);

  // ---------------pagination--------------------------
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPages) {
        nextPage = 1;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage <= 1) {
        prevPage = totalPages;
      }
      return prevPage;
    });
  };

  // ---------------pagination--------------------------

  useEffect(() => {
    console.log("page changed...", page);

    handleSubmit();
    // console.log(allData);
  }, [page]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setAlert({ ...alert, loading: true });
    let params = {
      limit,
      page,
      name,
      city,
    };
    let token = getCookie("token_user");

    // console.log(params, "submit clicked...");
    await allHospitals(params)
      .then((data) => {
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            setShow(false);
            initialSet();
          } else {
            setAllData(data);
            console.log(data.totalCount);
            let totalCount = data.totalCount;
            setTotalPages(Math.ceil(totalCount / limit));
            setShow(false);
          }
          setAlert({
            ...alert,
            loading: false,
            message: data && data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        }

        // return { data };
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
    // await allAppointments(params)
    //   .then((data) => {
    //     console.log(data);
    //     setAllData(data);
    //     console.log(allData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center">
          {alert.error && (
            <Message
              message={alert.message}
              // alert={"error"}
              resetAlert={resetAlert}
            />
          )}
          {alert.success && (
            <Message
              message={alert.message}
              // alert={"success"}
              resetAlert={resetAlert}
            />
          )}
          {alert.loading && (
            <Message
              message={"Loading...Please Waite..."}
              // alert={"loading"}
              resetAlert={resetAlert}
            />
          )}
        </div>
        <div className="mt-2 mb-2 p-2 mr-10 border-2 border-gray-200 rounded-xl grid grid-cols-4 ">
          {/* <SearchUsers /> */}
          <SearchHospitals />
          <div
            className="col-span-1 flex justify-between ml-3 border-2 px-3 border-gray-400 rounded text-gray-400 text-xl font-semibold cursor-pointer hover:bg-gray-400 hover:text-white"
            onClick={() => setShow(!show)}
          >
            <h2 className="hidden md:block md:p-2 text-xl font-bold">Filter</h2>
            <span className="my-auto md:p-3 text-xl font-bold">
              <BsFillFilterSquareFill />
            </span>
          </div>
        </div>
        {show ? (
          <div className="mr-10 border-2 border-gray-200 rounded-xl">
            <div className="mt-5 mr-5 shadow-xl">
              <div className="flex justify-between">
                <h2 className="text-gray-400 text-xl font-semibold mx-5 ">
                  Set Filters
                </h2>
                <span
                  className="mr-10 text-lg font-semibold text-gray-400 p-1 border-2 border-gray-400 rounded hover:bg-gray-400 hover:text-white cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  Close
                </span>
              </div>
              <form className="ml-2 mr-10">
                <div className=" m-2">
                  <div className="border-2 border-gray-200 rounded-xl p-2 ">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-1">
                        <label class="text-gray-600 mb-2 block my-2">
                          city
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          // onChange={handleChange("city")}
                          class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                          placeholder="Enter your Name"
                        />
                      </div>
                      <div className="col-span-1">
                        <label class="text-gray-600 mb-2 block my-2">
                          name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          // onChange={handleChange("name")}
                          class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                          placeholder="Enter your Name"
                        />
                      </div>
                    </div>
                    {/* <div className="">
                      <h2>Time duration</h2>
                      <div className="grid grid-cols-2 gap-2"> */}
                    {/* <div className="my-2 col-span-1">
                      <label class="text-gray-600 mb-2 block">
                        Date Of Birth
                      </label>
                      <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                        placeholder="Enter your name"
                      />
                    </div> */}
                    {/* <div className="my-2 col-span-1">
                          <label class="text-gray-600 mb-2 block">
                            Ending Date
                          </label>
                          <input
                            type="date"
                            value={appointmentDate2}
                            onChange={(e) =>
                              setAppointmentDate2(e.target.value)
                            }
                            // onChange={handleChange("appointmentDate2")}
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="my-2">
                        <label class="text-gray-600 mb-2 block">
                          Appointment Time
                        </label>
                        <input
                          type="time"
                          // value={appointmentTime}
                          // onChange={handleChange("appointmentTime")}
                          class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                          placeholder="Enter your Date Of Birth"
                        />
                      </div> */}
                  </div>
                </div>
                <div className="text-center col-span-3 my-5   ">
                  <input
                    type="submit"
                    value={"Set Filters"}
                    className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer mb-5"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className=" mr-10 border-2 border-gray-200 rounded-xl">
            <div className="grid grid-cols-5 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb ">
              <h2>Id</h2>
              <h2 className="">Name</h2>
              <h2>City</h2>
              {/* <h2>Role</h2> */}
              {/* <h2>city</h2> */}
              <h2>Update</h2>

              <h2>Delete</h2>
            </div>
            <div className="">
              {/* {console.log(allData)} */}
              {allData &&
                allData.doc.map((hospital) => {
                  return <Hospitals hospital={hospital} />;
                  // <Patients patient={patient} />
                })}
            </div>
          </div>
        )}
        {/* ------------ create hospital --------------- */}
        <div className="my-5 w-full  p-5 text-center mr-10 rounded">
          <Link
            href="/hospital/createHospital"
            className="bg-blue-500 text-white  hover:bg-blue-700 rounded p-5 font-sembibold text-xl"
          >
            Create Hospital
          </Link>
        </div>
        {/* ------------ create hospital --------------- */}

        {/* --------------------------pagination----------------------- */}
        <div
          aria-label="Page navigation example"
          className="flex justify-center mt-10"
        >
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                href="#"
                onClick={prevPage}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {[...Array(totalPages)].map((val, index) => {
              // console.log(index);
              return (
                // <li>
                <li key={index}>
                  <a
                    href="#"
                    onClick={() => setPage(index + 1)}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}

            {/* <li>
                <a
                  href="#"
                  className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
  
              <li>
                <a
                  href="#"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li> */}
            <li>
              <a
                href="#"
                onClick={nextPage}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </div>
        {/* --------------------------pagination----------------------- */}
      </Layout>
    </>
  );
};

// Index.getInitialProps = async ({ req }) => {
//   let limit = 2;
//   let page = 1;
//   let name;
//   let city;
//   //   let appointmentDate2;
//   // let dateOfBirth = "2023-03-05T00:00:00.000Z";
//   // let appointmentDate2 = "2023-07-05T00:00:00.000Z";
//   //   let city;
//   //   let token = cookie.get("token_user");
//   //   let token = getCookie("token_user");
//   //   console.log(token);
//   //   console.log(req.headers);
//   let token = req.headers.cookie.split("=")[1];

//   return allUsers(
//     {
//       limit,
//       page,
//       name,
//       city,
//       //   appointmentDate2,
//     },
//     token
//   )
//     .then((data) => {
//       console.log(data);
//       return { data, token, cookie: req.headers.cookie };
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export default Index;
