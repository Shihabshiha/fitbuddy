import axios from 'axios'
import { BASE_URL } from '../../constants/common';

export const getPendingVerificationList = async (
  endpoint : string
) =>{
  try{
    const response = axios.get(
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
    console.log('mail to axios',email)
    const response = axios.post(
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
    console.log('mail to axios',email)
    const response = axios.post(
      `${BASE_URL}/${endpoint}`,
      { email , reason }
    );
    return response
  }catch(error){
    console.error('Error during fetching Trainers list:', error);
    throw error; 
  }
}