import { ChaperData } from "../../types/chpterTypes";
import {  PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from "../../config/awsConfig";
import config from "../../config/config";
import ChapterModel, { IChapter } from "../../models/chapterModel"
import crypto from 'crypto'
import mongoose from "mongoose";


const chapterService = () => {

  const addChapter = async(
    chapterDetails :any,
    courseId : string,
    videoFile : Express.Multer.File,
    trainerId :string,
  ) => {
    try{
      if(!videoFile){
        throw new Error ("Video file missing")
      }
      const { caption , order , description } = chapterDetails;
      const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
      const key = randomImageName()
      const file = videoFile;
      const params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params); 

      await s3.send(command);

      const cloudfrontDomain = config.CLOUDFRONT_DOMAIN;

      const cloudfrontUrl = `https://${cloudfrontDomain}/${key}`
      
      const courseObjectId = new mongoose.Types.ObjectId(courseId)
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId)

      const newChapter : ChaperData = {
        caption: caption,
        order : order,
        description : description,
        trainerId: trainerObjectId,
        courseId: courseObjectId,
        videoUrl: cloudfrontUrl
      }

      const savedChapter = ChapterModel.create(newChapter)
      return savedChapter
    }catch(error:any){
      console.error(error)
      throw error;
    }
  }

  const getChapterByCourseId = async (courseId:string ) => {
    try{
      if(!courseId){
        throw new Error ("Course not found")
      }
      const courseObjectId = new mongoose.Types.ObjectId(courseId)
      const chapters = await ChapterModel.find( { courseId : courseObjectId} )
      return chapters;
    }catch(error:any){
      throw error
    }
  }

  const deleteChapter = async (chapterId:string) => {
    try{
      const deletedChapter = ChapterModel.findByIdAndDelete(chapterId)
      if(!deletedChapter){
        throw new Error ("Chapter not found")
      }
      return deletedChapter
    }catch(error:any){
      throw error
    }
  }

  return {
    addChapter,
    getChapterByCourseId,
    deleteChapter,
  }
}

export default  chapterService;