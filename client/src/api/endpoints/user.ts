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
