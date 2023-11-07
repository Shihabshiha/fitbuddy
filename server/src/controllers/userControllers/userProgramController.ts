import { Request, Response} from "express";
import programService from "../../services/userServices/programService";
import stripeInstance , { StripePaymentIntent} from "../../config/stripeConfig";
import config from "../../config/config";
import { CustomRequest } from "../../types/custom-request";
import mongoose from "mongoose";


const programControllerFunction = () => {

  const programServices = programService()

  const getWeightGainPrograms = async (req:Request, res:Response) => {
    try{
      const programs = await programServices.getWeightGainPrograms()
      res.status(200).json({programs})
    }catch(error:any){
      res.status(500).json({error:'Internal server error'})
    }
  }

  const getProgramDetails = async ( req:Request , res:Response) => {
    try{
      const programId : string = req.params.programId;
      const program = await programServices.getProgramDetails(programId)
      res.status(200).json({program})
    }catch(error:any){
      
      res.status(500).json({error:"Internal server error"})
    }
  }


  const handlePaymentSuccess = async( req:Request , res: Response ) => {
    try{
      const event = req.body;
      if (event.type === 'payment_intent.succeeded'){
        const paymentIntent : StripePaymentIntent = event.data.object;
        await programServices.handlePaymentSuccess(paymentIntent);   
        res.json({ received: true }); 
      }else{
        res.json({ received: true });
      }
    }catch(error:any){
      console.error('Unexpected error in webhook:', error)
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const createCheckoutSession = async (req:Request , res: Response ) => {
    try{
      const userId = (req as CustomRequest).person?.id as string
      const { programId } = req.body;
      const program = await  programServices.getProgramById(programId);
      const successUrl = `${config.FRONT_END_BASE_URL}/program/${programId}?result=success&courseId=${programId}`;
      const cancelUrl = `${config.FRONT_END_BASE_URL}/program/${programId}?result=cancel&courseId=${programId}`;


      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types : ["card"],
        line_items: [
          {
            price: program?.stripePriceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        payment_intent_data : {
          metadata : {
            programId : programId,
            userId : userId,
          }
        },
      });
      res.status(200).json(session)
    }catch(error:any){
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  const getEnrolledProgram = async(req:Request,res:Response) => {
    const userId : string = req.params.userId
    try{
      const enrolledPrograms = await programServices.getEnrolledPrograms(userId)
      res.status(200).json({enrolledPrograms})
    }catch(error:any){
      res.status(500).json({error:"Internal Server Error"})
    }

  }

  const markVideoAsWatched = async(req:Request , res:Response) => {
    try{
      const userId = (req as CustomRequest).person?.id;
      const { videoId } = req.body;
      if(userId){
        const result = await programServices.markVideoAsWatched(videoId,userId)
        if(result){
          res.status(200).json({ message: 'Video marked as watched successfully' });
        }else{
          res.status(400).json({ error: 'Failed to mark video as watched' });
        }
      }
    }catch(error:any){
      res.status(500).json({ error: 'Server error' });
    }
  }

  const getProgramProgress = async(req:Request , res:Response) => {
    try{
      const userId = (req as CustomRequest).person?.id;
      if(userId){
        const programProgress = await programServices.getProgramProgress(userId)
        res.status(200).json({programProgress})
      }
    }catch(error:any){
      res.status(500).json({error:"Internal server error"})
    }
  }

  const postNewComment = async(req:Request , res:Response) => {
    try{
      const authorId = (req as CustomRequest).person?.id;
      const authorType = (req as CustomRequest).person?.role;
      console.log('author type',authorType)
      const { videoId , newComment } = req.body;
      if(authorId && authorType){
        console.log('inside conroller')
        const result = await programServices.postNewComment({ authorId, authorType, videoId, newComment })
        res.status(200).json({message :"Comment added", result})
      }
    }catch(error){
      res.status(500).json({error:"Intrnal Server Error"})
    }
  }

  const getAllCommentsForVideo = async(req:Request , res:Response) =>{
    console.log('comment called')
    try{
      const videoId : string = req.params.videoId;
      const comments = await programServices.getAllCommentsForVideo(videoId);
      res.status(200).json({comments})
    }catch(error){
      res.status(500).json({error:"Intrnal Server Error"})
    }
  }

  const createChatRoom = async (req:Request, res:Response) => {
    try{
      const { trainerId } = req.body;
      const userId = (req as CustomRequest).person?.id;
      if(userId){
        const result = await programServices.createChatRoom(userId , trainerId)
        res.status(200).json({result})
      }
    }catch(error:any){
      res.status(500).json({error:"Intrnal Server Error"})
    }
  }

  const getAllChatList = async (req:Request , res:Response) => {
    try{
      const userId = (req as CustomRequest).person?.id;
      if(userId){
        const chatList = await programServices.getAllChatList(userId);
        res.status(200).json({chatList})
      }
    }catch(error:any){
      res.status(500).json({error:"Intrnal Server Error"})
    }
  }

  const getChatDetails = async (req:Request , res:Response) => {
    try{
      const chatId = req.params.chatId;
      const {chats , trainerInfo} = await programServices.getChatDetails(chatId);
      res.status(200).json({chats , trainerInfo})
    }catch(error:any){
      res.status(500).json({error:"Intrnal Server Error"})
    }
  }



 

  return {
    getWeightGainPrograms,
    getProgramDetails,
    handlePaymentSuccess,
    createCheckoutSession,
    getEnrolledProgram,
    markVideoAsWatched,
    getProgramProgress,
    postNewComment,
    getAllCommentsForVideo,
    createChatRoom,
    getAllChatList,
    getChatDetails,
  }
}

export default programControllerFunction;