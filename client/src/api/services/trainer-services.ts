import { BASE_URL } from "../../constants/common";
import { CourseData } from "../../types/trainerTypes";
import trainerApi from "../interceptors/trainerInterceptor";


export const addCourse = async (
  endpoint : string,
  newCourse : CourseData
) =>{
  try{
    const response = trainerApi.post(
      `${BASE_URL}/${endpoint}`,
      { newCourse }
    );
    return response
  }catch(error){
    console.error('Error during creating new course:', error);
    throw error; 
  }
}
