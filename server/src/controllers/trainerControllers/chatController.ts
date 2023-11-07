import { Request, Response } from "express";
import { CustomRequest } from "../../types/custom-request";
import chatService from "../../services/trainerServices/trainerChatService";
import mongoose from "mongoose";

const chatControllerFunction = () => {
  const trainerChatService = chatService()

  const getAllChatList = async(req: Request, res: Response) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if(trainerId){
        const chatList = await trainerChatService.getAllChatList(trainerId)
        res.status(200).json({chatList})
      }
    }catch(error:any){
      console.error(error)
      res.status(500).json({error:"Intrnal Server Error"})
    }
  }

  const getChatDetails = async (req: Request, res: Response) => {
    try{
      const chatId = req.params.chatId;
      const trainerId = (req as CustomRequest).person?.id;
      if(chatId && trainerId){
        const { chats, userInfo} = await trainerChatService.getChatDetails(chatId , trainerId)
        res.status(200).json({chats , userInfo})
      }
    }catch(error:any){
      console.error(error)
      res.status(500).json({error:"Intrnal Server Error"})
    }
  }


  return {
    getAllChatList,
    getChatDetails,
  }
}

export default chatControllerFunction;