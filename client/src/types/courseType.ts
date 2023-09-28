export interface Course {
  _id: string;
  courseName: string;
  trainerId: string;
  duration: number;
  category: string;
  level: string;
  price: number;
  isPaid: boolean;
  description: string;
  thumbnailUrl: string;
  isListed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChapterData {
  caption: string;
  description:string;
  order: number;
  videoFile: File[] 
}

export interface Chapter{
  _id:string;
  caption:string;
  description:string;
  order: number;
  videoUrl: string;
}

export interface ProgramApiResponse {
  _id: string;
  courseName: string;
  trainerId: string;
  duration: number;
  category: string;
  level: string;
  price: number;
  isPaid: boolean;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  trainerProfileUrl:string;
  trainerName : string;
}

export interface ProgramDetailInterface {
  _id: string;
  courseName: string;
  trainerId: string;
  duration: number;
  category: string;
  level: string;
  price: number;
  isPaid: boolean;
  description: string;
  about:string;
  thumbnailUrl: string;
  createdAt: string;
  trainerDetails : {
    _id : string;
    firstName: string;
    lastName : string;
    profileUrl: string;
  }
  videos : Video[];
}

interface Video {
  caption: string;
  courseId: string;
  createdAt: string;
  order: string;
  trainerId: string;
  updatedAt: string;
  videoUrl: string;
  __v: number;
  _id: string;
}