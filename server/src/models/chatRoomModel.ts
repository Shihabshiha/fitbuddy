import mongoose, { Schema, Model } from "mongoose";

import { ChatRoomDocument } from "../types/commonTypes";

const ChatRoomSchema = new Schema(
  {
    participants: {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
      trainerId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "trainers",
      },
    },
    latestMessage: {
      type: Schema.Types.ObjectId,
    },
    unreadMessage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const ChatRoomModel = mongoose.model<ChatRoomDocument>("chatRoom" , ChatRoomSchema)

export default ChatRoomModel;