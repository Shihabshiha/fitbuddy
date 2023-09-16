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
      console.log('video file ',videoFile)
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
      console.log('urlllll',cloudfrontUrl)
      
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

  return {
    addChapter,
  }
}

export default  chapterService;