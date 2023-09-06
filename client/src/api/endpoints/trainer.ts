import END_POINTS from "../../constants/endpoints";
import { CourseData } from "../../types/trainerTypes";
import { addCourse } from "../services/trainer-services";

export const addNewCourse = (newCourse : CourseData) => {
  return addCourse(END_POINTS.ADD_COURSE,newCourse);
}