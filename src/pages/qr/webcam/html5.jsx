// import React, { useRef } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// const Html5 = () => {
//   const ref = useRef(null);
//   console.log(ref);
//   const scanner = new Html5QrcodeScanner(ref, {
//     // Scanner will be initialized in DOM inside element with id of 'reader'
//     qrbox: {
//       width: 250,
//       height: 250,
//     }, // Sets dimensions of scanning box (set relative to reader element width)
//     fps: 20, // Frames per second to attempt a scan
//   });

//   scanner.render(success, error);
//   // Starts scanner

//   function success(result) {
//     document.getElementById("result").innerHTML = `
//           <h2>Success!</h2>
//           <p><a href="${result}">${result}</a></p>
//           `;
//     // Prints result as a link inside result element

//     scanner.clear();
//     // Clears scanning instance

//     document.getElementById("reader").remove();
//     // Removes reader element from DOM since no longer needed
//   }

//   function error(err) {
//     console.error(err);
//     // Prints any errors to the console
//   }

//   return (
//     <>
//       <div ref={ref}></div>
//       <div id="result"></div>
//     </>
//   );
// };

// export default Html5;
