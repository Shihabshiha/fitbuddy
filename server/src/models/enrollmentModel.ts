import mongoose, { Document, Schema , Model} from "mongoose";
import { EnrollmentDocument } from "../types/enrollmentTypes";

interface EnrollmentModelType extends Model<EnrollmentDocument> {}


const enrollmentSchema = new Schema<EnrollmentDocument, EnrollmentModelType> ( {
  programId : {
    type : Schema.Types.ObjectId,
    ref : 'courses',
    required : true,
  },
  userId : {
    type : Schema.Types.ObjectId,
    ref : 'users',
    required : true,
  },
  payment: {
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    }
  },
  videosProgress : [
    {
      videoId:{
        type:Schema.Types.ObjectId,
        ref: 'chapters',
      },
      watched : {
        type:Boolean,
        default:false,
      },  
    }  
  ]
})

enrollmentSchema.index({ programId: 1, userId: 1 }, { unique: true });

const EnrollmentModel = mongoose.model<EnrollmentDocument, EnrollmentModelType>("Enrollment", enrollmentSchema);

export default EnrollmentModel;
