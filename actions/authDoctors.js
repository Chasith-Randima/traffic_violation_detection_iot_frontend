import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const signup = async (user) => {
  let url = `${API}/users/signup`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      //   console.log(response.statusText);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const logIn = async (user) => {
  let url = `${API}/users/login`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// export const logOut = async (next) => {
//   removeCookie("token");
//   removeLocalStorage("user");
//   next();
//   let url = `${API}/users/logout`;
//   return fetch(url, {
//     method: "GET",
//   })
//     .then((response) => {
//       // console.log("Logout Success");
//       return response;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };
