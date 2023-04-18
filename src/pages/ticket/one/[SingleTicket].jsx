import { getCookie } from "actions/auth";
import { allTickets, oneTicket, updateTicket } from "actions/ticket";
import GenerateQR from "components/GenerateQR";
import Layout from "components/Layout";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Message from "components/Message";

const SingleTicket = ({ data }) => {
  const router = useRouter();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  const closeTicket = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let id = data.doc._id;
    let token = getCookie("token_user");

    let dataSend = { active: false };
    await updateTicket(id, dataSend, token)
      .then((data) => {
        if (data.status && data.status == "success") {
          console.log(data);
          // return data;

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1000);
        }
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
  return (
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
      <div className="mt-5 mr-5 shadow-xl ">
        <h2 className="text-gray-400 text-xl font-semibold mx-5 ">
          {data.doc.diagnosisTitle}
        </h2>
        <div className="border-2 border-gray-200 rounded-xl p-2 m-5 mb-5">
          <div className="grid grid-cols-4 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
            <div className="col-span-2 p-2">
              <h2
                className="text-lg font-semibold text-gray-600 cursor-pointer"
                onClick={() =>
                  router.push(
                    `/infoProfile/patient/${data.doc.patients[0]._id}`
                  )
                }
              >
                Patient Name : <span>{data.doc.patients[0].name}</span>
              </h2>
            </div>
            <div className="col-span-2 p-2">
              <h2 className="text-lg font-semibold text-gray-600 ">
                Patient Age :{" "}
                <span>
                  {parseInt(new Date().toJSON()) -
                    parseInt(data.doc.patients[0].dateOfBirth.split("T")[0])}
                </span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-4 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
            <div className="col-span-2 p-2">
              <h2 className="text-lg font-semibold text-gray-600 ">
                Doctor Name : <span>{data.doc.doctors[0].name}</span>
              </h2>
            </div>
            <div className="col-span-2 p-2">
              <h2 className="text-lg font-semibold text-gray-600 ">
                Doctor ID :{" "}
                <span>
                  {" "}
                  {data.doc.doctors[0]._id.substr(
                    data.doc.doctors[0]._id.length / 2,
                    data.doc.doctors[0]._id.length
                  )}
                </span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-5 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
            <div className="col-span-1 p-2">
              <h2 className="text-lg font-semibold text-gray-600 ">
                Diagnosis :
              </h2>
            </div>
            <div className="col-span-4 p-2">
              <p className="text-lg font-semibold text-gray-600 ">
                {data.doc.diagnosis}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-5 bg-gray-100 rounded-lg my-2 hover:bg-gray-200">
            <div className="col-span-1 p-2">
              <h2 className="text-lg font-semibold text-gray-600 ">
                Prescription :
              </h2>
            </div>
            <div className="col-span-4 p-2">
              <p className="text-lg font-semibold text-gray-600 ">
                {data.doc.prescription}
              </p>
            </div>
          </div>
        </div>

        {getCookie("token_user") && (
          <div className="text-center col-span-3 my-5   ">
            {data.doc.active ? (
              <input
                type="submit"
                value={"Close the Ticket"}
                onClick={closeTicket}
                className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer mb-5"
              />
            ) : (
              <input
                type="submit"
                value={"Closed"}
                // onClick={closeTicket}
                disabled
                className="bg-blue-300 p-5 
              border-2 border-blue-400
              rounded-full text-xl font-bold text-white hover:bg-blue-200 hover:text-white transition-all cursor-pointer mb-5 pointer-events-none"
              />
            )}
          </div>
        )}
      </div>
      <div className="mt-5 mr-5 shadow-xl">
        <h2 className="text-gray-400 text-xl font-semibold mx-5 ">Ticket QR</h2>
        <div className="ml-2 mr-10">
          <GenerateQR
            data={`${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}${router.asPath}`}
          />
        </div>
      </div>
    </Layout>
  );
};

SingleTicket.getInitialProps = async ({ query }) => {
  console.log(query.SingleTicket);
  return oneTicket(query.SingleTicket)
    .then((data) => {
      // console.log(data);
      return { data };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default SingleTicket;
