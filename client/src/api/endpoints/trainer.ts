import END_POINTS from "../../constants/endpoints";
import { addCourse } from "../services/trainer-services";

export const addNewCourse = (newCourse : FormData) => {
  return addCourse(END_POINTS.ADD_COURSE,newCourse);
}