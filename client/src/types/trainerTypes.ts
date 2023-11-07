export type TrainerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  certificates: File[];
};

export interface TrainerLoginData {
  email : string;
  password : string;
}

export interface TrainerDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  certificates: string[];
}

export interface CourseData {
  courseName: string;
  description: string;
  about:string;
  thumbnail: File[];
  duration: number;
  category: string;
  level: string;
  price: number;
  isPaid: boolean;
}

export interface AddCourseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddCourse: (newCourse: CourseData) => void;
}

type UserDetails = {
  email: string;
  enrolledPrograms: string[];
  firstName: string;
  isBlocked: boolean;
  lastName: string;
  password: string;
  profileImage: string;
  _id: string;
};

type VideoDetails = {
  caption: string;
  courseId: string;
  createdAt: string; 
  description: string;
  order: string;
  trainerId: string;
  updatedAt: string; 
  videoUrl: string;
  _id: string;
};

export type NotificationType = {
  _id : string;
  NotifyToId: string;
  NotifyToType: "trainers" | "users";
  commentContent: string;
  commenterId: string;
  commenterType: "trainers" | "users";
  createdAt: string;
  message: string;
  read: boolean;
  relatedCommentId: string;
  type: "comment";
  userDetails: UserDetails[];
  videoDetails: VideoDetails[];
};

type payment = {
  amount : number;
  method : string;
  date : string;
}

export type enrollmentTableType = {
  _id: string;
  enrolledPersonName : string;
  programName : string;
  payment : payment;
}

export type RevenueData = {
  courseName: string;
  revenue: number;
};