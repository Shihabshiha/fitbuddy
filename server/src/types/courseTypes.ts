import { Schema, Document } from "mongoose";

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
  trainerId: string;
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
  trainerId: string;
  subscribedUsers: Schema.Types.ObjectId[];
}

