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
    console.log('new course',newCourse)
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
    const response = trainerApi.put(
      `${BASE_URL}/${endpoint}/${courseId}`,{
        isListed : isListed
      }
    );
    return response
  }catch(error){
    console.error('Error during changing the list status courses:', error);
    throw error; 
  }
}

export const doDelete = async (
  endpoint : string,
  courseId : string,
) =>{
  try{
    const response = trainerApi.delete(
      `${BASE_URL}/${endpoint}/${courseId}`,
    );
    return response
  }catch(error){
    console.error('Error during deleting courses:', error);
    throw error; 
  }
}

export const addChapter = async (
  endpoint : string,
  chapterData: FormData,
  courseId : string,
) =>{
  try{

    const response = trainerApi.post(
      `${BASE_URL}/${endpoint}/${courseId}`,
      chapterData
    );
    return response
  }catch(error){
    console.error('Error during deleting courses:', error);
    throw error; 
  }
}

export const getChapters = async (
  endpoint : string,
  courseId : string,
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}/${courseId}`,
    );
    return response
  }catch(error){
    console.error('Error during fetching courses:', error);
    throw error; 
  }
}

export const deleteChapter = async (
  endpoint : string,
  chapterId : string,
) =>{
  try{
    const response = trainerApi.delete(
      `${BASE_URL}/${endpoint}/${chapterId}`,
    );
    return response
  }catch(error){
    console.error('Error during deleting chapter:', error);
    throw error; 
  }
}

export const getNotifications = async (
  endpoint : string,
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching notifications:', error);
    throw error; 
  }
}

export const replayComment = async (
  endpoint : string,
  commentId : string,
  replayContent : string,
) =>{
  try{
    const response = trainerApi.post(
      `${BASE_URL}/${endpoint}`,
      {commentId , replayContent}
    );
    return response
  }catch(error){
    console.error('Error during replay:', error);
    throw error; 
  }
}

export const getUnreadNotificationCount = async (
  endpoint : string,
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching notifications count:', error);
    throw error; 
  }
}

export const markNotificationAsRead = async (
  endpoint : string,
) =>{
  try{
    const response = trainerApi.put(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during marking notification as read:', error);
    throw error; 
  }
}

export const getEnrollmentsData = async (
  endpoint : string,
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error during fetching enrollemt data:', error);
    throw error; 
  }
}

export const getChatList = async (
  endpoint : string,
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error getting chat list:', error);
    throw error; 
  }
}

export const getChatDetailsById = async (
  endpoint : string,
  chatId :string
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}/${chatId}`
    );
    return response
  }catch(error){
    console.error('Error getting chat details:', error);
    throw error; 
  }
}

export const sendNewMessageTrainer = async (
  endpoint : string,
  chatId : string,
  content :string,
) =>{
  try{
    const response = trainerApi.post(
      `${BASE_URL}/${endpoint}`,
      { chatId , content }
    );
    return response
  }catch(error){
    console.error('Error sending message:', error);
    throw error; 
  }
}

export const sendImageFileTrainer = async (
  endpoint : string,
  image: FormData,
  chatId : string,
) =>{
  try{
    const response = trainerApi.post(
      `${BASE_URL}/${endpoint}/${chatId}`,
      image
    );
    return response
  }catch(error){
    console.error('Error sending image message:', error);
    throw error; 
  }
}

export const getRevenueByPrograms = async (
  endpoint : string,
) =>{
  try{
    const response = trainerApi.get(
      `${BASE_URL}/${endpoint}`
    );
    return response
  }catch(error){
    console.error('Error getting revenue details:', error);
    throw error; 
  }
}