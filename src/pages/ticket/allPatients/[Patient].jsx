import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import Ticket from "components/Ticket";
import { allTicketsRelated } from "actions/ticket";
import SearchPatientTickets from "components/search/SearchPatientTickets";
import SearchTickets from "components/search/SearchTickets";
import { BsFillFilterSquareFill } from "react-icons/bs";
import Message from "components/Message";
const Patient = ({ data, query }) => {
  console.log(data);
  const [allData, setAllData] = useState(data);
  const [show, setShow] = useState(false);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(allData.totalCount / limit)
  );
  // console.log(allData, totalPages);
  const [active, setActive] = useState();
  const [appointmentDate1, setAppointmentDate1] = useState();
  const [appointmentDate2, setAppointmentDate2] = useState();
  const [hospitalName, setHospitalName] = useState();

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
    console.log(allData);
  }, [page]);

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setAlert({ ...alert, loading: true });
    let field_name = "patients";
    let id = query.Patient;
    let params = {
      limit,
      page,
      active,
      appointmentDate1,
      appointmentDate2,
      hospitalName,
      field_name,
      id,
    };

    // console.log(params, "submit clicked...");
    await allTicketsRelated(params)
      .then((data) => {
        if (data.status && data.status == "success") {
          if (data.results == 0) {
            console.log(data);
            initialSet();
            setShow(false);
          } else {
            setAllData(data);
            console.log(data);
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
          <SearchPatientTickets patientId={query.Patient} />
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
          <div className="mt-10 mr-10 border-2 border-gray-200 rounded-xl">
            <div className="grid grid-cols-8 bg-gray-600 p-4 rounded-xl text-white text-xl font-sb ">
              <h2>Id</h2>
              {/* <h2 className="hidden md:block md:col-span-2">Hospital Name</h2> */}
              <h2 className="col-span-2">Diagnosis Title</h2>
              <h2>Date</h2>
              <h2>Time</h2>
              <h2 className="hidden md:block">Doctor</h2>
              <h2>Status</h2>
              <h2>cancel</h2>
              <h2>update</h2>
            </div>
            <div className="">
              {allData.doc.map((ticket) => {
                return <Ticket ticket={ticket} key={ticket._id} type={false} />;
              })}
            </div>
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
              console.log(index);
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

Patient.getInitialProps = async ({ query }) => {
  let limit = 2;
  let page = 1;
  let hospitalName;
  let appointmentDate1;
  let appointmentDate2;
  let active;
  let field_name = "patient";
  let id = query.Patient;
  let data = {
    limit,
    page,
    hospitalName,
    appointmentDate1,
    appointmentDate2,
    active,
    field_name,
    id,
  };
  return await allTicketsRelated(data)
    .then((data) => {
      console.log(data);
      return { data, query };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Patient;
