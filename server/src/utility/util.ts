import mongoose from "mongoose";
import ChatRoomModel from "../models/chatRoomModel";
import chatService from "../services/trainerServices/trainerChatService";
import programService from "../services/userServices/programService";

const utilFunction = () => {
  const trainerChatService = chatService()
  const userChatService = programService()
  
  const addMessage = async(data:any) => {
    console.log('got here',data)
    const chatId = data.chatId
    const content = data.content
    const chatRoom = await ChatRoomModel.findById(chatId).exec()
    const trainerId = chatRoom?.participants.trainerId;
    const userId = chatRoom?.participants.userId;
    if(data.messageType === 'text'){
      // const chatObjectId = new mongoose.Types.ObjectId(data.chatId);
      if(chatRoom && trainerId && data.sender ==='trainer'){ 
        console.log('until trainer')
        try{
          const res = await  trainerChatService.sendNewMessage(trainerId , chatId , content);
          return res;
        }catch{
          return null;
        } 
      }else if(chatRoom && userId && data.sender ==='user'){ 
        const res = await userChatService.sendNewMessage(userId , content , chatId)
        return res
      }
    }else if(data.messageType === 'image'){
      const mimeType = data.mimeType;
      if(chatRoom && trainerId && data.sender ==='trainer'){  
        try{
          const res = await trainerChatService.sendImageFile( trainerId , chatId , content , mimeType)
          console.log('response image',res)
          return res;
        }catch(error){
          console.error("error in sending image",error)
          return null;
        }
      }else if(chatRoom && userId && data.sender ==='user'){ 
        try{
          const res = await userChatService.sendImageFile(userId , content , chatId , mimeType)
          console.log('response image',res)
          return res;
        }catch(error){
          console.error('error sending image user',error)
          return null;
        }
      }
    }
  }

  return {
    addMessage
  }
}

export default utilFunction;