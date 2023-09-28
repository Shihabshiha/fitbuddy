import mongoose from "mongoose";
import CourseModel from "../../models/courseModel";


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
      console.log(programDetails)
      return programDetails[0]
    }catch(error){
      throw error
    }
  }

  return {
    getWeightGainPrograms,
    getProgramDetails,
  }
}

export default programService