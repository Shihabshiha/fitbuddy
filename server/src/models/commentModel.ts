import mongoose , { Schema , Model} from 'mongoose'
import { CommentDocument } from '../types/commonTypes'



const commentSchema = new Schema ({
  content : {
    type: String,
    required : true,
  },
  videoId : {
    type : Schema.Types.ObjectId,
    ref : "chapters",
    required : true,
  },
  authorType : {
    type : String,
    enum : ["trainers", "users"],
    required : true,
  },
  authorId : {
    type : Schema.Types.ObjectId,
    refPath : 'authorType',
  },
  replies : [{
    authorName : {
      type:String,
      required :true
    },
    authorType :{
      type: String,
      required :true,
    },
    content : {
      type: String,
      required :true,
    },
    createdAt : {
      type : Date,
    }
  }],
  createdAt : {
    type : Date,
    required: true,
  }
})

const CommentModel = mongoose.model<CommentDocument>("Comment", commentSchema);

export default CommentModel