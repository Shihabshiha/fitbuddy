import { CourseData } from "../../types/trainerTypes";
import CourseModel from "../../models/courseModel";
import cloudinary from "../../config/cloudinaryConfig";
import { CourseAttributes } from "../../types/courseTypes";

const courseService = () => {

  const addCourse = async (newCourse: CourseData, trainerId: string , thumbnail:any) => {
     
    const { courseName, description, category, level, price, isPaid , duration } = newCourse

    try {
      console.log('thumbb',thumbnail)
      const thumbnailImage = thumbnail[0]
      const base64String = thumbnailImage.buffer.toString('base64');
      const uploadResponse = await cloudinary.uploader.upload(`data:${thumbnailImage.mimetype};base64,${base64String}`, {
        folder: 'fitbuddy/course-thumbnails'
      });
      const imageUrl = uploadResponse.secure_url;


      const newCourse :CourseAttributes = {
        courseName: courseName,
        description: description,
        category: category,
        level: level,
        price: price,
        isPaid: isPaid,
        trainerId: trainerId,
        duration: duration,
        thumbnailUrl: imageUrl,
        isListed : true,
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
