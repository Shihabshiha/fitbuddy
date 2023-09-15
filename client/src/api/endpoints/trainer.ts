import END_POINTS from "../../constants/endpoints";
import {
  addCourse,
  getCourses,
  doListUnlist,
  doDelete,
  addChapter,
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
