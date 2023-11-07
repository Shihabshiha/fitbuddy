import { ChaperData } from "../../types/chpterTypes";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../../config/awsConfig";
import config from "../../config/config";
import ChapterModel, { IChapter } from "../../models/chapterModel";
import crypto from "crypto";
import mongoose from "mongoose";
import NotificationModel from "../../models/notificationModel";
import { ReplayParams } from "../../types/commonTypes";
import CommentModel from "../../models/commentModel";
import TrainerModel from "../../models/trainerModel";
import EnrollmentModel from "../../models/enrollmentModel";

const chapterService = () => {
  const addChapter = async (
    chapterDetails: any,
    courseId: string,
    videoFile: Express.Multer.File,
    trainerId: string
  ) => {
    try {
      if (!videoFile) {
        throw new Error("Video file missing");
      }
      const { caption, order, description } = chapterDetails;
      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString("hex");
      const key = randomImageName();
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

      const cloudfrontUrl = `https://${cloudfrontDomain}/${key}`;

      const courseObjectId = new mongoose.Types.ObjectId(courseId);
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId);

      const newChapter: ChaperData = {
        caption: caption,
        order: order,
        description: description,
        trainerId: trainerObjectId,
        courseId: courseObjectId,
        videoUrl: cloudfrontUrl,
      };

      const savedChapter = ChapterModel.create(newChapter);
      return savedChapter;
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  };

  const getChapterByCourseId = async (courseId: string) => {
    try {
      if (!courseId) {
        throw new Error("Course not found");
      }
      const courseObjectId = new mongoose.Types.ObjectId(courseId);
      const chapters = await ChapterModel.find({ courseId: courseObjectId });
      return chapters;
    } catch (error: any) {
      throw error;
    }
  };

  const deleteChapter = async (chapterId: string) => {
    try {
      const deletedChapter = ChapterModel.findByIdAndDelete(chapterId);
      if (!deletedChapter) {
        throw new Error("Chapter not found");
      }
      return deletedChapter;
    } catch (error: any) {
      throw error;
    }
  };

  const getAllNotifications = async (trainerId: string) => {
    try {
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId);

      const notifications = await NotificationModel.aggregate([
        {
          $match: {
            NotifyToId: trainerObjectId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "commenterId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $lookup: {
            from: "chapters",
            localField: "videoId",
            foreignField: "_id",
            as: "videoDetails",
          },
        },
        {
          $sort: {
            createdAt: -1, 
          },
        },
      ]);
      return notifications;
    } catch (error) {
      throw error;
    }
  };

  const replayToComment = async ({
    commentId,
    replayContent,
    authorId,
    authorType,
  }: ReplayParams) => {
    try {
      const currentTime = new Date();
      const author = await TrainerModel.findById(authorId);
      const replayData = {
        authorName: author?.firstName,
        authorType: authorType,
        content: replayContent,
        createdAt: currentTime,
      };
      const UpdatedComment = await CommentModel.findOneAndUpdate(
        { _id: commentId },
        { $push: { replies: replayData } },
        { new: true }
      );
      return UpdatedComment;
    } catch (error) {
      throw error;
    }
  };

  const getUnreadNotificationCount = async (trainerId: string) => {
    try {
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
      const count = await NotificationModel.countDocuments({
        NotifyToId: trainerObjectId,
        read: false,
      });
      return count;
    } catch (error) {
      throw error;
    }
  };

  const markNotificationAsRead = async (trainerId: string) => {
    const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
    try {
      const result = await NotificationModel.updateMany(
        { NotifyToId: trainerObjectId },
        { $set: { read: true } }
      );

      return result;
    } catch (error) {
      throw error;
    }
  };

  const getAllEnrollments = async(trainerId:string) => {
    try{
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
      const enrollments = await EnrollmentModel.aggregate([
        {
          $lookup : {
            from : 'courses',
            localField : 'programId',
            foreignField : '_id',
            as : 'programInfo',
          },
        },
        {
          $match: {
            'programInfo.trainerId' : trainerObjectId,
          },
        },
        {
          $lookup: {
            from :'users',
            localField : 'userId',
            foreignField : '_id',
            as : 'userDetails'
          },
        },
        {
          $unwind : "$userDetails",
        },
        {
          $unwind : "$programInfo",
        },
        {
          $project : {
            _id : 1,
            enrolledPersonName : '$userDetails.firstName',
            programName : '$programInfo.courseName',
            payment : 1,
          },
        }
      ])
      return enrollments
    }catch(error){
      throw error
    }
  }

  return {
    addChapter,
    getChapterByCourseId,
    deleteChapter,
    getAllNotifications,
    replayToComment,
    getUnreadNotificationCount,
    markNotificationAsRead,
    getAllEnrollments,
  };
};

export default chapterService;
