import axios from "axios";
import { BASE_URL } from "../../constants/common";


export const getAllPrograms = async (
  endpoint : string,
) =>{
  try{
    const response = axios.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching courses:', error);
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