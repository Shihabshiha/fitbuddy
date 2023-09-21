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

  const updateCourseStatus = async (courseId:string, isListed:boolean) => {
    try{
  
      const update = { isListed: isListed };
      const options = { new: true };
  
      const updatedCourse = CourseModel.findByIdAndUpdate(
        courseId,
        update,
        options,
      )
  
      if (!updatedCourse) {
        throw new Error('Course not found'); 
      }
  
      return updatedCourse
    }catch(error:any){
      throw error
    }
  }

  const deleteCourse = async (courseId:string) => {
    try{
      const deletedCourse =await CourseModel.findByIdAndDelete(courseId)
      if (!deletedCourse) {
        throw new Error("Course not found");
      }
      return deletedCourse
    }catch(error:any){
      throw error
    }
  }


  return {
    addCourse,
    getAllCourse,
    updateCourseStatus,
    deleteCourse,
  };
};



export default courseService;
