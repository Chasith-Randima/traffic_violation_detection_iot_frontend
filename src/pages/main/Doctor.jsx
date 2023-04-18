import Layout from "components/Layout";
import React from "react";
import HospitalCard from "components/HospitalCard";
import { allHospitals } from "actions/hospital";

const Doctor = ({ doc }) => {
  return (
    <>
      <Layout>
        <div className="grid grid-cols-12 gap-3 mt-10 mr-5">
          {doc.map((hospital) => {
            return <HospitalCard key={hospital._id} doc={doc[0]} />;
          })}
        </div>
      </Layout>
    </>
  );
};

Doctor.getInitialProps = async ({ query }) => {
  return await allHospitals()
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default Doctor;
