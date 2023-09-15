import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../constants/common";


const trainerApi : AxiosInstance = axios.create({
  baseURL: BASE_URL,
  
})

trainerApi.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("trainerToken");
    if (tokenString) {
      config.headers.Authorization = `Bearer ${tokenString}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default trainerApi