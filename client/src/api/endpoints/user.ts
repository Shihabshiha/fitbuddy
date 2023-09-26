import END_POINTS from "../../constants/endpoints";
import { getWeightgainPrograms } from "../services/user-services";

export const getWeightGainPrograms = () => {
  return getWeightgainPrograms(END_POINTS.GET_WEIGHT_GAIN_PROGRAMS);
}