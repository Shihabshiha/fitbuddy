import { Request, Response } from "express";
import { CustomRequest } from "../../types/custom-request";
import chapterService from "../../services/trainerServices/chapterService";

const trainerChapterFunction = () => {
  const trainerChapterService = chapterService();

  const addChapter = async (req: Request, res: Response) => {
    try {
      const trainerId = (req as CustomRequest).person?.id;
      if (!trainerId) {
        return res
          .status(400)
          .json({ error: "Trainer ID is missing or invalid" });
      }
      const courseId = req.params.courseId;
      const videoFile = req.file as Express.Multer.File;
      const { caption, order, description } = req.body;
      const result = await trainerChapterService.addChapter(
        { caption, order, description },
        courseId,
        videoFile,
        trainerId
      );
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Video file missing") {
        res.status(404).json({ error: "Video file missing" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  const getChapterByCourseId = async (req: Request, res: Response) => {
    try {
      const courseId: string = req.params.courseId;
      const result = await trainerChapterService.getChapterByCourseId(courseId);
      res.status(200).json({ result });
    } catch (error: any) {
      if (error.message === "Course not found") {
        res.status(404).json({ error: "Course not found" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  const deleteChapterById = async (req: Request, res: Response) => {
    const chapterId = req.params.chapterId;
    try {
      const result = await trainerChapterService.deleteChapter(chapterId);
      res.status(200).json(result);
    } catch (error: any) {
      if (error.message === "Chapter not found") {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  };

  const getAllNotifications = async(req:Request , res:Response) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if(trainerId){
        const notifications = await trainerChapterService.getAllNotifications(trainerId);
        res.status(200).json({notifications})
      }
    }catch(error:any){
      res.status(500).json({ error: error.message });
    }
  }

  const replayToComment = async(req:Request , res: Response) => {
    try{
      const authorId = (req as CustomRequest).person?.id;
      const authorType = (req as CustomRequest).person?.role;
      const {commentId , replayContent} = req.body;
      if(authorId && authorType){
        const replayResponse = await trainerChapterService.replayToComment({commentId , replayContent , authorId, authorType}) 
        res.status(200).json({replayResponse})
      }
    }catch(error:any){
      res.status(500).json({ error: error.message });
    }
  }

  const getUnreadNotificationCount = async (req:Request , res: Response) =>{
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if(trainerId){
        const count = await trainerChapterService.getUnreadNotificationCount(trainerId);
        res.status(200).json({count})
      }
    }catch(error:any){
      res.status(500).json({ error: error.message });
    }
  }

  const markNotificationAsRead = async (req:Request , res: Response) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if(trainerId){
        const result = await trainerChapterService.markNotificationAsRead(trainerId);
        res.status(200).json({message : "Notifications marked as read "})
      }
    }catch(error:any){
      res.status(500).json({ error: error.message });
    }
  }

  const getAllEnrollments = async (req:Request , res : Response ) => {
    try{
      const trainerId = (req as CustomRequest).person?.id;
      if(trainerId){
        const enrollments = await trainerChapterService.getAllEnrollments(trainerId)
        res.status(200).json({enrollments})
      }
    }catch(error:any){
      res.status(500).json({ error: error.message });
    }
  }

  return {
    addChapter,
    getChapterByCourseId,
    deleteChapterById,
    getAllNotifications,
    replayToComment,
    getUnreadNotificationCount,
    markNotificationAsRead,
    getAllEnrollments,
  };
};

export default trainerChapterFunction;
