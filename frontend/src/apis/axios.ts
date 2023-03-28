import axios from "axios";
import { API_URL } from "../settings";
import { getAccessToken } from "./token";

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
    Promise.reject(error);
  }
);

axiosWithToken.interceptors.response.use(
  (resp) => {
    return resp;
  },
  async function (error) {
    // TODO: error
    const originalRequest = error.config;
    if (error.response.status == 403) {
    }
  }
);

export { axiosDefault, axiosForm, axiosWithToken };
