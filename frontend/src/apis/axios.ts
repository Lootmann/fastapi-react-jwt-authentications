import axios from "axios";
import { API_URL } from "../settings";

export default axios.create({
  baseURL: API_URL,
});
