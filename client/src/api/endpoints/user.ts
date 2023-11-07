import END_POINTS from "../../constants/endpoints";
import {
  getAllPrograms,
  getProgramById,
  enrollCheckoutPayment,
  getUserDeatils,
  getEnrolledProgramById,
  doChangeProfileImage,
  markVideoAsWatchedById,
  getProgramProgressDetails,
  doPostNewComment,
  getAllCommentsByVideoId,
  createChatRoomById,
  allChatList,
  getAllChatDetailsById,
  sendNewMessageFromUser,
  sendImageFileAsMessage,
} from "../services/user-services";

export const getUserDetailsbyToken = () => {
  return getUserDeatils(END_POINTS.GET_USER_DETAILS_BY_TOKEN);
};

export const getAllProgram = () => {
  return getAllPrograms(END_POINTS.GET_ALL_PROGRAMS);
};

export const getProgramDetailById = (programId: string) => {
  return getProgramById(END_POINTS.GET_PROGRAM_DETAILS_BY_ID, programId);
};

export const enrollCheckout = (programId: string) => {
  return enrollCheckoutPayment(END_POINTS.CREATE_CHECKOUT_SESSION, programId);
};

export const getEnrolledPrograms = (userId: string) => {
  return getEnrolledProgramById(END_POINTS.GET_ENROLLED_PROGRAMS, userId);
};

export const changeProfileImage = (formData:FormData) => {
  return doChangeProfileImage(END_POINTS.CHANGE_PROFILE_IMAGE,formData);
}

export const markVideoAsWatched = (videoId:string) => {
  return markVideoAsWatchedById(END_POINTS.MARK_VIDEO_AS_WATCHED,videoId);
}

export const getProgramProgress = () => {
  return getProgramProgressDetails(END_POINTS.GET_PROGRAM_PROGRESS)
}

export const postNewComment = (videoId:string , newComment:string) => {
  return doPostNewComment(END_POINTS.POST_NEW_COMMENT,videoId,newComment);
}

export const getAllCommentsById = (videoId:string) => {
  return getAllCommentsByVideoId(END_POINTS.GET_ALL_COMMENTS , videoId);
}

export const createChatRoom = (trainerId:string , programId:string) => {
  return createChatRoomById(END_POINTS.CREATE_CHAT_ROOM,trainerId,programId)
}

export const getAllChatList = () => {
  return allChatList(END_POINTS.ALL_CHAT_LIST)
}

export const getChatDetails = (chatId:string) => {
  return getAllChatDetailsById(END_POINTS.GET_CHAT_DETAILS,chatId)
}

export const sendNewMessage = (chatId:string , content:string) => {
  return sendNewMessageFromUser(END_POINTS.SEND_NEW_MESSAGE_FROM_USER,chatId, content)
}

export const sendImageFile = (image : FormData , chatId:string) => {
  return sendImageFileAsMessage(END_POINTS.SEND_IMAGE_FILE_AS_MESSAGE , image , chatId);
}