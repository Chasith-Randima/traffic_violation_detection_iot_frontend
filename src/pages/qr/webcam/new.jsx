import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import { QrReader } from "react-qr-reader";
// import { Result } from "postcss";

const New = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      //   setScanResultFile(result)
      console.log(result);
    }
  };

  const onScanFile = () => {
    console.log(qrRef.current);
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  //   return <h2>ldkjls</h2>;

  return (
    <>
      <div className="m-10 border-2 border-gray-400 rounded p-10">
        <h2>Generate Download & Scan Qr code with react js</h2>
        <div className="m-5 grid grid-cols-2">
          <div className="col-span-1 mx-2 p-2 border-2 border-gray-400">
            <div>
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  onChange={(e) => {
                    setText(e.target.value);
                    generateQrCode();
                  }}
                  placeholder="enter text"
                />
                <button
                  onClick={() => generateQrCode()}
                  className="bg-blue-400 p-2 rounded"
                >
                  generate qr code
                </button>
              </div>
              <div>
                {imageUrl ? (
                  <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          {/* <div className="col-span-1 mx-2 p-2 border-2 border-gray-400">
            <button onClick={onScanFile} className="bg-blue-400 p-2 rounded">
              Scan QR Code
            </button>
            <div ref={qrRef}>
              <QrReader
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorFile}
                onResult={handleScanFile}
                // onScan={handleScanFile}
                legacyMode
              />
            </div>
            <h3>Scanned Code: {scanResultFile}</h3>
          </div> */}
          <div className="col-span-1 mx-2 p-2 border-2 border-gray-400">
            <h3>Qr Code Scan by Web Cam</h3>
            <QrReader
              scanDelay={300}
              onResult={(result, error) => {
                if (!!result) {
                  setScanResultWebCam(result?.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              style={{ width: "100%" }}
            />
            <h3>Scann By WebCam Code : {scanResultWebCam}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default New;
