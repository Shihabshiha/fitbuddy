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