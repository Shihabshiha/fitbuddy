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

type Replies = {
  authorName : string,
  authorType : string,
  content : string,
  createdAt : Date,
}

export interface CommentDocument extends Document{
  content : string;
  authorId : mongoose.Types.ObjectId;
  authorType : string;
  videoId : mongoose.Types.ObjectId;
  replies : Replies;
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

export type ReplayParams = {
  authorId: string;
  authorType: string;
  commentId: string;
  replayContent: string;
}



export interface ChatRoomDocument extends Document{
  participants:{
    userId : mongoose.Types.ObjectId;
    trainerId : mongoose.Types.ObjectId;
  };
  latestMessage : mongoose.Types.ObjectId;
  unreadMessages : number;
}


export interface MessageDocument extends Document{
  messageType : string;
  content : string;
  sender : {
    senderId: mongoose.Types.ObjectId;
    senderType : string;
  };
  recipient : {
    recipientId: mongoose.Types.ObjectId;
    recipientType : string;
  }
  chatRoomId : mongoose.Types.ObjectId;
  isRead : boolean;
}

export type NewMessageData = {
  messageType :string;
  content : string;
  sender : {
    senderId: mongoose.Types.ObjectId;
    senderType : string;
  };
  recipient : {
    recipientId: mongoose.Types.ObjectId;
    recipientType : string;
  }
  chatRoomId : mongoose.Types.ObjectId;
  isRead : boolean;
}
