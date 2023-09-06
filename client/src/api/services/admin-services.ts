import { BASE_URL } from '../../constants/common';
import adminApi from '../interceptors/adminInterceptor';

export const getPendingVerificationList = async (
  endpoint : string
) =>{
  try{
    const response = adminApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching Trainers list:', error);
    throw error; 
  }
}

export const sendAcceptanceMail = async (
  endpoint : string,
  email : string,
) =>{
  try{
    const response = adminApi.post(
      `${BASE_URL}/${endpoint}`,
      { email }
    );
    return response
  }catch(error){
    console.error('Error during fetching Trainers list:', error);
    throw error; 
  }
}

export const sendRejectedMail = async (
  endpoint : string,
  email : string,
  reason : string,
) =>{
  try{
    const response = adminApi.post(
      `${BASE_URL}/${endpoint}`,
      { email , reason }
    );
    return response
  }catch(error){
    console.error('Error during fetching Trainers list:', error);
    throw error; 
  }
}