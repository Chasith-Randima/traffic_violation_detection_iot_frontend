import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getPatientsByCityAndHospital } from "actions/analytics";
import { Chart as ChartJS } from "chart.js/auto";
import Message from "components/Message";

const PatientsByCityBar = ({ hospitalId }) => {
  console.log(hospitalId);
  const [allData, setAllData] = useState();
  const [barData, setBarData] = useState();
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  const resetAlert = () => {
    setAlert({ message: "", error: false, loading: false, success: false });
  };

  useEffect(() => {
    setAlert({ ...alert, loading: true });
    getPatientsByCityAndHospital(hospitalId)
      .then((data) => {
        console.log(data, "from city...");
        if (data.status && data.status == "success") {
          let labels = [];
          let dataArray = [];
          data.stats.map((data) => {
            labels.push(data._id);
            dataArray.push(data.count);
          });
          console.log(data.stats[0]._id);
          setAllData(data);

          setBarData({
            labels: labels,
            datasets: [
              {
                label: "Users By City",
                data: dataArray,
                backgroundColor: ["#ebb434"],
                borderColor: "black",
              },
            ],
          });

          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });

          window.setTimeout(() => {
            resetAlert();
          }, 1000);
        }
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
  }, []);
  console.log(barData);

  // const [barData, setBarData] = useState({
  //   labels: allData.stats.map((data) => data._id),
  //   datasets: allData.stats.map((data) => data.city),
  // });
  // console.log(barData);
  return (
    <>
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
      {barData && <Bar data={barData} />}
    </>
  );
};

// PatientsByCityBar.getInitialProps = ({ router }) => {
//   const hospitalId = router.query.hospitalAnalytics;
//   return getPatientsByCityAndHospital(hospitalId)
//     .then((data) => {
//       return { data };
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export default PatientsByCityBar;
