import { UserData } from "../../../types/userType";
import axios from 'axios'
import { BASE_URL } from "../../../constants/common";
import { UserLoginData } from "../../../types/userType";

export const register = async (
  endpoint: string,
  userData: UserData
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/${endpoint}`,
      userData
    );
    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; 
  }
};

export const login = async (
  endpoint : string,
  userdata : UserLoginData,
) => {
  try{
    const response = await axios.post(
      `${BASE_URL}/${endpoint}`,
      userdata
    );
    return response
  }catch(error){
    console.error('Error during registration:', error);
    throw error; 
  }
}

export const sendOtp = async (
  endpoint : string,
  email : string,
) => {
  try{
    console.log('axios urs mail',email)
    const response= await axios.post(
      `${BASE_URL}/${endpoint}`,
      { email }
    );
    return response
  }catch (error){
    console.error('Error during registration:', error);
    throw error;
  }
}

export const verifyOtp = async (
  endpoint : string,
  otp : string,
) => {
  try{
    const response= await axios.post(
      `${BASE_URL}/${endpoint}`,
      {otp}
    );
    return response
  }catch (error){
    console.error('Error during registration:', error);
    throw error;
  }
}

export const googleLoginUser = async (
  endpoint : string,
  credential : string,
) => {
  const data = credential
  try{
    const response = await axios.post(
      `${BASE_URL}/${endpoint}`,
      {data}
    );
    return response
  }catch(error){
    console.error('Error during registration:', error);
    throw error; 
  }
}