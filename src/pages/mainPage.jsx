import Layout from "components/Layout";
import React, { useState, useEffect } from "react";
import HospitalCard from "components/HospitalCard";
import { allHospitals, searchHospitals } from "actions/hospital";
import SearchHospitals from "components/search/SearchHospitals";
import Message from "components/Message";

const MainPage = ({ data }) => {
  console.log(data);
  const [values, setValues] = useState({
    search: "",
  });
  const [allData, setAllData] = useState(data);
  console.log(allData);

  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(allData.totalCount / limit)
  );
  const { search } = values;

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
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

  const basicData = async () => {
    setAlert({ ...alert, loading: true });
    let name;
    let city;
    let data = {
      limit,
      page,
      name,
      city,
    };
    await allHospitals(data)
      .then((data) => {
        if (data.status && data.status == "success") {
          setAllData(data);
          let totalCount = data.totalCount;
          setTotalPages(Math.ceil(totalCount / limit));

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
  };

  useEffect(() => {
    handleSubmit();
    // console.log(data);
  }, [search]);
  useEffect(() => {
    basicData();
  }, [page]);

  const handleSubmit = async () => {
    // e.preventDefault();
    // console.log("triggerd..");
    // console.log(search);
    await searchHospitals({ search: search })
      .then((data) => {
        // console.log(data, "from search results");
        console.log(data);
        if (data.results == 0) {
          setAllData({ doc: [], results: 0 });
          setTotalPages(1);
        } else {
          // console.log(data.data);
          setAllData(data);
          // let totalCount = data.results;
          setTotalPages(1);
        }

        console.log(allData);
      })
      .catch((err) => {
        console.log(err);
      });
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
        <div className=" mt-2 mb-2 p-2 mr-10 border-2 border-gray-200 rounded-xl grid grid-cols-4">
          {/* <SearchBar /> */}
          <div className="col-span-4">
            {/* {search.length == 0 && <h2>working..</h2>} */}
            <input
              type="text"
              value={search}
              onChange={handleChange("search")}
              className="w-full p-2 border-2 border-gray-400 rounded text-lg font-semibold text-gray-600"
              placeholder="Search Hospitals"
            />
            {search.length !== 0 && (
              <div className="absolute z-100 w-2/3 ml-8 mt-5   h-auto pb-10 bg-gray-200 mr-10 rounded">
                {/* {console.log(data.data)} */}

                <div className="flex justify-between  p-1 my-5">
                  <h2 className="text-lg font-semibold ml-5">
                    {allData.message}
                  </h2>
                  <span
                    className="text-lg font-semibold pd-4 bg-red-500 text-white rounded mr-10 cursor-pointer"
                    onClick={() => {
                      setValues({ ...values, search: "" }), setPage(1);
                    }}
                  >
                    close
                  </span>
                </div>

                {/* {search.length != 0 &&
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
                })} */}
              </div>
            )}
          </div>
          {/* <div
            className="col-span-1 flex justify-between ml-3 border-2 px-3 border-gray-400 rounded text-gray-400 text-xl font-semibold cursor-pointer hover:bg-gray-400 hover:text-white"
            onClick={() => setShow(!show)}
          >
            <h2 className="p-2 text-xl font-bold">Filter</h2>
            <span className="p-3 text-xl font-bold">
              <BsFillFilterSquareFill />
            </span>
          </div> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 mt-10 mr-5">
          {/* {console.log(allData)} */}
          {allData.results != 0 &&
            allData.doc.map((hospital, index) => {
              return <HospitalCard key={hospital._id} doc={hospital} />;
            })}
        </div>
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

MainPage.getInitialProps = async ({ query }) => {
  let limit = 9;
  let page = 1;
  let name;
  let city;
  let data = {
    limit,
    page,
    name,
    city,
  };
  return await allHospitals(data)
    .then((data) => {
      // console.log(data);
      return { data };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default MainPage;
