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
