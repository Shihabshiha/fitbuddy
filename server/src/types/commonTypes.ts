import { CustomRequest } from "./custom-request";
import { Response, NextFunction } from "express";
import mongoose , {Document} from "mongoose";

export interface SignupRequestBody {
  firstName: string;
  lastName:string;
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface CommentDocument extends Document{
  content : string;
  authorId : mongoose.Types.ObjectId;
  authorType : string;
  videoId : mongoose.Types.ObjectId;
  replies : mongoose.Types.ObjectId[];
  createdAt : Date;
}

export type CommentParams = {
  authorId: string;
  authorType: string;
  videoId: string;
  newComment: string;
}

export interface NotificationDocument extends Document{
  type: string;
  NotifyToId: mongoose.Types.ObjectId;
  NotifyToType : string;
  message: string;
  relatedCommentId : mongoose.Types.ObjectId;
  createdAt: Date;
  videoId: mongoose.Types.ObjectId;
  commenterId: mongoose.Types.ObjectId;
  commenterType : string;
  commentContent: string;
  read: boolean;
}

export type NotificationType = {
  type: string;
  NotifyToId: mongoose.Types.ObjectId;
  NotifyToType : string;
  message: string;
  relatedCommentId: mongoose.Types.ObjectId;
  createdAt: Date;
  videoId: mongoose.Types.ObjectId;
  commenterId: mongoose.Types.ObjectId;
  commenterType : string;
  commentContent: string;
  read: boolean;
}

