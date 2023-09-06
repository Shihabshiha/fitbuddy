import { Request, Response } from "express";
import { CustomRequest } from "../../types/custom-request";
import courseService from "../../services/trainerServices/trainerCourseService";



const courseControllerFunctions = () =>{

  const trainerCourseService = courseService()
  const addCourse = async (req:Request , res:Response) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      console.log('trainerrr',trainerId);
      const { newCourse } = req.body;
      if (!trainerId) {
        return res.status(400).json({ error: "Trainer ID is missing or invalid" });
      }
      const result = await trainerCourseService.addCourse(newCourse, trainerId);
      res.status(200).json({ result });
    }catch(error:any){
      console.error(error);
      res.status(400).json({ error:error.message });
    }
  }

  return {
    addCourse
  }
}

export default courseControllerFunctions