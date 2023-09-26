import { Schema, Document } from "mongoose";
import mongoose from "mongoose";

export interface CourseAttributes {
  courseName: string;
  description: string;
  category: string;
  level: string;
  price: number;
  isPaid: boolean;
  duration: number;
  thumbnailUrl: string;
  isListed: boolean;
  trainerId: mongoose.Types.ObjectId ;
}

export interface CourseInterface extends Document{
  courseName: string;
  description: string;
  category: string;
  level: string;
  price: number;
  isPaid: boolean;
  duration: number;
  thumbnailUrl: string;
  isListed: boolean;
  trainerId: mongoose.Types.ObjectId;
  subscribedUsers: Schema.Types.ObjectId[];
}

