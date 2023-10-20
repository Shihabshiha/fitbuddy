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

export const markVideoAsWatchedById  = async (
  endpoint : string,
  videoId : string,
) =>{
  try{
    const response =await userApi.post(
      `${BASE_URL}/${endpoint}`,
      {videoId}
    );
    return response
  }catch(error){
    console.error('Error during marking video as watched:', error);
    throw error; 
  }
}

export const getProgramProgressDetails = async (
  endpoint : string,
) =>{
  try{
    const response =await userApi.get(
      `${BASE_URL}/${endpoint}`,
    );
    return response
  }catch(error){
    console.error('Error during getting program progress:', error);
    throw error; 
  }
}

export const doPostNewComment = async (
  endpoint : string,
  videoId: string,
  newComment : string,
) =>{
  try{
    const response = userApi.post(
      `${BASE_URL}/${endpoint}`,
      {videoId , newComment}
    );
    return response
  }catch(error){
    console.error('Error during commenting:', error);
    throw error; 
  }
}

export const getAllCommentsByVideoId = async (
  endpoint : string,
  videoId : string,
) =>{
  try{
    const response = userApi.get(
      `${BASE_URL}/${endpoint}/${videoId}`
    );
    return response
  }catch(error){
    console.error('Error during fetching comments:', error);
    throw error; 
  }
}

