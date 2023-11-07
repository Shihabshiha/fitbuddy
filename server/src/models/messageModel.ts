import mongoose, { Schema, Model } from "mongoose";
import { MessageDocument } from "../types/commonTypes";

const messageSchema = new Schema<MessageDocument>(
  {
    messageType : {
      type:String,
      required:true,
    },
    content: {
      type: String,
      required: true,
    },
    sender: {
      senderId: {
        type: Schema.Types.ObjectId,
        required: true,
        refpath: "senderType",
      },
      senderType: {
        type: String,
        enum: ["users", "trainers"],
        required: true,
      },
    },
    recipient: {
      recipientId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: "recipientType",
      },
      recipientType: {
        type: String,
        enum: ["users", "trainers"],
        required: true,
      },
    },
    chatRoomId : {
      type: Schema.Types.ObjectId,
      required : true,
    },
    isRead : {
      type: Boolean,
    }
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<MessageDocument>("message" , messageSchema)

export default MessageModel;
