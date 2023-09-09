import { CourseData } from "../../types/trainerTypes";
import CourseModel from "../../models/courseModel";
import cloudinary from "../../config/cloudinaryConfig";
import { CourseAttributes, CourseInterface } from "../../types/courseTypes";

const courseService = () => {
  const addCourse = async (
    newCourse: CourseData,
    trainerId: string,
    thumbnail: any
  ): Promise<CourseAttributes> => {
    const {
      courseName,
      description,
      category,
      level,
      price,
      isPaid,
      duration,
    } = newCourse;

    try {
      
      const thumbnailImage = thumbnail[0];
      const base64String = thumbnailImage.buffer.toString("base64");
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${thumbnailImage.mimetype};base64,${base64String}`,
        {
          folder: "fitbuddy/course-thumbnails",
        }
      );
      const imageUrl = uploadResponse.secure_url;

      const newCourse: CourseAttributes = {
        courseName: courseName,
        description: description,
        category: category,
        level: level,
        price: price,
        isPaid: isPaid,
        trainerId: trainerId,
        duration: duration,
        thumbnailUrl: imageUrl,
        isListed: true,
      };

      const savedCourse = await CourseModel.create(newCourse);
      return savedCourse;
    } catch (error: any) {
      throw error;
    }
  };

  const getAllCourse = async (
    trainerId: string
  ): Promise<CourseInterface[]> => {
    try {
      const courses = await CourseModel.find({ trainerId }).exec();
      return courses;
    } catch (error: any) {
      throw error;
    }
  };

  return {
    addCourse,
    getAllCourse,
  };
};

export default courseService;
