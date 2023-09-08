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
  category: string;
  duration: number;
  level:string;
  price: number;
  isPaid: boolean;
}
