import axios, { AxiosInstance } from "axios";
import { BASE_URL } from "../../constants/common";


const userApi : AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

userApi.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("userToken");
    if (tokenString) {
      config.headers.Authorization = `Bearer ${tokenString}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

userApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async(error)=>{
    if(error.response.status === 401 && error.response.data.error ===  "Token has expired"){
      localStorage.removeItem("userToken")
    }else {
      throw error;
    }
  }
)

export default userApi