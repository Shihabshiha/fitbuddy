import { Request, Response } from "express";
import { CustomRequest } from "../../types/custom-request";
import chapterService from "../../services/trainerServices/chapterService";

const trainerChapterFunction = () => {

  const trainerChapterService = chapterService()

  const addChapter = async (req:Request, res:Response) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if(!trainerId){
        return res.status(400).json({ error: "Trainer ID is missing or invalid" });
      }
      const courseId = req.params.courseId;
      const videoFile = req.file as Express.Multer.File;
      const { caption , order } = req.body;
      console.log(req.file)
      console.log('filesss',req.files)
      const result = await trainerChapterService.addChapter({caption,order},courseId,videoFile,trainerId)
      res.status(200).json(result)
    }catch(error:any){
      res.status(400).json({ error:error.message });
    }
  }

  return {
    addChapter,
  }
}

export default trainerChapterFunction;