import axios from "axios";
import { BASE_URL } from "../../constants/common";
import userApi from "../interceptors/user-interceptor";


export const getAllPrograms = async (
  endpoint : string,
) =>{
  try{
    const response = axios.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching programs:', error);
    throw error; 
  }
}

export const getUserDeatils = async (
  endpoint : string,
) =>{
  try{
    const response = userApi.get(
      `${BASE_URL}/${endpoint}`,
    );
    return response
  }catch(error){
    console.error('Error during fetching userDetails:', error);
    throw error; 
  }
}

export const getProgramById = async (
  endpoint : string,
  programId :string,
) =>{
  try{
    const response = axios.get(
      `${BASE_URL}/${endpoint}/${programId}`,
    );
    return response
  }catch(error){
    console.error('Error during fetching program:', error);
    throw error; 
  }
}

export const enrollCheckoutPayment  = async (
  endpoint : string,
  programId : string,
) =>{
  try{
    const response = userApi.post(
      `${BASE_URL}/${endpoint}`,
      {programId:programId}
    );
    return response
  }catch(error){
    console.error('Error during Checkout:', error);
    throw error; 
  }
}

export const getEnrolledProgramById = async (
  endpoint : string,
  userId :string,
) =>{
  try{
    const response = axios.get(
      `${BASE_URL}/${endpoint}/${userId}`,
    );
    return response
  }catch(error){
    console.error('Error during fetching Enrolled program:', error);
    throw error; 
  }
}

export const doChangeProfileImage  = async (
  endpoint : string,
  formData : FormData,
) =>{
  try{
    const response =await userApi.patch(
      `${BASE_URL}/${endpoint}`,
      formData
    );
    return response
  }catch(error){
    console.error('Error during changing profile:', error);
    throw error; 
  }
}

