import { ChaperData } from "../../types/chpterTypes";
import {  PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from "../../config/awsConfig";
import config from "../../config/config";
import { IChapter } from "../../models/chapterModel";
import ChapterModel from "../../models/chapterModel"
import crypto from 'crypto'

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
      const { caption , order } = chapterDetails;
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
      
      
      const newChapter : ChaperData = {
        caption: caption,
        order : order,
        trainerId: trainerId,
        courseId: courseId,
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
      const chapters = await ChapterModel.find( { courseId : courseId} )
      return chapters;
    }catch(error:any){
      throw error
    }
  }

  return {
    addChapter,
    getChapterByCourseId,
  }
}

export default  chapterService;