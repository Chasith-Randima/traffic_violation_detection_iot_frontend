import React, { useState, useEffect } from "react";
import AllPatientsByCity from "components/charts/all/AllPatientsByCity";
import Layout from "components/Layout";
import AllAppointmentsByTimeLine from "components/charts/all/AllAppointmentsByTimeLine";
import AllAppointmentsByDate from "components/charts/all/AllAppointmentsByDate";

const AllAnalytics = () => {
  return (
    <>
      <Layout>
        <div className="mt-2 mb-2 p-2 mr-10 border-2 border-gray-200 rounded-xl ">
          <div className="text-center md:w-2/3 md:mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl">
              Patients By City
            </h2>
            <AllPatientsByCity />
          </div>
          <div className="text-center  md:w-2/3 md:mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl my-2">
              All Appointments By Time Of the Day
            </h2>
            <AllAppointmentsByTimeLine />
            {/* {hospitalId && <AppointmentsByTimeLine hospitalId={hospitalId} />} */}
          </div>
          <div className="text-center md:w-2/3 md:mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl my-2">
              Appointments By Date{" "}
            </h2>
            <AllAppointmentsByDate />
          </div>
          {/* <div className="text-center w-2/3 mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl">
              Appointments By Month
            </h2>
            {hospitalId && (
              <AppointmentCountByYearLine hospitalId={hospitalId} />
            )}
          </div> */}
        </div>
      </Layout>
    </>
  );
};

export default AllAnalytics;
