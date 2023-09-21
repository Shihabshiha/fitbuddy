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

export const getUsersList = async (
  endpoint : string
) =>{
  try{
    const response = adminApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching Users list:', error);
    throw error; 
  }
}

export const blockUnblockUser = async (
  endpoint : string,
  userId : string,
  isBlocked: boolean,
) =>{
  try{
    const response = adminApi.put(
      `${BASE_URL}/${endpoint}/${userId}`,
      {isBlocked:isBlocked}
    );
    return response
  }catch(error){
    console.error('Error during block/unblock user:', error);
    throw error; 
  }
}

export const getCourses = async (
  endpoint : string
) =>{
  try{
    const response = adminApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching Courses:', error);
    throw error; 
  }
}

export const listUnlistCourses = async (
  endpoint : string,
  courseId : string,
  isListed : boolean
) =>{
  try{
    const response = adminApi.patch(
      `${BASE_URL}/${endpoint}/${courseId}`,{
        isListed : isListed
      }
    );
    return response
  }catch(error){
    console.error('Error during changing the list status of course:', error);
    throw error; 
  }
}