import React, { useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const WebCam = () => {
  const videoConstraints = {
    width: 540,
    facingMode: "environment",
  };

  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  const handleSubmit = () => {
    let urlget = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${url}`;
    console.log(urlget);
    axios(urlget, {
      method: "GET",
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />
      <button onClick={capturePhoto}>Capture</button>
      <button onClick={() => setUrl(null)}>Refresh</button>
      <button onClick={() => handleSubmit()}>get data</button>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default WebCam;
