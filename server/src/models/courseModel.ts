import { CourseAttributes } from "../types/courseTypes";

import mongoose, { Schema } from 'mongoose';


const courseSchema = new Schema<CourseAttributes>({
    courseName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100
    },
    trainerId: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: function (this:CourseAttributes){
        return this.isPaid
      },
      min : 0,
    },
    isPaid: {
      type: Boolean,
      required : true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String, 
      required: true,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
  
  },
  {
    timestamps:true,
  }
);

const CourseModel = mongoose.model<CourseAttributes>('Course', courseSchema);

export default CourseModel;
