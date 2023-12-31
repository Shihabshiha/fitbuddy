import END_POINTS from "../../constants/endpoints";
import {
  getPendingVerificationList,
  sendAcceptanceMail,
  sendRejectedMail,
  getUsersList,
  blockUnblockUser,
  getCourses,
  listUnlistCourses,
} from "../services/admin-services";

export const getTrainerVerificationList = () => {
  return getPendingVerificationList(END_POINTS.GET_TRAINERS_VERIFICATION_LIST);
};

export const sendRequestAcceptedMail = (trainerEmail: string) => {
  return sendAcceptanceMail(END_POINTS.SEND_ACCEPTANCE_MAIL, trainerEmail);
};

export const sendRequestRejectedMail = (
  trainerEmail: string,
  reason: string
) => {
  return sendRejectedMail(END_POINTS.SEND_REJECTED_MAIL, trainerEmail, reason);
};

export const getUserList = () => {
  return getUsersList(END_POINTS.GET_USERS_LIST);
};

export const blockUnblock = (userId: string, isBlocked: boolean) => {
  return blockUnblockUser(END_POINTS.BLOCK_UNBLOCK_USER, userId, isBlocked);
};

export const getAllCourses = () => {
  return getCourses(END_POINTS.GET_ALL_COURSES_ADMIN);
};

export const listUnlistCourse = (courseId:string , isListed :boolean) => {
  return listUnlistCourses(END_POINTS.LIST_UNLIST_COURSE_ADMIN,courseId,isListed)
}
