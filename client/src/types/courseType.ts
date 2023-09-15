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
  order: number;
  videoFile: File[] 
}

export interface Chapter{
  _id:string;
  caption:string;
  order: number;
  videoUrl: string;
}