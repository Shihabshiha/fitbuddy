import END_POINTS from "../../constants/endpoints";
import {
  getAllPrograms,
  getProgramById,
  enrollCheckoutPayment,
  getUserDeatils,
  getEnrolledProgramById,
  doChangeProfileImage,
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
  return doChangeProfileImage(END_POINTS.CHANGE_PROFILE_IMAGE,formData)
}
