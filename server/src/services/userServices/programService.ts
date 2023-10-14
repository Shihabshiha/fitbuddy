import mongoose from "mongoose";
import CourseModel from "../../models/courseModel";
import stripeInstance , { StripePaymentIntent} from "../../config/stripeConfig";
import EnrollmentModel from "../../models/enrollmentModel";
import UserModel from "../../models/userModel";
import { Session } from "inspector";


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
      const enrollmentData = {
        programId : programObjectId,
        userId : userObjectId,
        payment : {
          amount : paymentIntent.amount / 100,
          method : paymentIntent.payment_method_types[0],
          date : new Date(paymentIntent.created * 1000)
        }
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

  return {
    getWeightGainPrograms,
    getProgramDetails,
    getProgramById,
    handlePaymentSuccess,
    getEnrolledPrograms,
  }
}

export default programService