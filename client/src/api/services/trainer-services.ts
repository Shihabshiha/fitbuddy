import { BASE_URL } from "../../constants/common";
import trainerApi from "../interceptors/trainerInterceptor";


export const addCourse = async (
  endpoint : string,
  newCourse : FormData
) =>{
  try{

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = trainerApi.post(
      `${BASE_URL}/${endpoint}`,
       newCourse ,config
    );
    return response
  }catch(error){
    console.error('Error during creating new course:', error);
    throw error; 
  }
}

export const getCourses = async (
  endpoint : string,
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching courses:', error);
    throw error; 
  }
}

export const doListUnlist = async (
  endpoint : string,
  courseId : string,
  isListed : boolean
) =>{
  try{
    console.log('status ',isListed)
    const response = trainerApi.put(
      `${BASE_URL}/${endpoint}/${courseId}`,{
        isListed : isListed
      }
    );
    return response
  }catch(error){
    console.error('Error during fetching courses:', error);
    throw error; 
  }
}