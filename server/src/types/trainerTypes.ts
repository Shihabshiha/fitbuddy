import { Document } from "mongoose";

export interface Trainer extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isBlocked : boolean;
  isVerified :string;
  certificates : string[];
}

export interface CourseData {
  courseName: string;
  description: string;
  thumbnail: File | null;
  category: string;
  duration: Number;
  thumbnailUrl: string;
  level:string;
  trainerId: string;
  isVerified: boolean;
  price: number;
  isPaid: boolean;
}

export interface CourseAttributes extends Document {
  courseName: string;
  description: string;
  thumbnailUrl: string;
  duration: number;
  category: string;
  level:string;
  trainerId: string;
  isVerified: boolean;
  price: number;
  isPaid: boolean;
}