import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../constants/common";


const adminApi : AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

adminApi.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("adminToken")
    console.log(tokenString)
    if (tokenString) {
      config.headers.Authorization = `Bearer ${tokenString}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default adminApi