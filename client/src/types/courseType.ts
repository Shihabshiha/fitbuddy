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
  stripePriceId:string;
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
  enrollmentCount : number;
  thumbnailUrl: string;
  createdAt: string;
  stripePriceId:string;
  trainerDetails : {
    _id : string;
    firstName: string;
    lastName : string;
    profileUrl: string;
  }
  videos : Video[];
}

export interface Video {
  caption: string;
  courseId: string;
  createdAt: string;
  order: string;
  trainerId: string;
  updatedAt: string;
  videoUrl: string;
  description : string;
  __v: number;
  _id: string;
}

export type ProgramProgress = {
  programName : string;
  progress: number;
  programThumbnailUrl : string;
  programId : string;
}

interface UserDetails {
  email: string;
  enrolledPrograms: string[];
  firstName: string;
  isBlocked: boolean;
  lastName: string;
  password: string;
  profileImage: string;
  _id: string;
}

export interface CommentType  {
  authorId: string;
  authorType: string;
  content: string;
  replies: string[]; 
  userDetails: UserDetails[];
  videoId: string;
  createdAt : Date;
  _id: string;
}