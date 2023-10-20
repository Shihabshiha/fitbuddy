import mongoose from "mongoose";
import CourseModel from "../../models/courseModel";
import stripeInstance , { StripePaymentIntent} from "../../config/stripeConfig";
import EnrollmentModel from "../../models/enrollmentModel";
import UserModel from "../../models/userModel";
import { Session } from "inspector";
import { CourseInterface } from "../../types/courseTypes";
import { CommentDocument, CommentParams, NotificationType } from "../../types/commonTypes";
import CommentModel from "../../models/commentModel";
import ChapterModel from "../../models/chapterModel";
import NotificationModel from "../../models/notificationModel";


const programService = () => {


  const getWeightGainPrograms = async() => {
    try{
      const programs = await CourseModel.aggregate([
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
        }
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

      console.log("programs",program)

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

      console.log('enrollment data',enrollmentData)

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
      const commentResult = await CommentModel.create(commentData);
      

      const relatedCommentId = new mongoose.Types.ObjectId(commentResult._id)
      const video = await ChapterModel.findById(videoId)
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
        console.log('notificatipon data',notificationData)

        const result = await NotificationModel.create(notificationData);
        console.log('notificationnn',result)
      }
      return commentResult;

    }catch(error){
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
  }
}

export default programService