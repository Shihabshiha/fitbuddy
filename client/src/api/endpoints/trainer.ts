import END_POINTS from "../../constants/endpoints";
import {
  addCourse,
  getCourses,
  doListUnlist,
  doDelete,
  addChapter,
  getChapters,
  deleteChapter,
  getNotifications,
  replayComment,
  getUnreadNotificationCount,
  markNotificationAsRead,
  getEnrollmentsData,
  getChatList,
  getChatDetailsById,
  sendNewMessageTrainer,
  sendImageFileTrainer,
  getRevenueByPrograms,
} from "../services/trainer-services";

export const addNewCourse = (newCourse: FormData) => {
  return addCourse(END_POINTS.ADD_COURSE, newCourse);
};

export const getAllCourses = () => {
  return getCourses(END_POINTS.GET_ALL_COURSES);
};

export const listUnlist = (courseId: string, isListed: boolean) => {
  return doListUnlist(END_POINTS.LIST_UNLIST, courseId, isListed);
};

export const deleteCourse = (courseId: string) => {
  return doDelete(END_POINTS.DELETE_COURSE, courseId);
};

export const addNewChapter = (chapterData: FormData, courseId: string) => {
  return addChapter(END_POINTS.ADD_CHAPTER, chapterData, courseId);
};

export const getChaptersByCourseId = (courseId:string) => {
  return getChapters(END_POINTS.GET_CHAPTER_BY_COURSE_ID, courseId)
}

export const deleteChapterById = (chapterId:string) => {
  return deleteChapter(END_POINTS.DELETE_CHAPTER_BY_ID,chapterId)
}

export const getAllNotifications = () => {
  return getNotifications(END_POINTS.GET_ALL_NOTIFICATIONS)
}

export const replayToComment =(commentId:string , replayContent :string) => {
  return replayComment(END_POINTS.REPLAY_TO_COMMENT,commentId,replayContent)
}

export const getNotificationCount =() => {
  return getUnreadNotificationCount(END_POINTS.GET_NOTIFICATION_COUNT)
}

export const markNotificationRead = () => {
  return markNotificationAsRead(END_POINTS.MARK_NOTIFICATION_AS_READ)
}

export const getAllEnrollments = () => {
  return getEnrollmentsData(END_POINTS.GET_ENROLLMENTS_DATA)
}

export const getAllChatList = () => {
  return getChatList(END_POINTS.GET_CHATLIST_FOR_TRAINER)
}

export const getChatDetails = (chatId:string) => {
  return getChatDetailsById(END_POINTS.GET_CHAT_DETAILS_TRAINER, chatId);
}

export const sendNewMessage = (chatId:string , content:string) => {
  return sendNewMessageTrainer(END_POINTS.SEND_NEW_MESSAGE_TRAINER,chatId,content);
}

export const sendImageFile = (image:FormData , chatId:string) => {
  return sendImageFileTrainer(END_POINTS.SEND_IMAGE_FILE_TRAINER,image , chatId)
}

export const getRevenueByProgram = () => {
  return getRevenueByPrograms(END_POINTS.GET_REVENUE_BY_PROGRAM)
}