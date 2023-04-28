import axios from "axios";

const base_url = "https://api.instantwebtools.net/v2/";
const api_base_url = base_url;
export const axiosInstance = axios.create({
  baseURL: api_base_url,
});
