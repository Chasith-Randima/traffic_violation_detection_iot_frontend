import React, { useEffect } from "react";
import Layout from "components/Layout";
import Appointment from "components/Appointment";
import { allAppointments } from "actions/appointment";
import SearchBar from "components/SearchBar";
import { useState } from "react";
import { BsFillFilterSquareFill } from "react-icons/bs";
import QueAppointment from "components/QueAppointment";
import Message from "components/Message";

const AllQue = ({ data, query }) => {
  console.log(query);
  //   date.setDate(date.getDate() + 1);
  console.log(data);
  let date = new Date();
  //   console.log(date.setHours(0, 0, 0));
  //   console.log(date.setDate(date.getDate() + 1));
  console.log(date.setHours(0, 0, 0, 0));
  console.log(date.toISOString());
  date = date.toISOString();
  console.log(date);
  //   date = date.setDate(date.getDate() + 1);
  //   console.log(date.toISOString);
  //   date = date.setDate(date.getDate() - 2);
  //   console.log(date.toISOString());
  const [allData, setAllData] = useState(data);
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(allData.totalCount / limit)
  );
  // console.log(allData, totalPages);
  const [active, setActive] = useState();
  const [appointmentDate1, setAppointmentDate1] = useState();
  const [appointmentDate2, setAppointmentDate2] = useState();
  const [hospitalName, setHospitalName] = useState();
  const [arrived, setArrived] = useState(true);
  const [allDoctors, setAllDoctors] = useState([]);
  const initialSet = () => {
    setAllData(data);
  };

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  // const [filters, setFilters] = useState({
  //   active: undefined,
  //   appointmentDate1: undefined,
  //   appointmentDate2: undefined,
  //   hospitalName: undefined,
  // });

  // const { active, appointmentDate1, appointmentDate2, hospitalName } = filters;

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
    setAlert({ ...alert, loading: true });
    handleSubmit();
    // console.log(allData);
  }, [page]);

  const handleDoctors = (dataArray) => {
    let allDoctors = [];
    dataArray.map((item) => {
      allDoctors.push(item.doctors[0]);
      console.log(item.doctors[0]);
      console.log(allDoctors);
    });
    console.log([...new Set(allDoctors)]);
    setAllDoctors([...new Set(allDoctors)]);
    console.log(allDoctors);
  };
  // allDoctors = [...new Set(allDoctors)];
  console.log(allDoctors);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setAlert({ ...alert, loading: true });

    let date = new Date();
    //   console.log(date.setHours(0, 0, 0));
    //   console.log(date.setDate(date.getDate() + 1));
    console.log(date.setHours(0, 0, 0, 0));
    console.log(date.toISOString());
    let date2 = new Date();
    console.log(date2.setHours(0, 0, 0, 0));
    date2 = date2.setDate(date.getDate() + 1);
    console.log(typeof date, typeof date2);
    date = date.toISOString();
    console.log(new Date(date2).toISOString());
    date2 = new Date(date2).toISOString();

    let params = {
      limit,
      page,
      active: true,
      appointmentDate1: date,
      appointmentDate2: date2,
      hospitalName,
      //   arrived,
      qued: true,
      hospitals: query.AllQue,
    };

    // console.log(params, "submit clicked...");
    await allAppointments(params)
      .then((data) => {
        console.log(data);
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            initialSet();
            setShow(false);
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
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);
        }

        console.log(data);
        handleDoctors(data.doc);

        // return { data };
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
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

  console.log(allDoctors);
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
        <div className="mt-2 mb-2 p-2 mr-10 border-2 border-gray-200 rounded-xl grid grid-cols-4">
          <SearchBar />
          <div
            className="col-span-1 flex justify-between ml-3 border-2 px-3 border-gray-400 rounded text-gray-400 text-xl font-semibold cursor-pointer hover:bg-gray-400 hover:text-white"
            onClick={() => setShow(!show)}
          >
            <h2 className="hidden md:block p-2 text-xl font-bold">Filter</h2>
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
                          Hospital Name
                        </label>
                        <input
                          type="text"
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
                          // onChange={handleChange("hospitalName")}
                          class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                          placeholder="Enter your Name"
                        />
                      </div>
                      <div className="col-span-1">
                        <label class="text-gray-600 mb-2 block my-2">
                          Active
                        </label>
                        <input
                          type="text"
                          value={active}
                          onChange={(e) => setActive(e.target.value)}
                          // onChange={handleChange("active")}
                          class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                          placeholder="Enter your Name"
                        />
                      </div>
                    </div>
                    <div className="">
                      <h2>Time duration</h2>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="my-2 col-span-1">
                          <label class="text-gray-600 mb-2 block">
                            Starting Date
                          </label>
                          <input
                            type="date"
                            value={appointmentDate1}
                            onChange={(e) =>
                              setAppointmentDate1(e.target.value)
                            }
                            class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="Enter your NIC"
                          />
                        </div>
                        <div className="my-2 col-span-1">
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
                            placeholder="Enter your NIC"
                          />
                        </div>
                      </div>
                    </div>
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
            {allDoctors.map((id, index) => {
              console.log(id, index, "doctors array map");
              return (
                <>
                  <div>
                    <h2
                      className={`bg-blue-600 text-white w-full h-full text-xl rounded-full text-center font-semibold ${
                        index > 0 ? "mt-10" : ""
                      } `}
                    >
                      Doctor Id: {id[id.length - 1]}
                    </h2>
                    <div
                      className={`grid grid-cols-8 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb `}
                    >
                      <h2>Que Number</h2>
                      <h2>Total Que Number</h2>
                      <h2>Patient Id</h2>
                      <h2 className="">Name</h2>
                      <h2>Date</h2>
                      <h2>Time</h2>
                      <h2>Status</h2>
                      <h2>cancel</h2>
                      {/* <h2>update</h2> */}
                    </div>
                  </div>
                  <div className="">
                    {allData.doc.map((appointment, index) => {
                      console.log(appointment.doctors[0], id);
                      console.log(id == appointment.doctors[0]);
                      if (id == appointment.doctors[0]) {
                        console.log(appointment);
                        return (
                          <QueAppointment
                            appointment={appointment}
                            indexId={index}
                          />
                        );
                      }
                    })}
                  </div>
                </>
              );
            })}
          </div>
        )}

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

AllQue.getInitialProps = async ({ query }) => {
  let date = new Date();
  //   console.log(date.setHours(0, 0, 0));
  //   console.log(date.setDate(date.getDate() + 1));
  console.log(date.setHours(0, 0, 0, 0));
  console.log(date.toISOString());
  date = date.toISOString();
  console.log(date, "From initial props...");
  let limit = 10;
  let page = 1;
  let active = true;
  let appointmentDate1 = date;

  let appointmentDate2;
  // let appointmentDate1 = "2023-03-05T00:00:00.000Z";
  // let appointmentDate2 = "2023-07-05T00:00:00.000Z";
  let hospitalName;
  let arrived;
  let qued = true;
  let hospitals = query.AllQue;

  return allAppointments({
    limit,
    page,
    active,
    appointmentDate1,
    appointmentDate2,
    hospitalName,
    arrived,
    qued,
    hospitals,
  })
    .then((data) => {
      return { data, query };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default AllQue;
