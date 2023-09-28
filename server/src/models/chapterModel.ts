
import mongoose, { Schema, Document } from 'mongoose';

export interface IChapter extends Document {
  caption: string;
  order: number;
  videoUrl: string;
  description:string;
  trainerId: mongoose.Types.ObjectId;
  courseId:mongoose.Types.ObjectId;
}

const chapterSchema = new Schema({
    caption: {
      type:String,
      required:true,
    },
    description:{
      type:String,
      required:true,
    },
    order: {
      type:String,
      required:true,
    },
    videoUrl: {
      type:String,
      required:true,
    },
    trainerId : {
      type:Schema.Types.ObjectId,
      ref: 'trainers',
      required:true,
    },
    courseId : {
      type:Schema.Types.ObjectId,
      ref: 'courses',
      required:true,
    }
  },
  {
    timestamps:true,
  }
);

const ChapterModel = mongoose.model<IChapter>('Chapter', chapterSchema);

export default ChapterModel
