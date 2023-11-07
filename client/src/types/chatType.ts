export interface ChatListItem {
  createdAt: string;
  latestMessage: string;
  participants: {
    trainerId: {
      firstName: string;
      lastName: string;
      _id: string;
    };
    userId: {
      firstName: string;
      lastName: string;
      profileImage: string;
      _id: string;
    };
  };
  unreadMessage: number;
  updatedAt: string;
  _id: string;
}

export type MessageType = {
  messageType :string;
  content : string;
  sender : {
    senderId: string;
    senderType : string;
  };
  recipient : {
    recipientId: string;
    recipientType : string;
  }
  chatRoomId : string;
  isRead : boolean;
  createdAt : string;
  _id : string;
}

export type TrainerInfoType = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type UserInfoType = {
  firstName: string;
  lastName: string;
  profileImage :string;
  _id: string;
};
