import mongoose from "mongoose"
import ChatRoomModel from "../../models/chatRoomModel"
import MessageModel from "../../models/messageModel"
import { NewMessageData } from "../../types/commonTypes"
import cloudinary from "../../config/cloudinaryConfig"
import { Schema } from "express-validator"

const chatService = () => {

  const getAllChatList = async(trainerId : string) => {
    try{
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId)

      const chatList = await ChatRoomModel.find({
        "participants.trainerId" : trainerObjectId
      })

      if(chatList.length > 0){
        const populatedChatList =await ChatRoomModel.populate(chatList,[
          { path: 'participants.trainerId', model: 'Trainer' , select: 'firstName lastName '},
          { path: 'participants.userId', model: 'User' ,select: 'firstName lastName profileImage'},
        ])
        return populatedChatList
      }
    }catch(error){
      throw error
    }
  }

  const getChatDetails = async(chatId:string , trainerId:string) => {
    try{
      const chatObjectId = new mongoose.Types.ObjectId(chatId)
      const chats = await MessageModel.find({
        chatRoomId : chatObjectId
      })
      
      const userInfo = await ChatRoomModel.findById(chatId)
        .populate({
          model: 'User',
          path: 'participants.userId',
          select: 'firstName lastName profileImage',
      })
      return {chats , userInfo}
    }catch(error){
      throw error
    }
  }

  const sendNewMessage = async(trainerId:mongoose.Types.ObjectId , chatId:string , content:string) => {
    try{
      const trainerObjectId = trainerId;
      const chatObjectId = new mongoose.Types.ObjectId(chatId);
      const chatRoom = await ChatRoomModel.findById(chatId);
      const userId = chatRoom?.participants.userId;
      const userObjectId = new mongoose.Types.ObjectId(userId)
      const newMessageData : NewMessageData = {
        messageType : "text",
        content: content, 
        sender: {
          senderId: trainerObjectId, 
          senderType: "trainers",
        },
        recipient: {
          recipientId : userObjectId,
          recipientType: "users",
        },
        chatRoomId: chatObjectId,
        isRead: false,
      }

      const newMessage = MessageModel.create(newMessageData)
      return newMessage

    }catch(error){
      throw error
    }
  }

  const sendImageFile = async(trainerId:mongoose.Types.ObjectId , chatId:string , imageFile :any , mimeType:any) => {
    try{
      const trainerObjectId = trainerId;
      const chatObjectId = new mongoose.Types.ObjectId(chatId);
      const chatRoom = await ChatRoomModel.findById(chatId);
      const userId = chatRoom?.participants.userId;
      const userObjectId = new mongoose.Types.ObjectId(userId)
      const imageBase64 = imageFile.toString('base64');
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${imageBase64}`,
        {
          folder: "fitbuddy/chat-image",
        }
      );
      
      const imageUrl = uploadResponse.secure_url;
      const newMessageData : NewMessageData = {
        messageType : "image",
        content: imageUrl, 
        sender: {
          senderId: trainerObjectId, 
          senderType: "trainers",
        },
        recipient: {
          recipientId : userObjectId,
          recipientType: "users",
        },
        chatRoomId: chatObjectId,
        isRead: false,
      }
      const newMessage = MessageModel.create(newMessageData)
      return newMessage;
    }catch(error){
      throw error
    }
  }

  return {
    getAllChatList,
    getChatDetails,
    sendNewMessage,
    sendImageFile,
  }
}

export default chatService