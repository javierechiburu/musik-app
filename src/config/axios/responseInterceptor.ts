import { axiosInstance } from "@/config/axios/axiosInstance";

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/";
    }

    return Promise.reject(new Error(error));
  }
);
