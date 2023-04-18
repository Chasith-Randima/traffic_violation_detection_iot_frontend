import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
// import Router from "next/router";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const signup = async (user, person) => {
  let url = `${API}/${person}/signup`;
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

export const logIn = async (user, person) => {
  let url = `${API}/${person}/login`;
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

export const logOut = async (next) => {
  removeCookie("token_user");
  removeLocalStorage("user");
  next();
  let url = `${API}/users/logout`;
  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      // console.log("Logout Success");
      return response;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, user, next) => {
  // console.log(data.token, data.user, data);
  if (user == "user") {
    setCookie("token_user", data.token);
    setLocalStorage(user, data.user);
  } else if (user == "doctor") {
    setCookie("token_doctor", data.token);
    setLocalStorage(user, data.doctor);
  } else if (user == "patient") {
    setCookie("token_patient", data.token);
    setLocalStorage(user, data.patient);
  }
  next();
};

export const isAuth = async (user) => {
  if (typeof window !== "undefined") {
    let cookieChecked;
    if (user == "user") {
      cookieChecked = getCookie("token_user");
    } else if (user == "doctor") {
      cookieChecked = getCookie("token_doctor");
    } else if (user == "patient") {
      cookieChecked = getCookie("token_patient");
    }
    if (cookieChecked) {
      if (localStorage.getItem(user)) {
        // console.log(typeof localStorage.getItem("user"));
        return JSON.parse(localStorage.getItem(user));
        // return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};

export const updateMyPassword = (id, user, token) => {
  let url = `${API}/users/updateMyPassword/${id}`;
  // console.log(id, user, token);

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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
