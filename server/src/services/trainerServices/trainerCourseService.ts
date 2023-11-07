import { CourseData } from "../../types/trainerTypes";
import CourseModel from "../../models/courseModel";
import cloudinary from "../../config/cloudinaryConfig";
import { CourseAttributes, CourseInterface } from "../../types/courseTypes";
import mongoose from "mongoose";
import stripeInstance, {
  StripePrice,
  StripeProduct,
} from "../../config/stripeConfig";
import { v4 as uuidv4 } from "uuid";

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
      about,
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
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId);

      const programId: string = uuidv4();
      // Create a Product in Stripe for the course/program
      const product: StripeProduct = await stripeInstance.products.create({
        name: courseName,
        metadata: {
          programId: programId,
          trainerId: trainerId,
        },
        images: [imageUrl],
      });
      const productId: string = product.id;
      const stripePrice: StripePrice = await stripeInstance.prices.create({
        unit_amount: Math.round(price * 100),
        currency: "inr",
        product: productId,
      });
      const priceId: string = stripePrice.id;

      const newCourse: CourseAttributes = {
        courseName: courseName,
        description: description,
        category: category,
        level: level,
        about: about,
        price: price,
        isPaid: isPaid,
        trainerId: trainerObjectId,
        duration: duration,
        thumbnailUrl: imageUrl,
        isListed: false,
        stripeProductId: productId,
        stripePriceId: priceId,
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
      const courses = await CourseModel.find({ trainerId }).sort({
        createdAt: -1,
      });
      return courses;
    } catch (error: any) {
      throw error;
    }
  };

  const updateCourseStatus = async (courseId: string, isListed: boolean) => {
    try {
      const update = { isListed: isListed };
      const options = { new: true };

      const updatedCourse = CourseModel.findByIdAndUpdate(
        courseId,
        update,
        options
      );

      if (!updatedCourse) {
        throw new Error("Course not found");
      }

      return updatedCourse;
    } catch (error: any) {
      throw error;
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(courseId);
      if (!deletedCourse) {
        throw new Error("Course not found");
      }
      return deletedCourse;
    } catch (error: any) {
      throw error;
    }
  };

  const getRevenueData = async (trainerId: string) => {
    try {
      const trainerObjectId = new mongoose.Types.ObjectId(trainerId);
      const courses = await CourseModel.find({ trainerId: trainerObjectId });
      const revenueData = courses.map((course) => ({
        courseName: course.courseName,
        revenue: course.price * course.enrollmentCount,
      }));
      return revenueData;
    } catch (error) {
      throw error;
    }
  };

  return {
    addCourse,
    getAllCourse,
    updateCourseStatus,
    deleteCourse,
    getRevenueData,
  };
};

export default courseService;
