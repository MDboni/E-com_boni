// src/AuthProvider/axiosInstance.js
import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5060",
  withCredentials: true, // cookie পাঠানোর জন্য
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = getCookie("token");
    if (!token && config.headers.Authorization) {
      token = config.headers.Authorization.replace("Bearer ", "");
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
