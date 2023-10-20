import mongoose , {Schema} from "mongoose";
import { NotificationDocument } from "../types/commonTypes";

const notificationSchema = new Schema({
  type: {
    type: String, 
    required: true,
  },
  NotifyToId: {
    type: Schema.Types.ObjectId, 
    required: true,
    refPath : 'NotifyToType',
  },
  NotifyToType :{
    type: String,
    enum : ["trainers" , "users"],
    required : true,
  },
  message: {
    type: String, 
    required: true,
  },
  relatedCommentId: {
    type: Schema.Types.ObjectId, 
    required: true,
  },
  createdAt: {
    type: Date, 
    required: true,
  },
  videoId: {
    type: Schema.Types.ObjectId, 
    required: true,
  },
  commenterType : {
    type: String,
    enum: ["trainers" , "users"],
  },
  commenterId: {
    type: Schema.Types.ObjectId, 
    refPath : 'commenterType',
    required: true,
  },
  commentContent: {
    type: String, 
    required: true,
  },
  read: {
    type: Boolean, 
    required: true,
  },
});

const NotificationModel = mongoose.model<NotificationDocument>('Notification', notificationSchema);

export default NotificationModel;