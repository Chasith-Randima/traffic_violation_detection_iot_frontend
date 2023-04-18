import React from "react";
import Layout from "components/Layout";
import PatientsByCityBar from "components/charts/PatientsByCityBar";
import { useRouter } from "next/router";
import AppointmentsByTimeLine from "../../../../components/charts/AppointmentsByTimeLine";
import AppointmentsByDateLine from "components/charts/AppointmentsByDateLine";
import AppointmentCountByYearLine from "components/charts/AppointmentCountByYearLine";

const HospitalAnalytics = () => {
  const router = useRouter();
  let hospitalId = router.query.hospitalAnalytics;
  return (
    <>
      <Layout>
        <div className="mt-2 mb-2 p-2 mr-10 border-2 border-gray-200 rounded-xl ">
          <div className="text-center w-full md:w-2/3 mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl my-2">
              Patients By City
            </h2>
            {hospitalId && <PatientsByCityBar hospitalId={hospitalId} />}
          </div>
          <div className="text-center w-full md:w-2/3 mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl my-2">
              Appointments By Time Of the Day
            </h2>
            {hospitalId && <AppointmentsByTimeLine hospitalId={hospitalId} />}
          </div>
          <div className="text-center w-full md:w-2/3 mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl my-2">
              Appointments By Date{" "}
            </h2>
            {hospitalId && <AppointmentsByDateLine hospitalId={hospitalId} />}
          </div>
          <div className="text-center w-full md:w-2/3 mx-auto">
            <h2 className="text-gray-400 font-semibold text-xl my-2">
              Appointments By Month
            </h2>
            {hospitalId && (
              <AppointmentCountByYearLine hospitalId={hospitalId} />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HospitalAnalytics;
