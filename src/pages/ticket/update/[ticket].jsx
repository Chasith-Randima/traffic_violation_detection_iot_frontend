import React from "react";
import Layout from "components/Layout";
import { withRouter } from "next/router";
import { useState, useEffect } from "react";
import { getCookie } from "actions/auth";
import { oneTicket, updateTicket } from "actions/ticket";
import Router from "next/router";

const ticket = ({ router }) => {
  const [values, setValues] = useState({
    diagnosisTitle: "",
    diagnosis: "",
    prescription: "",
  });

  const { diagnosisTitle, diagnosis, prescription } = values;

  useEffect(() => {
    if (!getCookie("token_doctor")) {
      Router.push(`/mainPage`);
    }
  }, []);

  useEffect(() => {
    if (router.isReady) {
      oneTicket(router.query.ticket)
        .then((data) => {
          console.log(data);
          setValues({
            diagnosisTitle: data.doc.diagnosisTitle,
            diagnosis: data.doc.diagnosis,
            prescription: data.doc.prescription,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router.isReady]);

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = getCookie("token_doctor");
    let data = {
      diagnosisTitle,
      diagnosis,
      prescription,
    };

    await updateTicket(router.query.ticket, data, token)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
      <div className="mt-5 mr-5 shadow-xl">
        <h2 className="text-gray-400 text-xl font-semibold mx-5 ">
          Update Ticket
        </h2>
        <form className="ml-2 mr-10">
          <div className=" m-2">
            <div className="border-2 border-gray-200 rounded-xl p-2 ">
              <div className="">
                <label class="text-gray-600 mb-2 block my-2">
                  Diagnosis Title
                </label>
                <input
                  type="text"
                  value={diagnosisTitle}
                  onChange={handleChange("diagnosisTitle")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                  placeholder="Enter your Name"
                />
              </div>
              <div className="">
                <label class="text-gray-600 mb-2 block my-2">Diagnosis</label>
                <textarea
                  rows="5"
                  type="text"
                  value={diagnosis}
                  onChange={handleChange("diagnosis")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                  placeholder="Enter your Name"
                />
              </div>
              <div className="">
                <label class="text-gray-600 mb-2 block my-2">
                  Prescription
                </label>
                <textarea
                  rows="5"
                  type="text"
                  value={prescription}
                  onChange={handleChange("prescription")}
                  class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0  focus:border-blue-500 placeholder-gray-400"
                  placeholder="Enter your Name"
                />
              </div>
            </div>
          </div>
          <div className="text-center col-span-3 my-5   ">
            <input
              type="submit"
              value={"Update the Ticket"}
              className="bg-blue-400 p-5 rounded-full text-xl font-bold text-white hover:bg-blue-500 hover:text-white transition-all cursor-pointer mb-5"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default withRouter(ticket);
