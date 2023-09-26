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

  return {
    getWeightGainPrograms
  }
}

export default programService