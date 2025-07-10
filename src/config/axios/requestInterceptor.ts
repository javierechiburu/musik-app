import { axiosInstance } from "@/config/axios/axiosInstance";

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookieToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    if (cookieToken) {
      const tokenValue = cookieToken.split("=")[1];
      config.headers["Authorization"] = `Bearer ${tokenValue}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);
