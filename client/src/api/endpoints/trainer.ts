import END_POINTS from "../../constants/endpoints";
import { addCourse , getCourses , doListUnlist} from "../services/trainer-services";

export const addNewCourse = (newCourse : FormData) => {
  return addCourse(END_POINTS.ADD_COURSE,newCourse);
}

export const getAllCourses = () => {
  return getCourses(END_POINTS.GET_ALL_COURSES)
}

export const listUnlist = (courseId:string, isListed:boolean) =>{
  return doListUnlist(END_POINTS.LIST_UNLIST,courseId,isListed)
}