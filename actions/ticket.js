import fetch from "isomorphic-fetch";
import axios from "axios";
import queryString from "query-string";

// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const allTickets = (paramsData) => {
  let url = `${API}/tickets`;

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
      hospitals: paramsData.hospitals,
      // sort: paramsData.sort,
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
export const allTicketsRelated = (paramsData) => {
  console.log(paramsData);

  // let url = `${API}/tickets?${
  //   paramsData.field_name
  // }=${"64180438453bf6df8968cea0"}`;
  let url = `${API}/tickets?${paramsData.field_name}=${paramsData.id}`;
  // let patients = paramsData.field_name;

  return axios(url, {
    method: "GET",
    params: {
      // patients: paramsData.id,
      limit: paramsData.limit,
      page: paramsData.page,
      hospitalName: paramsData.hospitalName,
      appointmentDate1: paramsData.appointmentDate1,
      appointmentDate2: paramsData.appointmentDate2,
    },
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

export const oneTicket = (id) => {
  let url = `${API}/tickets/${id}`;

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

export const createTicket = async (data, token) => {
  console.log(data, token);
  let url = `${API}/tickets`;
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
export const updateTicket = async (id, data, token) => {
  // console.log(data, token);
  let url = `${API}/tickets/${id}`;
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

export const searchTicket = (params) => {
  let query = queryString.stringify(params);
  // console.log(query);
  let url = `${API}/tickets/search?${query}`;

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
