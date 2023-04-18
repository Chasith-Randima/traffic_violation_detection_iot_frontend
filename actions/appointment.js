import fetch from "isomorphic-fetch";
import axios from "axios";
import queryString from "query-string";

// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const allAppointments = (paramsData) => {
  let query = queryString.stringify(paramsData);
  console.log(query);
  let url = `${API}/appointments`;
  // console.log(paramsData);

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      limit: paramsData.limit,
      page: paramsData.page,
      active: paramsData.active,

      "appointmentDate[gte]": paramsData.appointmentDate1,
      "appointmentDate[lte]": paramsData.appointmentDate2,
      hospitalName: paramsData.hospitalName,
      arrived: paramsData.arrived,
      qued: paramsData.qued,
      hospitals: paramsData.hospitals,
      // sort: paramsData.sort,
    },
  })
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const allAppointmentsRelated = (paramsData) => {
  // let url = `${API}/appointments`;
  let url = `${API}/appointments?${paramsData.field_name}=${paramsData.id}`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    params: {
      // paramsData.field_name: paramsData.id,
      limit: paramsData.limit,
      page: paramsData.page,
      hospitalName: paramsData.hospitalName,
      appointmentDate1: paramsData.appointmentDate1,
      appointmentDate2: paramsData.appointmentDate2,
    },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const oneAppointment = (id) => {
  let url = `${API}/appointments/${id}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const createAppointment = async (data, token) => {
  console.log(data, token);
  let url = `${API}/appointments`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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

export const updateAppointment = async (id, data, token) => {
  // console.log(data, token);
  let url = `${API}/appointments/${id}`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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

export const deleteAppointment = async (id, token) => {
  // console.log(data, token);
  let url = `${API}/appointments/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
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
export const deleteAppointmentUser = async (id, token) => {
  // console.log(data, token);
  let url = `${API}/appointments/user/${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(data),
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

export const searchAppointments = (params) => {
  console.log(params);
  let query = queryString.stringify(params);
  console.log(query);
  let url = `${API}/appointments/search?${query}`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    // params: {
    //   limit: paramsData.limit,
    //   page: paramsData.page,
    //   brandname: paramsData.brandname,
    //   location: paramsData.location,
    //   "price[gte]": paramsData.priceMin,
    //   "price[lte]": paramsData.priceMax,
    //   sort: paramsData.sort,
    // },
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const searchPatientAppointments = (params) => {
  let query = queryString.stringify(params);
  console.log(query);
  let url = `${API}/appointments/searchPatients?${query}`;

  return axios(url, {
    method: "GET",
    // params: { ...query },
    // params: {
    //   limit: paramsData.limit,
    //   page: paramsData.page,
    //   brandname: paramsData.brandname,
    //   location: paramsData.location,
    //   "price[gte]": paramsData.priceMin,
    //   "price[lte]": paramsData.priceMax,
    //   sort: paramsData.sort,
    // },
  })
    .then((response) => {
      //   console.log(response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
