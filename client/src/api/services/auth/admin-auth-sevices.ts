import { BASE_URL } from "../../../constants/common";
import { AdminLoginData } from '../../../types/adminTypes';
import axios from "axios";


export const login = async (
  endpoint : string,
  adminData : AdminLoginData
) =>{
  try{
    const response = axios.post(
      `${BASE_URL}/${endpoint}`,
      adminData
    );
    return response
  }catch(error){
    console.error('Error during registration:', error);
    throw error; 
  }
}