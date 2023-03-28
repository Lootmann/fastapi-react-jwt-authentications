import axios from "axios";
import { API_URL } from "../settings";

export const axiosDefault = axios.create({
  baseURL: API_URL,
});

export const axiosForm = axios.create({
  baseURL: API_URL,
});

axiosForm.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// TODO: set to Authorization
export const axiosWithToken = axios.create({
  baseURL: API_URL,
});
