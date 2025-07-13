import axios from "axios";

const timeout = 50000;

export const axiosInstance = axios.create({
  timeout: timeout,
});
