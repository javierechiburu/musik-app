import axios from "axios";

const timeout = 50000;

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: timeout,
});
