import END_POINTS from "../../constants/endpoints";
import { getAllPrograms , getProgramById } from "../services/user-services";

export const getAllProgram = () => {
  return getAllPrograms(END_POINTS.GET_ALL_PROGRAMS);
}

export const getProgramDetailById = (programId:string) => {
  return getProgramById(END_POINTS.GET_PROGRAM_DETAILS_BY_ID,programId)
}