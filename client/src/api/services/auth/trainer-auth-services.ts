import axios from 'axios'
import { BASE_URL } from "../../../constants/common";
import { TrainerLoginData } from '../../../types/trainerTypes';

export const register = async (
  endpoint: string,
  trainerData: FormData
) => {
  try {
    console.log('call done')
    const response = await axios.post(
      `${BASE_URL}/${endpoint}`,
      trainerData
    );
    
    return response;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error; 
  }
};

export const login = async (
  endpoint : string,
  trainerData : TrainerLoginData,
) => {
  try{
    const response = await axios.post(
      `${BASE_URL}/${endpoint}`,
      trainerData
    );
    return response
  }catch(error){
    console.error('Error during registration:', error);
    throw error; 
  }
}