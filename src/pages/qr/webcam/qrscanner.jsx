import React, { useState } from "react";
import QrReader from "react-qr-scanner";

// i changeed react qr scanner source file document ===react-qr-scanner.cjs.js
const Qrscanner = () => {
  const [delay, setDelay] = useState(10);
  const [result, setResult] = useState("No Result");
  const handleScan = (data) => {
    setResult(data);
  };
  const handleError = (err) => {
    console.log(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };
  return (
    <>
      <div className="border-2 border-gray-500">
        <QrReader
          delay={delay}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
        />
        {/* <p>{result.text}</p> */}
        {result && console.log(result.text)}
      </div>
    </>
  );
};
export default Qrscanner;
