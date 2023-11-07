import { BASE_URL } from "./constants/common"
import io from 'socket.io-client'

export const config = {
  GOOGLE_CLIENT_ID :"373484577916-epulh746bcru647036j5n33e2fe26cch.apps.googleusercontent.com" ,
  API_BASE_URL : import.meta.env.REACT_APP_API_BASE_URL as string,
}

export const initializeSocketIO = () => {
  try{
    const socket = io(BASE_URL)
    console.log('socket connected',socket)
    socket.on("connection", () => {
      console.log(" Socket Connection on");
    });
    return socket;
  }catch(error){
    console.error("Socket connection error:",error)
    return null;
  }
}

