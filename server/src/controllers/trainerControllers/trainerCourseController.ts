import { Request, Response } from "express";
import { CustomRequest } from "../../types/custom-request";
import courseService from "../../services/trainerServices/trainerCourseService";
import cloudinary from "../../config/cloudinaryConfig";


const courseControllerFunctions = () =>{

  const trainerCourseService = courseService()
  const addCourse = async (req:Request , res:Response) => {
    try{
      
      const trainerId = (req as CustomRequest).person?.id;
      console.log('trainerrr',trainerId);
      
      if (!trainerId) {
        return res.status(400).json({ error: "Trainer ID is missing or invalid" });
      }
      console.log(req.files)
      const thumbnailFile = req.files as Express.Multer.File[];
      
      if (!thumbnailFile) {
        return res.status(400).json({ error: 'Thumbnail image is missing' });
      }
      console.log('request body',req.body)
      const newCourse  = req.body;
      const {
        courseName,
        description,
        category,
        level,
        price: priceString, 
        isPaid: isPaidString, 
        duration,
      } = newCourse;

      const price = priceString ? parseFloat(priceString) : 0;
      const isPaid = isPaidString === 'true' ? true : isPaidString === 'false' ? false : false;


      const result = await trainerCourseService.addCourse({
        courseName,
        description,
        category,
        level,
        price,
        isPaid,
        duration,
      }, trainerId, thumbnailFile);

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