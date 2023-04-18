import fetch from "isomorphic-fetch";
import axios from "axios";
// import { removeCookie, removeLocalStorage } from "./auth";
import queryString from "query-string";

// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const getPatientsByCityAndHospital = (id) => {
  let url = `${API}/patients/getPatientsByCityAndHospital?hospitalId=${id}`;

  return fetch(url, {
    method: "GET",
    // params: { ...query },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const allPatientsByCity = () => {
  let url = `${API}/patients/getAllPatientsByCity`;

  return fetch(url, {
    method: "GET",
    // params: { ...query },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const getAppointmentsByTimeHospital = (id) => {
  let url = `${API}/appointments/getAppointmentsByTimeHospital?hospitalId=${id}`;

  return fetch(url, {
    method: "GET",
    // params: { ...query },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const getAppointmentsByDateHospital = (id) => {
  console.log(id);
  let url = `${API}/appointments/getAppointmentsByDateHospital?hospitalId=${id}`;

  return fetch(url, {
    method: "GET",
    // params: { ...query },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const appointmentTimeByYear = (id) => {
  console.log(id);
  let url = `${API}/appointments/appointmentTimeStatsByYear?hospitalId=${id}`;

  return fetch(url, {
    method: "GET",
    // params: { ...query },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const AllAppointmentsCountByTime = () => {
  let url = `${API}/appointments/getAppointmentsByTime`;

  return fetch(url, {
    method: "GET",
    // params: { ...query },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const AllAppointmentsCountByDate = () => {
  let url = `${API}/appointments/getAllAppointmentsByDate`;

  return fetch(url, {
    method: "GET",
    // params: { ...query },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

// export const getAllDoctors = () => {
//   let url = `${API}/doctors/allDoctors`;

//   return axios(url, {
//     method: "GET",
//   })
//     .then((response) => {
//       //   console.log(response.data);
//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const oneDoctor = (id, token) => {
//   // console.log(id, token);
//   let url = `${API}/doctors/${id}`;

//   return fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const createDoctor = async (data, token) => {
//   // console.log(data, token);
//   let url = `${API}/doctors`;
//   return fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => {
//       //   console.log(response.statusText);
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };
// export const updateDoctor = async (id, data, token) => {
//   // console.log(data, token);
//   let url = `${API}/doctors/${id}`;
//   return fetch(url, {
//     method: "PATCH",
//     headers: {
//       // Accept: "application/json",
//       // "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: data,
//   })
//     .then((response) => {
//       //   console.log(response.statusText);
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const updateDoctorPassword = (id, user, token) => {
//   let url = `${API}/doctors/updateMyPassword/${id}`;
//   // console.log(id, user, token);

//   return fetch(url, {
//     method: "PATCH",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const logOutDoctor = async (next) => {
//   removeCookie("token_doctor");
//   removeLocalStorage("doctor");
//   // next();
//   let url = `${API}/doctors/logout`;
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

// export const deleteDoctor = async (id, token) => {
//   // console.log(data, token);
//   let url = `${API}/hospitals/${id}`;
//   return fetch(url, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     // body: JSON.stringify(data),
//   })
//     .then((response) => {
//       //   console.log(response.statusText);
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };

// export const searchDoctors = (params) => {
//   let query = queryString.stringify(params);
//   // console.log(query);
//   let url = `${API}/doctors/search?${query}`;

//   return axios(url, {
//     method: "GET",
//     // params: { ...query },
//     // params: {
//     //   limit: paramsData.limit,
//     //   page: paramsData.page,
//     //   brandname: paramsData.brandname,
//     //   location: paramsData.location,
//     //   "price[gte]": paramsData.priceMin,
//     //   "price[lte]": paramsData.priceMax,
//     //   sort: paramsData.sort,
//     // },
//   })
//     .then((response) => {
//       //   console.log(response.data);
//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return err;
//     });
// };
