import { Request, Response } from "express";
import { CustomRequest } from "../../types/custom-request";
import courseService from "../../services/trainerServices/trainerCourseService";


const courseControllerFunctions = () =>{

  const trainerCourseService = courseService()

  const addCourse = async (req:Request , res:Response) => {
    console.log('called add course')
    try{
      
      const trainerId = (req as CustomRequest).person?.id;
      
      if (!trainerId) {
        return res.status(400).json({ error: "Trainer ID is missing or invalid" });
      }
      
      const thumbnailFile = req.files as Express.Multer.File[];
      
      if (!thumbnailFile) {
        return res.status(400).json({ error: 'Thumbnail image is missing' });
      }
      
      const newCourse  = req.body;
      const {
        courseName,
        description,
        category,
        level,
        about,
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
        about,
        price,
        isPaid,
        duration,
      }, trainerId, thumbnailFile);
      console.log('add course result',result)
       res.status(200).json({ result });
    }catch(error:any){
      console.log(error);
      res.status(400).json({ error:error.message });
    }
  }

  const getAllCourses = async ( req:Request, res:Response) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if (!trainerId) {
        return res.status(400).json({ error: "Trainer ID is missing or invalid" });
      } 
      const result = await trainerCourseService.getAllCourse(trainerId)
      res.status(200).json({result})
    }catch(error:any){
      res.status(400).json({error:error.message})
    }
  }

  const updateCourseStatus = async (req:Request,res:Response) => {
    const courseId = req.params.courseId;
    const { isListed } = req.body;
    try{
      const updatedCourse = await trainerCourseService.updateCourseStatus(courseId,isListed)
      res.status(200).json(updatedCourse)
    }catch(error:any){
      if (error.message === 'Course not found') {
        res.status(404).json({ error: 'Course not found' });
      } else {
        res.status(500).json({ error:error.message });
      }
    }
  }

  const deleteCourse = async (req:Request,res:Response) => {
    const courseId = req.params.courseId;
    try{
      const result = await trainerCourseService.deleteCourse(courseId)
      res.status(200).json(result)
    }catch(error:any){
      if (error.message === 'Course not found') {
        res.status(404).json({ error: 'Course not found' });
      } else {
        res.status(500).json({ error:error.message });
      }
    }
  }

  const getRevenueData = async (req:Request,res:Response) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if(trainerId){
        const result = await trainerCourseService.getRevenueData(trainerId);
        res.status(200).json({result})
      }
    }catch(error:any){
      res.status(500).json({ error:error.message });
    }
  }





  return {
    addCourse,
    getAllCourses,
    updateCourseStatus,
    deleteCourse,
    getRevenueData,
  }
}

export default courseControllerFunctions