import mongoose from "mongoose";
import CourseModel from "../../models/courseModel";
import stripeInstance , { StripePaymentIntent} from "../../config/stripeConfig";
import EnrollmentModel from "../../models/enrollmentModel";
import UserModel from "../../models/userModel";
import { Session } from "inspector";
import { CourseInterface } from "../../types/courseTypes";
import { CommentDocument, CommentParams, NewMessageData, NotificationType } from "../../types/commonTypes";
import CommentModel from "../../models/commentModel";
import ChapterModel from "../../models/chapterModel";
import NotificationModel from "../../models/notificationModel";
import ChatRoomModel from "../../models/chatRoomModel";
import MessageModel from "../../models/messageModel";
import cloudinary from "../../config/cloudinaryConfig";


const programService = () => {


  const getWeightGainPrograms = async() => {
    try{
      const programs = await CourseModel.aggregate([
        {
          $match: {
            isListed: true, 
          },
        },
        {
          $lookup:{
            from:"trainers",
            localField:"trainerId",
            foreignField:"_id",
            as:"trainer"
          }
        },
        {
          $unwind:"$trainer"
        },
        {
          $project: {
            _id: 1,
            courseName: 1,
            trainerId: 1,
            duration: 1,
            category: 1,
            level: 1,
            price: 1,
            isPaid: 1,
            description: 1,
            thumbnailUrl: 1,
            createdAt: 1,
            trainerName: "$trainer.firstName" 
          }
        },
        {
          $sort: {
            createdAt: -1, 
          },
        },
      ])

      return programs
    }catch(error:any){
      throw error
    }
  }

  const getProgramDetails = async (programId:string) => {
    const programObjectId = new mongoose.Types.ObjectId(programId)
    try{
      const programDetails =await CourseModel.aggregate([
        {
          $match:{
            _id : programObjectId
          }
        },
        {
          $lookup : {
            from : "trainers",
            localField : "trainerId",
            foreignField : "_id",
            as : "trainerDetails",
          }
        },
        {
          $unwind:"$trainerDetails",
        },
        {
          $lookup:{
            from : 'chapters',
            localField : '_id',
            foreignField : 'courseId',
            as : 'videos',
          }
        },
        {
          $project: {
            _id: 1,            
            courseName : 1,
            duration: 1,
            category: 1,
            level   : 1,
            price : 1, 
            description: 1, 
            enrollmentCount : 1,
            stripePriceId: 1,
            thumbnailUrl: 1,
            about : 1,
            createdAt : 1,
            trainerDetails : {
              _id : 1,
              firstName : 1,
              lastName : 1,
              profileUrl : 1,
            },
            videos: 1,
          }
        }
      ])
      
      if(programDetails.length === 0 ){
        throw new Error('Program not found')
      }
      return programDetails[0]
    }catch(error){
      throw error
    }
  }

  const getProgramById = async(programId:string) => {
    try{
      const program = await CourseModel.findById(programId)
      return program
    }catch(error:any){
      throw error
    }
  }

  const handlePaymentSuccess = async(paymentIntent: StripePaymentIntent) => {
    
      const programId : string = paymentIntent.metadata.programId;
      const userId : string = paymentIntent.metadata.userId;

      const programObjectId = new mongoose.Types.ObjectId(programId);
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const session = await mongoose.startSession();
      session.startTransaction();
    try{

      const program = await CourseModel.aggregate([
        {
          $match : {_id: programObjectId},
        },
        {
          $lookup : {
            from : "chapters",
            localField : "_id",
            foreignField : "courseId",
            as : "videos",
          },
        },
        {
          $project : {
            _id : 1,
            videos : 1,
          },
        },
      ])

      if(!program || program.length === 0){
        throw new Error ("Program not found")
      }

      const enrollmentData = {
        programId : programObjectId,
        userId : userObjectId,
        payment : {
          amount : paymentIntent.amount / 100,
          method : paymentIntent.payment_method_types[0],
          date : new Date(paymentIntent.created * 1000)
        },
        videosProgress : program[0].videos.map((video:any)=>({
          videoId: video._id,
          watched:false,
        }))
      }

      await EnrollmentModel.create([enrollmentData],{session})

      await UserModel.findByIdAndUpdate(userId,{ $push : { enrolledPrograms : programObjectId} } , { session });

      await CourseModel.findByIdAndUpdate(programId,{ $inc : { enrollmentCount : 1} }, { session });

      await session.commitTransaction();
      session.endSession();

    }catch(error:any){
      await session.abortTransaction();
      session.endSession();
      throw error 
    }
  }

  const getEnrolledPrograms = async(userId:string) => {
    try{
      const user = await UserModel.findById(userId);
      const enrolledPrograms = await CourseModel.aggregate([
        {
          $match:{
            _id:{ $in: user?.enrolledPrograms}
          },
        },
        {
          $lookup:{
            from:'trainers',
            localField:'trainerId',
            foreignField: '_id',
            as:'trainerDetails'
          }
        },
        {
          $unwind:"$trainerDetails"
        },
        {
          $project:{
            _id: 1,
            courseName: 1,
            trainerId: 1,
            duration: 1,
            category: 1,
            level: 1,
            price: 1,
            isPaid: 1,
            description: 1,
            thumbnailUrl: 1,
            createdAt: 1,
            trainerName: "$trainerDetails.firstName"
          }
        }
      ])
      return enrolledPrograms

    }catch(error:any){
      throw error
    }
  }

  const markVideoAsWatched = async(videoId:string , userId:string) => {
    try{

      const videoObjectId = new mongoose.Types.ObjectId(videoId);
      const userObjectId = new mongoose.Types.ObjectId(userId);

      const result = await EnrollmentModel.findOneAndUpdate(
        {
          userId : userObjectId,
          'videosProgress.videoId' : videoObjectId ,
        },
        {
          $set:{ 'videosProgress.$.watched' : true },
        },
        { new: true }
      )

      if(!result){
        return false
      }
      return result

    }catch(error:any){
      throw error
    }
  }

  const getProgramProgress = async (userId:string) => {
    try{
      const userObjectId = new mongoose.Types.ObjectId(userId)

      const enrollments = await EnrollmentModel.find(
        {
          userId : userObjectId,
        }
      )

      if (enrollments.length === 0) {
        throw new Error("User is not enrolled in any program.");
      }

      const progressByProgram = [];

      for(const enrollment of enrollments){
        const videos = enrollment.videosProgress;
        const totalVideos = videos.length;
        const watchedVideos = videos.filter((video)=> video.watched).length;
        const progressPercentage = (watchedVideos / totalVideos) * 100;

        const program : CourseInterface | null = await CourseModel.findById(enrollment.programId)
        const programName = program ? program.courseName : "";
        const programThumbnail = program ? program.thumbnailUrl : "";

        progressByProgram.push({
          programName : programName,
          progress : progressPercentage,
          programThumbnailUrl : programThumbnail,
          programId : enrollment.programId,
        })
      }

      return progressByProgram;

    }catch(error){
      throw error;
    }
  }

  const postNewComment = async ({ authorId, authorType, videoId, newComment }: CommentParams) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
      const authorObjectId = new mongoose.Types.ObjectId(authorId);
      const videoObjectId = new mongoose.Types.ObjectId(videoId);
      const currentTimestamp = new Date();
      const commentData  = {
        authorId : authorObjectId,
        authorType : authorType,
        videoId : videoObjectId,
        content : newComment,
        createdAt : currentTimestamp,
      }

      const commentResultArray = await CommentModel.create([commentData] , {session});  
      const commentResult = commentResultArray[0];    
      const relatedCommentId = commentResult._id;     
      const video = await ChapterModel.findById(videoId).session(session)
      if(video){      
        const trainerObjectId = new mongoose.Types.ObjectId(video.trainerId)
        const notificationData : NotificationType = {
          type: "comment",
          NotifyToId: trainerObjectId,
          NotifyToType: "trainers",
          message: "A new comment.",
          relatedCommentId : relatedCommentId, 
          createdAt: new Date(),
          videoId: videoObjectId, 
          commenterId: authorObjectId,
          commenterType: authorType, 
          commentContent: newComment, 
          read: false, 
        }   
        const result = await NotificationModel.create([notificationData] , { session });  
      }
    
      await session.commitTransaction();
      session.endSession();
      return commentResult;

    }catch(error){
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  const getAllCommentsForVideo = async (videoId:string) => {
     const videoObjectId = new mongoose.Types.ObjectId(videoId)
    try{
      const comments = await CommentModel.aggregate([
        {
          $match : {
            videoId : videoObjectId,
          }
        },
        {
          $lookup:{
            from : 'users',
            localField : 'authorId',
            foreignField : '_id',
            as : 'userDetails',
          }
        },
        
      ])
      return comments;
    }catch(error){
      throw error
    }
  }

  const createChatRoom = async (userId:string , trainerId:string) => {
    try{
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
      const existingChatRoom = await ChatRoomModel.findOne({
        "participants.userId": userObjectId,
        "participants.trainerId": trainerObjectId,
      })

      if(existingChatRoom){
        return existingChatRoom;
      }

      const newChatRoom = await ChatRoomModel.create({
        participants : {
          userId : userObjectId,
          trainerId : trainerObjectId,
        },
        latestMessage : null,
      })
      return newChatRoom;

    }catch(error){
      throw error
    }
  }

  const getAllChatList = async (userId:string) => {
    try{   
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const chatList = await ChatRoomModel.find({
        "participants.userId" : userObjectId
      })
  
      if(chatList.length > 0){
        const populatedChatList =await ChatRoomModel.populate(chatList,[
          { path: 'participants.trainerId', model: 'Trainer' , select: 'firstName lastName '},
          { path: 'participants.userId', model: 'User' ,select: 'firstName lastName profileImage'},
        ])
        return populatedChatList
      }else{
        return []
      }
      
    }catch(error){
      console.error(error)
      throw error
    }
  }

  const getChatDetails = async (chatId:string) => {
    try{
      const chatObjectId = new mongoose.Types.ObjectId(chatId)
      const chats = await MessageModel.find({
        chatRoomId : chatObjectId
      })

      const trainerInfo = await ChatRoomModel.findById(chatId)
        .populate({
          model: 'Trainer',
          path: 'participants.trainerId',
          select: 'firstName lastName ',
        })

      return { chats , trainerInfo}
    }catch(error){
      throw error;
    }
  }

  const sendNewMessage = async (userId:mongoose.Types.ObjectId , content:string ,chatId : string) => {
    try{
      const userObjectId = userId;
      const chatObjectId = new mongoose.Types.ObjectId(chatId);
      const chatRoom = await ChatRoomModel.findById(chatId)
      const trainerId = chatRoom?.participants.trainerId;
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId)
      const newMessageData : NewMessageData = {
        messageType : "text",
        content: content, 
        sender: {
          senderId: userObjectId, 
          senderType: "users",
        },
        recipient: {
          recipientId : trainerObjectId, 
          recipientType: "trainers",
        },
        chatRoomId: chatObjectId,
        isRead: false,
      }
      const newMessage = await MessageModel.create(newMessageData)
      return newMessage;
    }catch(error){
      console.error("error in service message :",error)
      throw error
    }
  }

  const sendImageFile = async(userId:mongoose.Types.ObjectId , imageFile :any , chatId:string , mimeType:any) => {
    try{
      const userObjectId = userId;
      const chatObjectId = new mongoose.Types.ObjectId(chatId);
      const chatRoom = await ChatRoomModel.findById(chatId)
      const trainerId = chatRoom?.participants.trainerId;
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId)

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
          senderId: userObjectId, 
          senderType: "users",
        },
        recipient: {
          recipientId : trainerObjectId, 
          recipientType: "trainers",
        },
        chatRoomId: chatObjectId,
        isRead: false,
      }
      const newMessage = await MessageModel.create(newMessageData)
      return newMessage
    }catch(error){
      throw error
    }
  }

  return {
    getWeightGainPrograms,
    getProgramDetails,
    getProgramById,
    handlePaymentSuccess,
    getEnrolledPrograms,
    markVideoAsWatched,
    getProgramProgress,
    postNewComment,
    getAllCommentsForVideo,
    createChatRoom,
    getAllChatList,
    getChatDetails,
    sendNewMessage,
    sendImageFile,
  }
}

export default programService