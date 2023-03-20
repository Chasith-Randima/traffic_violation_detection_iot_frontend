import React from "react";

const Message = ({ message }) => {
  return (
    <div className="flex justify-center align-middle absolute top-24 w-full h-1/2 z-100 bg-transparent">
      <div className="mx-34 my-24 border border-gray-50 rounded-xl w-1/3 text-center bg-gray-50">
        <h1 className="mt-14 text-xl font-bold">{message}</h1>
      </div>
    </div>
  );
};

export default Message;
