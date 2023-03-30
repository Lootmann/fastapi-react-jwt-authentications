import axios from "axios";
import { API_URL } from "../settings";
import { redirect } from "react-router-dom";
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from "./token";

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

    // status code 401 is unauthorized - access token is expired
    if (error.response.status == 401) {
      await refreshTokenFunction();
      return axiosWithToken.request(error.config);
    }

    return Promise.reject(error);
  }
);

async function refreshTokenFunction() {
  console.log(">>> axios.ts - axiousDefault");

  const refreshToken = getRefreshToken();

  // NOTE: refreshToken is null means that you are not signed in
  if (refreshToken === null) {
    return redirect("/signup");
  }

  axiosDefault
    .post("/auth/refresh", { refresh_token: refreshToken })
    .then((resp) => {
      if (resp.status == 200) {
        console.log("* refresh token :^)");
        setAccessToken(resp.data.access_token);
      }
    })
    .catch((error) => {
      // NOTE: server error, react redirect to signup
      console.log("* refresh token error D:");
      console.log(error);
      removeAccessToken();
      removeRefreshToken();
      return redirect("/signup");
    });
}

export { axiosDefault, axiosForm, axiosWithToken };
