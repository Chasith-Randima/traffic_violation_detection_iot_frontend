import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
const GenerateQR = ({ data }) => {
  console.log(data);
  const [imageUrl, setImageUrl] = useState("");
  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(data);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    generateQrCode();
  }, []);

  return (
    <>
      <div>
        {imageUrl ? (
          <div className="text-center">
            <a href={imageUrl} download>
              <img
                src={imageUrl}
                alt="img"
                className="w-full md:w-1/3 md:h-1/3 mx-auto"
              />
            </a>
            <h3>Click on it to download</h3>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default GenerateQR;
