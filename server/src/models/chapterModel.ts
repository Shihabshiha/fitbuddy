
import mongoose, { Schema, Document } from 'mongoose';

export interface IChapter extends Document {
  caption: string;
  order: number;
  videoUrl: string;
  trainerId: string;
  courseId:string;
}

const chapterSchema = new Schema({
    caption: {
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
      type:String,
      required:true,
    },
    courseId : {
      type:String,
      required:true,
    }
  },
  {
    timestamps:true,
  }
);

const ChapterModel = mongoose.model<IChapter>('Chapter', chapterSchema);

export default ChapterModel
