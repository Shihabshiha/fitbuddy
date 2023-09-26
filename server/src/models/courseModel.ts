import { CourseInterface } from "../types/courseTypes";

import mongoose, { Schema  } from 'mongoose';


const courseSchema = new Schema<CourseInterface>({
    courseName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100
    },
    trainerId: {
      type: Schema.Types.ObjectId,
      ref: 'trainers',
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
      required: function (this:CourseInterface){
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
    subscribedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users', 
      },
    ],
  
  },
  {
    timestamps:true,
  }
);

const CourseModel = mongoose.model<CourseInterface>('Course', courseSchema);

export default CourseModel;
