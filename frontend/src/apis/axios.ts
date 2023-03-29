import axios from "axios";
import { API_URL } from "../settings";
import { getAccessToken, getRefreshToken, setAccessToken } from "./token";
import { redirect } from "react-router-dom";

const axiosDefault = axios.create({
  baseURL: API_URL,
});

// TODO: axiosForm
/**
 * axiosForm
 *
 * headers["content-type"] = "application/x-www-form-urlencoded";
 */
const axiosForm = axios.create({
  baseURL: API_URL,
});

axiosForm.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// TODO: axiosWithToken
/**
 * axiosWithToken
 *
 * headers["Authorization"] = "<access_token>"
 */
const axiosWithToken = axios.create({
  baseURL: API_URL,
});

axiosWithToken.interceptors.request.use(
  async (config) => {
    const access_token = getAccessToken();
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosWithToken.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async function (error) {
    console.log(error);

    // status code 401 is unauthorized
    if (error.response.status == 401) {
      await refreshTokenFunction();
      return axiosWithToken.request(error.config);
    }

    return Promise.reject(error);
  }
);

async function refreshTokenFunction() {
  const refreshToken = getRefreshToken();

  // NOTE: user should login
  if (refreshToken === null) {
    return redirect("/login");
  }

  console.log(">>> axios.ts - axiousDefault");

  axiosDefault
    .post("/auth/refresh", { refresh_token: refreshToken })
    .then((resp) => {
      console.log("* try to ...");
      if (resp.status == 200) {
        console.log("* refresh token :^)");
        setAccessToken(resp.data.access_token);
      }
    })
    .catch((error) => {
      console.log("* refresh token error D:");
      console.log(error);
      return Promise.reject(error);
    });
}

export { axiosDefault, axiosForm, axiosWithToken };
