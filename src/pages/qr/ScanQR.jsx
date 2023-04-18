import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

const ScanQR = () => {
  const router = useRouter();
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const handleRefresh = () => {
    router.reload();
  };
  const handleReset = () => {
    setResult("");
    setError("");
  };
  return (
    <>
      <Layout>
        <div className="mt-10 mb-2 p-2 mr-10 border-2 border-gray-200 rounded-xl ">
          <h2 className="text-gray-400 text-xl font-semibold mx-5 ">Scan QR</h2>
          <div className="md:w-2/5 md:h-2/5 mx-auto">
            <QrReader
              scanDelay={300}
              onResult={(result, error) => {
                if (!!result) {
                  console.log(result);
                  setResult(result);
                }

                if (!!error) {
                  setError(error);
                  console.log(error.e);
                  console.info(error);
                }
              }}
              style={{ width: "100%" }}
            />
          </div>
          <div>
            {console.log(result)}
            {result && (
              <div className="m-3 md:w-full text-center">
                <h2 className="mb-5 text-xl bg-gray-300 p-2 rounded">
                  <p
                    onClick={() => router.push(result.text)}
                    className="hover:font-semibold transition-all hover:underline overflow-scroll "
                  >
                    {result.text}
                  </p>
                </h2>
                <div>
                  <button
                    className="p-2 md:px-64 text-xl mt-5 font-semibold bg-blue-400 hover:bg-blue-600 rounded transition-all col-span-1 mx-auto md:w-full py-2"
                    onClick={() => router.push(result.text)}
                  >
                    Go to Link
                  </button>
                </div>
              </div>
            )}
            {/* {error && result == undefined && (
              <div className="m-3 w-full text-center">
                <h2 className="my-2 text-xl bg-gray-300 p-2 rounded">
                  {error.text}
                </h2>
                <button className="p-2 text-xl font-semibold bg-blue-400 hover:bg-blue-600 rounded transition-all col-span-1 mx-auto w-1/3 py-2">
                  Refresh
                </button>
              </div>
            )} */}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleReset}
                className="p-2 text-xl font-semibold bg-blue-400 hover:bg-blue-600 rounded transition-all col-span-1"
              >
                Reset
              </button>
              <button
                onClick={handleRefresh}
                className="p-2 text-xl font-semibold bg-blue-400 hover:bg-blue-600 rounded transition-all col-span-1"
              >
                Refresh
              </button>

              <div className="col-span-2 md:mt-10 md:w-full text-center md:mb-10">
                <button
                  //   href={"/mainPage"}
                  onClick={() => router.push("/mainPage")}
                  className="p-2 md:px-64 md:mx-auto text-xl mt-5 font-semibold bg-blue-400 hover:bg-blue-600 rounded transition-all col-span-1  py-2"
                >
                  MainPage
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ScanQR;
