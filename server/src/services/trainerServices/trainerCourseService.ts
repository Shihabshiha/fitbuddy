import { CourseData } from "../../types/trainerTypes";
import CourseModel from "../../models/courseModel";

const courseService = () => {
  const addCourse = async (newCourse: CourseData, trainerId: string) => {
    const { courseName, description, category, level, price, isPaid , duration , thumbnailUrl} =
      newCourse;
    try {
      const newCourse = {
        courseName: courseName,
        description: description,
        category: category,
        level: level,
        price: price,
        isPaid: isPaid,
        trainerId: trainerId,
        duration: duration,
        thumbnailUrl: thumbnailUrl,
      };

      const savedCourse = await CourseModel.create(newCourse);
      return savedCourse;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    addCourse,
  };
};

export default courseService;
