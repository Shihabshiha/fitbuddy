import mongoose from "mongoose";
export interface ChaperData {
  caption : string;
  order : number;
  description:string;
  trainerId:mongoose.Types.ObjectId;
  courseId:mongoose.Types.ObjectId;
  videoUrl:string;
}